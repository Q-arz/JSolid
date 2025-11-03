export class SecurityChecks {
  run(ast: any): { warnings: string[]; errors: string[] } {
    const warnings: string[] = [];
    const errors: string[] = [];
    // Reentrancy: si hay llamadas externas antes de actualizar estado (heurística muy simple)
    for (const fn of ast.functions || []) {
      const code = (fn.code || "").toLowerCase();
      if (code.includes("call(") || code.includes("transfer(") || code.includes("send(")) {
        if (!(fn.modifiers || []).some((m: string) => m.toLowerCase().includes("nonreentrant"))) {
          warnings.push(`Function ${fn.name} performs external call without nonReentrant`);
        }
      }
    }
    return { warnings, errors };
  }
}


