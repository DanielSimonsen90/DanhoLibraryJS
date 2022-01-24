export declare type TimeDelay = number | string;
export declare const ValidTime: RegExp;
export declare function ms(input: TimeDelay): number;
export declare class Time {
    static get millisecond(): number;
    static get second(): number;
    static get minute(): number;
    static get hour(): number;
    static get day(): number;
    static get week(): number;
    static get month(): number;
    static get year(): number;
    static get avgMonth(): number;
    static ms(input: TimeDelay): number;
}
