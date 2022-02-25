export type LongMonth = 'Janurary' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';
export type ShortMonth = 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec';
export type Month = LongMonth | ShortMonth;

export type ShortDay = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
export type LongDay = `${'Mon' | 'Tues' | 'Wednes' | 'Thurs' | 'Fri' | 'Satur' | 'Sun'}day`;
export type Day = ShortDay | LongDay;