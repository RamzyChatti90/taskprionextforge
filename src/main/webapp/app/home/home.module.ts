import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';

import { ITask, NewTask } from '../task.model';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

/**
 * A partial type to make create-account form control optional
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for Task form fields
 */
type TaskFormRawValue = Omit<ITask, 'startDate' | 'dueDate'> & {
  startDate?: string | null;
  dueDate?: string | null;
};

/**