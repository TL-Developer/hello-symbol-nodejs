const { promisify } = require('util');
const crypto = require('crypto');
const kItems = Symbol("kItems");
const kIdKeySize = Symbol("kIdKeySize");
const kFormatName = Symbol('kFormatName');

const randomInt = promisify(crypto.randomInt);

class Heroes {
  constructor() {
    this[kItems] = [];
    this[kIdKeySize] = 10;
  }

  add(firstName, lastName) {
    this[kItems].push({ firstName, lastName });
  }

  [kFormatName](firstName, lastName) {
    return `${firstName} ${lastName}`
  }

  toString() {
    const result = this[kItems].map(item => (
      this[kFormatName](item.firstName, item.lastName)
    )).join('\n');

    return '\n'.concat(result);
  }

  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== 'string') throw new TypeError('invalid convertion');

    return this.toString();
  }

  * [Symbol.iterator]() {
    for(const item of this[kItems]) {
      yield item;
    }
  }

  async * [Symbol.asyncIterator]() {
    for(const item of this[kItems]) {
      const id = await randomInt(this[kIdKeySize])
      yield { id, ...item };
    }
  }
}

module.exports = Heroes;
