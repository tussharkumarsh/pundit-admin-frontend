import { Routes, RouterModule } from '@angular/router';
import { WebsitesComponent } from './websites.component';

const routes: Routes = [
  {
    path: '', component:  WebsitesComponent,
    data: {
      meta: {
        title: 'Cart title',
        override: true,
        description: 'Cart description'
      }
    },
  },
];

export const WebsitesRoutes = RouterModule.forChild(routes);
