import { divide } from 'utils/mathematics';

/** ******** INVALID INPUT ********* */
test('divides (non-numeric) strings to get null ', () => {
  expect(divide('a', 'b')).toEqual(null);
});
test('divides empty input values to get null ', () => {
  expect(divide()).toEqual(null);
});
test('divides "null, undefined" input values to get null ', () => {
  expect(divide(null, undefined)).toEqual(null);
});
test('divides partly-empty input values to get null ', () => {
  expect(divide('4')).toEqual(null);
});
test('divides undefined property and number input values to get null ', () => {
  expect(divide({}.a, '5')).toEqual(null);
});

/** ******** INTEGERS ********* */
test('divides numeric strings correctly (1 / 1 = 1)  😊 ', () => {
  expect(divide('1', '1')).toEqual(1);
});
test('divides overloaded arguments to ignore extras and output first two args properly ', () => {
  expect(divide('1', '5', '5')).toEqual(0.2);
});
test('divides numbers as numbers correctly', () => {
  expect(divide(1, 4)).toEqual(0.25);
});

/** ******** FLOATS ********* */
test('divides 1.5 / 0.25 to get 6 ', () => {
  expect(divide('1.5', '0.25')).toEqual(6);
});
test('divides 0.5 / 0.5 to get 1 ', () => {
  expect(divide('0.5', '0.5')).toEqual(1);
});

/** ******** NEGATIVE INTEGERS ********* */
test('divides negative numeric strings correctly (-1 / -1 = 2) ', () => {
  expect(divide('-1', '-1')).toEqual(1);
});
test('divides negative numbers as numbers correctly', () => {
  expect(divide(-1, 4)).toEqual(-0.25);
});

/** ******** NEGATIVE FLOATS ********* */
test('divides -0.5 / -0.5 to get -1 ', () => {
  expect(divide('-0.5', '-0.5')).toEqual(1);
});
test('divides -5.5 / 1.3 to get -4.2 ', () => {
  expect(divide('-5.5', '0.5')).toEqual(-11);
});
test('divides 0.5 / -1.5 to get 1 ', () => {
  expect(divide('0.5', '-1.0')).toEqual(-0.5);
});

/** ******** ZEROS ********* */
test('divides zero and integer to get that integer ', () => {
  expect(divide('0', '3')).toEqual(0);
});
test('divides float and empty string to get that float ', () => {
  expect(divide('4.6', '')).toEqual(Infinity);
});
test('divides two zeros together to get 0 ', () => {
  expect(divide('0', '0')).toEqual(NaN);
});
test('divides two empty strings together to get 0 ', () => {
  expect(divide('', '')).toEqual(NaN);
});
