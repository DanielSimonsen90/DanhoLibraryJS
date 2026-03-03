# [DanhoLibraryJS](../README.md)

## Utils

Utility functions and classes for common tasks.

### ApiUtils

```ts
/**
 * API utility class for making HTTP requests
 */
class ApiUtils<ApiEndpoints extends string> {
  /**
   * @param options Configuration options
   * @param options.baseEndpointDev Base URL for development environment
   * @param options.baseEndpoint Base URL for production environment (optional)
   * @param options.log Enable request logging (default: false)
   */
  constructor(options: {
      baseEndpointDev: string;
      baseEndpoint?: string;
      log?: boolean;
  });

  /**
   * Make a request to the API
   * @param path The path to the endpoint
   * @param options Request options (method, body, headers, etc.)
   * @returns The response from the API
   */
  public async request<TData>(
      path: ApiEndpoints,
      options?: RequestOptions
  ): Promise<TData>;

  /**
   * Get the base endpoint URL based on environment
   */
  public get baseEndpoint(): string;
}

/**
 * Request options type
 */
type RequestOptions<TBody = any> = Omit<RequestInit, 'method' | 'body'> & {
  method?: HttpMethods;
  body?: TBody;
  params?: Record<string, string | number | boolean>;
};

/**
 * HTTP methods
 */
type HttpMethods =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS';
```

### ColorUtils

```ts
/**
 * RGB color as tuple
 */
type RGB = [number, number, number];

/**
 * Hex color string
 */
type Hex = `#${string}`;

/**
 * Color type identifier
 */
type ColorType = 'hex' | 'rgb' | 'hsl';

/**
 * Convert colors between different formats
 * @param value Color value to convert
 * @param fromOrTo Source format (for strings) or target format (for RGB)
 * @param to Target format (when converting from string)
 */
function convert(value: RGB, to: Exclude<ColorType, 'rgb'>): string;
function convert(value: string, from: Exclude<ColorType, 'rgb'>, to: 'rgb'): RGB;
function convert(value: string | RGB, fromOrTo: ColorType, to?: ColorType): string | RGB;

/**
 * Generate a random hex color
 * @returns Random hex color string
 */
function generateRandomColor(): Hex;

/**
 * Color utilities object
 */
const ColorUtils = {
  convert,
  generateRandomColor
};
```

### FormUtils

```ts
/**
 * Serialize a form into an object
 * @param form The form element to serialize
 * @param log Whether to log the serialization process (default: false)
 * @returns An object containing the form data
 */
function serializeForm<T extends object>(form: HTMLFormElement, log?: boolean): T;
```

### NumberUtils

```ts
/**
 * Generate a random number between min and max (inclusive)
 * @param min Minimum value
 * @param max Maximum value
 * @returns Random number between min and max
 */
function between(min: number, max: number): number;

/**
 * Select a random item from weighted items
 * @param items Array of [item, weight] tuples where weight determines probability
 * @returns Randomly selected item based on weights
 * @throws Error if items array is empty or total weight is zero
 */
function randomWithPercentages<T>(items: [item: T, weight: number][]): T;

/**
 * Number utilities object
 */
const NumberUtils = {
  between,
  randomWithPercentages,
};
```

### PatcherUtils

```ts
/**
 * Patch event type
 */
type PatchEvent = 'before' | 'instead' | 'after';

/**
 * Monkey patch a property or method on an object
 * @param target Object to patch
 * @param property Property or method name to patch
 * @param event When to run the patch ('before', 'instead', or 'after')
 * @param replacement Replacement function or value handler
 * @returns Function to unpatch
 */
function patch<
  TTarget extends object,
  TProperty extends keyof TTarget,
  TPatchEvent extends PatchEvent,
  TPatchReplacement extends PatcherReplacement<TTarget, TProperty, TPatchEvent>
>(
  target: TTarget,
  property: TProperty,
  event: TPatchEvent,
  replacement: TPatchReplacement
): (() => void) | undefined;

/**
 * Remove all patches from a specific property
 * @param target Object with patches
 * @param property Property to unpatch
 */
function unpatch<TTarget extends object, TProperty extends keyof TTarget>(
  target: TTarget,
  property: TProperty
): void;

/**
 * Remove all patches from all objects
 */
function unpatchAll(): void;
```

### StringUtils

```ts
/**
 * Combines class names from various input types
 * Supports strings, objects (key-value where truthy values include the key),
 * arrays, and nested structures
 * @param args Class name arguments
 * @returns Combined class name string
 */
function classNames(...args: Array<any>): string;

/**
 * Generate a random ID string
 * @param length Length of the ID (default: 16)
 * @returns Random alphanumeric string
 */
function randomId(length?: number): string;

/**
 * Pluralize a word based on count
 * @param countable Number, array-like object, or Map to count
 * @param singular Singular form of the word
 * @param plural Optional custom plural form (default: adds 's' to singular)
 * @returns Singular or plural form based on count
 */
function pluralize(
  countable: number | ArrayLike<any> | Map<any, any>,
  singular: string,
  plural?: string
): string;
```

### TimeUtils

```ts
/**
 * Wait for a specified amount of time or execute a callback after a delay
 * @param time Milliseconds to wait
 */
function wait<T>(time: number): Promise<void>;
function wait<T>(callback: (...args: any[]) => T, time: number): Promise<T>;

/**
 * Get Unix timestamp from various date formats
 * @param date Date object or date string
 */
function getUnixTime(date: Date | string): number;
function getUnixTime(timestamp: number): number;

/**
 * Debounce a function call
 * @param debounceId Unique identifier for this debounce
 * @param callback Function to debounce
 * @param delay Delay in milliseconds
 * @param signal Optional AbortSignal to cancel the debounce
 * @returns Promise that resolves with callback result or rejects if cancelled
 */
function debounce<T>(
  debounceId: string,
  callback: () => T,
  delay: number,
  signal?: AbortSignal
): Promise<T>;

/**
 * Wrap a function in a debounce
 * @param callback Function to wrap
 * @param delay Delay in milliseconds
 * @returns Debounced function
 */
function wrapInDebounce<T>(
  callback: (...args: T[]) => void,
  delay: number
): (...args: T[]) => void;

/**
 * Throttle a function call
 * @param throttleId Unique identifier for this throttle
 * @param callback Function to throttle
 * @param cooldown Cooldown period in milliseconds
 * @returns Callback result or undefined if on cooldown
 */
function throttle<T>(
  throttleId: string,
  callback: () => T,
  cooldown: number
): T | undefined;

/**
 * Wrap a function in a throttle
 * @param callback Function to wrap
 * @param cooldown Cooldown period in milliseconds
 * @returns Throttled function
 */
function wrapInThrottle<T>(
  callback: (...args: T[]) => void,
  cooldown: number
): (...args: T[]) => void;

/**
 * Check if a throttle is currently on cooldown
 * @param throttleId Throttle identifier to check
 * @returns True if on cooldown, false otherwise
 */
function isThrottleOnCooldown(throttleId: string): boolean;

/**
 * Ensure a number is formatted with a leading zero if less than 10
 * @param num Number to format
 * @returns String with leading zero if needed
 */
function ensureStartZero(num: number): string;

/**
 * Convert 24-hour format to 12-hour format with am/pm
 * @param hour Hour in 24-hour format (0-23)
 * @returns Hour in 12-hour format with am/pm suffix
 */
function get12HourFormat(hour: number): string;

/**
 * Format hour in 24-hour format with leading zero
 * @param hour Hour to format
 * @returns Hour as two-digit string
 */
function get24HourFormat(hour: number): string;

/**
 * Time utilities object containing all time-related functions
 */
const TimeUtils = {
  wait,
  getUnixTime,
  debounce,
  wrapInDebounce,
  throttle,
  wrapInThrottle,
  isThrottleOnCooldown,
  ensureStartZero,
  get12HourFormat,
  get24HourFormat
};
```
