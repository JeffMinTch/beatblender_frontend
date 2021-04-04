import { MusicPlatformComponent } from './music-platform.component';
import { Routes } from '@angular/router';


export const MusicPlatformRoutes: Routes = [
  {
    path: '',
    redirectTo: 'all-music',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MusicPlatformComponent,
    // pathMatch: 'full',
    // redirectTo: 'listen/all-music',
    children: [
      //     {
      //   path: 'all-music',
      //   component: AllMusicComponent,
      //   data: { title: 'All Music', breadcrumb: 'All Music'}
      // },
      {
        path: 'all-music',
        loadChildren: () => import('./all-music/all-music.module').then(m => m.AllMusicModule),
        data: { title: 'All Music', breadcrumb: 'All Music' }
      },
      {
        path: 'find',
        loadChildren: () => import('./find/find.module').then(m => m.FindModule),
        data: { title: 'Find', breadcrumb: 'Find' }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'all-music'
  }
];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class MusicPlatformRoutingModule { }
