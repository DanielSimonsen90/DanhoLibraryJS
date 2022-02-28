type TimeKeys = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond';
export type TimeProperties<Plural extends boolean = false> = Record<Plural extends true ? `${TimeKeys}s` : TimeKeys, number>
export default TimeProperties;