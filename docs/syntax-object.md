# Sintaxis A: Objetos (JSON-like)

La forma más simple y directa. Definición declarativa del contrato.

Ejemplo completo:

```javascript
const def = {
  name: 'Counter',
  license: 'MIT',
  version: '0.8.20',
  imports: [],
  extends: [],
  state: {
    count: 'uint256',
    owner: { type: 'address', visibility: 'public' }
  },
  structs: {
    Item: { id: 'uint256', name: 'string' }
  },
  events: {
    Incremented: ['uint256 newCount']
  },
  modifiers: {
    onlyOwner: { code: "require(msg.sender == owner, 'Not owner');" }
  },
  constructor: {
    params: [],
    code: 'owner = msg.sender;'
  },
  functions: {
    increment: { visibility: 'public', modifiers: ['onlyOwner'], code: 'count++; emit Incremented(count);' },
    get: { visibility: 'public', stateMutability: 'view', returns: 'uint256', code: 'return count;' }
  }
};
```

Uso:
```javascript
import { JSolid } from '@oxygen/jsolid';
const compiled = JSolid.create(def);
console.log(compiled.solidity);
```

Notas:
- `params` y `returns` usan firmas Solidity.
- `code` es Solidity literal dentro del cuerpo de función.


