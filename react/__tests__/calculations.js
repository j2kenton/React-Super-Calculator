import * as calc from '../src/utils/calculations';

test('inputs (1, 2) outputs correct sum', () => {
  expect(calc.add(1, 2)).toEqual(3);
});
