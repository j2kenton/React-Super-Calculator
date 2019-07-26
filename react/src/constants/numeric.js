export const OPERATORS = Object.freeze({
  add: {
    functionName: 'add',
    symbol: '+',
    keyboardChar: '+'
  },
  subtract: {
    functionName: 'subtract',
    symbol: '−',
    keyboardChar: '-'
  },
  multiply: {
    functionName: 'multiply',
    symbol: '×',
    keyboardChar: '*'
  },
  divide: {
    functionName: 'divide',
    symbol: '÷',
    keyboardChar: '/'
  }
});

export const VALID_INPUT_CHARS_REGEX = /^-?[0-9.]*$/;

export const USABLE_INPUT_REGEX = /^-?[0-9]*\.?[0-9]+$/;
