export const setCursor = (element, position = 0) => {
  if (element) {
    element.setSelectionRange(position, position);
  }
};
