import { ListModel } from './list.model';

export class EntryModel {
    _id: string;
    title: string;
    description: string;
    passKey: string;
    isPassProtected: boolean;
    directories: Array<ListModel>;
}