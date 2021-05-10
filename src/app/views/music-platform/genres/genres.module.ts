import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenresComponent } from './genres.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GenresRoutes } from './genres.routing';



@NgModule({
  declarations: [GenresComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(GenresRoutes),
    FlexLayoutModule,
  ]
})
export class GenresModule { }
