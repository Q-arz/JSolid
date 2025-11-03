export function contract(_config?: any) {
  return function (_target: any) {};
}

export function extendsContracts(..._names: string[]) {
  return function (_target: any) {};
}

export function state(_type: string, _config?: any) {
  return function (_target: any, _key: string) {};
}

export function func(_config?: any) {
  return function (_target: any, _key: string, _desc: PropertyDescriptor) {};
}


