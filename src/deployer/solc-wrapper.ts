import solc from "solc";

export interface CompilationResult {
  abi: any[];
  bytecode: string;
  metadata?: any;
}

export class SolcCompiler {
  compile(contractName: string, solidityCode: string): CompilationResult {
    const input = {
      language: "Solidity",
      sources: {
        [contractName + ".sol"]: { content: solidityCode },
      },
      settings: {
        optimizer: { enabled: true, runs: 200 },
        outputSelection: {
          "*": {
            "*": ["abi", "evm.bytecode.object", "metadata"]
          }
        }
      }
    } as any;

    const output = JSON.parse(solc.compile(JSON.stringify(input)));
    if (output.errors && output.errors.some((e: any) => e.severity === "error")) {
      const err = output.errors.find((e: any) => e.severity === "error");
      throw new Error(err?.formattedMessage || "Compilation failed");
    }
    const compiled = output.contracts[contractName + ".sol"][contractName];
    return {
      abi: compiled.abi,
      bytecode: compiled.evm.bytecode.object,
      metadata: compiled.metadata
    };
  }
}


