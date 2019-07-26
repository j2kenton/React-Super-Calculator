export const OPERATORS = Object.freeze({
  add: {
    functionName: 'add',
    symbol: '+'
  },
  subtract: {
    functionName: 'subtract',
    symbol: '−'
  },
  multiply: {
    functionName: 'multiply',
    symbol: '×'
  },
  divide: {
    functionName: 'divide',
    symbol: '÷'
  }
});

export const VALID_INPUT_CHARS_REGEX = /^-?[0-9.]*$/;

export const USABLE_INPUT_REGEX = /^-?[0-9]*\.?[0-9]+$/;
