type LogOptions = {
    name?: string;
    color?: string;
    preferCollapsed?: boolean;
};
export default class DanhoLogger {
    name: string;
    color?: string;
    private _preferCollapsed;
    constructor(options?: LogOptions);
    private _getPrefix;
    private _log;
    log(...args: any[]): this;
    warn(...args: any[]): this;
    error(...args: any[]): this;
    group(...args: any[]): this;
    groupCollapsed(...args: any[]): this;
    groupEnd(...args: any[]): this;
    time(label: string): this;
    timeEnd(label: string): this;
    table(data: any, columns?: string[]): this;
}
export {};
