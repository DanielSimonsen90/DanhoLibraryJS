import { BetterOmit, PropertiesWith, PartialExcept, LongMonth, LongDay, ShortDay, ShortMonth } from "../../Types";
import { Time } from "./Time";
import TimeSpan from "./TimeSpan";

type Data = PartialExcept<BetterOmit<PropertiesWith<number, TimeSpan>, 'weeks'>, 'years' | 'months'>;
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
        // Initialize _date
        if (typeof data === 'object' && data instanceof Date) {
            this._date = new Date(data);
        } 
        else if (typeof data === 'object') {
            const { years, months, days, hours, minutes, seconds, milliseconds } = data;
            this._date = new Date(years, months, days, hours, minutes, seconds, milliseconds)
        }
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

    public get day(): number { return this._date.getDate(); }
    public set day(value: number) { this._date.setDate(value); }

    public get hours(): number { return this._date.getHours(); }
    public set hours(value: number) { this._date.setHours(value); }

    public get minutes(): number { return this._date.getMinutes(); }
    public set minutes(value: number) { this._date.setMinutes(value); }

    public get seconds(): number { return this._date.getSeconds(); }
    public set seconds(value: number) { this._date.setSeconds(value); }

    public get milliseconds(): number { return this._date.getMilliseconds(); }
    public set milliseconds(value: number) { this._date.setMilliseconds(value); }

    /**
     * Full name of the day
     */
    public get weekDay(): LongDay { return dayNames[this.day - 1] || dayNames.at(-1); }
    /**
     * Full name of the day shortened to 3 characters
     */
    public get weekDayShort(): ShortDay { return this.weekDay.substring(0, 3) as ShortDay; }
    /**
     * Full name of the month
     */
    public get monthName(): LongMonth { return monthNames[this.month - 1] || monthNames.at(-1); }
    /**
     * Full name of the month shortened to 3 characters
     */
    public get monthNameShort(): ShortMonth { return this.monthName.substring(0, 3) as ShortMonth; }

    public set(data: Partial<Data>) {
        const { years, months, days, hours, minutes, seconds, milliseconds } = data;
        const ymd = this._date.setFullYear(years || this.year, months, days);
        const hmsms = new Date(ymd).setHours(hours || this.hours, minutes, seconds, milliseconds);
        this._date = new Date(hmsms);
        return this;
    }

    public between(date: DanhoDate | Constructor): TimeSpan {
        if (date instanceof DanhoDate) return new TimeSpan(this._date, date._date);
        else if (date instanceof Date) return new TimeSpan(this._date, date);
        else if (typeof date === 'object') return new DanhoDate(date).between(this._date);
        return new TimeSpan(this._date, new Date(date));
    }
    public toString(format = "$dd/$MM/$year") {
        return format
        .replaceAll('$year', this.year.toString())
        .replaceAll('$month', this.monthName)
        .replaceAll('$monthShort', this.monthNameShort)
        .replaceAll('$MM', doubleDigit(this.month))
        .replaceAll('$M', this.month.toString())

        .replaceAll('$week', this.week.toString())
        .replaceAll('$weekMonth', this.weekOfMonth.toString())

        .replaceAll('$weekDay', this.weekDay)
        .replaceAll('$weekDayShort', this.weekDayShort)
        .replaceAll('$dd', doubleDigit(this.day))
        .replaceAll('$d', this.day.toString())

        .replaceAll('$hh12', `${doubleDigit(this.hours)}${this.hours < 12 ? 'AM' : 'PM'}`)
        .replaceAll('$h12', `${this.hours > 12 ? 12 - this.hours : this.hours}${this.hours < 12 ? 'AM' : 'PM'}`)
        .replaceAll('$hh24', doubleDigit(this.hours))
        .replaceAll('$h24', this.hours.toString())

        .replaceAll('$mm', doubleDigit(this.minutes))
        .replaceAll('$m', this.minutes.toString())

        .replaceAll('$ss', doubleDigit(this.seconds))
        .replaceAll('$s', this.seconds.toString())

        .replaceAll('$msms', doubleDigit(this.milliseconds))
        .replaceAll('$ms', this.milliseconds.toString())

        .replaceAll('$relative', this.between(new Date()).toString())
    }

}
export { DanhoDate as Date }
export default DanhoDate;