export type RGB = [number, number, number];
export type Hex = `#${string}`;
export type ColorType = 'hex' | 'rgb' | 'hsl';
export declare function convert(value: RGB, to: Exclude<ColorType, 'rgb'>): string;
export declare function convert(value: string, from: Exclude<ColorType, 'rgb'>, to: 'rgb'): RGB;
export declare function generateRandomColor(): Hex;
export declare const ColorUtils: {
    convert: typeof convert;
    generateRandomColor: typeof generateRandomColor;
};
export default ColorUtils;
