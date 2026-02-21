type Comparator<T> = (a: T, b: T) => number;

declare global {
  interface Array<T> {
    /**
     * Sorts the array using multiple comparators.
     * @param comparators Functions to compare elements.
     * @returns Sorted array.
     */
    orderBy(...comparators: Array<Comparator<T>>): Array<T>;

    /**
     * Sorts the array using multiple comparators in descending order.
     * @param comparators Functions to compare elements.
     * @returns Sorted array in descending order.
     */
    orderByDescending(...comparators: Array<Comparator<T>>): Array<T>;

    /**
     * Sorts the array by specified properties.
     * @param properties Properties to sort by.
     * @returns Sorted array.
     */
    sortByProperty(...properties: Array<keyof T>): Array<T>;
  }
}

export function orderBy<T>(this: Array<T>, ...comparators: Array<Comparator<T>>): Array<T> {
  return this.sort((a, b) => {
    for (const comparator of comparators) {
      const result = comparator(a, b);
      if (result !== 0) return result;
    }

    return 0;
  });
}
Array.prototype.orderBy = orderBy;

export function orderByDescending<T>(this: Array<T>, ...comparators: Array<Comparator<T>>): Array<T> {
  return this.orderBy(...comparators).reverse();
}
Array.prototype.orderByDescending = orderByDescending;

export function sortByProperty<T extends object>(this: Array<T>, ...properties: Array<keyof T>): Array<T> {
  return this.orderBy(...properties.map(property => (a: T, b: T) => {
    if (a[property] < b[property]) return -1;
    if (a[property] > b[property]) return 1;
    return 0;
  }));
}
Array.prototype.sortByProperty = sortByProperty;