export declare const TimeUtils: {
    throttle<T>(throttleId: string, callback: () => T, cooldown: number): T;
    wrapInThrottle<T_1>(callback: (...args: T_1[]) => void, cooldown: number): (...args: T_1[]) => void;
    isThrottleOnCooldown(throttleId: string): boolean;
    debounce<T_2>(debounceId: string, callback: () => T_2, delay: number, signal?: AbortSignal | undefined): Promise<T_2>;
    wrapInDebounce<T_3>(callback: (...args: T_3[]) => void, delay: number): {
        debounced: (...args: T_3[]) => Promise<void>;
        controller: AbortController;
        abort: () => void;
    };
    wait<T_4>(time: number): Promise<void>;
    wait<T_5>(callback: (...args: any[]) => T_5, time: number): Promise<T_5>;
    getUnixTime(date: string | Date): number;
    getUnixTime(timestamp: number): number;
};
