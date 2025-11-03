# Sintaxis B: Clases (ES6)

```javascript
class MyToken {
  static jsolid = {
    imports: ['@openzeppelin/contracts/token/ERC20/ERC20.sol','@openzeppelin/contracts/access/Ownable.sol'],
    extends: ['ERC20','Ownable'],
    state: { owner: { type: 'address', visibility: 'public' } },
    constructor: { code: 'owner = msg.sender;' },
    functions: { mint: { visibility: 'public', modifiers: ['onlyOwner'], params: ['address to','uint256 amount'], code: '_mint(to, amount);' } }
  };
}
```

