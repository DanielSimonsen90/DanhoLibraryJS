import { BetterOmit, PartialExcept, LongMonth, LongDay, ShortDay, ShortMonth } from "../../Types";
import Time from "./Time";
import TimeProperties from "./TimeProperties";
import TimeSpan, { TimeSpanFormat } from "./TimeSpan";

type Data = PartialExcept<BetterOmit<TimeProperties<true>, 'weeks'>, 'years' | 'months'>;
type Double = `${number}${number}`;
type Quadruple = `${Double}${Double}`;
type DateFormat = `${Double}/${Double}/${Quadruple}`;
type Constructor = Data | DateFormat | number | Date;

const doubleDigit = (value: number) => value.toString().length < 2 ? `0${value}` : value.toString(); 
const monthNames = new Array<LongMonth>(
    'Janurary', 'February', 
    'March', 'April', 'May',
    'June', 'July', 'August',
    'September', 'October', 'November',
    'December'
);
const dayNames = new Array<LongDay>('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');

class DanhoDate {
    constructor(data: Constructor) {
        // data is typeof Date
        if (typeof data === 'object' && data instanceof Date) {
            this._date = new Date(data);
        } 
        // data is typeof Data
        else if (typeof data === 'object') {
            const { years, months, days, hours, minutes, seconds, milliseconds } = data;
            this._date = new Date(years, months, days, hours, minutes, seconds, milliseconds)
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
        let result = 0;

        while (timeDifference > ms) {
            timeDifference -= ms;
            result++;
        }

        return [result, timeDifference];
    }
    private _format(format: string) {
        return format
        .replaceAll('$year', this.year.toString())
        .replaceAll('$daysInMonth', this.daysInMonth.toString())
        .replaceAll('$monthShort', this.monthNameShort)
        .replaceAll('$month', this.monthName)
        .replaceAll('$MM', doubleDigit(this.month))
        .replaceAll('$M', this.month.toString())

        .replaceAll('$weekMonth', this.weekOfMonth.toString())
        .replaceAll('$weekDay', this.weekDay)
        .replaceAll('$weekDayShort', this.weekDayShort)
        .replaceAll('$week', this.week.toString())
        
        .replaceAll('$dd', doubleDigit(this.day))
        .replaceAll('$d', this.day.toString())

        .replaceAll('$hh12', `${doubleDigit(this.hours)}${this.hours < 12 ? 'AM' : 'PM'}`)
        .replaceAll('$h12', `${this.hours > 12 ? 12 - this.hours : this.hours}${this.hours < 12 ? 'AM' : 'PM'}`)
        .replaceAll('$hh24', doubleDigit(this.hours))
        .replaceAll('$h24', this.hours.toString())

        .replaceAll('$msms', doubleDigit(this.milliseconds))
        .replaceAll('$ms', this.milliseconds.toString())
        
        .replaceAll('$ss', doubleDigit(this.seconds))
        .replaceAll('$s', this.seconds.toString())
        
        .replaceAll('$mm', doubleDigit(this.minutes))
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
    public get month(): number { return this._date.getMonth() }
    public set month(value: number) { this._date.setMonth(value) }

    /**
     * Days in the month of the date
     */
    public get daysInMonth() { return Time.daysInMonth[this.month - 1]; }

    /**
     * Week of the year the day is in
     */
    public get week(): number {
        const days = Time.daysInMonth.filter((v, i) => i + 1 <= this.month).reduce((result, i) => result + i, 0);
        return this._reduceTime(Time.week, this._date.getTime() / (days * Time.day))[0];
    }
    public set week(value: number) { this._date.setDate(value * Time.week / Time.day); }

    /**
     * Week of the month the day is in
     */
    public get weekOfMonth(): number { return Math.round(this.daysInMonth * Time.week / Time.day); }

    /**
     * Day of the date
     */
    public get day(): number { return this._date.getDate(); }
    public set day(value: number) { this._date.setDate(value); }

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
    public get weekDay(): LongDay { return dayNames[this.day - 1] || dayNames.at(-1); }
    /**
     * Short week day i.e. Mon
     */
    public get weekDayShort(): ShortDay { return this.weekDay.substring(0, 3) as ShortDay; }
    /**
     * Month name i.e. February
     */
    public get monthName(): LongMonth { return monthNames[this.month - 1] || monthNames.at(-1); }
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
    public between(date: DanhoDate | Constructor): TimeSpan {
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