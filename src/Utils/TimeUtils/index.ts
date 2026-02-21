import * as Debounce from './debounce.util';
import * as Functions from './functions.util';
import * as Throttle from './throttle.util';

export const TimeUtils = {
  ...Functions,
  ...Debounce,
  ...Throttle,
};