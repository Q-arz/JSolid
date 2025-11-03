# Templates (OpenZeppelin y patrones)

Disponibles:
- ERC20, ERC721, ERC1155
- Ownable, Pausable, AccessControl
- Diamond (builder)

Uso básico:
```javascript
const t20 = JSolid.fromTemplate('ERC20', { name: 'MyToken', symbol: 'MTK', initialSupply: '1000 * 10**18', mintable: true });
const t721 = JSolid.fromTemplate('ERC721', { name: 'MyNFT', symbol: 'MNFT', baseURI: 'ipfs://Qm...' });
const dia = JSolid.fromTemplate('Diamond', { name: 'MyDiamond', facets: [ /* defs facet */ ] });
```


