const uuid = require('uuid/v4');

module.exports = class MemoryDatabase {
  constructor() {
    this.store = {};
  }
  create(objectToSave) {
    const createdID = uuid();
    const copy = { ...objectToSave, _id: createdID };
    this.store[createdID] = copy;
    return copy;
  }
};
