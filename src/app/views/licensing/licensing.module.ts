import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { StarRatingModule } from 'angular-star-rating';
import { SharedModule } from '../../shared/shared.module';
import {LicensingRoutes } from './licensing.routing';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { FullLicensesComponent } from './full-licenses/full-licenses.component';
import { BasicLicenseSidenavComponent } from './sample-market/basic-license-sidenav/basic-license-sidenav.component';
import { LicensingComponent } from './licensing/licensing.component';


@NgModule({
  imports: [
    CommonModule,
    // BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    StarRatingModule.forRoot(),
    NgxDatatableModule,
    RouterModule.forChild(LicensingRoutes),
    SharedModule,
    
  ],
  // exports: [
  //   NgxPaginationModule
  // ],
  declarations: [HowItWorksComponent, FullLicensesComponent, BasicLicenseSidenavComponent, LicensingComponent],
  providers: [
  ]
})
export class LicensingModule {

}
