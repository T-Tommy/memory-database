const MemoryDatabase = require('../lib/index');

describe('Initialize database', () => {
  it('returns empty object', () => {
    const expected = {};
    const result = new MemoryDatabase();

    expect(result.store).toEqual(expected);
  });
});

describe('Create', () => {
  it('creates a copy that contains a uuid and returns the copy', () => {
    const input = {
      name: 'Yes',
      age: 5
    };
    const result = new MemoryDatabase();
    const copy = result.create(input);

    expect(copy.name).toEqual('Yes');
    expect(copy.age).toEqual(5);
    expect.any(copy._id);
  });

  it('store the copy into the store', () => {
    const input = {
      name: 'Yes',
      age: 5
    };
    const result = new MemoryDatabase();
    const copy = result.create(input);
  
    expect(result.store[copy._id]).toEqual(copy);
  });
});
