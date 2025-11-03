# Sintaxis C: TypeScript + Decoradores

Decoradores para declarar contrato, estado y funciones (metadata se guarda en `__jsolidMeta`).

```typescript
import 'reflect-metadata';
import { contract, state, func, extendsContracts } from '@oxygen/jsolid/syntax/decorator-api';

@contract({ license: 'MIT', version: '0.8.20' })
@extendsContracts('ERC20', 'Ownable')
class MyToken {
  @state('uint256', { visibility: 'public' })
  totalSupply: number;

  @func({ visibility: 'public' })
  mint(to: string, amount: number) {
    // cuerpo generado en Solidity vía metadata
  }
}
```

Uso:
```typescript
import { JSolid } from '@oxygen/jsolid';
const compiled = JSolid.fromDecorators(MyToken);
```


