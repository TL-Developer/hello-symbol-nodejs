const dragons = [
  'cool dragon',
  'angry dragon',
  'nasty dragon',
];

const iterator = dragons[Symbol.iterator]();
console.log(iterator)

iterator.next() 
console.log(iterator)

iterator.next() 
console.log(iterator)

for (const dragon of dragons) {
  dragon
}
