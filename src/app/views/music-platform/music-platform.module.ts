import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllMusicComponent } from './all-music/all-music.component';
import { RouterModule } from '@angular/router';
import { MusicPlatformRoutes } from './music-platform-routing.module';


@NgModule({
  declarations: [AllMusicComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(MusicPlatformRoutes),
    SharedModule
  ]
})
export class MusicPlatformModule { }
