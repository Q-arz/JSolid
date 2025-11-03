import { describe, it, expect } from 'vitest';
import { ObjectParser } from '../src/compiler/parser-object';

describe('ObjectParser', () => {
  it('parses minimal contract', () => {
    const parser = new ObjectParser();
    const ast = parser.parse({ name: 'Counter', state: { count: 'uint256' } });
    expect(ast.name).toBe('Counter');
    expect(ast.state.count).toBeDefined();
  });
});


