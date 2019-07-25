import * as calc from 'utils/calculations';

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
