import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from '../main/components/menu/menu.component';
import {PanelMenuModule} from "primeng/panelmenu";
import {InputTextModule} from "primeng/inputtext";
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        PanelMenuModule,
        InputTextModule,
        SharedModule,
        FormsModule
    ]
})
export class CoreModule {
}
