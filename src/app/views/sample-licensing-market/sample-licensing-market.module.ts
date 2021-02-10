import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { StarRatingModule } from 'angular-star-rating';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import {SampleLicensingMarketRoutes } from './sample-licensing-market.routing';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { BasicLicensesComponent } from './basic-licenses/basic-licenses.component';
import { FullLicensesComponent } from './full-licenses/full-licenses.component';
import { BasicLicenseSidenavComponent } from './basic-licenses/basic-license-sidenav/basic-license-sidenav.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    StarRatingModule.forRoot(),
    NgxPaginationModule,
    NgxDatatableModule,
    RouterModule.forChild(SampleLicensingMarketRoutes),
    SharedModule,
  ],
  declarations: [HowItWorksComponent, BasicLicensesComponent, FullLicensesComponent, BasicLicenseSidenavComponent],
  providers: [
  ]
})
export class SampleLicensingMarketModule {

}
