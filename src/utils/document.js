export const setCursor = (position = 0) => {
  const { activeElement } = document;
  if (activeElement.setSelectionRange) {
    activeElement.setSelectionRange(position, position);
  }
};
