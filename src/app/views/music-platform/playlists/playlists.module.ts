import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistsComponent } from './playlists.component';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { PlaylistsRoutes } from './playlists.routing'

@NgModule({
  declarations: [PlaylistsComponent],
  imports: [
    // CommonModule,
    SharedModule,
    RouterModule.forChild(PlaylistsRoutes),
    FlexLayoutModule
    // NgxPaginationModule
  ]
})
export class PlaylistsModule { }
