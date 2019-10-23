const fs = require('fs');
const path = require('path');

class CubeModel {
  constructor() {
    this.data = require('../config/database');
  }

  _write(newData, resolveData) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path.resolve('./config/database.json'), JSON.stringify(newData, null, 2), (err) => {
        if (err) { reject(err); return; }
        this.data = newData;
        resolve(resolveData);
      });
    });
  }

  create(name, description, imageUrl, difficultyLevel) {
    return { name, description, imageUrl, difficultyLevel };
  }

  insert(newCube) {
    const newIndex = ++this.data.lastIndex;
    newCube = {id: newIndex, ...newCube};
    const newData = {
      lastIndex: newIndex,
      entities: this.data.entities.concat(newCube)
    };

    return this._write(newData, newCube);
  }

  update(cubeId, updates) {
    const entityIndex = this.data.entities.findIndex(({ id }) => id === cubeId);
    const entity = this.data.entities[entityIndex];
    const updatedEntity = { ...entity, ...updates };

    const newData = {
      lastIndex: this.data.lastIndex,
      entities: [
        ...this.data.entities.slice(0, index),
        updatedEntity,
        ...this.data.entities.slice(entityIndex + 1)
      ]
    };

    return this._write(newData, updatedEntity);
  }

  delete(id) {
    const deletedEntity = this.getCubeById(id);
    console.log('resolving this: ', deletedEntity);
    
    const newData = {
      lastIndex: this.data.lastIndex,
      entities: this.data.entities.filter(({ id: i}) => i !== id)
    }

    return this._write(newData, deletedEntity);
  }

  find (predFn) {
    return Promise.resolve(this.data.entities.filter(predFn));
  }

  getCubeById(id) {
    return this.find(({id: i}) => i === id);
  }

  getAllCubes() {
    return Promise.resolve(this.data.entities);
  }
}

module.exports = new CubeModel();
