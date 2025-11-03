# Sintaxis B: Clases JavaScript (ES6)

Define contratos usando clases y metadata estática opcional.

```javascript
class MyToken {
  static jsolid = {
    license: 'MIT',
    version: '0.8.20',
    imports: [
      '@openzeppelin/contracts/token/ERC20/ERC20.sol',
      '@openzeppelin/contracts/access/Ownable.sol'
    ],
    extends: ['ERC20', 'Ownable'],
    state: { owner: { type: 'address', visibility: 'public' } },
    constructor: { params: [], code: 'owner = msg.sender;' },
    functions: { mint: { visibility: 'public', modifiers: ['onlyOwner'], params: ['address to', 'uint256 amount'], code: '_mint(to, amount);' } }
  };
  // Métodos JS pueden mapear a funciones si no se definen en metadata
  transfer() {}
}
```

Uso:
```javascript
import { JSolid } from '@oxygen/jsolid';
const compiled = JSolid.fromClass(MyToken);
console.log(compiled.solidity);
```


