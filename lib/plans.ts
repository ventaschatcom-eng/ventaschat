export const CREDIT_PACKS = [
  {
    id: "pack_20",
    credits: 20,
    label: "Starter",
    amountCOP: 20000,
    amountCOPCents: 2000000,
    description: "20 análisis",
    perAnalysis: 1000,
    highlight: false,
  },
  {
    id: "pack_50",
    credits: 50,
    label: "Growth",
    amountCOP: 50000,
    amountCOPCents: 5000000,
    description: "50 análisis",
    perAnalysis: 1000,
    highlight: false,
  },
  {
    id: "pack_120",
    credits: 120,
    label: "Pack Pro",
    amountCOP: 90000,
    amountCOPCents: 9000000,
    description: "120 análisis",
    perAnalysis: 750,
    highlight: false,
  },
] as const;

export const PRO_SUBSCRIPTION = {
  id: "sub_pro",
  label: "Pro Ilimitado",
  amountCOP: 89000,
  amountCOPCents: 8900000,
  description: "Análisis ilimitados / mes",
  perks: [
    "Análisis ilimitados (sin contar créditos)",
    "OCR de capturas de WhatsApp",
    "Tracking de ventas cerradas/perdidas",
    "Coaching basado en tus patrones",
    "Historial completo y búsqueda",
    "Soporte prioritario",
  ],
} as const;

export type PackId = (typeof CREDIT_PACKS)[number]["id"];

export function getPackById(id: string) {
  return CREDIT_PACKS.find((p) => p.id === id) ?? null;
}
