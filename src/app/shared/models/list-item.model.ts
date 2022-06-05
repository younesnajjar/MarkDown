import {Moment} from "moment";

export interface ListItem {
    id?: number;
    name?: string;
    tags?: string[];
    type: 'folder' | 'file';
    content?: string;
    files?: ListItem[];
    createdAt?: Moment;
    updatedAt?: Moment;
    parent?: number;
}