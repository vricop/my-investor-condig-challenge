import { describe, it, expect } from "vitest";
import { classNames } from "./classNames";

describe("classNames util", () => {
  it("outputs `one two three oui si yes` string", () => {
    const className = classNames(
      "one",
      null,
      NaN,
      true,
      false,
      undefined,
      "two",
      [],
      {},
      () => void 0,
      "three",
      (() => true)() && "oui",
      1 && "si",
      true && "yes",
      false && "nein",
    );
    expect(className).toBe("one two three oui si yes");
  });
  it("outputs undefined if string is empty", () => {
    const className = classNames(false && "do-not-otuput");
    expect(className).toBe(undefined);
  });
});
