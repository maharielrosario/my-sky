export const normalizeInput = (
  inputValue: string
): { normalizedInputValue: string; inputType: string } => {
  let normalizedInputValue: string = inputValue;
  let inputType = 'string';
  const newInputValue = parseInt(inputValue, 10);
  if (Number.isFinite(newInputValue)) {
    inputType = 'number';
  } else {
    normalizedInputValue = inputValue
      .trim()
      .replaceAll(' ', '%20')
      .toLowerCase();
  }
  return { normalizedInputValue, inputType };
};
