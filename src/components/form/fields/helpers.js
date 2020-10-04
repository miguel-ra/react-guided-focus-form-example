export const normalizeAndSlice = (value, maxLength) => {
  const removedSpaces = value.replace(/\s/g, "");
  if (maxLength < 0) return [removedSpaces, ""];
  return [
    removedSpaces?.substr(0, maxLength),
    removedSpaces?.substr(maxLength, removedSpaces.length),
  ];
};

export const generateInputs = (name, size) =>
  [...Array(size)].map((_, index) => ({
    id: index,
    name: `${name}[${index}]`,
  }));
