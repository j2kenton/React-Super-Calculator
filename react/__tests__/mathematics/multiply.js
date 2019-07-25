import { multiply } from 'utils/mathematics';

/** ******** INVALID INPUT ********* */
test('multiplies (non-numeric) strings to get null ', () => {
  expect(multiply('a', 'b')).toEqual(null);
});
test('multiplies empty input values to get null ', () => {
  expect(multiply()).toEqual(null);
});
test('multiplies "null, undefined" input values to get null ', () => {
  expect(multiply(null, undefined)).toEqual(null);
});
test('multiplies partly-empty input values to get null ', () => {
  expect(multiply('4')).toEqual(null);
});
test('multiplies undefined property and number input values to get null ', () => {
  expect(multiply({}.a, '5')).toEqual(null);
});

/** ******** INTEGERS ********* */
test('multiplies numeric strings correctly (1 * 1 = 1)  😊 ', () => {
  expect(multiply('1', '1')).toEqual(1);
});
test('multiplies overloaded arguments to ignore extras and output first two args properly ', () => {
  expect(multiply('1', '3', '5')).toEqual(3);
});
test('multiplies numbers as numbers correctly', () => {
  expect(multiply(1, 4)).toEqual(4);
});

/** ******** FLOATS ********* */
test('multiplies 1.5 * 2 to get 2.8 ', () => {
  expect(multiply('1.5', '2')).toEqual(3);
});
test('multiplies 0.5 * 0.5 to get 0.25 ', () => {
  expect(multiply('0.5', '0.5')).toEqual(0.25);
});

/** ******** NEGATIVE INTEGERS ********* */
test('multiplies negative numeric strings correctly (-1 * -1 = 1) ', () => {
  expect(multiply('-1', '-1')).toEqual(1);
});
test('multiplies negative numbers as numbers correctly', () => {
  expect(multiply(-1, 4)).toEqual(-4);
});

/** ******** NEGATIVE FLOATS ********* */
test('multiplies -0.5 * -0.5 to get 0.25 ', () => {
  expect(multiply('-0.5', '-0.5')).toEqual(0.25);
});
test('multiplies -5.5 * 1.3 to get -4.2 ', () => {
  expect(multiply('-5.5', '1.3')).toEqual(-7.15);
});
test('multiplies 0.5 * -1.5 to get 1 ', () => {
  expect(multiply('0.5', '-1.5')).toEqual(-0.75);
});

/** ******** ZEROS ********* */
test('multiplies zero and integer to get that integer ', () => {
  expect(multiply('0', '3')).toEqual(0);
});
test('multiplies float and empty string to get that float ', () => {
  expect(multiply('4.6', '')).toEqual(0);
});
test('multiplies two zeros together to get 0 ', () => {
  expect(multiply('0', '0')).toEqual(0);
});
test('multiplies two empty strings together to get 0 ', () => {
  expect(multiply('', '')).toEqual(0);
});
