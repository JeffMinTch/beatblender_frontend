import { SharedModule } from 'app/shared/shared.module';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { SampleMarketRoutes } from './sample-market.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
import { SampleMarketComponent } from './sample-market.component';

import { RouterModule } from '@angular/router';
// import { SharedModule } from 'app/shared/shared.moduke';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [SampleMarketComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(SampleMarketRoutes),
    FlexLayoutModule,
    SharedModule,
    NgxPaginationModule
    // PaginatePipe
    // NgxPaginationModule,

    // PaginatePipe
  ],
})
export class SampleMarketModule { }
