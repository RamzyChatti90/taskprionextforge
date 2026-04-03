import dayjs from 'dayjs/esm';

import { IComment, NewComment } from './comment.model';

export const sampleWithRequiredData: IComment = {
  id: 20452,
  author: 'and better',
  createdAt: dayjs('2026-04-02T22:46'),
};

export const sampleWithPartialData: IComment = {
  id: 6771,
  author: 'norm athwart',
  content: '../fake-data/blob/hipster.txt',
  createdAt: dayjs('2026-04-03T08:44'),
};

export const sampleWithFullData: IComment = {
  id: 28427,
  author: 'testing ugh',
  content: '../fake-data/blob/hipster.txt',
  createdAt: dayjs('2026-04-03T02:56'),
};

export const sampleWithNewData: NewComment = {
  author: 'metabolise pish jubilant',
  createdAt: dayjs('2026-04-03T01:39'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
