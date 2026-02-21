"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorUtils = exports.generateRandomColor = exports.convert = void 0;
function convert(value, fromOrTo, to) {
    const from = typeof value === 'string' ? fromOrTo : 'rgb';
    const target = typeof value === 'string' ? to : fromOrTo;
    if (from === target)
        return value;
    switch (from) {
        case 'hsl': {
            switch (target) {
                case 'hex': return hslToHex(value);
                case 'rgb': return hexToRgb(hslToHex(value));
            }
        }
        case 'rgb': {
            switch (target) {
                case 'hex': return hslToHex(rgbToHsl(value));
                case 'hsl': return rgbToHsl(value);
            }
        }
        case 'hex': {
            switch (target) {
                case 'rgb': return hexToRgb(value);
                case 'hsl': return rgbToHsl(hexToRgb(value));
            }
        }
        default: return value;
    }
}
exports.convert = convert;
function generateRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}
exports.generateRandomColor = generateRandomColor;
exports.ColorUtils = {
    convert,
    generateRandomColor
};
exports.default = exports.ColorUtils;
function hslToHex(value) {
    if (!value)
        return "#000000";
    const match = value.match(/hsl\((\d+), (\d+)%, (\d+)%\)/);
    if (!match)
        return value;
    let [_, h, s, l] = match.map(Number);
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const format = (value) => {
        const k = (value + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${format(0)}${format(8)}${format(4)}`;
}
function hexToRgb(hex) {
    if (!hex)
        return [0, 0, 0];
    const match = hex.match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
    if (!match)
        return [0, 0, 0];
    let colorString = match[0];
    if (match[0].length === 3)
        colorString = colorString.split('').map(char => char + char).join('');
    const integer = parseInt(colorString, 16);
    const r = (integer >> 16) & 0xFF;
    const g = (integer >> 8) & 0xFF;
    const b = integer & 0xFF;
    return [r, g, b];
}
function rgbToHsl(rgb) {
    let [r, g, b] = rgb.map(x => x / 255);
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}
