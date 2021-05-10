import { SearchbarComponent } from './../../../shared/components/searchbar/searchbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'app/shared/shared.module';
import { RouterEvent, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindComponent } from './find.component';
import { FindRoutes } from './find.routing';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [FindComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(FindRoutes),
    FlexLayoutModule,
    NgxPaginationModule,
    

  ]
})
export class FindModule { }
