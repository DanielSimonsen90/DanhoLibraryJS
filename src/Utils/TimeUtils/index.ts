import * as Debounce from './debounce.util';
import * as Functions from './functions.util';
import * as Throttle from './throttle.util';
import * as StringUtils from './string.util';

export const TimeUtils = {
  ...Functions,
  ...Debounce,
  ...Throttle,
  ...StringUtils,
};