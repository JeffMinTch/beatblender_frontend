import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllMusicComponent } from './all-music/all-music.component';


export const MusicPlatformRoutes: Routes = [
  {
    path: '',
  children: [
      {
    path: 'all-music',
    component: AllMusicComponent,
    data: { title: 'All Music', breadcrumb: 'All Music'}
  }
  ]}
];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class MusicPlatformRoutingModule { }
