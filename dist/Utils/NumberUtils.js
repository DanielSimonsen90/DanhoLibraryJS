"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberUtils = exports.randomWithPercentages = exports.between = void 0;
function between(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.between = between;
function randomWithPercentages(items) {
    if (items.length === 0)
        throw new Error('Items array cannot be empty');
    // Calculate total weight in case weights don't sum to 100
    const totalWeight = items.reduce((sum, [, weight]) => sum + weight, 0);
    if (totalWeight === 0)
        throw new Error('Total weight must be greater than zero');
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
exports.randomWithPercentages = randomWithPercentages;
exports.NumberUtils = {
    between,
    randomWithPercentages,
};
