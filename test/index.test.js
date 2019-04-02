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

describe('find', () => {
  it('returns an array of all the objects in the store', () => {
    const input = {
      name: 'Yes',
      age: 5
    };
    const input2 = {
      name: 'No',
      age: 3
    };
    const input3 = {
      name: 'Maybe',
      age: 42
    };
    const result = new MemoryDatabase();
    const copy = result.create(input);
    const copy2 = result.create(input2);
    const copy3 = result.create(input3);
    const expected = [copy, copy2, copy3];

    expect(result.find()).toEqual(expected);
  });
});
