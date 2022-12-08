import moment from 'moment';

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
  const newTemp = (cTemp * 9) / 5 + 32;
  const newTempNoDecimals = newTemp.toFixed();
  return parseInt(newTempNoDecimals, 10);
};
export const fToC = (fTemp: number): number => {
  const newTemp = ((fTemp - 32) * 5) / 9;
  const newTempNoDecimals = newTemp.toFixed();
  return parseInt(newTempNoDecimals, 10);
};

export const displayDayOfWeek = (date: string | moment.Moment): string => {
  if (!date) {
    date = moment();
  }
  let day: string;
  if (typeof date === 'string') {
    day = moment(date).format('dddd');
  } else {
    day = date.format('dddd');
  }
  return day;
};

export const isObject = (object) =>
  object != null && typeof object === 'object';

export const deepEqual = (object1 = {}, object2 = {}) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }
  return true;
};
