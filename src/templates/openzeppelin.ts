import { ObjectContractDefinition } from "../types";

export const OpenZeppelinTemplates = {
  ERC20: (cfg: { name: string; symbol: string; initialSupply?: string | number; mintable?: boolean; burnable?: boolean }): ObjectContractDefinition => {
    const initial = cfg.initialSupply ?? "1000000 * 10**18";
    return {
      name: cfg.name.replace(/\s+/g, "") + "Token",
      version: "0.8.20",
      license: "MIT",
      imports: [
        "@openzeppelin/contracts/token/ERC20/ERC20.sol",
        "@openzeppelin/contracts/access/Ownable.sol"
      ],
      extends: ["ERC20", "Ownable"],
      state: {},
      events: {},
      modifiers: {},
      constructor: {
        params: ["string memory _name", "string memory _symbol"],
        code: `
            _mint(msg.sender, ${initial});
        `
      },
      functions: {
        // opcionales
        ...(cfg.mintable ? { mint: {
          visibility: "public",
          params: ["address to", "uint256 amount"],
          modifiers: ["onlyOwner"],
          code: `_mint(to, amount);`
        }} : {}),
      }
    };
  }
  ,
  ERC721: (cfg: { name: string; symbol: string; baseURI?: string; mintable?: boolean; enumerable?: boolean }): ObjectContractDefinition => {
    const nameId = cfg.name.replace(/\s+/g, "") + "NFT";
    const imports = [
      "@openzeppelin/contracts/token/ERC721/ERC721.sol",
      "@openzeppelin/contracts/access/Ownable.sol"
    ];
    if (cfg.enumerable) imports.splice(1, 0, "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol");

    const extendsArr = [cfg.enumerable ? "ERC721Enumerable" : "ERC721", "Ownable"];
    return {
      name: nameId,
      version: "0.8.20",
      license: "MIT",
      imports,
      extends: extendsArr,
      state: {
        _tokenIdCounter: { type: "uint256", visibility: "private", value: 0 }
      },
      events: {},
      modifiers: {},
      constructor: {
        params: ["string memory _name", "string memory _symbol"],
        code: cfg.baseURI ? `
            // Base URI handled via _baseURI override
        ` : ""
      },
      functions: {
        ...(cfg.mintable ? { safeMint: {
          visibility: "public",
          params: ["address to"],
          modifiers: ["onlyOwner"],
          code: `
            uint256 tokenId = _tokenIdCounter + 1;
            _tokenIdCounter = tokenId;
            _safeMint(to, tokenId);
          `
        }} : {}),
        ...(cfg.baseURI ? { _baseURI: {
          visibility: "internal",
          stateMutability: "view",
          params: [],
          returns: "string memory",
          code: `
            return "${cfg.baseURI}";
          `
        }} : {})
      }
    };
  }
  ,
  ERC1155: (cfg: { name: string; uri?: string; burnable?: boolean; pausable?: boolean }): ObjectContractDefinition => {
    const Name = cfg.name.replace(/\s+/g, "");
    const imports = [
      "@openzeppelin/contracts/token/ERC1155/ERC1155.sol",
      "@openzeppelin/contracts/access/Ownable.sol"
    ];
    if (cfg.burnable) imports.push("@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol");
    if (cfg.pausable) imports.push("@openzeppelin/contracts/security/Pausable.sol");
    const bases = ["ERC1155", "Ownable"]; // extensiones como mixins en OZ suelen heredarse aparte
    if (cfg.burnable) bases.unshift("ERC1155Burnable");
    if (cfg.pausable) bases.unshift("Pausable");
    return {
      name: Name + "MultiToken",
      version: "0.8.20",
      license: "MIT",
      imports,
      extends: bases,
      state: {},
      events: {},
      modifiers: {},
      constructor: {
        params: [],
        code: cfg.uri ? `
            // Set base URI via ERC1155 constructor
        ` : ""
      },
      functions: {
        setURI: {
          visibility: "public",
          modifiers: ["onlyOwner"],
          params: ["string memory newuri"],
          code: `_setURI(newuri);`
        }
      }
    };
  }
  ,
  Ownable: (_cfg: {} = {}): ObjectContractDefinition => ({
    name: "OwnableContract",
    version: "0.8.20",
    license: "MIT",
    imports: ["@openzeppelin/contracts/access/Ownable.sol"],
    extends: ["Ownable"],
    state: {},
    events: {},
    modifiers: {},
    constructor: { params: [], code: `` },
    functions: {}
  })
  ,
  Pausable: (_cfg: {} = {}): ObjectContractDefinition => ({
    name: "PausableContract",
    version: "0.8.20",
    license: "MIT",
    imports: ["@openzeppelin/contracts/security/Pausable.sol", "@openzeppelin/contracts/access/Ownable.sol"],
    extends: ["Pausable", "Ownable"],
    state: {},
    events: {},
    modifiers: {},
    constructor: { params: [], code: `` },
    functions: {
      pause: { visibility: "public", modifiers: ["onlyOwner"], code: ` _pause(); ` },
      unpause: { visibility: "public", modifiers: ["onlyOwner"], code: ` _unpause(); ` }
    }
  })
  ,
  AccessControl: (_cfg: {} = {}): ObjectContractDefinition => ({
    name: "AccessControlContract",
    version: "0.8.20",
    license: "MIT",
    imports: ["@openzeppelin/contracts/access/AccessControl.sol"],
    extends: ["AccessControl"],
    state: {
      DEFAULT_ADMIN_ROLE: { type: "bytes32", visibility: "public" }
    },
    events: {},
    modifiers: {},
    constructor: { params: [], code: ` _grantRole(DEFAULT_ADMIN_ROLE, msg.sender); ` },
    functions: {}
  })
};


