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
- docs/overview.md
- docs/syntax-object.md
- docs/syntax-class.md
- docs/syntax-decorators.md
- docs/templates.md
- docs/deploy.md
- docs/e2e.md
- docs/faq.md

## Language Navigation
- Spanish (ES):
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

## Contributing
See CONTRIBUTING.md for setup, style, structure, and PR guidelines.


