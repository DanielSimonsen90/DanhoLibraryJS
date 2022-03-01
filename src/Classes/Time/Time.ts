import { LongDay, LongMonth } from "../../Types/Date";

/** '2s' or 2000 */
export type TimeUnit = 'ms' | 's' | 'm' | 'h' | 'd'| 'w' | 'M' | 'y';
export type TimeString = `${number}${TimeUnit}`;
export type TimeDelay = number | TimeString;
export const ValidTime = /^(\d+(?:\.|,)?\d*)(ms|s|m|h|d|w|M|y)$/;

/**
 * Converts input into milliseconds
 * @param input Input to convert to ms. 1s | 2m | 3h | 1M | 60000
 * @returns Millisecond value of input
 */
export function ms(input: TimeDelay) {
    if (typeof input === 'number') return input;

    const match = input.match(ValidTime);
    if (!match) throw Error(`Invalid input string "${input}"`)
    match.shift();

    const [value, unit] = match;
    // console.log({ value, unit, input, match });
    
    const units = new Map<string, number>([
        ['ms', Time.millisecond],
        ['s', Time.second],
        ['m', Time.minute],
        ['h', Time.hour],
        ['d', Time.day],
        ['w', Time.week],
        ['M', Time.month],
        ['y', Time.year]
    ]);

    return parseInt(value) * (units.get(unit) as number);
}

/**
 * Time utility class
 * @borrows TimeDelay
 * @borrows ms
 */
export class Time {
    /**
     * Array of amount of days in the months. 0 indexed
     */
    public static get daysInMonth() {
        return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    }

    /**
     * Amount of weeks per year
     */
    public static get weeksInYear() {
        return Time.daysInYear * Time.day / Time.week
    }

    /**
     * Amount of days per year
     */
    public static get daysInYear() {
        return Time.year / Time.day;;
    }

    /**
     * Returns function that converts value into double digit string
     * @returns (value: number): string 
     */
    public static DoubleDigit(value: number) {
        return value.toString().length < 2 ? `0${value}` : value.toString(); 
    }

    public static th(value: number, includeValue = false) {
        const th = (() => {
            switch (value) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        })();
        return includeValue ? value + th : th;
    }

    /**
     * Array of names of the months. 0 idnexed
     */
    public static get MonthNames() {
        return new Array<LongMonth>(
            'Janurary', 'February', 
            'March', 'April', 'May',
            'June', 'July', 'August',
            'September', 'October', 'November',
            'December'
        );
    }

    /**
     * Array of names of the days of the week. 0 indexed
     */
    public static get DayNames() {
        return new Array<LongDay>('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
    }
        
    /** Millisecond in milliseconds (I know that sounds weird but the others make sense) */
    public static get millisecond(): number { return 1; }
    /** Second in milliseconds */
    public static get second(): number { return Time.millisecond * 1000; }
    /** Minute in milliseconds */
    public static get minute(): number { return Time.second * 60; }
    /** Hour in milliseconds */
    public static get hour(): number { return Time.minute * 60; }
    /** Day in milliseconds */
    public static get day(): number { return Time.hour * 24 }
    /** Week in milliseconds */
    public static get week(): number { return Time.day * 7; }
    /** Month in milliseconds */
    public static get month(): number {
        return Time.avgMonth * Time.day;
    }
    /** Year in milliseconds */
    public static get year(): number {
        const now = new Date()
        return (365 + (now.getFullYear() % 4 == 0 ? 1 : 0)) * Time.day
    }
    /** Average month in milliseconds */
    public static get avgMonth(): number {
        return Math.round(this.daysInMonth.reduce((result, num) => result += num, 0) / 12)
    }
    public static ms(input: TimeDelay) {
        return ms(input);
    }
}
export default Time;