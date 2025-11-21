import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { authInterceptor } from './core/interceptors/auth';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getPtBrPaginatorIntl } from './shared/mat-paginator-intl-pt';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(FontAwesomeModule),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    { provide: MatPaginatorIntl, useValue: getPtBrPaginatorIntl() }
  ]
};
