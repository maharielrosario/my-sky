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

export const cToF = (cTemp: number): number => {
  // prettier-ignore
  const newTemp = cTemp * 9 / 5 + 32;
  const newTempNoDecimals = newTemp.toFixed();
  return parseInt(newTempNoDecimals, 10);
};
export const fToC = (fTemp: number): number => {
  // prettier-ignore
  const newTemp = (fTemp - 32) * 5 / 9;
  const newTempNoDecimals = newTemp.toFixed();
  return parseInt(newTempNoDecimals, 10);
};
