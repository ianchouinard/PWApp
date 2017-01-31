import { ListItemModel } from './listitem.model';

export class ListModel {
    id: string;
    title: string;
    description: string;
    status: string;
    pages: Array<ListItemModel>
}