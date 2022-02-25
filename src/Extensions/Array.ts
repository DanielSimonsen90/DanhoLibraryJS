export {};

declare global {
    interface Array<T> {
        /**
         * Pushes items to array and returns self with new items
         * @param items Items to add to array
         */
        add(...items: Array<T>): this
        /**
         * Update an item in array
         * @param old The old value or index to update
         * @param updated Updated value
         */
        update(old: T | number, updated: T): T
        /**
         * Removes item from array and returns self without item
         * @param item Item or index to remove
         */
        remove(item: T | number): this
        /**
         * Returns a random element from array
         */
        random(): T
        /**
         * Returns item matching index. If negative number, subtracts number from length
         * @param i Index of item
         */
        index(i: number): T
    }
}

Array.prototype.add = function<T>(this: Array<T>, ...items: Array<T>) {
    this.push(...items);
    return this;
}
Array.prototype.update = function<T>(this: Array<T>, old: T | number, updated: T) {
    const index = typeof old === 'number' ? old : this.indexOf(old);
    return this[index] = updated;
}
Array.prototype.remove = function<T>(this: Array<T>, value: T | number): Array<T> {
    const index = typeof value === 'number' ? value : this.indexOf(value);
    if (index > -1) this.splice(index, 1);
    return this;
}
Array.prototype.random = function<T>(this: Array<T>): T {
    const randomIndex = Math.round(Math.random() * this.length);
    return this[randomIndex];
}
Array.prototype.index = function<T>(this: Array<T>, i: number): T {
    return this[i < 0 ? this.length + i : i];
}