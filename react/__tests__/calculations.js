import * as calc from '../src/utils/calculations';

test('inputs null, returns null', () => {
  expect(calc.add(1, 2)).toEqual(3);
});
