declare global {
  interface Array<T> {
    /**
     * For every x in array, execute callback
     * @param every i.e every 2nd item in array
     * @param callback Function to execute
     * @returns Array of results
     */
    nth<U>(every: number, callback: (item: T, index: number, collection: Array<T>, self: this) => U): Array<U>;
  }
}

/**
 * For every x in array, execute callback
 * @param every i.e every 2nd item in array
 * @param callback Function to execute. This includes a collection of items prior to last callback run
 * @returns Array of results
 */
export function nth<T, U>(
  this: Array<T>, 
  every: number, 
  callback: (item: T, index: number, collection: Array<T>, self: Array<T>) => U
): Array<U> {
  const result = new Array<U>();
  let collection = new Array<T>();

  for (let i = 0; i < this.length; i++) {
    collection.push(this[i]);

    if ((i + 1) % every === 0) {
      result.push(callback(this[i], i, collection, this));
      collection = new Array<T>();
    }
  }

  return result;
}
Array.prototype.nth = nth;