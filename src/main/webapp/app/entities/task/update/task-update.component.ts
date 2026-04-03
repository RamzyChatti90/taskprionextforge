import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { ICategory } from 'app/entities/category/category.model';
import { CategoryService } from 'app/entities/category/service/category.service';
import { Priority } from 'app/entities/enumerations/priority.model';
import { TaskStatus } from 'app/entities/enumerations/task-status.model';
import { TaskService } from '../service/task.service';
import { ITask } from '../task.model';
import { TaskFormGroup, TaskFormService } from './task-form.service';

@Component({
  selector: 'jhi-task-update',
  templateUrl: './task-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TaskUpdateComponent implements OnInit {
  isSaving = false;
  task: ITask | null = null;
  priorityValues = Object.keys(Priority);
  taskStatusValues = Object.keys(TaskStatus);

  usersSharedCollection: IUser[] = [];
  categoriesSharedCollection: ICategory[] = [];

  protected taskService = inject(TaskService);
  protected taskFormService = inject(TaskFormService);
  protected userService = inject(UserService);
  protected categoryService = inject(CategoryService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TaskFormGroup = this.taskFormService.createTaskFormGroup();

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  compareCategory = (o1: ICategory | null, o2: ICategory | null): boolean => this.categoryService.compareCategory(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ task }) => {
      this.task = task;
      if (task) {
        this.updateForm(task);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const task = this.taskFormService.getTask(this.editForm);
    if (task.id !== null) {
      this.subscribeToSaveResponse(this.taskService.update(task));
    } else {
      this.subscribeToSaveResponse(this.taskService.create(task));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITask>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(task: ITask): void {
    this.task = task;
    this.taskFormService.resetForm(this.editForm, task);

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, task.assignee);
    this.categoriesSharedCollection = this.categoryService.addCategoryToCollectionIfMissing<ICategory>(
      this.categoriesSharedCollection,
      task.category,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.task?.assignee)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));

    this.categoryService
      .query()
      .pipe(map((res: HttpResponse<ICategory[]>) => res.body ?? []))
      .pipe(
        map((categories: ICategory[]) => this.categoryService.addCategoryToCollectionIfMissing<ICategory>(categories, this.task?.category)),
      )
      .subscribe((categories: ICategory[]) => (this.categoriesSharedCollection = categories));
  }
}
