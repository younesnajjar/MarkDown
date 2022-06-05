import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {AppMainComponent} from "./main/app.main.component";
import {LandingComponent} from "./shared/components/landing/landing.component";
import {LoginComponent} from "./auth/login/login.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            // {
            //     path: "auth",
            //     loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
            // },
            {
                path: '',
                loadChildren: () => import("./main/main.module").then((m) => m.MainModule),
            },
            {path:'pages/landing', component: LandingComponent},
            {path:'pages/login', component: LoginComponent},
            // {path:'pages/error', component: ErrorComponent},
            // {path:'pages/notfound', component: NotfoundComponent},
            // {path:'pages/access', component: AccessComponent},
            {path: '**', redirectTo: 'pages/landing'},
        ], {scrollPositionRestoration: 'enabled', anchorScrolling:'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
