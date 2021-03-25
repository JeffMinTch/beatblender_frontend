import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),
    data: { title: 'Choose A Demo' }
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule),
        data: { title: 'Session'}
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'sample-market',
        loadChildren: () => import('./views/sample-licensing-market/sample-licensing-market.module').then(m => m.SampleLicensingMarketModule),
        data: { title: 'Sample Market ', breadcrumb: 'Get Sample Licenses'}
      },
      {
        path: 'music',
        loadChildren: () => import('./views/music-platform/music-platform.module').then(m => m.MusicPlatformModule),
        data: { title: 'All Music', breadcrumb: 'All Music'}
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];

