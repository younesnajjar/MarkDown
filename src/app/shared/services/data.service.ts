import {Injectable} from '@angular/core';
import {BehaviorSubject, of} from "rxjs";
import * as moment from 'moment';
import {ListItem} from "../models/list-item.model";
import {Search} from "../models/search.model";
import {MenuItem} from "primeng/api";

const DATA_REF = 'data_ref_all';
const CONFIG_REF = 'config_ref';

function cleanSearchObject(object) {
    const cleanObject = {};
    for (const key of Object.keys(object)) {
        if (object[key]) {
            cleanObject[key] = object[key];
        }
    }
    return cleanObject;
}

@Injectable({
    providedIn: 'root'
})
export class DataService {
    originalItems: BehaviorSubject<ListItem[]> = new BehaviorSubject<ListItem[]>([]);
    items: BehaviorSubject<ListItem[]> = new BehaviorSubject<ListItem[]>(this.originalItems.value);
    config: BehaviorSubject<{ idCount: number }> = new BehaviorSubject<{ idCount: number }>({idCount: 10})

    selectedItem: BehaviorSubject<ListItem> = new BehaviorSubject<ListItem>(null);
    folders: BehaviorSubject<ListItem[]> = new BehaviorSubject<ListItem[]>(null);


    constructor() {
        this.getLocalData();
        this.items.subscribe(items => {
            this.updateLocalData();
            this.updateFolders();
        })
    }

    filterData(searchObject: Search) {

        let data = JSON.parse(JSON.stringify(this.originalItems.value));
        if(data && Object.keys(cleanSearchObject(searchObject)).length > 0) {
            data = data?.filter(item => this.isValidItem(item, searchObject));
            this.items.next(data);
        }
    }

    isValidItem(item: ListItem, searchObject: any) {
        if (!searchObject) {
            return true
        }
        if (item.name.toLowerCase().includes(searchObject.name?.toLowerCase()) || (item.tags && item.tags.some(value => item.tags.includes(value)))) {
            return true;
        } else if (item.files && item.files.map(file => this.isValidItem(file, searchObject)).includes(true)) {
            return true;
        }
        return false;
    }

    updateLocalData() {
        localStorage.setItem(DATA_REF, JSON.stringify(this.originalItems.value));
        localStorage.setItem(CONFIG_REF, JSON.stringify(this.config.value));
    }

    getLocalData() {
        this.originalItems.next(JSON.parse(localStorage.getItem(DATA_REF)) || []);
        this.items.next(JSON.parse(localStorage.getItem(DATA_REF)) || []);
        this.config.next(JSON.parse(localStorage.getItem(CONFIG_REF)) || {idCount: 1});
    }

    createUpdateFolder(item: ListItem) {

    }

    createUpdateElement(itemToAdd: ListItem) {
        let data = JSON.parse(JSON.stringify(this.originalItems.value));

        if (itemToAdd.type === 'file') {
            itemToAdd.content = itemToAdd.content || '';
            itemToAdd.tags = itemToAdd.tags || [];
        } else {
            itemToAdd.files = itemToAdd.files || [];
        }
        itemToAdd.createdAt = itemToAdd.createdAt || moment();


        if (itemToAdd?.parent) {
            const parentIndex = data.findIndex(item => item.id === itemToAdd.parent);
            if (itemToAdd.id) {
                const fileIndex = data[parentIndex].files.findIndex(item => item.id === itemToAdd.id);
                console.log(fileIndex);
                if (fileIndex >= 0) {
                    data[parentIndex].files[fileIndex] = itemToAdd;
                }
            } else {
                data[parentIndex].files.push({...itemToAdd, id: this.config.value.idCount});
                this.incrementId();
            }
        } else {
            data.push({...itemToAdd, id: this.config.value.idCount});
            this.incrementId();
        }
        this.items.next(data);
        this.originalItems.next(data);
        this.updateLocalData();
    }

    deleteItem(itemToDelete: ListItem) {
        let data = JSON.parse(JSON.stringify(this.originalItems.value));
        if (itemToDelete.parent) {
            const parentIndex = data.findIndex(item => item.id === itemToDelete.parent);
            data[parentIndex].files = data[parentIndex].files.filter(file => file.id !== itemToDelete.id);
        } else {
            data = data.filter(item => item.id !== itemToDelete.id)
        }

        this.originalItems.next(data);
        this.items.next(data);
        this.selectedItem.next(null);
        this.updateLocalData();
    }

    setSelectedItem(item: ListItem) {
        this.selectedItem.next(item);
    }

    incrementId() {
        this.config.next({idCount: this.config.value.idCount + 1});
        this.updateLocalData();
    }

    updateFolders() {
        this.folders.next(this.items.value.filter(item => item.type === 'folder'));
    }

    updateParent(theItem: ListItem, folderId: number) {
        let data = JSON.parse(JSON.stringify(this.originalItems.value)) as ListItem[];
        const oldFolderIndex = data.findIndex(item => item.id === theItem.parent);
        const newFolderIndex = data.findIndex(item => item.id == folderId);
        console.log('new', newFolderIndex)
        if (oldFolderIndex >= 0) {
            data[oldFolderIndex].files = data[oldFolderIndex].files.filter(item => item.id !== theItem.id);
        } else {
            data = data.filter(item => item.id !== theItem.id);
        }
        if (newFolderIndex >= 0) {
            theItem.parent = folderId;
            data[newFolderIndex].files.push(theItem);
        }
        this.originalItems.next(data);
        this.items.next(data);
        this.updateLocalData();

    }
}
