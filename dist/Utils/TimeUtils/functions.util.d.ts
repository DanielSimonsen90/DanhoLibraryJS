export declare function wait<T>(time: number): Promise<void>;
export declare function wait<T>(callback: (...args: any[]) => T, time: number): Promise<T>;
export declare function getUnixTime(date: Date | string): number;
export declare function getUnixTime(timestamp: number): number;
