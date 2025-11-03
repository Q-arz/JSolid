# JSolid

JavaScript/TypeScript → Solidity compiler with three authoring modes (object, class, decorators), OpenZeppelin templates, and `ethers` deploy. JSolid aims to lower the barrier for EVM development across any Solidity-compatible chain — not only for Oxy•gen, but for all EVM networks.

## Why JSolid?
- Bridge web developers to smart contracts using familiar JavaScript/TypeScript.
- Offer 3 authoring styles to fit different teams and maturity levels.
- Ship with production-ready templates (ERC20/721/1155, Ownable, Pausable, AccessControl) and Diamond pattern.
- Keep it chain-agnostic: works with any EVM where Solidity runs.

## Install

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

// 2) Object-based (simple contract)
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

## Templates
- ERC20, ERC721, ERC1155, Ownable, Pausable, AccessControl, Diamond

## Deploy (ethers)
```javascript
import { EthersDeployer } from '@oxygen/jsolid/deployer/ethers-deployer';
const deployer = new EthersDeployer(signer);
const res = await deployer.deploy(abi, bytecode, [/* args */]);
console.log(res.address);
```

## License
MIT © 2025 Q•arz — see LICENSE and NOTICE

## Full Documentation
Documentation lives under `docs/` by language. Use these repo links:
– English: https://github.com/Q-arz/JSolid/tree/main/docs/en
– Español: https://github.com/Q-arz/JSolid/tree/main/docs/es

## Language Navigation
- English (EN):
  - Overview: https://github.com/Q-arz/JSolid/blob/main/docs/en/overview.md
  - Syntax (Object): https://github.com/Q-arz/JSolid/blob/main/docs/en/syntax-object.md
  - Syntax (Class): https://github.com/Q-arz/JSolid/blob/main/docs/en/syntax-class.md
  - Syntax (Decorators): https://github.com/Q-arz/JSolid/blob/main/docs/en/syntax-decorators.md
  - Templates: https://github.com/Q-arz/JSolid/blob/main/docs/en/templates.md
  - Deploy: https://github.com/Q-arz/JSolid/blob/main/docs/en/deploy.md
  - E2E: https://github.com/Q-arz/JSolid/blob/main/docs/en/e2e.md
  - FAQ: https://github.com/Q-arz/JSolid/blob/main/docs/en/faq.md

- Español (ES):
  - Overview: https://github.com/Q-arz/JSolid/blob/main/docs/es/overview.md
  - Sintaxis (Objetos): https://github.com/Q-arz/JSolid/blob/main/docs/es/syntax-object.md
  - Sintaxis (Clases): https://github.com/Q-arz/JSolid/blob/main/docs/es/syntax-class.md
  - Sintaxis (Decoradores): https://github.com/Q-arz/JSolid/blob/main/docs/es/syntax-decorators.md
  - Plantillas: https://github.com/Q-arz/JSolid/blob/main/docs/es/templates.md
  - Deploy: https://github.com/Q-arz/JSolid/blob/main/docs/es/deploy.md
  - E2E: https://github.com/Q-arz/JSolid/blob/main/docs/es/e2e.md
  - FAQ: https://github.com/Q-arz/JSolid/blob/main/docs/es/faq.md
  - DAO: https://github.com/Q-arz/JSolid/blob/main/docs/es/examples-dao.md
  - Marketplace: https://github.com/Q-arz/JSolid/blob/main/docs/es/examples-marketplace.md

## Contributing
See CONTRIBUTING.md for setup, style, structure, and PR guidelines.


