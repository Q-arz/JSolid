# Syntax A: Object (JSON-like)

```javascript
const def = {
  name: 'Counter',
  state: {
    count: 'uint256',
    owner: { type: 'address', visibility: 'public' }
  },
  events: { Incremented: ['uint256 newCount'] },
  modifiers: { onlyOwner: { code: "require(msg.sender == owner, 'Not owner');" } },
  constructor: { params: [], code: 'owner = msg.sender;' },
  functions: {
    increment: { visibility: 'public', modifiers: ['onlyOwner'], code: 'count++; emit Incremented(count);' },
    get: { visibility: 'public', stateMutability: 'view', returns: 'uint256', code: 'return count;' }
  }
};
```

