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

    /**
     * Selects a random item from an array based on specified weights.
     * @param items An array of tuples where each tuple contains an item and its corresponding weight.
     * @returns A randomly selected item based on the provided weights.
     */
    randomWithPercentages(items: [item: T, weight: number][]): T;
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

export function randomWithPercentages<T>(items: [item: T, weight: number][]): T {
  if (items.length === 0) throw new Error('Items array cannot be empty');

  // Calculate total weight in case weights don't sum to 100
  const totalWeight = items.reduce((sum, [, weight]) => sum + weight, 0);
  if (totalWeight === 0) throw new Error('Total weight must be greater than zero');

  // Generate random number between 0 and totalWeight
  const random = Math.random() * totalWeight;

  // Find the item that corresponds to this random value
  let currentWeight = 0;
  for (const [item, weight] of items) {
    currentWeight += weight;
    if (random <= currentWeight) {
      return item;
    }
  }

  throw new Error('Unable to select an item based on weights');
}
Array.prototype.randomWithPercentages = randomWithPercentages;