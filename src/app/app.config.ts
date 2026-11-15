import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideAppConfig } from './core/config/app-config';
import { httpErrorInterceptor } from './core/interceptors/http-error-interceptor';

/**
 * Application-wide providers. Feature-specific providers belong in the
 * feature's route definition, not here.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
    ),
    provideHttpClient(withFetch(), withInterceptors([httpErrorInterceptor])),
    // Static default for local development. In deployed builds, load the
    // runtime configuration before bootstrapping (see core/config/README.md).
    provideAppConfig({ apiBaseUrl: '/api' }),
  ],
};
