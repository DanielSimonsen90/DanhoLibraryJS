import * as Array from './array.extension';
import * as CRUD from './crud.extension';
import * as Loop from './loop.extension';
import * as Random from './random.extension';
import * as Sort from './sort.extension';

export const ArrayExtensions = {
  ...Array,
  ...CRUD,
  ...Loop,
  ...Random,
  ...Sort
};