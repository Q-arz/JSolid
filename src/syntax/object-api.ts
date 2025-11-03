export type Visibility = "public" | "external" | "internal" | "private";
export type Mutability = "view" | "pure" | "payable" | "nonpayable";

export interface ObjectFunctionDef {
  visibility?: Visibility;
  stateMutability?: Mutability;
  params?: string[];
  returns?: string | null;
  modifiers?: string[];
  code?: string; // cuerpo solidity literal
}

export interface ObjectConstructorDef {
  params?: string[];
  code?: string;
}

export interface ObjectContractDefinition {
  name: string;
  license?: string;
  version?: string;
  imports?: string[];
  extends?: string[];
  state?: Record<string, string | { type: string; visibility?: Visibility; value?: string | number | boolean }>;
  structs?: Record<string, Record<string, string>>;
  events?: Record<string, string[]>;
  modifiers?: Record<string, { params?: string[]; code: string }>;
  constructor?: ObjectConstructorDef | null;
  functions?: Record<string, ObjectFunctionDef>;
}

export function define(def: ObjectContractDefinition): ObjectContractDefinition {
  return def;
}


