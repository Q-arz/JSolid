import { ethers } from "ethers";

export class TransactionBuilder {
  constructor(private signer: ethers.Signer) {}
  async send(contractAddress: string, abi: any[], method: string, args: any[] = [], overrides: ethers.TransactionRequest = {}) {
    const contract = new ethers.Contract(contractAddress, abi, this.signer);
    const tx = await (contract as any)[method](...args, overrides);
    return await tx.wait();
  }
}


