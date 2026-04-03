import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ITask } from 'app/shared/model/task.model';
import { TaskStatus } from 'app/shared/model/enumerations/task-status.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tasks');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  /**
   * Fetches tasks for the current user, optionally filtered by status.
   * This method assumes the backend handles filtering tasks by the authenticated user
   * (e.g., through a security context or a dedicated endpoint like `/api/my-tasks`).
   * If not, a 'assignedTo.login.equals' parameter would typically be added here.
   *
   * @param status Optional TaskStatus to filter tasks.
   * @returns An Observable of HttpResponse containing an array of ITask.
   */
  getTasksForCurrentUser(status?: TaskStatus): Observable<HttpResponse<ITask[]>> {
    let params = new HttpParams();

    if (status) {
      params = params.set('status.equals', status);
    }

    // In a typical JHipster setup with TaskResource, the 'getAllTasks' method can be filtered
    // by various criteria. For tasks assigned to the current user, the backend
    // might either have a specific endpoint or expect a filter like 'assignedTo.login.equals=currentUserLogin'.
    // For this dashboard, we assume the backend (from the parent ticket) is configured to
    // return tasks for the authenticated user by default when no 'assignedTo' filter is provided,
    // or that it will correctly interpret the request in the context of the user's session.
    // If a specific `assignedTo.equals` filter is required from the frontend,
    // the AccountService would be injected to get the current user's login.

    return this.http.get<ITask[]>(this.resourceUrl, { params, observe: 'response' });
  }
}