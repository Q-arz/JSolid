# Sintaxis C: TypeScript + Decoradores

```typescript
import 'reflect-metadata';
import { contract, state, func, extendsContracts } from '@oxygen/jsolid/syntax/decorator-api';

@contract({ license: 'MIT', version: '0.8.20' })
@extendsContracts('ERC20', 'Ownable')
class MyToken {
  @state('uint256', { visibility: 'public' }) totalSupply: number;
  @func({ visibility: 'public' }) mint(to: string, amount: number) {}
}
```

