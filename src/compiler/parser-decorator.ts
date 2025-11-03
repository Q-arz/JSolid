export class DecoratorParser {
  parse(contractClass: any): any {
    const name = contractClass?.name || "Contract";
    // Convención: metadata emitida por decoradores en propiedad estática
    const meta = (contractClass && contractClass.__jsolidMeta) || {};
    return {
      name,
      license: meta.license || "MIT",
      version: meta.version || "0.8.20",
      imports: meta.imports || [],
      inheritance: meta.extends || [],
      state: meta.state || {},
      structs: meta.structs || {},
      events: meta.events || {},
      modifiers: meta.modifiers || {},
      constructor: meta.constructor || null,
      functions: meta.functions || {},
    };
  }
}


