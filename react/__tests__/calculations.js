import { calculate as calc } from '../src/utils/calculations';

test('inputs null, returns null', () => {
  expect(calc(null)).toEqual(undefined);
});
