import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'about', component: SettingsComponent}
];

export const routing = RouterModule.forRoot(routes);
