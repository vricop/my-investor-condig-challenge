import { describe, it, expect } from "vitest"
import { percent } from "./percent"

describe("percent()", () => {
  // \u00A0 => NBSP (Non Breaking Space character) from `Intl.Format` output
  // Something similar to the &nbsp; for HTML entities.
  it("returns 0% by default (es-ES)", () => {
    expect(percent()).toBe("0\u00A0%")
  })

  it("formats positive and negative numbers (es-ES)", () => {
    expect(percent(0.25)).toBe("25\u00A0%")
    expect(percent(-0.5)).toBe("-50\u00A0%")
  })

  it("respects fractionDigits (es-ES)", () => {
    expect(percent(0.125, { fractionDigits: 2 })).toBe("12,50\u00A0%")
    expect(percent(0.1234, { fractionDigits: 1 })).toBe("12,3\u00A0%")
  })

  it("supports en-US locale", () => {
    expect(percent(0.125, { locale: "en-US", fractionDigits: 2 })).toBe(
      "12.50%",
    )
    expect(percent(0.5, { locale: "en-US" })).toBe("50%")
    expect(percent(-0.5, { locale: "en-US" })).toBe("-50%")
  })
})
