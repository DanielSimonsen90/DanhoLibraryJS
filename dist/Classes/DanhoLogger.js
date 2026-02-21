"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DanhoLogger {
    name;
    color;
    _preferCollapsed;
    constructor(options = {}) {
        this.name = options.name || 'DanhoLogger';
        this.color = options.color;
        this._preferCollapsed = options.preferCollapsed ?? false;
    }
    _getPrefix() {
        return {
            prefix: `%c[${this.name}]`,
            style: `color: ${this.color || 'inherit'}; font-weight: bold;`
        };
    }
    _log(type, ...args) {
        const { prefix, style } = this._getPrefix();
        console[type](prefix, style, ...args);
        return this;
    }
    log(...args) {
        return this._log('log', ...args);
    }
    warn(...args) {
        return this._log('warn', ...args);
    }
    error(...args) {
        return this._log('error', ...args);
    }
    group(...args) {
        const { prefix, style } = this._getPrefix();
        const groupMethod = this._preferCollapsed ? console.groupCollapsed : console.group;
        groupMethod(prefix, style, ...args);
        return this;
    }
    groupCollapsed(...args) {
        const { prefix, style } = this._getPrefix();
        console.groupCollapsed(prefix, style, ...args);
        return this;
    }
    groupEnd(...args) {
        if (args.length)
            console.log(...args);
        console.groupEnd();
        return this;
    }
    time(label) {
        const { prefix } = this._getPrefix();
        console.time(`${prefix} ${label}`);
        return this;
    }
    timeEnd(label) {
        const { prefix } = this._getPrefix();
        console.timeEnd(`${prefix} ${label}`);
        return this;
    }
    table(data, columns) {
        this.log();
        console.table(data, columns);
        return this;
    }
}
exports.default = DanhoLogger;
