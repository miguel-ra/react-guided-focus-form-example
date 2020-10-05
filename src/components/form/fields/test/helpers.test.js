import { generateInputs, normalizeAndSlice } from "../helpers";

const VALUE = " 1234 5678 90 ";

describe("normalizeAndSlice", () => {
  it("Should return valid normalization", () => {
    const LENGTH = 2;
    const RESULT = ["12", "34567890"];

    let result = normalizeAndSlice(VALUE, LENGTH);
    expect(result).toEqual(RESULT);
  });
  it("Should return value wihtout slice if lengths is over the edges", () => {
    const RESULT = "1234567890";

    expect(normalizeAndSlice(VALUE, 0)).toEqual(["", RESULT]);
    expect(normalizeAndSlice(VALUE, VALUE.length)).toEqual([RESULT, ""]);
  });

  it("Should return normalized value in frirst possition if length is not valid", () => {
    const LENGTH = -1;
    const RESULT = "1234567890";

    const result = normalizeAndSlice(VALUE, LENGTH);

    expect(result).toEqual([RESULT, ""]);
  });
});

describe("generateInputs", () => {
  it("Should generate and array with 3 object {id, name}", () => {
    const NAME = "NAME";
    const SIZE = 3;
    const RESULT = [
      { id: 0, name: "NAME[0]" },
      { id: 1, name: "NAME[1]" },
      { id: 2, name: "NAME[2]" },
    ];

    const result = generateInputs(NAME, SIZE);

    expect(result).toEqual(RESULT);
  });
});
