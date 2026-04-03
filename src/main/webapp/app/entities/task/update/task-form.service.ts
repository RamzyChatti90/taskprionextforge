// === src/main/webapp/app/entities/task/update/task-form.service.ts ===
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ITask, NewTask } from '../task.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITask for edit and NewTaskFormGroupInput for create.
 */
type TaskFormGroupInput = ITask | PartialWithRequiredKeyOf<NewTask>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ITask | NewTask> = Omit<T, 'createdAt'> & {
  createdAt?: string | null;
};

type TaskFormRawValue = FormValueOf<ITask>;

// Corrected: Ensure NewTaskFormRawValue explicitly includes 'id: null'
// This addresses the TS2344 error by making NewTaskFormRawValue compatible with the '{ id: unknown }' constraint.
type NewTaskFormRawValue = FormValueOf<NewTask> & { id: null };

type TaskFormDefaults = Pick<NewTask, 'id' | 'createdAt'>;

type TaskFormGroupContent = {
  id: FormControl<TaskFormRawValue['id'] | NewTask['id']>;
  title: FormControl<TaskFormRawValue['title']>;
  description: FormControl<TaskFormRawValue['description']>;
  priority: FormControl<TaskFormRawValue['priority']>;
  status: FormControl<TaskFormRawValue['status']>;
  dueDate: FormControl<TaskFormRawValue['dueDate']>;
  createdAt: FormControl<TaskFormRawValue['createdAt']>;
  assignee: FormControl<TaskFormRawValue['assignee']>;
  category: FormControl<TaskFormRawValue['category']>;
};

export type TaskFormGroup = FormGroup<TaskFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TaskFormService {
  createTaskFormGroup(task: TaskFormGroupInput = { id: null }): TaskFormGroup {
    const taskRawValue = this.convertTaskToTaskRawValue({
      ...this.getFormDefaults(),
      ...task,
    });
    return new FormGroup<TaskFormGroupContent>({
      id: new FormControl(
        { value: taskRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      title: new FormControl(taskRawValue.title, {
        validators: [Validators.required],
      }),
      description: new FormControl(taskRawValue.description),
      priority: new FormControl(taskRawValue.priority, {
        validators: [Validators.required],
      }),
      status: new FormControl(taskRawValue.status, {
        validators: [Validators.required],
      }),
      dueDate: new FormControl(taskRawValue.dueDate),
      createdAt: new FormControl(taskRawValue.createdAt, {
        validators: [Validators.required],
      }),
      assignee: new FormControl(taskRawValue.assignee),
      category: new FormControl(taskRawValue.category),
    });
  }

  getTask(form: TaskFormGroup): ITask | NewTask {
    return this.convertTaskRawValueToTask(form.getRawValue() as TaskFormRawValue | NewTaskFormRawValue);
  }

  resetForm(form: TaskFormGroup, task: TaskFormGroupInput): void {
    const taskRawValue = this.convertTaskToTaskRawValue({ ...this.getFormDefaults(), ...task });
    form.reset(
      {
        ...taskRawValue,
        id: { value: taskRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TaskFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdAt: currentTime,
    };
  }

  private convertTaskRawValueToTask(rawTask: TaskFormRawValue | NewTaskFormRawValue): ITask | NewTask {
    return {
      ...rawTask,
      createdAt: dayjs(rawTask.createdAt, DATE_TIME_FORMAT),
    };
  }

  private convertTaskToTaskRawValue(
    task: ITask | (Partial<NewTask> & TaskFormDefaults),
  ): TaskFormRawValue | PartialWithRequiredKeyOf<NewTaskFormRawValue> {
    return {
      ...task,
      createdAt: task.createdAt ? task.createdAt.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}