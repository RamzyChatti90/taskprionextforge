import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ITask } from 'app/shared/model/task.model';
import { TaskStatus } from 'app/shared/model/enumerations/task-status.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tasks');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  /**
   * Fetches tasks for the authenticated user's dashboard.
   * Optionally filters tasks by status.
   * The backend is expected to filter tasks by the currently authenticated user.
   *
   * @param status Optional TaskStatus to filter tasks.
   * @returns An Observable of HttpResponse containing an array of ITask.
   */
  getDashboardTasks(status?: TaskStatus): Observable<HttpResponse<ITask[]>> {
    const params: { [key: string]: string | number | boolean } = {};

    if (status) {
      // JHipster convention for filtering by enum field using 'equals'
      params['status.equals'] = status;
    }

    // The backend is expected to handle filtering by the current authenticated user
    // based on the security context of the API call.
    return this.http.get<ITask[]>(this.resourceUrl, { params, observe: 'response' });
  }
}