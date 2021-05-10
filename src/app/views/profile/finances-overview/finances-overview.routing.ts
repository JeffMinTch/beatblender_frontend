import { CheckoutComponent } from './../checkout/checkout.component';
import { Routes } from '@angular/router';
import { FinancesOverviewComponent } from './finances-overview.component';


export const FinancesOverviewRoutes: Routes = [
  {
    path: '',
    component: FinancesOverviewComponent,
  }

  // {
  //   path: '',
  //   component: FinancesOverviewComponent,
  //   children: [{
  //     path: 'checkout',
  //     component: CheckoutComponent,
  //     data: { title: 'Checkout', breadcrumb: 'Checkout' }
  //   }, 
  //   // {
  //   //   path: 'settings',
  //   //   component: ProfileSettingsComponent,
  //   //   data: { title: 'Settings', breadcrumb: 'SETTINGS' }
  //   // }, 
  //   // {
  //   //   path: 'blank',
  //   //   component: ProfileBlankComponent,
  //   //   data: { title: 'Blank', breadcrumb: 'BLANK' }
  //   // },
  //   // {
  //   //   path: 'finances',
  //   //   loadChildren: () => import('./finances-overview/finances-overview.module').then(m => m.FinancesOverviewModule),
  //   //   data: { title: 'Finances', breadcrumb: 'Finances'}
  //   // },
  //   // {
  //   //   path: '**',
  //   //   redirectTo: 'overview'
  //   // }
  
  // ]
  // }
]