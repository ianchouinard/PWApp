import { MainComponent } from './../../../main/main.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})

export class PreviewComponent{

  @Input() maps;

  constructor(
      private main: MainComponent
  ) {}

  selectEntry(id, passsKey, passProtected) {
    if (passProtected) {
      this.main.getMapFromServer(id, passsKey);
    } else {
      this.main.getMapFromServer(id, false);
    }
  } 

  removeEntry(id:string) {
    const toDelete = new Set([id]);
    this.main.recentEntries = this.main.recentEntries.filter(obj => !toDelete.has(obj._id));
    localStorage.setItem(this.main.storageKey, JSON.stringify(this.main.recentEntries));
  }

}
