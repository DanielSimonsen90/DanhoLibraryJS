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
    }
}
export declare function add<T>(this: Array<T>, ...items: Array<T>): T[];
export declare function update<T>(this: Array<T>, old: T | number | UpdateFinder<T>, updated: T): T;
export declare function remove<T>(this: Array<T>, value: T | number): Array<T>;
