import { Routes, RouterModule } from '@angular/router';
import { TournamentComponent } from './tournament.component';

const routes: Routes = [
  {
    path: '', component:  TournamentComponent,
    data: {
      meta: {
        title: 'Cart title',
        override: true,
        description: 'Cart description'
      }
    },
  },
];

export const TournamentRoutes = RouterModule.forChild(routes);
