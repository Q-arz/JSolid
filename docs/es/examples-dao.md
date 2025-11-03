# Ejemplo: DAO simple

```javascript
const dao = {
  name: 'OxyDAO',
  imports: ['@openzeppelin/contracts/access/Ownable.sol'],
  extends: ['Ownable'],
  state: {
    proposals: 'mapping(uint256 => string)',
    votesFor: 'mapping(uint256 => uint256)',
    votesAgainst: 'mapping(uint256 => uint256)',
    nextId: { type: 'uint256', visibility: 'public', value: 0 }
  },
  functions: {
    createProposal: { visibility: 'public', params: ['string memory desc'], code: 'proposals[nextId] = desc; nextId++;' },
    voteFor: { visibility: 'public', params: ['uint256 id'], code: 'votesFor[id]++;' },
    voteAgainst: { visibility: 'public', params: ['uint256 id'], code: 'votesAgainst[id]++;' }
  }
};
```

