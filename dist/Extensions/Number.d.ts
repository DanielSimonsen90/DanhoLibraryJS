type Separators = {
    thousand: string;
    decimal: string;
};
declare global {
    interface Number {
        toSeparationString(separators?: Partial<Separators>): string;
        toRomanNumeral(): string;
    }
}
export declare function toSeparationString(this: number, separators?: Partial<Separators>): string;
export declare function toRomanNumeral(this: number): string;
export {};
