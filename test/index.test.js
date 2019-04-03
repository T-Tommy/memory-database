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

    expect(result.findById(idToLookUp)).toEqual(copy);
  });

  it('returns null if no matching id', () => {
    const result = new MemoryDatabase();

    const idToLookUp = 'somerandomstring';

    expect(result.findById(idToLookUp)).toEqual(null);
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
    result.drop();
    const found = result.find();
    expect(found).toEqual([]);
  });
});

describe('findByIDAndUpdate tests', () => {
  it('replaces object with new object at a uuid', () => {
    const input = {
      name: 'Yes',
      age: 5
    };
    const result = new MemoryDatabase();
    const copy = result.create(input);
    const addObject = {
      sport: 'baseball',
      skill: 'sure'
    };

    const update = result.findByIdAndUpdate(addObject, copy._id);

    expect(update.sport).toEqual('baseball');
    expect(update.skill).toEqual('sure');
    expect(update._id).toEqual(copy._id);
    expect(result.store[copy._id]).toEqual(update);
  });

  it('Return null if no id', () => {
    const input = {
      name: 'Yes',
      age: 5
    };
    const result = new MemoryDatabase();
    const copy = result.create(input);
    const addObject = {
      sport: 'baseball',
      skill: 'sure'
    };

    const update = result.findByIdAndUpdate(addObject, 'somerandomstring');
  
    expect(update).toEqual(null);
    expect(result.store[copy._id]).toEqual(copy);
  });
});

describe('findByIdAndDelete', () => {
  it('removes an object by id', () => {
    const input = {
      name: 'Yes',
      age: 5
    };
    const result = new MemoryDatabase();
    const copy = result.create(input);

    const deleted = result.findByIdAndDelete(copy._id);
    const shouldBeNull = result.findById(copy._id);
    expect(deleted).toEqual(copy);
    expect(shouldBeNull).toEqual(null);
  });
  
  it('removes an object by id returns null if no matching id', () => {
    const input = {
      name: 'Yes',
      age: 5
    };
    const result = new MemoryDatabase();
    const copy = result.create(input);

    const deleted = result.findByIdAndDelete('randomstring');
    
    expect(deleted).toEqual(null);
    expect(result.store[copy._id]).toEqual(copy);
  });
});

describe('drop', () => {
  it('resets the store', () => {
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
    result.create(input);
    result.create(input2);
    result.create(input3);
    const expected = {};
    result.drop();

    expect(result.store).toEqual(expected);
  });
});
