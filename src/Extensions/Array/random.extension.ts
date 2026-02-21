declare global {
  interface Array<T> {
    /**
     * Returns a random element from the array.
     * @returns A random element from the array.
     */
    random(): T;

    /**
     * Returns a new array with the elements of the original array in random order.
     * @returns A new array with the elements shuffled.
     */
    shuffle(): Array<T>;
  }
}

export function random<T>(this: Array<T>): T {
  const randomIndex = Math.floor(Math.random() * this.length);
  return this[randomIndex];
}
Array.prototype.random = random;

export function shuffle<T>(this: Array<T>): Array<T> {
  return this.sort(() => Math.random() - 0.5);
}
Array.prototype.shuffle = shuffle;
