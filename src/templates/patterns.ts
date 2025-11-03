import { ObjectContractDefinition } from "../types";

export class DiamondBuilder {
  static diamond(cfg: { name: string; facets: ObjectContractDefinition[] }): ObjectContractDefinition {
    const name = cfg.name || "MyDiamond";
    const imports = new Set<string>();
    const extendsArr: string[] = [];
    for (const f of cfg.facets) {
      (f.imports || []).forEach((i: string) => imports.add(i));
    }
    return {
      name,
      version: "0.8.20",
      license: "MIT",
      imports: Array.from(imports),
      extends: [],
      state: {
        // Storage mínima para ejemplo; la implementación completa requerirá EIP-2535 completa
        _owner: { type: "address", visibility: "private" }
      },
      events: {
        OwnershipTransferred: ["address indexed previousOwner", "address indexed newOwner"]
      },
      modifiers: {
        onlyOwner: { code: "require(msg.sender == _owner, 'Not owner');" }
      },
      constructor: {
        params: [],
        code: `
            _owner = msg.sender;
            emit OwnershipTransferred(address(0), msg.sender);
        `
      },
      functions: {
        owner: { visibility: "public", stateMutability: "view", returns: "address", code: "return _owner;" },
        transferOwnership: { visibility: "public", params: ["address newOwner"], modifiers: ["onlyOwner"], code: `
            require(newOwner != address(0), 'Zero address');
            address prev = _owner;
            _owner = newOwner;
            emit OwnershipTransferred(prev, newOwner);
        ` }
      }
    };
  }
}


