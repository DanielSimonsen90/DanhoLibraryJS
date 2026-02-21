export function classNames(...args: Array<any>): string {
  return args.reduce((acc, arg) => {
    if (!arg) return acc;

    switch (typeof arg) {
      case 'string': {
        acc += arg; 
        break;
      }
      case 'object': {
        if (Array.isArray(arg)) {
          acc += classNames(...arg);
          break;
        } else {
          acc += Object.entries(arg).reduce((objAcc, [key, value]) => objAcc + (value ? key : ''), '');
          break;
        }
      }
      default: {
        acc += `${arg}`;
        break;
      }
    }

    return acc + ' ';
  }, '').trim();
}

export function randomId(length = 16): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
}

export function pluralize(countable: number | ArrayLike<any> | Map<any, any>, singular: string, plural?: string): string {
  const count = (
    typeof countable === 'number' ? countable
    : countable instanceof Map ? countable.size
    : countable.length
  );

  if (count === 1) return singular;
  if (plural) return plural;
  return `${singular}s`;
}