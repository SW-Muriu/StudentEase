import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { HttpHeadersService } from './architecture/shared/services/interceptors/http-headers.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: HttpHeadersService,
      multi: true
    }
  ]
};
