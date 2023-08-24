import { parseDurationString } from '../src/lib/utilities';
describe('parseDurationString', () => {
  it('should correctly parse hours', () => {
    const result = parseDurationString('15h');
    expect(result).toEqual({
      value: 15,
      unit: 'h',
    });
  });

  it('should correctly parse days', () => {
    const result = parseDurationString('30d');
    expect(result).toEqual({
      value: 30,
      unit: 'd',
    });
  });

  it('should throw an error for invalid formats', () => {
    expect(() => parseDurationString('2x5h')).toThrow(
      'Invalid duration format',
    );
    expect(() => parseDurationString('abc')).toThrow('Invalid duration format');
  });

  it('should handle strings with leading zeros', () => {
    const result = parseDurationString('05d');
    expect(result).toEqual({
      value: 5,
      unit: 'd',
    });
  });
});
