export type RGB = [number, number, number];
export type Hex = `#${string}`;
export type ColorType = 'hex' | 'rgb' | 'hsl';


export function convert(value: string, from: ColorType, to: ColorType): string {
  if (from === to) return value;

  switch (from) {
    case 'hsl': {
      switch (to) {
        case 'hex': return hslToHex(value);
        case 'rgb': return hexToRgb(hslToHex(value)).join(', ');
      }
    }
    case 'rgb': {
      switch (to) {
        case 'hex': return rgbToHex(hexToRgb(value as Hex));
        case 'hsl': return hslToHex(rgbToHex(hexToRgb(value as Hex)));
      }
    }
    case 'hex': {
      switch (to) {
        case 'rgb': return hexToRgb(value as Hex).join(', ');
        case 'hsl': return hslToHex(value as Hex);
      }
    }
    default: return value;
  }
}

export function generateRandomColor(): Hex {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
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

function rgbToHex(rgb: RGB): Hex {
  const [r, g, b] = rgb;
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}