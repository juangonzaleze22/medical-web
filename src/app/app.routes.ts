import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
      path: '',
      loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
      pathMatch: 'full' 
    },
    {
      path: 'login',
      loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    },
    {
      path: 'register',
      loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
    },
    {
      path: 'dashboard',
      canActivate: [authGuard],
      loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    },
    // Add Not Found Route (optional)
    { path: '**', redirectTo: '/not-found' },  // Wildcard for any unmatched routes
    { path: '', pathMatch: 'full', redirectTo: '/' } // Default path to redirect to
];

