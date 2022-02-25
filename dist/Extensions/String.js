"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
String.prototype.toPascalCase = function () {
    return this.substring(0, 1).toUpperCase() + this.substring(1);
};
function spaceReplacer(self, replacer, replacement) {
    return self.replace(new RegExp(`${typeof replacer == 'string' ? replacer : replacer.source}+`), replacement);
}
String.prototype.toSnakeCase = function (replaceOptions) {
    return spaceReplacer(this, replaceOptions.replacer || ' ', replaceOptions.replacement || '_');
};
String.prototype.toKebabCase = function (replaceOptions) {
    return spaceReplacer(this, replaceOptions.replacer || ' ', replaceOptions.replacement || '-');
};
String.prototype.clip = function (start, end) {
    return this.substring(start < 0 ? this.length - start : start, end && end < 0 ? this.length + end : end);
};
