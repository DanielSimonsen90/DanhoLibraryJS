"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortByProperty = exports.orderByDescending = exports.orderBy = void 0;
function orderBy(...comparators) {
    return this.sort((a, b) => {
        for (const comparator of comparators) {
            const result = comparator(a, b);
            if (result !== 0)
                return result;
        }
        return 0;
    });
}
exports.orderBy = orderBy;
Array.prototype.orderBy = orderBy;
function orderByDescending(...comparators) {
    return this.orderBy(...comparators).reverse();
}
exports.orderByDescending = orderByDescending;
Array.prototype.orderByDescending = orderByDescending;
function sortByProperty(...properties) {
    return this.orderBy(...properties.map(property => (a, b) => {
        if (a[property] < b[property])
            return -1;
        if (a[property] > b[property])
            return 1;
        return 0;
    }));
}
exports.sortByProperty = sortByProperty;
Array.prototype.sortByProperty = sortByProperty;
