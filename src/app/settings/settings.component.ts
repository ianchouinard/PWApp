import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  constructor() {}

  private JSONdata;

  clearStorage() {
    localStorage.removeItem('sitemapper-data');
    this.JSONdata = '';
  }

  getJSONFromStorage() {
    this.JSONdata = localStorage.getItem('sitemapper-data');
  }

  saveEditedData() {
    localStorage.setItem('sitemapper-data', this.JSONdata);
  }

  ngOnInit() {
    this.getJSONFromStorage();
  }

}
