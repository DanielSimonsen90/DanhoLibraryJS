type LogOptions = {
  name?: string;
  color?: string;
  preferCollapsed?: boolean;
}

export default class DanhoLogger {
  public name: string;
  public color?: string
  private _preferCollapsed: boolean;
  
  constructor(options: LogOptions = {}) {
    this.name = options.name || 'DanhoLogger';
    this.color = options.color;
    this._preferCollapsed = options.preferCollapsed ?? false;
  }

  private _getPrefix() {
    return {
      prefix: `%c[${this.name}]`,
      style: `color: ${this.color || 'inherit'}; font-weight: bold;`
    };
  }
  private _log(
    type: 'log' | 'warn' | 'error',
    ...args: any[]
  ) {
    const { prefix, style } = this._getPrefix();
    console[type](prefix, style, ...args);
    return this;
  }

  public log(...args: any[]) {
    return this._log('log', ...args);
  }
  public warn(...args: any[]) {
    return this._log('warn', ...args);
  }
  public error(...args: any[]) {
    return this._log('error', ...args);
  }

  public group(...args: any[]) {
    const { prefix, style } = this._getPrefix();

    const groupMethod = this._preferCollapsed ? console.groupCollapsed : console.group;
    groupMethod(prefix, style, ...args);
    
    return this;
  }
  public groupCollapsed(...args: any[]) {
    const { prefix, style } = this._getPrefix();
    console.groupCollapsed(prefix, style, ...args);
    return this;
  }
  public groupEnd(...args: any[]) {
    if (args.length) console.log(...args);
    console.groupEnd();
    return this;
  }

  time(label: string) {
    const { prefix } = this._getPrefix();
    console.time(`${prefix} ${label}`);
    return this;
  }
  timeEnd(label: string) {
    const { prefix } = this._getPrefix();
    console.timeEnd(`${prefix} ${label}`);
    return this;
  }

  table(data: any, columns?: string[]) {
    this.log();
    console.table(data, columns);
    return this;
  }
}