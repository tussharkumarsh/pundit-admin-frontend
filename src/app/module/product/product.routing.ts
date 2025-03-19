import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';

const routes: Routes = [
  {
    path: '', component:  ProductComponent,
    data: {
      meta: {
        title: 'Cart title',
        override: true,
        description: 'Cart description'
      }
    },
  },
];

export const ProductRoutes = RouterModule.forChild(routes);
