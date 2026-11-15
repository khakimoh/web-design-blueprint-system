import { Routes } from '@angular/router';

import { NavItem } from './shared/models/nav-item.model';

/** Showcase sections, in sidebar order. Each section is a lazy-loaded feature. */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Overview', path: '/overview', description: 'What the design system is and how it is structured.' },
  { label: 'Colors', path: '/colors', description: 'Semantic colors, primitive palettes and live contrast checks.' },
  { label: 'Typography', path: '/typography', description: 'Font families, type scale and text roles.' },
  { label: 'Spacing', path: '/spacing', description: 'Spacing scale, radius, elevation, z-index and motion.' },
  { label: 'UI Components', path: '/components', description: 'Buttons, badges, alerts, cards, navigation, tables, dialogs.' },
  { label: 'Forms', path: '/forms', description: 'Controls, validation states and accessible error handling.' },
  { label: 'Layout and Grid', path: '/layout', description: 'Breakpoints, containers, grid and layout primitives.' },
  { label: 'Light/Dark Theme', path: '/themes', description: 'Theme switching and side-by-side theme previews.' },
  { label: 'RTL/LTR', path: '/direction', description: 'Bidirectional layout with logical properties and RTLCSS.' },
];

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'overview' },
  { path: 'overview', title: 'Overview', loadComponent: () => import('./features/overview/overview-page') },
  { path: 'colors', title: 'Colors', loadComponent: () => import('./features/colors/colors-page') },
  { path: 'typography', title: 'Typography', loadComponent: () => import('./features/typography/typography-page') },
  { path: 'spacing', title: 'Spacing', loadComponent: () => import('./features/spacing/spacing-page') },
  { path: 'components', title: 'UI Components', loadComponent: () => import('./features/ui-components/ui-components-page') },
  { path: 'forms', title: 'Forms', loadComponent: () => import('./features/forms/forms-page') },
  { path: 'layout', title: 'Layout and Grid', loadComponent: () => import('./features/layout-grid/layout-grid-page') },
  { path: 'themes', title: 'Light/Dark Theme', loadComponent: () => import('./features/theming/theming-page') },
  { path: 'direction', title: 'RTL/LTR', loadComponent: () => import('./features/direction/direction-page') },
  { path: '**', title: 'Not found', loadComponent: () => import('./features/not-found/not-found-page') },
];
