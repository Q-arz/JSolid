# Deploy

## Compilar y desplegar
```javascript
import { JSolid } from '@oxygen/jsolid';
import { EthersDeployer } from '@oxygen/jsolid/deployer/ethers-deployer';
import { ethers } from 'ethers';

const compiled = JSolid.fromTemplate('ERC20', { name: 'My', symbol: 'MY' });
const { abi, bytecode } = compiled.compileWithSolc();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const deployer = new EthersDeployer(wallet);
const { address } = await deployer.deploy(abi, bytecode, []);
```

## Redes
- Usa `RPC_URL` y `PRIVATE_KEY` para cambiar fácilmente de red.


