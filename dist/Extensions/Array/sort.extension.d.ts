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
export declare function orderBy<T>(this: Array<T>, ...comparators: Array<Comparator<T>>): Array<T>;
export declare function orderByDescending<T>(this: Array<T>, ...comparators: Array<Comparator<T>>): Array<T>;
export declare function sortByProperty<T extends object>(this: Array<T>, ...properties: Array<keyof T>): Array<T>;
export {};
