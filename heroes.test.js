const { deepStrictEqual, throws } = require('assert');

(async () => {
  const Heroes = require('./heroes');
  const heroes = new Heroes();
  
  heroes.add('Tiago', 'Lima');
  heroes.add('Tayna', 'Silva');
  
  console.log('[...heroes]', [...heroes])

  deepStrictEqual(heroes.toString(), '\nTiago Lima\nTayna Silva');
  deepStrictEqual(String(heroes), '\nTiago Lima\nTayna Silva');
  throws(() => heroes * 1, 'Invalid Convertion');

  const expectedItems = [
    { firstName: 'Tiago', lastName: 'Lima' },
    { firstName: 'Tayna', lastName: 'Silva' },
  ];

  deepStrictEqual([...heroes], expectedItems);
  deepStrictEqual(Array.from(heroes), expectedItems);

  {
    const items = [];
    for (const item of heroes) { items.push(item) };
    deepStrictEqual(items, expectedItems);
  }

  {
    const items = [];
    for await (const item of heroes) { items.push(item) };

    const expectedKeys = ['id', 'firstName', 'lastName'];

    deepStrictEqual(items.filter(({ id }) => id > 0).length, 2);
  }
})();
