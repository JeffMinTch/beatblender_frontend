import { ArtistCardComponent } from './../../../shared/components/artist-card/artist-card.component';
import { AllMusicRoutes } from './all-music.routing';
import { SharedModule } from './../../../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllMusicComponent } from './all-music.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AllMusicComponent, ArtistCardComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(AllMusicRoutes),
    SharedModule
  ]
})
export class AllMusicModule { }
