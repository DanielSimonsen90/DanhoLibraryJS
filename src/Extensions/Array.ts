export type UpdateFinder<T> = (item: T, index: number, self: Array<T>) => boolean

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
        update(old: T | number | UpdateFinder<T>, updated: T): T
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
        index(i: number): T,
        /**
         * For every x in array, execute callback
         * @param every i.e every 2nd item in array
         * @param callback Function to execute
         * @returns Array of results
         */
        nth<U>(every: number, callback: (item: T, index: number, collection: Array<T>, self: this) => U): Array<U>
    }
}

function add<T>(this: Array<T>, ...items: Array<T>) {
    this.push(...items);
    return this;
}
Array.prototype.add = add;

function update<T>(this: Array<T>, old: T | number | UpdateFinder<T>, updated: T) {
    const item = typeof old === 'number' ? this[old] 
        : typeof old === 'function' ? this.find(old as UpdateFinder<T>) 
        : old;
    if (!item) throw new Error('Old was not found in array!');

    const index = this.indexOf(item);
    return this[index] = updated;
}
Array.prototype.update = update;

function remove<T>(this: Array<T>, value: T | number): Array<T> {
    const index = typeof value === 'number' ? value : this.indexOf(value);
    if (index > -1) this.splice(index, 1);
    return this;
}
Array.prototype.remove = remove;

function random<T>(this: Array<T>): T {
    const randomIndex = Math.round(Math.random() * this.length);
    return this[randomIndex];
}
Array.prototype.random = random;

function index<T>(this: Array<T>, i: number): T {
    return this[i < 0 ? this.length + i : i];
}
Array.prototype.index = index;

function nth<T, U>(this: Array<T>, every: number, callback: (item: T, index: number, collection: Array<T>, self: Array<T>) => U): Array<U> {
    const result = new Array<U>();
    let collection = new Array<T>();

    for (let i = 0; i < this.length; i++) {
        collection.push(this[i]);
        
        if (i % every === 0) {
            result.push(callback(this[i], i, collection, this));
            collection = new Array<T>();
        }
    }

    return result;
}
Array.prototype.nth = nth;

export const ArrayExtensions = {
    add, update, remove, 
    random, index, nth
};