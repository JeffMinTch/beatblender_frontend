import { FlexLayoutModule } from '@angular/flex-layout';
import { MusicPlatformComponent } from './music-platform.component';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MusicPlatformRoutes } from './music-platform.routing';


@NgModule({
  declarations: [MusicPlatformComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(MusicPlatformRoutes),
    SharedModule,
    FlexLayoutModule
  ],
})
export class MusicPlatformModule { }
