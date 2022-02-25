import { BetterOmit, PropertiesWith, PartialExcept, LongMonth, LongDay, ShortDay, ShortMonth } from "../../Types";
import TimeSpan from "./TimeSpan";
declare type Data = PartialExcept<BetterOmit<PropertiesWith<number, TimeSpan>, 'weeks'>, 'years' | 'months'>;
declare type Double = `${number}${number}`;
declare type Quadruple = `${Double}${Double}`;
declare type DateFormat = `${Double}/${Double}/${Quadruple}`;
declare type Constructor = Data | DateFormat | number | Date;
declare class DanhoDate {
    constructor(data: Constructor);
    /**
     * Reduces ms into provided timeDifference
     * @param ms Millisecond value to reduce
     * @param timeDifference Time difference in ms that for each timeDifference in ms, add 1 to result
     * @returns How many times timeDifference fits in ms
     */
    private _reduceTime;
    protected _date: Date;
    /**
     * Year of the date
     */
    get year(): number;
    set year(value: number);
    /**
     * Month of the date
     */
    get month(): number;
    set month(value: number);
    /**
     * Days in the month of the date
     */
    get daysInMonth(): number;
    /**
     * Week of the year the day is in
     */
    get week(): number;
    set week(value: number);
    /**
     * Week of the month the day is in
     */
    get weekOfMonth(): number;
    get day(): number;
    set day(value: number);
    get hours(): number;
    set hours(value: number);
    get minutes(): number;
    set minutes(value: number);
    get seconds(): number;
    set seconds(value: number);
    get milliseconds(): number;
    set milliseconds(value: number);
    /**
     * Full name of the day
     */
    get weekDay(): LongDay;
    /**
     * Full name of the day shortened to 3 characters
     */
    get weekDayShort(): ShortDay;
    /**
     * Full name of the month
     */
    get monthName(): LongMonth;
    /**
     * Full name of the month shortened to 3 characters
     */
    get monthNameShort(): ShortMonth;
    set(data: Partial<Data>): this;
    between(date: DanhoDate | Constructor): TimeSpan;
    toString(format?: string): string;
}
export { DanhoDate as Date };
export default DanhoDate;
