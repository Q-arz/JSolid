export interface ValidationIssue { level: "error" | "warning"; message: string; path?: string; }

export class SemanticValidator {
  validate(ast: any): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    if (!ast.name) issues.push({ level: "error", message: "Contract name is required" });
    // Visibilidad válida
    const validVis = new Set(["public", "external", "internal", "private"]);
    for (const fn of ast.functions || []) {
      if (fn.visibility && !validVis.has(fn.visibility)) {
        issues.push({ level: "error", message: `Invalid visibility: ${fn.visibility}`, path: `function.${fn.name}` });
      }
    }
    // Tipos básicos: chequeo superficial
    for (const [k, v] of Object.entries(ast.state || {})) {
      const type = typeof v === "string" ? v : (v as any).type;
      if (!type) {
        issues.push({ level: "warning", message: `State variable ${k} missing type`, path: `state.${k}` });
      }
    }
    return issues;
  }
}


