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
    constructor(data?: DanhoDateConstructor) {
        // data not provided
        if (!data) this._date = new Date();
        // data is typeof Date
        else if (typeof data === 'object' && data instanceof Date) {
            this._date = new Date(data);
        } 
        // data is typeof Data
        else if (typeof data === 'object') {
            this._date = new Date(data.years, data.months - 1);
            if (data.days) this._date.setDate(data.days);
            if (data.hours) this._date.setHours(data.hours);
            if (data.minutes) this._date.setMinutes(data.minutes);
            if (data.seconds) this._date.setSeconds(data.seconds);
            if (data.milliseconds) this._date.setMilliseconds(data.milliseconds);
        }
        // data is string or number
        else this._date = new Date(data);
    }

    /**
     * Reduces ms into provided timeDifference
     * @param ms Millisecond value to reduce
     * @param timeDifference Time difference in ms that for each timeDifference in ms, add 1 to result
     * @returns How many times timeDifference fits in ms
     */
    private _reduceTime(ms: number, timeDifference: number) {
        let result = ms % timeDifference;

        // while (timeDifference > ms) {
        //     timeDifference -= ms;
        //     result++;
        // }

        return [result, timeDifference];
    }
    private _format(format: string) {
        console.log(this);
        return format
        .replaceAll('$year', this.year.toString())
        .replaceAll('$daysInMonth', this.daysInMonth.toString())
        .replaceAll('$monthShort', this.monthNameShort)
        .replaceAll('$month', this.monthName)
        .replaceAll('$MM', Time.DoubleDigit(this.month))
        .replaceAll('$M', this.month.toString())

        .replaceAll('$weekMonth', this.weekOfMonth.toString())
        .replaceAll('$weekDay', this.weekDay)
        .replaceAll('$weekDayShort', this.weekDayShort)
        .replaceAll('$week', this.week.toString())
        
        .replaceAll('$dd', Time.DoubleDigit(this.day))
        .replaceAll('$d', this.day.toString())

        .replaceAll('$hh12', `${Time.DoubleDigit(this.hours)}${this.hours < 12 ? 'AM' : 'PM'}`)
        .replaceAll('$h12', `${this.hours > 12 ? 12 - this.hours : this.hours}${this.hours < 12 ? 'AM' : 'PM'}`)
        .replaceAll('$hh24', Time.DoubleDigit(this.hours))
        .replaceAll('$h24', this.hours.toString())

        .replaceAll('$msms', Time.DoubleDigit(this.milliseconds))
        .replaceAll('$ms', this.milliseconds.toString())
        
        .replaceAll('$ss', Time.DoubleDigit(this.seconds))
        .replaceAll('$s', this.seconds.toString())
        
        .replaceAll('$mm', Time.DoubleDigit(this.minutes))
        .replaceAll('$m', this.minutes.toString())
    }

    protected _date: Date

    /**
     * Year of the date
     */
    public get year(): number { return this._date.getFullYear() }
    public set year(value: number) { this._date.setFullYear(value); }

    /**
     * Month of the date
     */
    public get month(): number { return this._date.getMonth() + 1 }
    public set month(value: number) { this._date.setMonth(value) }

    /**
     * Days in the month of the date
     */
    public get daysInMonth() { return Time.daysInMonth[this.month - 1]; }

    /**
     * Week of the year the day is in
     */
    public get week(): number {
        const firstMonday = new DanhoDate({ years: this.year, months: 1, days: 1 });

        if (firstMonday.weekDayShort !== 'Mon') {
            const daysToMon = Time.DayNames.reverse().reduce((result, day, i) => 
                result.set(day, i + 1)
            , new Map<LongDay, number>()).get(firstMonday.weekDay)!;
            firstMonday.day += daysToMon;
        }   

        const timeSince = this.between(firstMonday);
        const result = Math.ceil(timeSince.getTotalMilliseconds() / Time.week);        

        return result;
    }
    public set week(value: number) { this._date.setDate(value * Time.week / Time.day); }

    /**
     * Week of the month the day is in
     */
    public get weekOfMonth(): number { return Math.round(this.daysInMonth / (Time.week / Time.day)); }

    /**
     * Day of the date
     */
    public get day(): number { return this._date.getDate(); }
    public set day(value: number) { this._date.setDate(value); }

    public get dayOfWeek(): number { return this._date.getDay() }
    public set dayOfWeek(value: number) {
        const current = this.dayOfWeek;

        if (value > current) var diff = value - current;
        else diff = current - value;

        this.day -= diff;
    }

    /**
     * Hours of the date
     */
    public get hours(): number { return this._date.getHours(); }
    public set hours(value: number) { this._date.setHours(value); }

    /**
     * Minutes of the date
     */
    public get minutes(): number { return this._date.getMinutes(); }
    public set minutes(value: number) { this._date.setMinutes(value); }

    /**
     * Seconds of the date
     */
    public get seconds(): number { return this._date.getSeconds(); }
    public set seconds(value: number) { this._date.setSeconds(value); }

    /**
     * Milliseconds of the date
     */
    public get milliseconds(): number { return this._date.getMilliseconds(); }
    public set milliseconds(value: number) { this._date.setMilliseconds(value); }

    /**
     * Millisecond value of internal time
     */
    public get time(): number { return this._date.getTime(); }
    public set time(value: number) { this._date.setTime(value) }

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
        const ymd = this._date.setFullYear(years || this.year, months, days);
        const hmsms = new Date(ymd).setHours(hours || this.hours, minutes, seconds, milliseconds);
        this._date = new Date(hmsms);
        return this;
    }

    /**
     * Calculates the time between this and provided date
     * @param date Date information
     * @returns TimeSpan between this and provided date
     */
    public between(date: DanhoDate | DanhoDateConstructor): TimeSpan {
        if (date instanceof DanhoDate) return new TimeSpan(this._date, date._date);
        else if (date instanceof Date) return new TimeSpan(this._date, date);
        else if (typeof date === 'object') return new DanhoDate(date).between(this._date);
        return new TimeSpan(this._date, new Date(date));
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