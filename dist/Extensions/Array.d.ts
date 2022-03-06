export {};
declare type UpdateFinder<T> = (item: T, index: number, self: Array<T>) => boolean;
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
    }
}
