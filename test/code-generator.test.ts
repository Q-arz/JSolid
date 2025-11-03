import { describe, it, expect } from 'vitest';
import { SolidityCodeGenerator } from '../src/compiler/code-generator';

describe('SolidityCodeGenerator', () => {
  it('emits pragma and contract', () => {
    const gen = new SolidityCodeGenerator();
    const sol = gen.generate({ name: 'X', license: 'MIT', version: '0.8.20', imports: [], inheritance: [], state: {}, structs: [], events: [], modifiers: [], constructor: null, functions: [] });
    expect(sol).toContain('pragma solidity ^0.8.20');
    expect(sol).toContain('contract X');
  });
});


