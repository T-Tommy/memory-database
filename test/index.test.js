const MemoryDatabase = require('../lib/index');

describe('Initialize database', () => {
  it('returns empty object', () => {
    const expected = {};
    const result = new MemoryDatabase();

    expect(result.store).toEqual(expected);
  });
});

describe('Creat tests', () => {
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

describe('findByID tests', () => {
  it('returns objects from store with id', () => {
    const input = {
      name: 'Yes',
      age: 5
    };
    const result = new MemoryDatabase();
    const copy = result.create(input);

    const idToLookUp = copy._id;

    expect(result.findByID(idToLookUp)).toEqual(copy);
  });

  it('returns null if no matching id', () => {
    const result = new MemoryDatabase();

    const idToLookUp = 'somerandomstring';

    expect(result.findByID(idToLookUp)).toEqual(null);
  });
});
