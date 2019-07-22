import * as calc from '../src/utils/calculations';

test('inputs (1, 2) ouputs correct sum', () => {
  expect(calc.add(1, 2)).toEqual(3);
});
