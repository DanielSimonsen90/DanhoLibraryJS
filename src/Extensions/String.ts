import IReplacement from "../Interfaces/IReplacement";

declare global {
    interface String {
        /**
         * Uppercases first letter of string
         */
        toPascalCase(): string
        /**
         * Replaces "replacer" (default: ' ') with "replacement" (default: '_')
         * @param replaceOptions This is practically your stereotypical String.replace, if you really want it to be
         */
        toSnakeCase(replaceOptions?: IReplacement): string
        /**
         * Replaces "replacer" (default: ' ') with "replacement" (default: '-')
         * @param replaceOptions This is practically your stereotypical String.replace, if you really want it to be
         */
        toKebabCase(replaceOptions?: IReplacement): string,
        /**
         * String.substring but accepting negative numbers to cut from length
         * @param start Start of string. 0 indexed, if negative number, subtracts number from length
         * @param end End of string. 0 indexed, if negative number, substracts number from length
         */
        clip(start: number, end?: number): string
    }
}

function toPascalCase(this: string) {
    return this.substring(0, 1).toUpperCase() + this.substring(1);
}
String.prototype.toPascalCase = toPascalCase;

function spaceReplacer(self: string, replacer: string | RegExp, replacement: string) {
    return self.replace(new RegExp(`${typeof replacer == 'string' ? replacer : replacer.source}+`), replacement);
}

function toSnakeCase(this: string, replaceOptions: IReplacement) {
    return spaceReplacer(this, replaceOptions.replacer || ' ', replaceOptions.replacement || '_')
}
String.prototype.toSnakeCase = toSnakeCase;

function toKebabCase(this: string, replaceOptions: IReplacement) {
    return spaceReplacer(this, replaceOptions.replacer || ' ', replaceOptions.replacement || '-');
}
String.prototype.toKebabCase = toKebabCase;

function clip(this: string, start: number, end?: number) {
    return this.substring(start < 0 ? this.length - start : start, end && end < 0 ? this.length + end : end);
}
String.prototype.clip = clip;

export const StringExtensions = {
    toPascalCase, toSnakeCase, toKebabCase, clip
};