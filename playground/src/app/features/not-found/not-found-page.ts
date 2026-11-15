import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pg-not-found-page',
  imports: [RouterLink],
  template: `
    <section class="ds-empty-state" aria-labelledby="nf-title">
      <h1 class="ds-empty-state__title" id="nf-title">Page not found</h1>
      <p class="ds-empty-state__description">This section does not exist in the playground.</p>
      <div class="ds-empty-state__actions">
        <a class="btn btn-primary" routerLink="/overview">Go to the overview</a>
      </div>
    </section>
  `,
})
export default class NotFoundPage {}
