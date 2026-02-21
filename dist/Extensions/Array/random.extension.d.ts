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
export declare function random<T>(this: Array<T>): T;
export declare function shuffle<T>(this: Array<T>): Array<T>;
export declare function randomWithPercentages<T>(items: [item: T, weight: number][]): T;
