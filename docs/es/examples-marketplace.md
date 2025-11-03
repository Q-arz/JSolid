# Ejemplo: Marketplace NFT (esqueleto)

```javascript
const market = {
  name: 'NFTMarket',
  imports: ['@openzeppelin/contracts/security/ReentrancyGuard.sol'],
  extends: ['ReentrancyGuard'],
  state: {
    listings: 'mapping(uint256 => uint256)', // tokenId => price
  },
  functions: {
    list: { visibility: 'public', params: ['uint256 tokenId', 'uint256 price'], code: 'listings[tokenId] = price;' },
    buy: { visibility: 'public', stateMutability: 'payable', params: ['uint256 tokenId'], modifiers: ['nonReentrant'], code: '// transfer NFT and funds (implementar)' }
  }
};
```

