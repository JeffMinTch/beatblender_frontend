import { Routes } from '@angular/router';

import { ProfileComponent } from "./profile.component";
import { ProfileOverviewComponent } from "./profile-overview/profile-overview.component";
import { ProfileSettingsComponent } from "./profile-settings/profile-settings.component";
import { ProfileBlankComponent } from "./profile-blank/profile-blank.component";

export const ProfileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [{
      path: 'overview',
      component: ProfileOverviewComponent,
      data: { title: 'Overview', breadcrumb: 'OVERVIEW' }
    }, 
    {
      path: 'settings',
      component: ProfileSettingsComponent,
      data: { title: 'Settings', breadcrumb: 'SETTINGS' }
    }, 
    {
      path: 'blank',
      component: ProfileBlankComponent,
      data: { title: 'Blank', breadcrumb: 'BLANK' }
    },
    {
      path: 'finances',
      loadChildren: () => import('./finances-overview/finances-overview.module').then(m => m.FinancesOverviewModule),
      data: { title: 'Finances', breadcrumb: 'Finances'}
    },
    {
      path: 'checkout',
      loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule),
      data: { title: 'Checkout', breadcrumb: 'Checkout'}
    },
    {
      path: 'manage-audio',
      loadChildren: () => import('./audio-manager/audio-manager.module').then(m => m.AudioManagerModule),
      data: { title: 'Audio Manager', breadcrumb: 'Audio Manager'}
    },
    {
      path: 'upload-audio',
      loadChildren: () => import('./file-upload/audio-upload.module').then(m => m.AudioUploadModule),
      data: { title: 'Upload Audio', breadcrumb: 'Upload Audio'}
    },
    {
      path: '**',
      redirectTo: 'overview'
    }
  ]
  }
];