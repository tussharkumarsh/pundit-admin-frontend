import { Routes, RouterModule } from '@angular/router';
import { PromotionComponent } from './promotion.component';

const routes: Routes = [
  {
    path: '', component:  PromotionComponent,
    data: {
      meta: {
        title: 'Cart title',
        override: true,
        description: 'Cart description'
      }
    },
  },
];

export const PromotionRoutes = RouterModule.forChild(routes);
