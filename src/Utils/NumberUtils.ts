export function between(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

export const NumberUtils = {
  between,
  randomWithPercentages,
}