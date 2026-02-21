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
export declare function nth<T, U>(this: Array<T>, every: number, callback: (item: T, index: number, collection: Array<T>, self: Array<T>) => U): Array<U>;
