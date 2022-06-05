import {Component, OnInit} from '@angular/core';
import {DataService} from "../../../shared/services/data.service";
import {ListItem} from "../../../shared/models/list-item.model";
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {ConfirmationService} from "primeng/api";

@Component({
    selector: 'app-file-editor',
    templateUrl: './file-editor.component.html',
    styleUrls: ['./file-editor.component.scss'],
    providers: [ConfirmationService]
})
export class FileEditorComponent implements OnInit {

    item: ListItem;
    fileFg: FormGroup;
    isPreview: boolean;

    constructor(private dataService: DataService, private formBuilder: FormBuilder, private confirmationService: ConfirmationService) {
    }

    ngOnInit(): void {
        this.setFileFg();
        this.dataService.selectedItem.subscribe(item => {
            this.item = item;
            this.setFileData();
        });

    }

    setFileFg() {
        this.fileFg = this.formBuilder.group({
            id: [this.item?.id, Validators.required],
            name: [this.item?.name, Validators.required],
            tags: [this.item?.tags],
            type: [this.item?.type, Validators.required],
            content: [this.item?.content, Validators.required],
            createdAt: [this.item?.createdAt, Validators.required],
            parent: [this.item?.parent, Validators.required],
        })
    };

    setFileData() {
        this.fileFg.patchValue(this.item);
    }

    submitChanges() {
        this.dataService.createUpdateElement(this.fileFg.value);
    }

    handleDelete() {
        console.log('clicked')
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this file?',
            accept: () => {

                this.dataService.deleteItem(this.item);
            }
        });
    }

    togglePreview() {
        this.isPreview = !this.isPreview;
    }
}
