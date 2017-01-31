import { ListModel } from './../models/list.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'my-entry-view',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})

export class EntryComponent {

  @Input() data;

  constructor() {}

  addList(listName: string) {
    let newList = new ListModel();
    newList.id = `_id-${listName}` + Math.floor((Math.random() * 1000)).toString();
    newList.title = 'New Directory Title';
    newList.description = 'New Directory description';
    newList.status = 'Status';
    newList.pages = [];
    this.data.directories.push(newList);
  }

  removeList(id:string) {
    const toDelete = new Set([id]);
    this.data.directories = this.data.directories.filter(obj => !toDelete.has(obj.id));
  }

}
