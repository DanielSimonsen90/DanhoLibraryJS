export function ensureStartZero(num: number): string {
  return num < 10 ? `0${num}` : num.toString();
}

export function get12HourFormat(hour: number): string {
  if (hour === 0) return '12am';
  if (hour > 12) return `${hour - 12}pm`;
  return `${hour}am`;
}

export function get24HourFormat(hour: number): string {
  return ensureStartZero(hour);
}