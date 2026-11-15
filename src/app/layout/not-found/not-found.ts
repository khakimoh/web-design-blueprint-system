import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { EmptyState } from '../../shared/components/empty-state/empty-state';

/** Wildcard-route page. Default export so the route can lazy-load it. */
@Component({
  selector: 'app-not-found',
  imports: [EmptyState, RouterLink],
  template: `
    <app-empty-state [headingLevel]="1" title="Page not found" description="The address may be mistyped, or the page may have moved.">
      <a emptyStateActions class="btn btn-primary" routerLink="/">Go to the start page</a>
    </app-empty-state>
  `,
})
export default class NotFound {}
