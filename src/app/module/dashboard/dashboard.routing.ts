import {  DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component:  DashboardComponent,
    data: {
      meta: {
        title: 'Cart title',
        override: true,
        description: 'Cart description'
      }
    },
  },
];

export const DashboardRoutes = RouterModule.forChild(routes);
