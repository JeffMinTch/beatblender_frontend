import { MusicPlatformComponent } from './music-platform.component';
import { Routes } from '@angular/router';


export const MusicPlatformRoutes: Routes = [
  {
    path: '',
    redirectTo: 'find',
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
      },
      {
        path: 'playlists',
        loadChildren: () => import('./playlists/playlists.module').then(m => m.PlaylistsModule),
        data: { title: 'Playlists', breadcrumb: 'Playlists' }
      },
      {
        path: 'playlists/:id',
        loadChildren: () => import('./playlist-detail/playlist-detail.module').then(m => m.PlaylistDetailModule),
        data: { title: 'Playlist', breadcrumb: 'Playlist' }
      },
      {
        path: 'genres',
        loadChildren: () => import('./genres/genres.module').then(m => m.GenresModule),
        data: { title: 'Genres', breadcrumb: 'Genres' }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'find'
  }
];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class MusicPlatformRoutingModule { }
