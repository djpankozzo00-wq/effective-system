export function formatBRL(cents: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
}
export function toCents(value: number) {
  if (!Number.isFinite(value) || value <= 0) throw new Error("Valor inválido");
  return Math.round(value * 100);
}