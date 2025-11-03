export class ClassParser {
  parse(contractClass: Function): any {
    const name = contractClass.name || "Contract";
    const proto = (contractClass as any).prototype || {};
    const methodNames = Object.getOwnPropertyNames(proto).filter(
      (m) => m !== "constructor" && typeof (proto as any)[m] === "function"
    );

    // Convención ligera: propiedades estáticas para metadata
    const meta = (contractClass as any).jsolid || {};
    const state = meta.state || {};
    const imports = meta.imports || [];
    const inheritance = meta.extends || [];
    const structs = meta.structs || {};
    const events = meta.events || {};
    const modifiers = meta.modifiers || {};
    const ctor = meta.constructor || null;

    const functions: Record<string, any> = { ...meta.functions };
    for (const m of methodNames) {
      if (!functions[m]) {
        functions[m] = { visibility: "public", params: [], code: "" };
      }
    }

    return {
      name,
      license: meta.license || "MIT",
      version: meta.version || "0.8.20",
      imports,
      inheritance,
      state,
      structs,
      events,
      modifiers,
      constructor: ctor,
      functions,
    };
  }
}


