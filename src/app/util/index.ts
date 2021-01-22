export const determineInputType = (inputValue: string): string => {
  let inputType = 'string';
  const newInputValue = parseInt(inputValue, 10);
  if (Number.isFinite(newInputValue)) {
    inputType = 'number';
  }
  return inputType;
};

export const replaceSpacesForApi = (inputValue: string): string =>
  inputValue.trim().replaceAll(' ', '%20').toLowerCase();
