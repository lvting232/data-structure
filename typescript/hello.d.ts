// 声明文件

// 声明全局变量
declare const jQuery: (selector: string) => any;

// 声明全局方法
declare function get(num: any): any;

// 声明全局类
declare class Animal {
  constructor(name: string);
  sayHi(): string;
}

// export 
export const name: string;
export function getName(): string;
export interface Options {
  data: any;
}
export default function foo(): string;
