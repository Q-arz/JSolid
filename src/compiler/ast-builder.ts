export class ASTBuilder {
  unify(input: any): any {
    // Asumimos que los parsers ya normalizan en gran medida
    // Aquí garantizamos arrays para structs/events/modifiers/functions
    return {
      name: input.name,
      license: input.license,
      version: input.version,
      imports: input.imports || [],
      inheritance: input.inheritance || [],
      state: input.state || {},
      structs: Array.isArray(input.structs) ? input.structs : [],
      events: Array.isArray(input.events) ? input.events : [],
      modifiers: Array.isArray(input.modifiers) ? input.modifiers : [],
      constructor: input.constructor || null,
      functions: Array.isArray(input.functions)
        ? input.functions
        : Object.entries(input.functions || {}).map(([name, def]: any) => ({ name, ...def })),
    };
  }
}


