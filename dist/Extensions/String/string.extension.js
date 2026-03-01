"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.truncate = void 0;
function truncate(length, ellipsis = "...") {
    if (this.length <= length)
        return this;
    return this.slice(0, length - ellipsis.length) + ellipsis;
}
exports.truncate = truncate;
String.prototype.truncate = truncate;
