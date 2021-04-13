import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routing';
import { AppLoaderComponent } from 'app/shared/services/app-loader/app-loader.component';





@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PerfectScrollbarModule,
    RouterModule.forChild(HomeRoutes)
  ],
  declarations: [HomeComponent],
  
})
export class HomeModule { }
