export type UpdateFinder<T> = (item: T, index: number, self: Array<T>) => boolean;
declare global {
    interface Array<T> {
        /**
         * Pushes items to array and returns self with new items
         * @param items Items to add to array
         */
        add(...items: Array<T>): this;
        /**
         * Update an item in array
         * @param old The old value or index to update
         * @param updated Updated value
         */
        update(old: T | number | UpdateFinder<T>, updated: T): T;
        /**
         * Removes item from array and returns self without item
         * @param item Item or index to remove
         */
        remove(item: T | number): this;
        /**
         * Returns a random element from array
         */
        random(): T;
        /**
         * Returns item matching index. If negative number, subtracts number from length
         * @param i Index of item
         */
        index(i: number): T;
        /**
         * For every x in array, execute callback
         * @param every i.e every 2nd item in array
         * @param callback Function to execute
         * @returns Array of results
         */
        nth<U>(every: number, callback: (item: T, index: number, collection: Array<T>, self: this) => U): Array<U>;
    }
}
declare function add<T>(this: Array<T>, ...items: Array<T>): T[];
declare function update<T>(this: Array<T>, old: T | number | UpdateFinder<T>, updated: T): T;
declare function remove<T>(this: Array<T>, value: T | number): Array<T>;
declare function random<T>(this: Array<T>): T;
declare function index<T>(this: Array<T>, i: number): T;
declare function nth<T, U>(this: Array<T>, every: number, callback: (item: T, index: number, collection: Array<T>, self: Array<T>) => U): Array<U>;
export declare const ArrayExtensions: {
    add: typeof add;
    update: typeof update;
    remove: typeof remove;
    random: typeof random;
    index: typeof index;
    nth: typeof nth;
};
export {};
