# JSolid

Compilador JavaScript/TypeScript → Solidity con 3 sintaxis (objetos, clases, decoradores), templates OpenZeppelin y deploy con ethers.

## Instalación

```bash
cd JSolid
npm install
npm run build
```

## Quick Start

```javascript
import { JSolid } from '@oxygen/jsolid';

// 1) Template ERC20
const erc20 = JSolid.fromTemplate('ERC20', { name: 'MyToken', symbol: 'MTK', initialSupply: '1000000 * 10**18' });
const { abi, bytecode } = erc20.compileWithSolc();

// 2) Objeto (contrato simple)
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
```

## API
- JSolid.create(def)
- JSolid.fromClass(classRef)
- JSolid.fromDecorators(classRef)
- JSolid.fromTemplate(name, config)
- compiled.compileWithSolc()

## Templates disponibles
- ERC20, ERC721, ERC1155, Ownable, Pausable, AccessControl, Diamond

## Deploy con ethers
```javascript
import { EthersDeployer } from '@oxygen/jsolid/deployer/ethers-deployer';
const deployer = new EthersDeployer(signer);
const res = await deployer.deploy(abi, bytecode, [/* args */]);
console.log(res.address);
```

## Licencia
MIT

## Documentación Detallada
- docs/overview.md
- docs/syntax-object.md
- docs/syntax-class.md
- docs/syntax-decorators.md
- docs/templates.md
- docs/deploy.md
- docs/e2e.md
- docs/faq.md

## Navegación por Idioma
- Español (ES):
  - docs/es/overview.md
  - docs/es/syntax-object.md
  - docs/es/syntax-class.md
  - docs/es/syntax-decorators.md
  - docs/es/templates.md
  - docs/es/deploy.md
  - docs/es/e2e.md
  - docs/es/faq.md
  - docs/es/examples-dao.md
  - docs/es/examples-marketplace.md

- English (EN):
  - docs/en/overview.md
  - docs/en/syntax-object.md
  - docs/en/syntax-class.md
  - docs/en/syntax-decorators.md
  - docs/en/templates.md
  - docs/en/deploy.md
  - docs/en/e2e.md
  - docs/en/faq.md

## Contribuir
Consulta CONTRIBUTING.md para setup, guías de estilo, estructura y cómo enviar PRs.


