import { Routes, RouterModule } from '@angular/router';
import { AdvertisingComponent } from './advertising.component';

const routes: Routes = [
  {
    path: '', component:  AdvertisingComponent,
    data: {
      meta: {
        title: 'Cart title',
        override: true,
        description: 'Cart description'
      }
    },
  },
];

export const AdvertisingRoutes = RouterModule.forChild(routes);
