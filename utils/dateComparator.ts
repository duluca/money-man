export function compareDates(a: Date, b: Date) {
  return a.toLocaleDateString() === b.toLocaleDateString()
}