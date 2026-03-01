declare global {
  interface Array<T> {
    /**
     * Joins the elements of the array into a string, with optional custom separators.
     * @param separator The default separator to use between elements. Defaults to ','.
     * @param endSeparator The separator to use before the last element. Default is '&'.
     * @returns A string with the joined elements.
     */
    join(separator?: string, endSeparator?: string): string;
  }
}

export function join<T>(this: Array<T>, separator = ',', endSeparator = '&'): string {
  const validArgs = this.filter(arg => !Object.isNullOrUndefined(arg) && arg !== '');
  if (!validArgs.length) return '';
  if (validArgs.length === 1) return validArgs.shift()!.toString();

  const lastArg = validArgs.pop()!;
  const combinedArgs = validArgs.join(separator);
  return `${combinedArgs}${endSeparator ? ` ${endSeparator} ` : ''}${lastArg}`;
}