import { number } from './number';

describe('CardNumber', () => {
  it('should create a number with length', () => {
    const numbers = [3, 16];
    numbers.forEach((length) => {
      const mockNumber = number(length);
      expect(mockNumber).toHaveLength(length);
      expect(mockNumber).toMatch(/^[0-9]+$/);
    });
  });
});
