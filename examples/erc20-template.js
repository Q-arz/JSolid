import { JSolid } from '../dist/index.js';

const compiled = JSolid.fromTemplate('ERC20', {
  name: 'DemoToken',
  symbol: 'DMT',
  initialSupply: '1000000 * 10**18',
});

console.log(compiled.solidity);


