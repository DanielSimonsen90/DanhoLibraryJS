import { BetterOmit, PartialExcept, LongMonth, LongDay, ShortDay, ShortMonth } from "../../Types";
import Time from "./Time";
import TimeProperties from "./TimeProperties";
import TimeSpan, { TimeSpanFormat } from "./TimeSpan";

type Data = PartialExcept<BetterOmit<TimeProperties<true>, 'weeks'>, 'years' | 'months'>;
type Double = `${number}${number}`;
type Quadruple = `${Double}${Double}`;
type DateFormat = `${Double}/${Double}/${Quadruple}`;
/**
 * Type used to construct DanhoDate.
 * @Data Partial TimeProperties except years & months
 * @DateFormat string as dd/MM/yyyy
 */
export type DanhoDateConstructor = Data | DateFormat | number | Date;

class DanhoDate {
    /**
     * Returns the value of the current irl time
     */
    public static get now() {
        return Date.now();
    }

    constructor(data?: DanhoDateConstructor) {
        // data not provided
        if (!data) this.date = new Date();
        // data is typeof Date
        else if (typeof data === 'object' && data instanceof Date) {
            this.date = new Date(data);
        } 
        // data is typeof Data
        else if (typeof data === 'object') {
            this.date = new Date(data.years, data.months - 1);
            if (data.days) this.date.setDate(data.days);
            if (data.hours) this.date.setHours(data.hours);
            if (data.minutes) this.date.setMinutes(data.minutes);
            if (data.seconds) this.date.setSeconds(data.seconds);
            if (data.milliseconds) this.date.setMilliseconds(data.milliseconds);
        }
        // data is string or number
        else this.date = new Date(data);

        this._formats = new Map<string, string | number>([
            ['year', this.year],
            ['daysInMonth', this.daysInMonth],
            ['monthShort', this.monthNameShort],
            ['month', this.monthName],
            ['MM', Time.DoubleDigit(this.month)],
            ['M', this.month],

            ['weekMonth', this.weekOfMonth],
            ['weekDay', this.weekDay],
            ['weekDayShort', this.weekDayShort],
            ['week', this.week],

            ['dd', Time.DoubleDigit(this.day)],
            ['ddth', `${Time.DoubleDigit(this.day)}${Time.th(this.day)}`],
            ['d', this.day],
            ['dth', Time.th(this.day, true)],

            ['hh12', `${Time.DoubleDigit(this.hours)}${this.hours < 12 ? 'AM' : 'PM'}`],
            ['h12', `${this.hours > 12 ? 12 - this.hours : this.hours}${this.hours < 12 ? 'AM' : 'PM'}`],
            ['hh24', Time.DoubleDigit(this.hours)],
            ['h24', this.hours],
            ['mm', Time.DoubleDigit(this.minutes)],
            ['m', this.minutes],
            ['ss', Time.DoubleDigit(this.seconds)],
            ['s', this.seconds],
            ['msms', Time.DoubleDigit(this.milliseconds)],
            ['ms', this.milliseconds]
        ]).map((v, k) => [k, v.toString()])
    }

    private _formats: Map<string, string>;
    private _format(format: string) {
        return format
            .split(/\$/)
            .map(v => v.split(/\W/)[0])
            .filter(v => v)
            .reduce((result, key) => result.replaceAll(key, this._formats.get(key)!), format.replaceAll('$', ''));
    }

    public date: Date

    /**
     * Year of the date
     */
    public get year(): number { return this.date.getFullYear() }
    public set year(value: number) { this.date.setFullYear(value); }

    /**
     * Month of the date
     */
    public get month(): number { return this.date.getMonth() + 1 }
    public set month(value: number) { this.date.setMonth(value) }

    /**
     * Days in the month of the date
     */
    public get daysInMonth() { return Time.daysInMonth[this.month - 1]; }

    /**
     * Week of the year the day is in
     */
    public get week(): number {
        const firstMonday = new Date(this.year, 1, 1);

        if (firstMonday.getDay() !== 1) {
            const daysToMon = Time.DayNames.reverse().reduce((result, day, i) => 
                result.set(day, i + 1)
            , new Map<LongDay, number>()).get(Time.DayNames[firstMonday.getDay() - 1])!;
            firstMonday.setDate(firstMonday.getDate() + daysToMon);
        }

        const timeDiff = Math.round(firstMonday.getTime() - this.time);
        const timeSince = Time.millisecond % timeDiff;
        const result = Math.ceil(timeSince / Time.week);
        return result;
    }
    public set week(value: number) { this.date.setDate(value * Time.week / Time.day); }

    /**
     * Week of the month the day is in
     */
    public get weekOfMonth(): number { return Math.round(this.daysInMonth / (Time.week / Time.day)); }

    /**
     * Day of the date
     */
    public get day(): number { return this.date.getDate(); }
    public set day(value: number) { this.date.setDate(value); }

    public get dayOfWeek(): number { return this.date.getDay() }
    public set dayOfWeek(value: number) {
        const current = this.dayOfWeek;

        if (value > current) var diff = value - current;
        else diff = current - value;

        this.day -= diff;
    }

    /**
     * Hours of the date
     */
    public get hours(): number { return this.date.getHours(); }
    public set hours(value: number) { this.date.setHours(value); }

    public get isPM(): boolean {
        return this.hours > 11;
    }

    /**
     * Minutes of the date
     */
    public get minutes(): number { return this.date.getMinutes(); }
    public set minutes(value: number) { this.date.setMinutes(value); }

    /**
     * Seconds of the date
     */
    public get seconds(): number { return this.date.getSeconds(); }
    public set seconds(value: number) { this.date.setSeconds(value); }

    /**
     * Milliseconds of the date
     */
    public get milliseconds(): number { return this.date.getMilliseconds(); }
    public set milliseconds(value: number) { this.date.setMilliseconds(value); }

    /**
     * Millisecond value of internal time
     */
    public get time(): number { return this.date.getTime(); }
    public set time(value: number) { this.date.setTime(value) }

    /**
     * Week day i.e. Monday
     */
    public get weekDay(): LongDay { return Time.DayNames[this.dayOfWeek - 1] || Time.DayNames.at(-1); }
    /**
     * Short week day i.e. Mon
     */
    public get weekDayShort(): ShortDay { return this.weekDay.substring(0, 3) as ShortDay; }
    /**
     * Month name i.e. February
     */
    public get monthName(): LongMonth { return Time.MonthNames[this.month - 1] || Time.MonthNames.at(-1); }
    /**
     * Short month name i.e. Feb
     */
    public get monthNameShort(): ShortMonth { return this.monthName.substring(0, 3) as ShortMonth; }

    /**
     * Sets internal date property
     * @param data Time properties to set - replacement of i.e. Date.setHours(value: number): number
     * @returns This, with updated properties
     */
    public set(data: Partial<Data>) {
        const { years, months, days, hours, minutes, seconds, milliseconds } = data;
        const ymd = this.date.setFullYear(years || this.year, months, days);
        const hmsms = new Date(ymd).setHours(hours || this.hours, minutes, seconds, milliseconds);
        this.date = new Date(hmsms);
        return this;
    }

    /**
     * Calculates the time between this and provided date
     * @param date Date information
     * @returns TimeSpan between this and provided date
     */
    public between(date?: DanhoDate | DanhoDateConstructor): TimeSpan {
        if (!date) return new TimeSpan(this.date, new Date());
        else if (date instanceof DanhoDate) return new TimeSpan(this.date, date.date);
        else if (date instanceof Date) return new TimeSpan(this.date, date);
        else if (typeof date === 'object') return new DanhoDate(date).between(this.date);
        return new TimeSpan(this.date, new Date(date));
    }

    /**
     * String representation of this 
     * @param format String format of date
     * @returns String representation of this
     * 
     * @$year Replaced with year of the date i.e. 2022
     * 
     * @$month Replaced with month name i.e. March
     * @$daysInMonth Replaced with the amount of days in the month i.e. 31
     * @$MM replaced with double digit month i.e. 01
     * @$M replaced with single digit month i.e. 1
     * 
     * @$week Replaced with week of the year i.e. 32
     * @$weekOfMonth Replaced with the week of the month i.e. 3
     * 
     * @$weekday Replaced with day of the week i.e. Wednesday
     * @$dd Replaced with double digit day i.e. 02
     * @$d Replaced with single digit day i.e. 2
     * @$ddth Replaced with double digit day + "th" i.e. 05th
     * @$dth Replaced with double digit day + "th" i.e. 5th
     * 
     * @$hh12 Replaced with double digit hour in 12-hour format i.e. 09
     * @$hh24 Replaced with double digit hour in 24-hour format i.e. 21
     * @$h12 Replaced with single digit hour in 12-hour format i.e. 9
     * @$h24 Replaced with single digit hour in 24-hour format i.e. 9
     * 
     * @$mm Replaced with double digit minute i.e. 05
     * @$m Replaced with single digit minute i.e. 5
     * 
     * @$ss Replaced with double digit second i.e. 03
     * @$s Replaced with single digit second i.e. 3
     * 
     * @msms Replaced with double digit millisecond i.e. 02
     * @ms Replaced with single digit millisecond i.e. 2
     * 
     * @$relative Replaced with relative timeformat as TimeSpan
     */
    public toString(format = "$dd/$MM/$year", relativeFormat?: TimeSpanFormat) {
        return this._format(format.replaceAll('$relative', this.between(new Date()).toString(relativeFormat)))
    }

}
export { DanhoDate as Date }
export default DanhoDate;