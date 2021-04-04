import { Routes } from '@angular/router';
import { SampleMarketComponent } from './sample-market.component';
export const SampleMarketRoutes: Routes = [{
  path: '',
  component: SampleMarketComponent,
  // component: SampleMarketComponent,
  // children: [
  //   {
  //     path: 'market',
  //     component: SampleMarketComponent,
  //     data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses'}
  //   },
  // ]
  // {
  //   path: 'full-licenses',
  //   component: FullLicensesComponent,
  //   data: { title: 'Full Licenses', breadcrumb: 'Full Licenses'}
  // }, 
  // {
  //   path: 'how-it-works',
  //   component: HowItWorksComponent,
  //   data: { title: 'Cart', breadcrumb: 'How it works'}
  // }
  //   {
  //     path: 'upload-samples',
  //     component: CheckoutComponent,
  //     data: { title: 'Checkout', breadcrumb: 'CHECKOUT' }
  //   }
  // ]
}]