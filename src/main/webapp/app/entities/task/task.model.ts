import dayjs from 'dayjs';
import { IUser } from 'app/entities/user/user.model';
import { TaskStatus } from 'app/shared/model/enumerations/task-status.model';

export interface ITask {
  id?: number;
  title?: string;
  description?: string | null;
  status?: TaskStatus | null;
  dueDate?: dayjs.Dayjs | null;
  assignedTo?: IUser | null;
}

export class Task implements ITask {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string | null,
    public status?: TaskStatus | null,
    public dueDate?: dayjs.Dayjs | null,
    public assignedTo?: IUser | null
  ) {}
}

export function getTaskIdentifier(task: ITask): number | undefined {
  return task.id;
}