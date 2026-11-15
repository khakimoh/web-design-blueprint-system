import { Component, computed, inject } from '@angular/core';

import { DesignTokens } from '../../core/services/design-tokens';

@Component({
  selector: 'pg-typography-page',
  templateUrl: './typography-page.html',
  styleUrl: './typography-page.scss',
})
export default class TypographyPage {
  private readonly tokens = inject(DesignTokens);

  protected readonly roles = computed(() => this.tokens.classNames('ds-type-').map((c) => c.replace('ds-type-', '')));
  protected readonly families = computed(() => this.tokens.tokens('--ds-font-family-'));
  protected readonly sizes = computed(() => this.tokens.tokens('--ds-font-size-'));
  protected readonly weights = computed(() => this.tokens.tokens('--ds-font-weight-'));
  protected readonly lineHeights = computed(() => this.tokens.tokens('--ds-line-height-'));
}
