export function formatPrice(amount: number, currency: string = "ETB") {
  return Intl.NumberFormat("en-us", {
    style: "currency",
    currency,
  }).format(amount);
}
