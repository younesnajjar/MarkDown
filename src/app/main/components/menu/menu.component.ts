import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {DataService} from "../../../shared/services/data.service";
import {debounceTime, distinctUntilChanged, Subscription} from "rxjs";
import {ListItem} from "../../../shared/models/list-item.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

    items: ListItem[];
    searchFg: FormGroup;
    searchOptions: MenuItem[];


    private getDataSubscription: Subscription;

    constructor(private dataService: DataService, private formBuilder: FormBuilder) {
    }


    ngOnInit() {
        this.initForm();
        this.setSearchOptions();
        this.dataService.items.subscribe(items => {
            this.items = items;
        });
    }

    initForm() {
        this.searchFg = this.formBuilder.group({
            name: [],
            tags: []
        });
        this.searchFg.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged())
            .subscribe(formValue => {
                this.filterData(formValue);
            })
    }

    setSearchOptions() {
        this.searchOptions = [
            {
                label: 'Add as folder',
                icon: 'pi pi-folder',
                command: () => {
                    this.dataService.createUpdateElement({type: 'folder', ...this.searchFg.value});
                    this.searchFg.reset();

                }
            },
            {
                label: 'Add as file',
                icon: 'pi pi-file',
                command: () => {
                    this.dataService.createUpdateElement({type: 'file', ...this.searchFg.value});
                    this.searchFg.reset();

                }
            }
        ]
    }

    filterData(fv) {
        this.dataService.filterData(fv);
    }

    ngOnDestroy() {
        this.getDataSubscription.unsubscribe();
    }

}
