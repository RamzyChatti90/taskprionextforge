import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { ITask } from 'app/shared/model/task.model';
import { TaskStatus } from 'app/shared/model/enumerations/task-status.model';
import { TaskDashboardService } from 'app/shared/util/task-dashboard.service'; // Assuming this service exists or will be created/adapted

@Component({
  selector: 'jhi-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  tasks: ITask[] = [];
  filteredTasks: ITask[] = [];
  currentFilter: TaskStatus | null = null;
  taskStatuses = Object.values(TaskStatus);
  isLoading = false;
  accountSubscription: Subscription | null = null;

  constructor(protected accountService: AccountService, protected taskDashboardService: TaskDashboardService) {}

  ngOnInit(): void {
    this.accountSubscription = this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      if (this.account) {
        this.loadTasks();
      } else {
        this.tasks = [];
        this.filteredTasks = [];
      }
    });
  }

  loadTasks(): void {
    if (!this.account) {
      return;
    }
    this.isLoading = true;
    this.taskDashboardService.getTasksForCurrentUser().subscribe({
      next: (res: HttpResponse<ITask[]>) => {
        this.tasks = res.body || [];
        this.applyFilter();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        // Log the error or show a user-friendly message
      },
    });
  }

  filterByStatus(status: TaskStatus | null): void {
    this.currentFilter = status;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.currentFilter) {
      this.filteredTasks = this.tasks.filter(task => task.status === this.currentFilter);
    } else {
      this.filteredTasks = [...this.tasks]; // Show all tasks if no filter is active
    }
  }

  refreshTasks(): void {
    this.loadTasks();
  }

  trackId(index: number, item: ITask): number {
    return item.id!;
  }

  ngOnDestroy(): void {
    if (this.accountSubscription) {
      this.accountSubscription.unsubscribe();
    }
  }
}