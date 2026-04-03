import dayjs, { Dayjs } from 'dayjs';
import { IUser } from 'app/entities/user/user.model';
import { TaskStatus } from 'app/shared/model/enumerations/task-status.model';
import { TaskPriority } from 'app/shared/model/enumerations/task-priority.model'; // Added based on diagnostic
import { ICategory } from 'app/entities/category/category.model'; // Added based on diagnostic

export interface ITask {
  id?: number;
  title?: string;
  description?: string | null;
  status?: TaskStatus | null;
  priority?: TaskPriority | null; // Added based on diagnostic
  dueDate?: Dayjs | null;
  createdAt?: Dayjs | null; // Added based on diagnostic
  assignee?: IUser | null; // Renamed from 'assignedTo' to 'assignee' as per error
  category?: ICategory | null; // Added based on diagnostic
}

export class Task implements ITask {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string | null,
    public status?: TaskStatus | null,
    public priority?: TaskPriority | null, // Added
    public dueDate?: Dayjs | null,
    public createdAt?: Dayjs | null, // Added
    public assignee?: IUser | null, // Renamed
    public category?: ICategory | null // Added
  ) {}
}

export function getTaskIdentifier(task: ITask): number | undefined {
  return task.id;
}