import dayjs from 'dayjs/esm';

import { ITask, NewTask } from './task.model';

export const sampleWithRequiredData: ITask = {
  id: 9181,
  title: 'or consequently',
  priority: 'HIGH',
  status: 'BLOCKED',
  createdAt: dayjs('2026-04-03T00:47'),
};

export const sampleWithPartialData: ITask = {
  id: 24321,
  title: 'ride whenever',
  description: 't-shirt pish whose',
  priority: 'URGENT',
  status: 'IN_PROGRESS',
  createdAt: dayjs('2026-04-03T06:13'),
};

export const sampleWithFullData: ITask = {
  id: 13396,
  title: 'where wherever',
  description: 'but than',
  priority: 'URGENT',
  status: 'TODO',
  dueDate: dayjs('2026-04-03'),
  createdAt: dayjs('2026-04-02T19:25'),
};

export const sampleWithNewData: NewTask = {
  title: 'expostulate',
  priority: 'MEDIUM',
  status: 'DONE',
  createdAt: dayjs('2026-04-03T12:35'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
