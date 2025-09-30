import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";

describe.each([
  { input: "  hello  world  ", expected: ["hello", "world"] },
  { input: "HeLLo WoRLd", expected: ["hello", "world"] },
  { input: "   TEST   ", expected: ["test"] },
  { input: "foo     bar    baz", expected: ["foo", "bar", "baz"] },
  { input: "", expected: [] },
  { input: "     ", expected: [] },
  { input: "\tHello\nWorld ", expected: ["hello", "world"] },
  { input: "Hello, world!", expected: ["hello,", "world!"] },
  { input: "  123 test #Hash ", expected: ["123", "test", "#hash"] },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);
    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});