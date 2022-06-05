import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';

import {RadioButtonModule} from 'primeng/radiobutton';

import {AppComponent} from './app.component';
import {AppTopBarComponent} from './shared/components/topbar/app.topbar.component';
import {AppFooterComponent} from './shared/components/footer/app.footer.component';
import {AppConfigComponent} from './shared/components/config/app.config.component';



import {MenuService} from './shared/service/app.menu.service';
import {ConfigService} from './shared/service/app.config.service';


import {SharedModule} from "./shared/shared.module";
import {AppHttpInterceptor} from "./core/services/http-interceptor";
import {CoreModule} from "./core/core.module";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        SharedModule,
        RadioButtonModule,
        CoreModule

    ],
    declarations: [
        AppComponent
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppHttpInterceptor,
            multi: true,
        },
        MenuService, ConfigService
    ],
    exports: [
        AppFooterComponent,
        AppTopBarComponent,
        AppConfigComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
