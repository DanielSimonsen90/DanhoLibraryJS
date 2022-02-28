declare type TimeKeys = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond';
export declare type TimeProperties<Plural extends boolean = false> = Record<Plural extends true ? `${TimeKeys}s` : TimeKeys, number>;
export default TimeProperties;
