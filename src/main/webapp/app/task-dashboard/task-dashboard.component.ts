import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ITask } from 'app/entities/task/task.model';
import { TaskStatus } from 'app/shared/model/enumerations/task-status.model';
import { TaskDashboardService } from 'app/shared/util/task-dashboard.service';
import { Subscription, interval } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster'; // Or use JhiEventManager for alerts

@Component({
  selector: 'jhi-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.scss'],
})
export class TaskDashboardComponent implements OnInit, OnDestroy {
  tasks: ITask[] | null = null;
  isLoading = false;
  selectedStatus: TaskStatus | 'ALL' = 'ALL';
  taskStatuses = Object.values(TaskStatus);
  autoRefreshSubscription: Subscription | null = null;
  autoRefreshInterval = 60000; // 60 seconds

  constructor(protected taskDashboardService: TaskDashboardService, protected jhiAlertService: JhiAlertService) {}

  ngOnInit(): void {
    this.loadTasks();
    this.startAutoRefresh();
  }

  ngOnDestroy(): void {
    this.stopAutoRefresh();
  }

  loadTasks(): void {
    this.isLoading = true;
    const statusFilter = this.selectedStatus === 'ALL' ? undefined : this.selectedStatus;

    this.taskDashboardService.getUserTasks(statusFilter).subscribe(
      (res: HttpResponse<ITask[]>) => {
        this.isLoading = false;
        this.tasks = res.body ?? [];
        // Convert dueDate strings to dayjs objects if they are not already (JHipster usually handles this with DTOs and interceptors)
        this.tasks.forEach(task => {
          if (task.dueDate && typeof task.dueDate === 'string') {
            task.dueDate = dayjs(task.dueDate);
          }
        });
      },
      () => {
        this.isLoading = false;
        this.jhiAlertService.error('error.http.500', null, undefined);
      }
    );
  }

  onStatusChange(): void {
    this.loadTasks();
  }

  refreshTasks(): void {
    this.loadTasks();
    this.jhiAlertService.info('taskDashboard.refreshed', null, undefined);
  }

  startAutoRefresh(): void {
    this.stopAutoRefresh(); // Ensure no duplicate subscriptions
    this.autoRefreshSubscription = interval(this.autoRefreshInterval).subscribe(() => {
      this.refreshTasks();
    });
  }

  stopAutoRefresh(): void {
    if (this.autoRefreshSubscription) {
      this.autoRefreshSubscription.unsubscribe();
      this.autoRefreshSubscription = null;
    }
  }

  trackId(index: number, item: ITask): number {
    return item.id!;
  }

  // Helper to get bootstrap badge class based on status
  getStatusBadgeClass(status: TaskStatus | null | undefined): string {
    switch (status) {
      case TaskStatus.DONE:
        return 'badge-success';
      case TaskStatus.IN_PROGRESS:
        return 'badge-warning';
      case TaskStatus.TODO:
        return 'badge-info';
      default:
        return 'badge-secondary';
    }
  }
}