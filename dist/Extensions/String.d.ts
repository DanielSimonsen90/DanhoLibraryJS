import IReplacement from "../Interfaces/IReplacement";
export {};
declare global {
    interface String {
        /**
         * Uppercases first letter of string
         */
        toPascalCase(): string;
        /**
         * Replaces "replacer" (default: ' ') with "replacement" (default: '_')
         * @param replaceOptions This is practically your stereotypical String.replace, if you really want it to be
         */
        toSnakeCase(replaceOptions?: IReplacement): string;
        /**
         * Replaces "replacer" (default: ' ') with "replacement" (default: '-')
         * @param replaceOptions This is practically your stereotypical String.replace, if you really want it to be
         */
        toKebabCase(replaceOptions?: IReplacement): string;
        /**
         * String.substring but accepting negative numbers to cut from length
         * @param start Start of string. 0 indexed, if negative number, subtracts number from length
         * @param end End of string. 0 indexed, if negative number, substracts number from length
         */
        clip(start: number, end?: number): string;
    }
}
