import { Routes } from '@angular/router';

/**
 * Top-level routes. Each feature is lazy-loaded from its own `<feature>.routes.ts`
 * (default export), so adding a feature means adding one entry here.
 */
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'items' },
  {
    path: 'items',
    title: 'Items',
    loadChildren: () => import('./features/placeholder-feature/placeholder-feature.routes'),
  },
  {
    path: '**',
    title: 'Page not found',
    loadComponent: () => import('./layout/not-found/not-found'),
  },
];
