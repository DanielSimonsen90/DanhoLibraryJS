export type Case = 'camel' | 'pascal' | 'snake' | 'kebab' | 'lower' | 'upper';

declare global {
  interface String {
    /**
     * Converts string from one case to another.
     * @param from Case to convert from
     * @param to Cases to convert to, in order. If multiple cases are provided, they will be applied in order
     */
    convertCase<To extends Array<Case>, Return extends To extends [...Array<Case>, infer To] ? To : Case>(
      from: Case,
      ...to: To
    ): (
      Return extends 'upper' ? Uppercase<string>
      : Return extends 'lower' ? Lowercase<string>
      : Return extends 'pascal' ? Capitalize<string>
      : Return extends 'camel' ? Uncapitalize<string>
      : string
    );
  }
}

const caseMap: Record<Case, Record<Case, (str: string) => string>> = {
  camel: {
    camel: (str) => str,
    lower: (str: string) => str.toLowerCase(),
    upper: (str: string) => str.toUpperCase(),

    pascal: (str: string) => str[0].toUpperCase() + str.replace(/([A-Z])/g, (match) => ` ${match}`).slice(1),
    snake: (str: string) => str.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`),
    kebab: (str: string) => str.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`),
  },
  pascal: {
    pascal: (str) => str,
    lower: (str: string) => str.toLowerCase(),
    upper: (str: string) => str.toUpperCase(),

    camel: (str: string) => str[0].toLowerCase() + str.slice(1),
    snake: (str: string) => str.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`),
    kebab: (str: string) => str.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`),
  },
  snake: {
    snake: (str) => str,
    lower: (str: string) => str.toLowerCase(),
    upper: (str: string) => str.toUpperCase(),

    camel: (str: string) => str.replace(/(_\w)/g, (match) => match[1].toUpperCase()),
    pascal: (str: string) => str[0].toUpperCase() + str.substring(1, str.length).replace(/(_\w)/g, (match) => match[1].toUpperCase()),
    kebab: (str: string) => str.replace(/_/g, '-'),
  },
  kebab: {
    kebab: (str) => str,
    lower: (str: string) => str.toLowerCase(),
    upper: (str: string) => str.toUpperCase(),

    camel: (str: string) => str.replace(/(-\w)/g, (match) => match[1].toUpperCase()),
    pascal: (str: string) => str[0].toUpperCase() + str.substring(1, str.length).replace(/(-\w)/g, (match) => match[1].toUpperCase()),
    snake: (str: string) => str.replace(/-/g, '_'),
  },

  lower: {
    lower: (str) => str.toLowerCase(),
    upper: (str: string) => str.toUpperCase(),

    camel: (str: string) => str,
    pascal: (str: string) => str[0].toUpperCase() + str.slice(1),
    snake: (str: string) => str,
    kebab: (str: string) => str,
  },

  upper: {
    upper: (str) => str.toUpperCase(),
    camel: (str: string) => str[0].toLowerCase() + str.slice(1),
    pascal: (str: string) => str[0].toUpperCase() + str.toLowerCase().slice(1),
    snake: (str: string) => str.replace(/ /g, '_'),
    kebab: (str: string) => str.replace(/ /g, '-'),
    lower: (str: string) => str.toLowerCase(),
  }
};

export const convertCase = <
  TValue extends string,
  To extends Array<Case>,
  Return extends To extends [...Array<Case>, infer To] ? To : Case
>(
  value: TValue,
  from: Case,
  ...to: To
): (
    Return extends 'upper' ? Uppercase<TValue>
    : Return extends 'lower' ? Lowercase<TValue>
    : Return extends 'pascal' ? Capitalize<TValue>
    : Return extends 'camel' ? Uncapitalize<TValue>
    : string
  ) => to.reduce((str, toCase) => caseMap[from][toCase](str), value as string) as any;