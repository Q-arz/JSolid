import { ethers } from "ethers";

export class ContractInstance {
  private contract: ethers.Contract;
  constructor(address: string, abi: any[], signerOrProvider: ethers.Signer | ethers.Provider) {
    this.contract = new ethers.Contract(address, abi, signerOrProvider);
  }
  fn(name: string) {
    const self = this;
    return async (...args: any[]) => (self.contract as any)[name](...args);
  }
  on(event: string, handler: (...args: any[]) => void) {
    this.contract.on(event, handler);
    return () => this.contract.off(event, handler);
  }
}


