import { describe, it, expect } from 'vitest';
import { JSolid } from '../src/index';

describe('Integration: compile template', () => {
  it('compiles ERC20 template with solc', () => {
    const c = JSolid.fromTemplate('ERC20', { name: 'T', symbol: 'T' });
    const { abi, bytecode } = c.compileWithSolc();
    expect(Array.isArray(abi)).toBe(true);
    expect(typeof bytecode).toBe('string');
  });
});


