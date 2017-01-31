import { Component, OnInit, Input } from '@angular/core';
import { EntryComponent } from './../../entry.component';
import { ListItemModel } from './../../../models/listitem.model';

@Component({
  selector: 'my-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent {

  @Input() directory;

  constructor(
    private entryComponent: EntryComponent
  ) {}

  addItem(directory:string) {
    let newItem = new ListItemModel();
    newItem.id = `_id-${directory}` + Math.floor((Math.random() * 1000)).toString();
    newItem.title = '';
    newItem.description = '';
    newItem.status = '';
    this.directory.pages.push(newItem);
  }

  removeItem(id:string) {
    const toDelete = new Set([id]);
    this.directory.pages = this.directory.pages.filter(obj => !toDelete.has(obj.id));
  }

  removeList(id: string) {
    this.entryComponent.removeList(id);
  }

}
