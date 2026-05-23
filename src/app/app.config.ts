import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import {
  LucideAngularModule,
  Search,
  Database,
  Activity,
  CircleCheckBig,
  TriangleAlert,
  ArrowLeft,
  ChevronRight,
} from 'lucide-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom(
      LucideAngularModule.pick({
        Search,
        Database,
        Activity,
        TriangleAlert,
        CircleCheckBig,
        ArrowLeft,
        ChevronRight,
      }),
    ),
  ],
};
