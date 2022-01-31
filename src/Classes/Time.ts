/** '2s' or 2000 */
export type TimeDelay = number | string;
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
        return Math.round([
            ...[1, 3, 5, 7, 8, 10, 12].map(() => 31), 
            ...[4, 6, 9, 11].map(() => 30),
            28
        ].reduce((result, num) => result += num, 0) / 12)
    }
    public static ms(input: TimeDelay) {
        return ms(input);
    }
}