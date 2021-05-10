import { NgxPaginationModule } from 'ngx-pagination';
import { AudioManagerRoutes } from './audio-manager.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioManagerComponent } from './audio-manager.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AudioManagerComponent],
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    RouterModule.forChild(AudioManagerRoutes),
    NgxPaginationModule
  ]
})
export class AudioManagerModule { }
