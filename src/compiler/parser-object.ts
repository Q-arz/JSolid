export class ObjectParser {
  parse(definition: any): any {
    const ast = {
      name: definition?.name || "Contract",
      license: definition?.license || "MIT",
      version: definition?.version || "0.8.20",
      imports: Array.isArray(definition?.imports) ? definition.imports : [],
      inheritance: Array.isArray(definition?.extends) ? definition.extends : [],
      state: definition?.state || {},
      structs: this.normalizeStructs(definition?.structs || {}),
      events: this.normalizeEvents(definition?.events || {}),
      modifiers: this.normalizeModifiers(definition?.modifiers || {}),
      constructor: this.normalizeConstructor(definition?.constructor || null),
      functions: this.normalizeFunctions(definition?.functions || {}),
    };
    return ast;
  }

  private normalizeStructs(structs: Record<string, any>): any[] {
    return Object.entries(structs).map(([name, fields]) => ({ name, fields }));
  }

  private normalizeEvents(events: Record<string, string[]>): any[] {
    return Object.entries(events).map(([name, params]) => ({ name, params: params || [] }));
  }

  private normalizeModifiers(mods: Record<string, { params?: string[]; code: string }>): any[] {
    return Object.entries(mods).map(([name, def]) => ({ name, params: def?.params || [], code: def?.code || "" }));
  }

  private normalizeConstructor(ctor: any): any {
    if (!ctor) return null;
    return { params: Array.isArray(ctor.params) ? ctor.params : [], code: ctor.code || "" };
  }

  private normalizeFunctions(funcs: Record<string, any>): any[] {
    return Object.entries(funcs).map(([name, def]) => ({
      name,
      visibility: def?.visibility || "public",
      stateMutability: def?.stateMutability || null,
      params: Array.isArray(def?.params) ? def.params : [],
      returns: def?.returns || null,
      modifiers: Array.isArray(def?.modifiers) ? def.modifiers : [],
      code: def?.code || "",
    }));
  }
}


