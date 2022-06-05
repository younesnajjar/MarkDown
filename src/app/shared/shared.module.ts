import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenuModule} from "primeng/menu";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChipsModule} from "primeng/chips";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {AppConfigComponent} from "./components/config/app.config.component";
import {AppFooterComponent} from "./components/footer/app.footer.component";
import {AppTopBarComponent} from "./components/topbar/app.topbar.component";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputSwitchModule} from "primeng/inputswitch";



@NgModule({
    declarations: [
        AppConfigComponent,
        AppFooterComponent,
        AppTopBarComponent
    ],
    exports: [
        AppConfigComponent,
        AppFooterComponent,
        AppTopBarComponent,


        MenuModule,
        FormsModule,
        ChipsModule,
        ReactiveFormsModule,
        ButtonModule,
        RippleModule
    ],
    imports: [
        CommonModule,
        MenuModule,
        FormsModule,
        ChipsModule,
        ReactiveFormsModule,
        ButtonModule,
        RippleModule,
        RadioButtonModule,
        InputSwitchModule
    ]
})
export class SharedModule { }
