export class SolidityCodeGenerator {
  generate(ast: any): string {
    const header = `// SPDX-License-Identifier: ${ast.license || "MIT"}\npragma solidity ^${ast.version || "0.8.20"};\n\n`;
    const imports = (ast.imports || [])
      .map((i: string) => `import \"${i}\";`)
      .join("\n");
    const inherits = (ast.inheritance || []).join(", ");
    const contractHead = `\ncontract ${ast.name}${inherits ? " is " + inherits : ""} {\n`;
    const stateLines = Object.entries(ast.state || {})
      .map(([key, val]: [string, any]) => {
        if (typeof val === "string") return `    ${val} public ${key};`;
        const type = val.type || "uint256";
        const vis = val.visibility || "public";
        const init = val.value !== undefined ? ` = ${val.value}` : "";
        return `    ${type} ${vis} ${key}${init};`;
      })
      .join("\n");
    const structs = this.renderStructs(ast.structs);
    const events = this.renderEvents(ast.events);
    const modifiers = this.renderModifiers(ast.modifiers);
    const ctor = this.renderConstructor(ast.constructor);
    const fns = this.renderFunctions(ast.functions);
    const contractBody = [structs, events, stateLines, modifiers, ctor, fns].filter(Boolean).join("\n\n");
    const footer = "}\n";
    return header + imports + contractHead + contractBody + "\n" + footer;
  }

  private renderConstructor(ctor: any): string {
    if (!ctor) return "";
    const params = Array.isArray(ctor.params) ? ctor.params.join(", ") : "";
    const body = (ctor.code || "").trim();
    const block = body ? `\n${this.indent(body)}\n` : "";
    return `    constructor(${params}) {${block}    }`;
  }

  private renderFunctions(funcs: Record<string, any> = {}): string {
    const entries = Array.isArray(funcs) ? funcs.map((f: any) => [f.name, f]) : Object.entries(funcs);
    if (entries.length === 0) return "";
    return entries
      .map(([name, def]: any) => this.renderFunction(name, def))
      .join("\n\n");
  }

  private renderFunction(name: string, def: any): string {
    const visibility = def.visibility || "public";
    const stateMutability = def.stateMutability ? ` ${def.stateMutability}` : "";
    const params = Array.isArray(def.params) ? def.params.join(", ") : "";
    const returns = def.returns ? ` returns (${def.returns})` : "";
    const body = (def.code || "").trim();
    const mods = Array.isArray(def.modifiers) && def.modifiers.length > 0 ? ` ${def.modifiers.join(" ")}` : "";
    const block = body ? `\n${this.indent(body)}\n` : "";
    return `    function ${name}(${params}) ${visibility}${stateMutability}${mods}${returns} {${block}    }`;
  }

  private indent(code: string): string {
    return code.split(/\r?\n/).map(l => (l ? `        ${l}` : "")).join("\n");
  }

  private renderStructs(structs: any[] = []): string {
    if (!Array.isArray(structs) || structs.length === 0) return "";
    return structs.map((s) => {
      const fields = Object.entries(s.fields || {})
        .map(([fname, ftype]) => `        ${ftype} ${fname};`)
        .join("\n");
      return `    struct ${s.name} {\n${fields}\n    }`;
    }).join("\n\n");
  }

  private renderEvents(events: any[] = []): string {
    if (!Array.isArray(events) || events.length === 0) return "";
    return events.map((e) => {
      const params = Array.isArray(e.params) ? e.params.join(", ") : "";
      return `    event ${e.name}(${params});`;
    }).join("\n");
  }

  private renderModifiers(mods: any[] = []): string {
    if (!Array.isArray(mods) || mods.length === 0) return "";
    return mods.map((m) => {
      const params = Array.isArray(m.params) ? m.params.join(", ") : "";
      const body = (m.code || "").trim();
      const block = body ? `\n${this.indent(body)}\n` : "";
      return `    modifier ${m.name}(${params}) {${block}        _;\n    }`;
    }).join("\n\n");
  }
}


