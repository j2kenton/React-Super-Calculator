export const add = (a, b) => (isNaN(a) || isNaN(b) ? null : +a + +b);

export const subtract = (a, b) => add(a, -b);
