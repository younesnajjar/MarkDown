import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {ListItem} from "../../../shared/models/list-item.model";
import {DataService} from "../../../shared/services/data.service";

@Component({
    selector: 'app-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

    @Input() item: ListItem;
    options: MenuItem[];
    checked: boolean;

    display: boolean = false;
    folders: ListItem[];


    constructor(private dataService:DataService) {
    }

    ngOnInit(): void {
        this.setOptions();
        this.setFolders();
    }

    setFolders() {
        this.dataService.folders.subscribe(folders => {
            this.folders = folders;
        });
    }

    setOptions() {
        if(this.item.type === 'folder') {
            this.setFolderOptions();
        } else if(this.item.type === 'file') {
            this.setFileOptions();
        }
    }

    setFileOptions() {
        this.options = [
            {
                label: 'Delete File',
                icon: 'pi pi-trash',
                command: () => {
                    this.dataService.deleteItem(this.item);
                }
            },
            {
                label: 'Move To Folder',
                icon: 'pi pi-folder',
                command: () => {
                    this.showDialog();
                }
            }
        ];
    }
    setFolderOptions() {
        this.options = [
            {
                label: 'Delete Folder',
                icon: 'pi pi-trash',
                command: () => {
                    this.dataService.deleteItem(this.item);
                }
            }
        ];
    }


    handleItemClick() {
        if(this.item.type === 'file') {
            this.dataService.setSelectedItem(this.item);
        }
    }

    showDialog() {
        this.display = true;
    }

    handleFolderSelection($event: any) {
        const selectedFolderId = parseInt($event.target.value);
        if($event.target.value && this.item.id !== selectedFolderId) {
            this.dataService.updateParent(this.item, selectedFolderId);
            this.display = false;
        }

    }
}
