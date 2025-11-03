export class JSolidBase {}

export const Mixins = {
  ERC20: (base: any) => class extends base {},
  Ownable: (base: any) => class extends base {},
};

export const Helpers = {
  emit: (..._args: any[]) => void 0,
  require: (_cond: string, _msg?: string) => void 0,
};


