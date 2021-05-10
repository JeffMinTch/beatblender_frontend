import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancesOverviewComponent } from './finances-overview.component';
import { FinancesOverviewRoutes } from './finances-overview.routing';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [FinancesOverviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(FinancesOverviewRoutes),
    SharedModule,
    NgxPaginationModule,
    FlexLayoutModule
  ]
})
export class FinancesOverviewModule { }
