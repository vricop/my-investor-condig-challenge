type PercentParams = {
  fractionDigits?: number;
  locale?: string;
};

export function percent(
  value: number = 0,
  { fractionDigits = 0, locale = "es-ES" }: PercentParams = {},
) {
  return Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}
