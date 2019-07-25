import { add } from 'utils/mathematics';

/** ******** INVALID INPUT ********* */
test('adds (non-numeric) strings to get null ', () => {
  expect(add('a', 'b')).toEqual(null);
});
test('adds empty input values to get null ', () => {
  expect(add()).toEqual(null);
});
test('adds "null, undefined" input values to get null ', () => {
  expect(add(null, undefined)).toEqual(null);
});
test('adds partly-empty input values to get null ', () => {
  expect(add('4')).toEqual(null);
});
test('adds undefined property and number input values to get null ', () => {
  expect(add({}.a, '5')).toEqual(null);
});

/** ******** INTEGERS ********* */
test('adds numeric strings correctly (1 + 1 = 2)  😊 ', () => {
  expect(add('1', '1')).toEqual(2);
});
test('adds overloaded arguments to ignore extras and output first two args properly ', () => {
  expect(add('1', '3', '5')).toEqual(4);
});
test('adds numbers as numbers correctly', () => {
  expect(add(1, 4)).toEqual(5);
});

/** ******** FLOATS ********* */
test('adds 1.5 + 1.3 to get 2.8 ', () => {
  expect(add('1.5', '1.3')).toEqual(2.8);
});
test('adds 0.5 + 0.5 to get 1 ', () => {
  expect(add('0.5', '0.5')).toEqual(1);
});

/** ******** NEGATIVE INTEGERS ********* */
test('adds negative numeric strings correctly (-1 + -1 = 2) ', () => {
  expect(add('-1', '-1')).toEqual(-2);
});
test('adds negative numbers as numbers correctly', () => {
  expect(add(-1, 4)).toEqual(3);
});

/** ******** NEGATIVE FLOATS ********* */
test('adds -0.5 + -0.5 to get -1 ', () => {
  expect(add('-0.5', '-0.5')).toEqual(-1);
});
test('adds -5.5 + 1.3 to get -4.2 ', () => {
  expect(add('-5.5', '1.3')).toEqual(-4.2);
});
test('adds 0.5 + -1.5 to get 1 ', () => {
  expect(add('0.5', '-1.5')).toEqual(-1);
});

/** ******** ZEROS ********* */
test('adds zero and integer to get that integer ', () => {
  expect(add('0', '3')).toEqual(3);
});
test('adds float and empty string to get that float ', () => {
  expect(add('4.6', '')).toEqual(4.6);
});
test('adds two zeros together to get 0 ', () => {
  expect(add('0', '0')).toEqual(0);
});
test('adds two empty strings together to get 0 ', () => {
  expect(add('', '')).toEqual(0);
});
