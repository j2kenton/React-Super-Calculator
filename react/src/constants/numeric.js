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
  },
  raiseToPower: {
    functionName: 'raiseToPower',
    symbol: '^',
    keyboardChar: '^'
  }
});

export const VALID_INPUT_CHARS_REGEX = /^-?[0-9.]*$/;

export const USABLE_INPUT_REGEX = /^-?[0-9]*\.?[0-9]+$/;

export const NUMBER_BUTTONS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '-', '0', '.'];
