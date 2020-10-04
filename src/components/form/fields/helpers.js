export const normalizeAndSlice = (value, maxLength) => {
  const removedSpaces = value.replace(/\s/g, "");
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
