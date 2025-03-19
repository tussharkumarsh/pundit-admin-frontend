import { Routes, RouterModule } from '@angular/router';
import { TypeHeadingComponent } from './type-heading.component';

const routes: Routes = [
  {
    path: '', component:  TypeHeadingComponent,
    data: {
      meta: {
        title: 'Cart title',
        override: true,
        description: 'Cart description'
      }
    },
  },
];

export const TypeHeadingRoutes = RouterModule.forChild(routes);
