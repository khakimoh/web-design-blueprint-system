import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NAV_ITEMS } from '../../app.routes';
import { DesignTokens } from '../../core/services/design-tokens';
import { CodeSample } from '../../shared/components/code-sample/code-sample';

@Component({
  selector: 'pg-overview-page',
  imports: [RouterLink, CodeSample],
  templateUrl: './overview-page.html',
})
export default class OverviewPage {
  private readonly tokens = inject(DesignTokens);

  protected readonly sections = NAV_ITEMS.filter((item) => item.path !== '/overview');
  protected readonly stats = computed(() => [
    { label: 'Semantic colors', value: this.tokens.tokens('--ds-color-', { exclude: /-rgb$/ }).length },
    { label: 'Palette colors', value: this.tokens.tokens('--pg-palette-').length },
    { label: 'Spacing steps', value: this.tokens.tokens('--ds-space-').length },
    { label: 'Text roles', value: this.tokens.classNames('ds-type-').length },
  ]);

  protected readonly usage = `@use "abstracts" as ds;

.panel {
  padding: ds.space(6);
  border-radius: ds.radius("container");
  background: ds.color-token("surface");
  @include ds.media-up("md") { padding: ds.space(8); }
}`;
}
