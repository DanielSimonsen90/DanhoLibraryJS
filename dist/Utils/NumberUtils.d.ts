export declare function between(min: number, max: number): number;
export declare function randomWithPercentages<T>(items: [item: T, weight: number][]): T;
export declare const NumberUtils: {
    between: typeof between;
    randomWithPercentages: typeof randomWithPercentages;
};
