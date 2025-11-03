export * from "./types";

import { ObjectParser } from "./compiler/parser-object";
import { ClassParser } from "./compiler/parser-class";
import { DecoratorParser } from "./compiler/parser-decorator";
import { SolidityCodeGenerator } from "./compiler/code-generator";
import { OpenZeppelinTemplates } from "./templates/openzeppelin";
import { DiamondBuilder } from "./templates/patterns";
import { SolcCompiler } from "./deployer/solc-wrapper";

export class CompiledContract {
  constructor(public solidity: string, public ast: any) {}

  compileWithSolc(): { abi: any[]; bytecode: string } {
    const compiler = new SolcCompiler();
    const result = compiler.compile(this.ast?.name || "Contract", this.solidity);
    return { abi: result.abi, bytecode: result.bytecode };
  }

  async deploy(wallet: any, blockchain: any, constructorArgs: any[] = []) {
    return { address: "0x0", abi: [], deployArgs: constructorArgs };
  }
}

export class JSolid {
  static create(definition: any): CompiledContract {
    const parser = new ObjectParser();
    const ast = parser.parse(definition);
    const generator = new SolidityCodeGenerator();
    const code = generator.generate(ast);
    return new CompiledContract(code, ast);
  }

  static fromClass(contractClass: Function): CompiledContract {
    const parser = new ClassParser();
    const ast = parser.parse(contractClass);
    const generator = new SolidityCodeGenerator();
    const code = generator.generate(ast);
    return new CompiledContract(code, ast);
  }

  static fromDecorators(contractClass: any): CompiledContract {
    const parser = new DecoratorParser();
    const ast = parser.parse(contractClass);
    const generator = new SolidityCodeGenerator();
    const code = generator.generate(ast);
    return new CompiledContract(code, ast);
  }

  static fromTemplate(templateName: string, config: any): CompiledContract {
    if (templateName === "ERC20") {
      const def = OpenZeppelinTemplates.ERC20(config);
      return JSolid.create(def);
    }
    if (templateName === "ERC721") {
      const def = OpenZeppelinTemplates.ERC721(config);
      return JSolid.create(def);
    }
    if (templateName === "ERC1155") {
      const def = OpenZeppelinTemplates.ERC1155(config);
      return JSolid.create(def);
    }
    if (templateName === "Ownable") {
      const def = OpenZeppelinTemplates.Ownable(config);
      return JSolid.create(def);
    }
    if (templateName === "Pausable") {
      const def = OpenZeppelinTemplates.Pausable(config);
      return JSolid.create(def);
    }
    if (templateName === "AccessControl") {
      const def = OpenZeppelinTemplates.AccessControl(config);
      return JSolid.create(def);
    }
    if (templateName === "Diamond") {
      const def = DiamondBuilder.diamond(config);
      return JSolid.create(def);
    }
    throw new Error(`Template not found: ${templateName}`);
  }
}


