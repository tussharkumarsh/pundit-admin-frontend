import { Routes, RouterModule } from '@angular/router';
import { VerticalComponent } from './vertical/vertical.component';

const routes: Routes = [
  {
    path: '', component: VerticalComponent,
    children: [
      {
        path: 'dashboard', loadChildren: () => import('../module/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'loginuserprofile', loadChildren: () => import('../module/login-user-profile/login-user-profile.module').then(m => m.LoginUserProfileModule)
      },
      {
        path: 'news', loadChildren: () => import('../module/news/news.module').then(m => m.NewsModule)
      },   
      {
        path: 'videos', loadChildren: () => import('../module/videos/videos.module').then(m => m.VideosModule)
      },  
      {
        path: 'websites', loadChildren: () => import('../module/websites/websites.module').then(m => m.WebsitesModule)
      },  
      {
        path: 'product', loadChildren: () => import('../module/product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'banner', loadChildren: () => import('../module/banner/banner.module').then(m => m.BannerModule)
      },
      {
        path: 'tournament', loadChildren: () => import('../module/tournament/tournament.module').then(m => m.TournamentModule)
      },
      {
        path: 'advertising', loadChildren: () => import('../module/advertising/advertising.module').then(m => m.AdvertisingModule)
      },
      {
        path: 'pokerrooms', loadChildren: () => import('../module/poker_rooms/pokerrooms.module').then(m => m.PokerroomsModule)
      },
      {
        path: 'toppromotions', loadChildren: () => import('../module/toppromotions/toppromotions.module').then(m => m.ToppromotionsModule)
      },
      {
        path: 'promotion', loadChildren: () => import('../module/promotion/promotion.module').then(m => m.PromotionModule)
      },    
      {
        path: 'type-heading', loadChildren: () => import('../module/type-heading/type-heading.module').then(m => m.TypeHeadingModule)
      },            
      
      
    ]
  },
];

export const LayoutRoutes = RouterModule.forChild(routes);
