import { Routes, RouterModule } from '@angular/router';
import { PokerroomsComponent } from './pokerrooms.component';

const routes: Routes = [
  {
    path: '', component:  PokerroomsComponent,
    data: {
      meta: {
        title: 'Cart title',
        override: true,
        description: 'Cart description'
      }
    },
  },
];

export const PokerroomsRoutes = RouterModule.forChild(routes);
