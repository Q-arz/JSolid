export class TypeMapper {
  toSolidity(type: string): string {
    // Mapeo básico; extender para arrays, tuples y mappings complejos
    const map: Record<string, string> = {
      string: "string",
      number: "uint256",
      boolean: "bool",
      address: "address",
      bytes: "bytes",
    };
    return map[type] || type;
  }
}


