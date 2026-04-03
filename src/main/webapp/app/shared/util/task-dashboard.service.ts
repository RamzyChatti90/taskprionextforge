import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ITask } from 'app/entities/task/task.model';
import { TaskStatus } from 'app/shared/model/enumerations/task-status.model';

@Injectable({ providedIn: 'root' })
export class TaskDashboardService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tasks/user-tasks');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  getUserTasks(status?: TaskStatus): Observable<HttpResponse<ITask[]>> {
    let params = new HttpParams();
    if (status) {
      params = params.append('status', status);
    }
    // JHipster's default pagination for list endpoints is page=0&size=20&sort=id,asc
    // For a dashboard, we might want to fetch more or customize. Let's assume a reasonable default or no pagination for now.
    // Or add page, size, sort parameters if needed.
    params = params.append('size', '100'); // Fetch up to 100 tasks for the dashboard
    params = params.append('sort', 'dueDate,asc'); // Sort by due date

    return this.http.get<ITask[]>(this.resourceUrl, { params, observe: 'response' });
  }
}