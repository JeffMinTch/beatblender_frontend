import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistDetailComponent } from './playlist-detail.component';
import { PlaylistDetailRoutes } from './playlist-detail.routing';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [PlaylistDetailComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(PlaylistDetailRoutes),
    NgxPaginationModule,
    FlexLayoutModule
  ]
})
export class PlaylistDetailModule { }
