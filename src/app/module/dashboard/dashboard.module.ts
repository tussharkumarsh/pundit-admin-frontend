import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';

@NgModule({
  imports: [DashboardRoutes],
  declarations: [DashboardComponent],
  
})
export class DashboardModule { }
