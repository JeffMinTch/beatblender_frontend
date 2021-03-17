import { DocumentationComponent } from './documentation.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { Routes } from '@angular/router';
export const DocsRoutes: Routes = [{
  path: '',
  component: DocumentationComponent,
  children: [
    {
      path: 'introduction',
      component: IntroductionComponent,
      // data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses'}
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