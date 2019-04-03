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
  findById(idToFind) {
    return this.store[idToFind] || null;
  }
  find() {
    return Object.values(this.store);
  }
  findByIdAndUpdate(addObject, idToFind) {
    if(this.findById(idToFind)) {
      this.store[idToFind] = { ...addObject, _id: idToFind };
      return this.store[idToFind];
    }
    return null;
  }
  findByIdAndDelete(idToFind) {
    const toBeDeleted = this.findById(idToFind);
    delete this.store[idToFind];
    return toBeDeleted;
  }
};
