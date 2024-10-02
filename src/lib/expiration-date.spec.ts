import { expirationDate } from './expiration-date';

describe('ExpirationDate', () => {
  it('should create a expiration date', () => {
    const date = expirationDate();
    expect(date).toMatch(/^(0[1-9]|1[0-2])\/[0-9]{2}$/);
  });
});
