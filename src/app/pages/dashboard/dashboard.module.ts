import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { isAdminGuard } from '../../guards/is-admin.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'calendary',
        loadComponent: () => import('./calendary/calendary.component').then(m => m.CalendaryComponent),
      },
      {
        path: 'requests',
        canActivate: [isAdminGuard],
        loadComponent: () => import('./requests/requests.component').then(m => m.RequestsComponent),
      },
      {
        path: 'my-cites',
        loadComponent: () => import('./requests/requests.component').then(m => m.RequestsComponent),
      },
      {
        path: 'confirmed',
        canActivate: [isAdminGuard],
        loadComponent: () => import('./confirmed/confirmed.component').then(m => m.ConfirmedComponent),
      },
      {
        path: 'not-found',
        loadComponent: () => import('./not-found/not-found.component').then(m => m.NotFoundComponent),
      },
     
      { path: '', pathMatch: 'full', redirectTo: '/dashboard/home' }, // Default path to redirect to
      { path: '**', redirectTo: 'not-found' },  // Wildcard for any unmatched routes
    ]
  },
];

@NgModule({
  declarations: [

  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NavbarComponent,
    SidebarComponent
  ],
  exports: [ 
    RouterModule
  ]
})
export class DashboardModule { }
