import { Routes, RouterModule } from '@angular/router';
import { VideosComponent } from './videos.component';

const routes: Routes = [
  {
    path: '', component:  VideosComponent,
    data: {
      meta: {
        title: 'Cart title',
        override: true,
        description: 'Cart description'
      }
    },
  },
];

export const VideosRoutes = RouterModule.forChild(routes);
