import { PreviewComponent } from './entry/components/preview/preview.component';
import { EntryModel } from './models/entry.model';
import { ListModel } from './models/list.model';
import { ListItemModel } from './models/listitem.model';
import { RecentModel } from './models/recent.model';

import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SettingsComponent } from './settings/settings.component';
import { EntryComponent } from './entry/entry.component';
import { ListComponent } from './entry/components/list/list.component';
import { ModalsComponent } from './shared/modals/modals.component';


import { SortablejsModule } from 'angular-sortablejs';

import { ApiService } from './shared';
import { EntriesService } from './shared/entries.service';

import { routing } from './app.routing';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    SortablejsModule
  ],
  declarations: [
    AppComponent,
    MainComponent,
    SettingsComponent,
    EntryComponent,
    ListComponent,
    PreviewComponent,
    ModalsComponent
  ],
  providers: [
    ApiService,
    EntryComponent,
    MainComponent,
    ListItemModel,
    ListModel,
    EntryModel,
    EntriesService,
    ModalsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
