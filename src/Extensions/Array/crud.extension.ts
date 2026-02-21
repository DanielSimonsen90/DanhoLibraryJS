export type UpdateFinder<T> = (item: T, index: number, self: Array<T>) => boolean

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

export function add<T>(this: Array<T>, ...items: Array<T>) {
  this.push(...items);
  return this;
}
Array.prototype.add = add;

export function update<T>(this: Array<T>, old: T | number | UpdateFinder<T>, updated: T) {
  const item = typeof old === 'number' ? this[old]
    : typeof old === 'function' ? this.find(old as UpdateFinder<T>)
      : old;
  if (!item) throw new Error('Old was not found in array!');

  const index = this.indexOf(item);
  return this[index] = updated;
}
Array.prototype.update = update;

export function remove<T>(this: Array<T>, value: T | number): Array<T> {
  const index = typeof value === 'number' ? value : this.indexOf(value);
  if (index > -1) this.splice(index, 1);
  return this;
}
Array.prototype.remove = remove;