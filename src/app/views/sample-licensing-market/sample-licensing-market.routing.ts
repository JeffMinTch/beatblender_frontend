import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { FullLicensesComponent } from './full-licenses/full-licenses.component';
import { Routes } from '@angular/router';
import { BasicLicensesComponent } from './basic-licenses/basic-licenses.component';
// import { ProductsComponent } from './products/products.component';
// import { ProductDetailsComponent } from './product-details/product-details.component';
// import { CartComponent } from './cart/cart.component';
// import { CheckoutComponent } from './checkout/checkout.component';

export const SampleLicensingMarketRoutes: Routes = [
  {
  path: '',
  children: [
      {
    path: 'basic-licenses',
    component: BasicLicensesComponent,
    data: { title: 'Basic Licenses', breadcrumb: 'Basic Licenses'}
  }, 
  {
    path: 'full-licenses',
    component: FullLicensesComponent,
    data: { title: 'Full Licenses', breadcrumb: 'Full Licenses'}
  }, 
  {
    path: 'how-it-works',
    component: HowItWorksComponent,
    data: { title: 'Cart', breadcrumb: 'How it works'}
  }
//   {
//     path: 'upload-samples',
//     component: CheckoutComponent,
//     data: { title: 'Checkout', breadcrumb: 'CHECKOUT' }
//   }
]
}]