"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringExtensions = void 0;
function toPascalCase() {
    return this.substring(0, 1).toUpperCase() + this.substring(1);
}
String.prototype.toPascalCase = toPascalCase;
function spaceReplacer(self, replacer, replacement) {
    return self.replace(new RegExp(`${typeof replacer == 'string' ? replacer : replacer.source}+`), replacement);
}
function toSnakeCase(replaceOptions) {
    return spaceReplacer(this, replaceOptions.replacer || ' ', replaceOptions.replacement || '_');
}
String.prototype.toSnakeCase = toSnakeCase;
function toKebabCase(replaceOptions) {
    return spaceReplacer(this, replaceOptions.replacer || ' ', replaceOptions.replacement || '-');
}
String.prototype.toKebabCase = toKebabCase;
function clip(start, end) {
    return this.substring(start < 0 ? this.length - start : start, end && end < 0 ? this.length + end : end);
}
String.prototype.clip = clip;
exports.StringExtensions = {
    toPascalCase, toSnakeCase, toKebabCase, clip
};
