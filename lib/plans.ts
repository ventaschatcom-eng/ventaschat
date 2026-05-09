export const CREDIT_PACKS = [
  {
    id: "pack_20",
    credits: 20,
    label: "Starter",
    amountCOP: 20000,
    amountCOPCents: 2000000,
    description: "20 análisis",
    highlight: false,
  },
  {
    id: "pack_50",
    credits: 50,
    label: "Growth",
    amountCOP: 50000,
    amountCOPCents: 5000000,
    description: "50 análisis",
    highlight: true,
  },
  {
    id: "pack_120",
    credits: 120,
    label: "Pro",
    amountCOP: 90000,
    amountCOPCents: 9000000,
    description: "120 análisis",
    highlight: false,
  },
] as const;

export type PackId = (typeof CREDIT_PACKS)[number]["id"];

export function getPackById(id: string) {
  return CREDIT_PACKS.find((p) => p.id === id) ?? null;
}
