import { EntryModel } from './../models/entry.model';
import { RecentModel } from './../models/recent.model';\
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { EntriesService } from './../shared/entries.service';

@Component({
  selector: 'my-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private currentId: string;
  public entry: EntryModel;
  public recentEntries: Array<RecentModel>;
  public modal: any;
  public storageKey = 'lists-data';

  constructor(
    private http: Http,
    private entriesApi: EntriesService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.recentEntries = [];
    this.modal = false;
  }

  onStart() {
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
        let mapId = param['map'];
        if (mapId) {
          this.getMapFromServer(mapId, false);
        } else if (this.recentEntries.length) {
          this.getMostRecentEntry();
        } else {
          this.makeNew();
        }
      });
  }

  getMapFromServer(id: string, passkey: any) {
    this.currentId = id;
    this.entriesApi.getEntry(id, passkey).subscribe(
      data => {
        let res = data.json();
        if (res.success) {
          this.entry = data.json().data;
          this.addToRecentList();
          this.dataGot();
        } else {
          if (res.info == "Incorrect password.") {
            let pass = this.useKeyFromExistingEntry(id);
            if (pass) {
              this.reGetAfterPassPrompt(pass);
              console.log(pass);
            } else {
              this.modal = "passwordPrompt";
            }
          }
        }
      },
      err => console.error(err),
      () => console.log('getRepos completed')
    );
  }

  getMostRecentEntry() {
    let recentId = this.recentEntries[0]._id;
    let recentPass = this.recentEntries[0].passkey;
    let needsPass = this.recentEntries[0].isPassProtected;
    if (needsPass) {
      this.getMapFromServer(recentId, recentPass);
    } else {
      this.getMapFromServer(recentId, false);
    }
  }

  makeNew() {
    let responseData;
    let newItem = new EntryModel();
    newItem.title = 'New Lists';
    newItem.description = 'Description of new lists';
    newItem.isPassProtected = false;
    newItem.passKey = '';
    newItem.directories = [];
    this.entriesApi.postEntry(newItem).subscribe(
      data => {
        responseData = data;
        responseData = JSON.parse(responseData._body);
        this.getMapFromServer(responseData.id, false);
      },
      err => console.error(err),
      () => console.log('completed')
    );
  }

  saveChanges() {
    this.entriesApi.updateEntry(
      this.entry, this.entry._id, this.entry.passKey
    ).subscribe(
      data => {
        console.log(data);
      },
      err => console.error(err),
      () => console.log('completed')
      );
  }

  deleteEntry() {
    let key = this.entry.isPassProtected ? this.entry.passKey : false;
    this.entriesApi.deleteEntry(
      this.entry._id, key
    ).subscribe(
        data => {
          this.onDelete();
        },
        err => console.error(err),
        () => console.log('completed')
      );
  }

  reGetAfterPassPrompt(passKey: string) {
    this.getMapFromServer(this.currentId, passKey);
  }

  ngOnInit() {
    let recentStored = localStorage.getItem(this.storageKey);
    if (recentStored) {
      this.recentEntries = JSON.parse(recentStored);
    }
    this.onStart();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  //Helpers
  private addToRecentList() {
    let recent = new RecentModel();
    recent.title = this.entry.title;
    recent.description = this.entry.description;
    recent._id = this.entry._id;
    recent.passkey = this.entry.passKey;
    recent.isPassProtected = this.entry.isPassProtected;

    if (this.recentEntries.length) {
      const toDelete = new Set([this.entry._id]);
      this.recentEntries = this.recentEntries.filter(obj => !toDelete.has(obj._id));
    }

    this.recentEntries.push(recent);
    this.recentEntries.reverse();
    localStorage.setItem(this.storageKey, JSON.stringify(this.recentEntries));
  }

  private useKeyFromExistingEntry(id: string) {
    if (!this.recentEntries.length) {
      return false;
    }
    let existing = this.recentEntries.filter(function( obj ) {
      return obj._id == id;
    });
    if (existing.length) {
      return existing[0].passkey;
    } else {
      return false;
    }
  }

  private onDelete() {
    if (this.recentEntries.length) {
      const toDelete = new Set([this.entry._id]);
      this.recentEntries = this.recentEntries.filter(obj => !toDelete.has(obj._id));
      localStorage.setItem(this.storageKey, JSON.stringify(this.recentEntries));
    }
    this.location.replaceState("");
    if (this.recentEntries.length) {
      this.getMostRecentEntry();
    } else {
      this.makeNew();
    }
  }

  private dataGot() {
    this.modal = false;
    this.location.replaceState("?map=" + this.entry._id);
    setTimeout(function () {
      document.getElementsByClassName('sitemap-toggle')[0]
        .classList.add('active');
      document.querySelector('.sitemap-wrapper')
        .classList.add('isVisible');
    }, 500);
  }

  private toggleMobileSelector() {
    document.querySelector('.side-main')
      .classList.toggle('open');
  }

}
