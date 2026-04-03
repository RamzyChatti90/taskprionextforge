import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ITask } from 'app/entities/task/task.model';
import { TaskStatus } from 'app/shared/model/enumerations/task-status.model';

@Injectable({
  providedIn: 'root',
})
export class UserDashboardService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tasks');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  /**
   * Retrieves tasks assigned to the current authenticated user, with optional status filtering.
   *
   * @param status Optional TaskStatus to filter tasks.
   * @returns An Observable emitting an array of ITask.
   */
  getTasksForCurrentUser(status?: TaskStatus): Observable<ITask[]> {
    let params = new HttpParams();

    // Assuming the backend provides a mechanism to filter tasks for the current user,
    // for example, a query parameter 'assignedToCurrentUser=true'.
    params = params.append('assignedToCurrentUser', 'true');

    if (status) {
      params = params.append('status', status);
    }

    return this.http.get<ITask[]>(this.resourceUrl, { params });
  }
}