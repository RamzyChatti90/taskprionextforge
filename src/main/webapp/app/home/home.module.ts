import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { TaskDashboardModule } from 'app/task-dashboard/task-dashboard.module'; // Import the new module

@NgModule({
  imports: [SharedModule, RouterModule.forChild([HOME_ROUTE]), TaskDashboardModule], // Add TaskDashboardModule here
  declarations: [HomeComponent],
})
export class HomeModule {}