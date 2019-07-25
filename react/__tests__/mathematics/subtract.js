import { subtract } from 'utils/mathematics';

/** ******** INVALID INPUT ********* */
test('subtracts (non-numeric) strings to get null ', () => {
  expect(subtract('a', 'b')).toEqual(null);
});
test('subtracts empty input values to get null ', () => {
  expect(subtract()).toEqual(null);
});
test('subtracts "null, undefined" input values to get null ', () => {
  expect(subtract(null, undefined)).toEqual(null);
});
test('subtracts partly-empty input values to get null ', () => {
  expect(subtract('4')).toEqual(null);
});
test('subtracts undefined property and number input values to get null ', () => {
  expect(subtract({}.a, '5')).toEqual(null);
});

/** ******** INTEGERS ********* */
test('subtracts numeric strings correctly (1 - 1 = 0)  😊 ', () => {
  expect(subtract('1', '1')).toEqual(0);
});
test('subtracts overloaded arguments to ignore extras and output first two args properly ', () => {
  expect(subtract('1', '3', '5')).toEqual(-2);
});
test('subtracts numbers as numbers correctly', () => {
  expect(subtract(1, 4)).toEqual(-3);
});

/** ******** FLOATS ********* */
test('subtracts 1.5 - 1.3 to get 2.8 ', () => {
  expect(subtract('1.1', '1.1')).toEqual(0);
});
test('subtracts 0.5 - 0.5 to get 1 ', () => {
  expect(subtract('0.5', '0.5')).toEqual(0);
});

/** ******** NEGATIVE INTEGERS ********* */
test('subtracts negative numeric strings correctly (-1 - -1 = 0) ', () => {
  expect(subtract('-1', '-1')).toEqual(0);
});
test('subtracts negative numbers as numbers correctly', () => {
  expect(subtract(-1, 4)).toEqual(-5);
});

/** ******** NEGATIVE FLOATS ********* */
test('subtracts -0.5 - -0.5 to get 0 ', () => {
  expect(subtract('-0.5', '-0.5')).toEqual(0);
});
test('subtracts -5.5 - 1.3 to get -6.8 ', () => {
  expect(subtract('-5.5', '1.3')).toEqual(-6.8);
});
test('subtracts 0.5 - -1.5 to get 2 ', () => {
  expect(subtract('0.5', '-1.5')).toEqual(2);
});

/** ******** ZEROS ********* */
test('subtracts zero and integer to get that integer but negative ', () => {
  expect(subtract('0', '3')).toEqual(-3);
});
test('subtracts float and empty string to get that float ', () => {
  expect(subtract('4.6', '')).toEqual(4.6);
});
test('subtracts two zeros together to get 0 ', () => {
  expect(subtract('0', '0')).toEqual(0);
});
test('subtracts two empty strings together to get 0 ', () => {
  expect(subtract('', '')).toEqual(0);
});
