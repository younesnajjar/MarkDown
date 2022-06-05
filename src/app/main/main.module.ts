import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {MenuComponent} from "./components/menu/menu.component";
import {MenuItemComponent} from "./components/menu-item/menu-item.component";
import {SharedModule} from "../shared/shared.module";
import {AppMainComponent} from "./app.main.component";
import {AppModule} from "../app.module";
import { FileEditorComponent } from './components/file-editor/file-editor.component';
import {InputTextareaModule} from "primeng/inputtextarea";
import {ConfirmationService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {MarkdownModule} from "ngx-markdown";
import {DialogModule} from "primeng/dialog";
import {CascadeSelectModule} from "primeng/cascadeselect";


@NgModule({
    declarations: [
        MenuComponent,
        MenuItemComponent,
        AppMainComponent,
        FileEditorComponent
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
        SharedModule,
        InputTextareaModule,
        ConfirmDialogModule,
        MarkdownModule.forRoot(),
        DialogModule,
        CascadeSelectModule
    ]
})
export class MainModule {
}
