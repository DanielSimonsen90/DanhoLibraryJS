export type RGB = [number, number, number];
export type Hex = `#${string}`;
export type ColorType = 'hex' | 'rgb' | 'hsl';


export function convert(value: RGB, to: Exclude<ColorType, 'rgb'>): string;
export function convert(value: string, from: Exclude<ColorType, 'rgb'>, to: 'rgb'): RGB;
export function convert(value: string | RGB, fromOrTo: ColorType, to?: ColorType): string | RGB {
  const from = typeof value === 'string' ? fromOrTo : 'rgb';
  const target = typeof value === 'string' ? to : fromOrTo;

  if (from === target) return value as string;

  switch (from) {
    case 'hsl': {
      switch (target) {
        case 'hex': return hslToHex(value as string);
        case 'rgb': return hexToRgb(hslToHex(value as string)) as RGB;
      }
    }
    case 'rgb': {
      switch (target) {
        case 'hex': return hslToHex(rgbToHsl(value as RGB))
        case 'hsl': return rgbToHsl(value as RGB);
      }
    }
    case 'hex': {
      switch (target) {
        case 'rgb': return hexToRgb(value as Hex) as RGB;
        case 'hsl': return rgbToHsl(hexToRgb(value as Hex));
      }
    }
    default: return value;
  }
}

export function generateRandomColor(): Hex {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

export const ColorUtils = {
  convert,
  generateRandomColor
};

export default ColorUtils;

function hslToHex(value?: string): Hex {
  if (!value) return "#000000";

  const match = value.match(/hsl\((\d+), (\d+)%, (\d+)%\)/);
  if (!match) return value as Hex;

  let [_, h, s, l] = match.map(Number);
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const format = (value: number) => {
    const k = (value + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${format(0)}${format(8)}${format(4)}`;
}

function hexToRgb(hex: Hex): RGB {
  if (!hex) return [0, 0, 0];

  const match = hex.match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
  if (!match) return [0, 0, 0];

  let colorString = match[0];

  if (match[0].length === 3) colorString = colorString.split('').map(char => char + char).join('');

  const integer = parseInt(colorString, 16);
  const r = (integer >> 16) & 0xFF;
  const g = (integer >> 8) & 0xFF;
  const b = integer & 0xFF;

  return [r, g, b];
}

function rgbToHsl(rgb: RGB): string {
  let [r, g, b] = rgb.map(x => x / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}