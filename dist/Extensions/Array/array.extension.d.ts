import { Arrayable } from "../../Types";
declare global {
    interface Array<T> {
        /**
         * Returns the first `count` elements from the array.
         * @param count Number of elements to take.
         * @returns Array containing the first `count` elements.
         */
        take(count: number): Array<T>;
        /**
         * Returns a new array with only unique elements from the original array.
         * @returns An array containing only unique elements.
         */
        unique(): Array<T>;
        /**
         * Splits the array into chunks of a specified size or by a splitter function.
         * @param chunkSizeOrSplitter The size of each chunk or a function that determines where to split the array.
         * @returns An array of arrays, where each sub-array is a chunk of the original array.
         */
        splitBy(chunkSizeOrSplitter: number | ((value: T, index: number, array: Array<T>) => boolean)): Array<Array<T>>;
        /**
         * Groups the elements of the array based on a key selector function.
         * @param keySelector A function that selects a key for each element in the array.
         * @returns A Map where each key is a group identifier and the value is an array of elements in that group.
         */
        groupBy<K>(keySelector: (value: T, index: number, array: Array<T>) => K): Map<K, Array<T>>;
    }
    interface ArrayConstructor {
        /**
         * Forces an arrayable object into an array
         * @param arrayable The arrayable object to force into an array
         * @returns An array containing the elements of the input or the single value.
         */
        forceArray<T>(arrayable: Arrayable<T>): Array<T>;
    }
}
export declare function take<T>(this: Array<T>, count: number): Array<T>;
export declare function forceArray<T>(arrayable: Arrayable<T>): Array<T>;
export declare function unique<T>(this: Array<T>): Array<T>;
export declare function splitBy<T>(this: Array<T>, chunkSize: number): Array<Array<T>>;
export declare function splitBy<T>(this: Array<T>, splitter: (value: T, index: number, array: Array<T>) => boolean): Array<Array<T>>;
export declare function groupBy<T, K>(this: Array<T>, keySelector: (value: T, index: number, array: Array<T>) => K): Map<K, Array<T>>;
