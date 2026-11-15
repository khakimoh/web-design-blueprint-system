import { InjectionToken, Provider } from '@angular/core';

/** Runtime configuration. Values differ per deployment, never per build. */
export interface AppConfig {
  /** Base URL of the backend API, without a trailing slash. */
  readonly apiBaseUrl: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

/**
 * Validates and provides the runtime configuration. Fails fast with a clear
 * message instead of letting a missing value surface later as a 404.
 */
export function provideAppConfig(config: AppConfig): Provider {
  if (!config.apiBaseUrl) {
    throw new Error('AppConfig.apiBaseUrl is required.');
  }
  const normalized: AppConfig = Object.freeze({
    apiBaseUrl: config.apiBaseUrl.replace(/\/+$/, ''),
  });
  return { provide: APP_CONFIG, useValue: normalized };
}
