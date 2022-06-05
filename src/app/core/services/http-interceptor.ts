import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';

import { BehaviorSubject, Subject } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}


//*
  addToken(request) {
	const token = this.authService.getToken();
	if (!!token) {
		request = request.clone({
			setHeaders: {
				Authorization: 'Bearer ' + token
			}
		});
	}

	return request;
  }




  refreshTokenInProgress = false;

  tokenRefreshedSource = new Subject<HttpEvent<any>>();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log('Intercepted!', req);


	request = this.addToken(request);
    console.log(request);
	return next.handle(request).pipe(
		map(event => {
			return event;
		}),



		catchError(error => {
			// Invalid token error
			if (error.status === 401 && request.url.includes('/auth') == false) {

				if (this.refreshTokenInProgress) {
					console.info('handleResponseError   refreshTokenInProgress ................................');
					return this.tokenRefreshed$.pipe(
						switchMap(() => {
							console.info('handleResponseError   tokenRefreshed    observer.next(); ................................');
							request = this.addToken(request);
							this.refreshTokenInProgress = false;
							return next.handle(request);
						}),
						catchError(e => {
							console.warn('handleResponseError   error replay   ................................');
							return throwError(e);
						})
					);
				} else {
					return this.refreshToken(request, next);
				}

			}

			return throwError(error);
		}),
	);
  }


  refreshToken(request, next): Observable<HttpEvent<any>> {
	this.refreshTokenInProgress = true;

	console.info('handleResponseError   trying to refresh token ................................');
	return this.authService.refreshToken().pipe(
		switchMap(() => {
			request = this.addToken(request);
			this.refreshTokenInProgress = false;
			(this.tokenRefreshedSource as any).next();
			console.info('handleResponseError   replay with new token ................................');
			return next.handle(request);
		}),
		catchError(e => {
			console.warn('handleResponseError   cannot get new token ................................');
			this.refreshTokenInProgress = false;
            (this.tokenRefreshedSource as any).next();
			this.authService.logout();
			e.status = 401;
			return throwError(e);
		}))  as Observable<HttpEvent<any>>  ;
  }






//*/











}
