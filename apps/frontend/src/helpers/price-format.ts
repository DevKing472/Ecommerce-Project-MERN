export function formatAsPrice(value: number | string) {
  return new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'EUR',
  }).format(typeof value === 'string' ? Number(value) : value);
}
