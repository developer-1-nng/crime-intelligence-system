import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/case-list/case-list.component').then(
        (c) => c.CaseListComponent,
      ),
  },

  {
    path: 'case/:caseId',
    loadComponent: () =>
      import('./pages/case-detail/case-detail.component').then(
        (c) => c.CaseDetailComponent,
      ),
  },

  {
    path: 'suspect/:suspectId',
    loadComponent: () =>
      import('./pages/suspect-tracker/suspect-tracker.component').then(
        (m) => m.SuspectTrackerComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
