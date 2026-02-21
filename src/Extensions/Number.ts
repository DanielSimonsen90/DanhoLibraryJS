type Separators = {
  thousand: string;
  decimal: string;
}

declare global {
  interface Number {
    toString(separators?: Partial<Separators>): string;
    toRomanNumeral(): string;
  }
}

export function toString(this: number, separatorsOrRadix?: Partial<Separators> | number): string {
  if (typeof separatorsOrRadix !== 'object' || Object.isNullOrUndefined(separatorsOrRadix)) return this.toString(separatorsOrRadix);
  
  const { thousand = '.', decimal = '.' } = separatorsOrRadix as Partial<Separators>;
  const [integerPart, decimalPart] = this.toString().split('.');
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousand);
  return decimalPart ? `${formattedInteger}${decimal}${decimalPart}` : formattedInteger;
}
Number.prototype.toString = toString;

export function toRomanNumeral(this: number): string {
  if (this <= 0 || this >= 4000) throw new RangeError('Number must be between 1 and 3999 to convert to Roman numeral');

  const numeralMap: [number, string][] = [
    [1000, 'M'], 
    [900, 'CM'], 
    [500, 'D'], 
    [400, 'CD'],
    [100, 'C'], 
    [90, 'XC'], 
    [50, 'L'], 
    [40, 'XL'],
    [10, 'X'], 
    [9, 'IX'], 
    [5, 'V'], 
    [4, 'IV'],
    [1, 'I']
  ];

  let value = this;
  return numeralMap.reduce((acc, [numeralValue, numeral]) => {
    while (value >= numeralValue) {
      acc += numeral;
      value -= numeralValue;
    }

    return acc;
  }, '');
}
Number.prototype.toRomanNumeral = toRomanNumeral;
