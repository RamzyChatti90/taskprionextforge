import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'app/shared/shared.module';
import { TaskDashboardComponent } from './task-dashboard.component';

@NgModule({
  imports: [CommonModule, FormsModule, SharedModule],
  declarations: [TaskDashboardComponent],
  exports: [TaskDashboardComponent],
})
export class TaskDashboardModule {}