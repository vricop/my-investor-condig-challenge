export const comparators = {
  string(a: unknown, b: unknown) {
    return String(a ?? "").localeCompare(String(b ?? ""), undefined, {
      numeric: true,
      sensitivity: "base",
    });
  },
  number(a: unknown, b: unknown) {
    const na = Number(a);
    const nb = Number(b);
    if (Number.isNaN(na) && Number.isNaN(nb)) return 0;
    if (Number.isNaN(na)) return 1; // NaN/undefined last
    if (Number.isNaN(nb)) return -1;
    return na - nb;
  },
} as const;
