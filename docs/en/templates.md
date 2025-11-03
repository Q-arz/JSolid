# Templates

```javascript
const t20 = JSolid.fromTemplate('ERC20', { name: 'MyToken', symbol: 'MTK', initialSupply: '1000 * 10**18', mintable: true });
const t721 = JSolid.fromTemplate('ERC721', { name: 'MyNFT', symbol: 'MNFT', baseURI: 'ipfs://Qm...' });
const t1155 = JSolid.fromTemplate('ERC1155', { name: 'MyMulti', uri: 'ipfs://Qm...' });
const dia = JSolid.fromTemplate('Diamond', { name: 'MyDiamond', facets: [] });
```

