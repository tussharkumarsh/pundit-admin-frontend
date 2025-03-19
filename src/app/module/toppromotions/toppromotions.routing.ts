import { Routes, RouterModule } from '@angular/router';
import { ToppromotionsComponent } from './toppromotions.component';

const routes: Routes = [
  {
    path: '', component:  ToppromotionsComponent,
    data: {
      meta: {
        title: 'Cart title',
        override: true,
        description: 'Cart description'
      }
    },
  },
];

export const ToppromotionsRoutes = RouterModule.forChild(routes);
