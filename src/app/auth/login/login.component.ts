import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";
import {AppConfig} from "../../shared/api/appconfig";
import {ConfigService} from "../../shared/service/app.config.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../core/services/auth.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
    loading: boolean = false;
    returnUrl: string = "/";

    loginForm!: FormGroup;
    formSubmitted: boolean = false;
    error: any;
    config: AppConfig;
    subscription: Subscription;


    showPassword: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthService,
        private fb: FormBuilder,
        public configService: ConfigService
    ) {
    }

    ngOnInit(): void {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.config = config;
        });
        this.loginForm = this.fb.group({
            email: ["younes.najjar.96@gmail.com", [Validators.required]],
            password: ["test123", Validators.required],
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl =
            this.route.snapshot.queryParams["returnUrl"] || "/";
    }

    ngAfterViewInit(): void {
        document.body.classList.add("authentication-bg");
    }

    /**
     * convenience getter for easy access to form fields
     */
    get formValues() {
        return this.loginForm.controls;
    }

    /**
     * On submit form
     */
    onSubmit(): void {
        this.formSubmitted = true;
        if (this.loginForm.valid) {
            this.loading = true;
            this.authenticationService
                .login(this.formValues.email?.value, this.formValues.password?.value)
                .pipe(first())
                .subscribe(
                    (data: any) => {
                        this.router.navigate([this.returnUrl]);
                    },
                    (error: any) => {
                        this.error = error;
                        this.loading = false;
                    }
                );
        }
    }
    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }
}
