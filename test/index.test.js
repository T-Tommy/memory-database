const MemoryDatabase = require('../lib/index');

describe('Initialize database', () => {
  it('returns empty object', () => {
    const expected = {};
    const result = new MemoryDatabase();

    expect(result.store).toEqual(expected);
  });
});

