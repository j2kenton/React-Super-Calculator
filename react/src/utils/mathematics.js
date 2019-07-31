export const add = (a, b) => (isNaN(a) || isNaN(b) ? null : +a + +b);

export const subtract = (a, b) => add(a, -b);

export const multiply = (a, b) => (isNaN(a) || isNaN(b) ? null : +a * +b);

export const divide = (a, b) => multiply(a, 1 / b);

export const raiseToPower = (a, b) => a ** b;
