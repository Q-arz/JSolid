import { JSolid } from '../dist/index.js';

const def = {
  name: 'Counter',
  state: { count: 'uint256' },
  functions: {
    increment: { visibility: 'public', code: 'count++;' },
    get: { visibility: 'public', stateMutability: 'view', returns: 'uint256', code: 'return count;' }
  }
};

const compiled = JSolid.create(def);
console.log(compiled.solidity);


