import { AllMusicComponent } from './all-music.component';
import { AllMusicModule } from './all-music.module';
import { Routes } from '@angular/router';


export const AllMusicRoutes: Routes = [
  
  {
    path: '',
    component: AllMusicComponent
//   children: [
//       {
//     path: 'all-music',
//     component: AllMusicComponent,
//     data: { title: 'All Music', breadcrumb: 'All Music'}
//   },
//   {
//     path: 'all-music',
//     loadChildren: () => import('./all-music/all-music.module.ts').then(m => m.AllMusicModule),
//     data: { title: 'Sample Market ', breadcrumb: 'Get Sample Licenses'}
  },
//   ]}
];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class MusicPlatformRoutingModule { }
