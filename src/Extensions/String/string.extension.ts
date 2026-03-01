declare global {
  interface String {
    truncate(length: number, ellipsis?: string): string;
  }
}

export function truncate(this: string, length: number, ellipsis: string = "..."): string {
  if (this.length <= length) return this;
  return this.slice(0, length - ellipsis.length) + ellipsis;
}
String.prototype.truncate = truncate;