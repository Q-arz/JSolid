# Deploy

```javascript
import { JSolid } from '@oxygen/jsolid';
import { EthersDeployer } from '@oxygen/jsolid/deployer/ethers-deployer';
import { ethers } from 'ethers';

const c = JSolid.fromTemplate('ERC20', { name: 'My', symbol: 'MY' });
const { abi, bytecode } = c.compileWithSolc();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const deployer = new EthersDeployer(wallet);
const res = await deployer.deploy(abi, bytecode, []);
```

