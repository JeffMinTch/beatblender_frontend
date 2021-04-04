import { ExtendedLicensesComponent } from './extended-licenses/extended-licenses.component';
import { BasicLicensesComponent } from './basic-licenses/basic-licenses.component';
import { MyLicensesComponent } from './my-licenses.component';
import { Routes } from '@angular/router';
export const MyLicensesRoutes: Routes = [{
  path: '',
//   component: DocumentationComponent,
  children: [
    {
      path: 'basic-licenses',
      component: BasicLicensesComponent,
      data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses'}
    },
    {
      path: 'extended-licenses',
      component: ExtendedLicensesComponent,
      data: { title: 'Extended Licenses', breadcrumb: 'Extended Licenses'}
    },
  ]
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