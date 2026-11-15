import { Component, computed, inject } from '@angular/core';

import { DesignTokens } from '../../core/services/design-tokens';

@Component({
  selector: 'pg-spacing-page',
  templateUrl: './spacing-page.html',
  styleUrl: './spacing-page.scss',
})
export default class SpacingPage {
  private readonly tokens = inject(DesignTokens);

  protected readonly spaces = computed(() => this.tokens.tokens('--ds-space-'));
  protected readonly radii = computed(() => this.tokens.tokens('--ds-radius-'));
  protected readonly shadows = computed(() => this.tokens.tokens('--ds-shadow-').filter((s) => s.name !== 'none'));
  protected readonly controls = computed(() => this.tokens.tokens('--ds-control-height-'));
  protected readonly layers = computed(() => this.tokens.tokens('--ds-z-'));
  protected readonly durations = computed(() => this.tokens.tokens('--ds-duration-'));
  protected readonly easings = computed(() => this.tokens.tokens('--ds-easing-'));
}
