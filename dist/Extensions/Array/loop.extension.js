"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nth = void 0;
/**
 * For every x in array, execute callback
 * @param every i.e every 2nd item in array
 * @param callback Function to execute. This includes a collection of items prior to last callback run
 * @returns Array of results
 */
function nth(every, callback) {
    const result = new Array();
    let collection = new Array();
    for (let i = 0; i < this.length; i++) {
        collection.push(this[i]);
        if ((i + 1) % every === 0) {
            result.push(callback(this[i], i, collection, this));
            collection = new Array();
        }
    }
    return result;
}
exports.nth = nth;
Array.prototype.nth = nth;
