import { Routes } from '@angular/router';

import { PlaceholderContainer } from './components/placeholder-container/placeholder-container';
import { ItemApi } from './services/item-api';
import { ItemStore } from './services/item-store';

/**
 * Feature routes (default export, lazy-loaded from app.routes.ts).
 * Feature-scoped services are provided here, not in app.config.ts.
 */
export default [
  {
    path: '',
    providers: [ItemApi, ItemStore],
    children: [{ path: '', component: PlaceholderContainer }],
  },
] satisfies Routes;
