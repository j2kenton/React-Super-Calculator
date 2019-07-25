import * as calc from 'utils/calculations';

/** ************** SMOKE TESTS ************** */
test('adds 1 + 1 to get 2 :) ', () => {
  expect(
    calc.calculateUpdatedValue({ currentValue: '1', operator: 'add', valueApplied: '1' })
  ).toEqual(2);
});

test('adds non-numeric strings to get null ', () => {
  expect(
    calc.calculateUpdatedValue({ currentValue: 'a', operator: 'add', valueApplied: 'b' })
  ).toEqual(null);
});

test('subtracts with one string empty to get the non-empty value ', () => {
  expect(
    calc.calculateUpdatedValue({ currentValue: '', operator: 'subtract', valueApplied: '4' })
  ).toEqual(-4);
});

test('divides correctly ', () => {
  expect(
    calc.calculateUpdatedValue({ currentValue: '8', operator: 'divide', valueApplied: '2' })
  ).toEqual(4);
});

test('multiplies correctly ', () => {
  expect(
    calc.calculateUpdatedValue({ currentValue: '0.1', operator: 'multiply', valueApplied: '2' })
  ).toEqual(0.2);
});
