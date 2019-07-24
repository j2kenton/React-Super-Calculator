import * as parse from '../src/utils/parsing';

test('parses empty input to empty array', () => {
  expect(parse.parseInput('')).toEqual([]);
});
