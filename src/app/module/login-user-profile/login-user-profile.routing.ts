import { LoginUserProfileComponent } from './login-user-profile.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: LoginUserProfileComponent,
    data: {
      meta: {
        title: 'Home title',
        override: true,
        description: 'Home description'
      }
    },
  },
];

export const LoginUserProfileRoutes = RouterModule.forChild(routes);
