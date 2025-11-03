import { ethers } from "ethers";

export class EthersDeployer {
  constructor(private signer: ethers.Signer) {}

  async deploy(abi: any[], bytecode: string, args: any[] = [], overrides: ethers.TransactionRequest = {}) {
    const factory = new ethers.ContractFactory(abi, bytecode, this.signer);
    const contract = await factory.deploy(...args, overrides);
    await contract.waitForDeployment();
    const address = await contract.getAddress();
    return { address, contract };
  }
}


