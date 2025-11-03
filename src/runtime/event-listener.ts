import { ethers } from "ethers";

export class EventListener {
  private contract: ethers.Contract;
  constructor(address: string, abi: any[], provider: ethers.Provider) {
    this.contract = new ethers.Contract(address, abi, provider);
  }
  subscribe(event: string, handler: (...args: any[]) => void) {
    this.contract.on(event, handler);
    return () => this.contract.off(event, handler);
  }
}


