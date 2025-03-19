import { Routes, RouterModule } from '@angular/router';
import { BannerComponent } from './banner.component';

const routes: Routes = [
  {
    path: '', component:  BannerComponent,
    data: {
      meta: {
        title: 'Cart title',
        override: true,
        description: 'Cart description'
      }
    },
  },
];

export const BannerRoutes = RouterModule.forChild(routes);
