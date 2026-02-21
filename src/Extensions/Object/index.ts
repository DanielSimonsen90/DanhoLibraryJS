import * as Array from './arrays.extension';
import * as Booleans from './booleans.extension';
import * as Extracts from './extracts.extension';
import * as Properties from './properties.extension';

export const ObjectExtensions = {
  ...Array,
  ...Booleans,
  ...Extracts,
  ...Properties
};