function sayHello(person: string) {
  return 'hello, ' + person;
}

let user = 'Jsonz';
const user2 = [1,2,3];

console.log(sayHello(user));

// 原始数据类型
const isDone: boolean = false;
const decLiteral: number = 6;
const myName: string = 'Jsonz';
const voidUndefined: void = undefined;
const voidNull: void = null;
const _null: null = null;
const _undefined = undefined;
const anyType: any = 'num'; // 任意类型

// 联合类型
let stringOrNumber: string | number= 2;
stringOrNumber = 'ddd';

// 接口
interface Person {
  name: string;
  age: number;
  job?: string;
  [propName: string]: any;
  readonly id: number;
}
let tom: Person = {
  name: 'jsonz',
  age: 25,
  job: 'js developer',
  gender: 'male',
  id: 231231,
}

// tom.id = 20; 会报错，因为是 readonly

// 数组类型
const fibonacci: number[] = [1,2,3,4,5]; // ['1'] 会报错
const fibonacci2: Array<number> = [1,23,4,5,6]; // 和上面一样

// 接口也可以表示数组
interface NumberArray {
  [index: number]: number;
}
let numberArray: NumberArray = [2,3,41,24];
const anyList: any[] = ['dsadas', 23];

// 类数组，比如 arguments NodeList
function sum() {
  let args: IArguments= arguments;
}

// 函数声明 参数与返回都是number类型
function sum2(x: number, y: number): number {
  return x + y;
}
const mySum = function(x: number, y: number): number {
  return x + y;
}
// 给函数表达式添加类型
const mySum2: (x: number, y: number)=> number = function(x: number, y: number) {
  return x + y;
}

// 用接口定义函数的形状
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function( source: string, subString: string) {
  return source.search(subString) !== -1;
}

// 参数默认值
function buildName(firstName: string, lastName: string= 'cat'): string {
  return firstName + '' + lastName;
}
function push(array: any[], ...items: any[]) {
  items.forEach(function(item) {
    array.push(item);
  });
}
const arr = [];
push(arr, 1,2,3);

// 断言
function getLength(something: string | number): number {
  // 如果是 string 类型直接获取length，否则转string再获取
  if ((<string>something).length) {
    return (<string>something).length;
  } else {
    return something.toString().length;
  }
}

// 内置对象
let boolean: Boolean = new Boolean(1);
const e: Error = new Error('error');
const date: Date = new Date();
const r: RegExp = /[a-z]/;
// const body: HTMLElement = document.body;
// const allDiv: NodeList = document.querySelectorAll('div');
// body.addEventListener('click', (e: MouseEvent) => {
// });

// ts 写node，需要引入内置对象
// npm i @types/node --save-dev

// 类型别名!
type Name = string;
type NameResolver = ()=> string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') return n;
  else return n();
}

// 字符串字面量类型
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {}
// handleEvent(body, 'scroll');

// 元祖
const jsonz: [string, number] = ['Jsonz', 25];
let jsonz1: [string, number] = ['jsonz', 2]; // ['jsonz'] 会报错，因为第二个没有存

// 枚举， 用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红蓝绿等。
enum Days { Sun, Mon, Tue, Wed, Thu, Fri, Sat };

console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true

// 类
// 这不就是java那套吗...
// public 公有的,默认都是public，任何地方都可以被访问
// private 私有的，不能在声明他的类之外访问
// protected 受保护的，允许被子类访问
// 抽象类
abstract class Animal {
  // 实例属性
  protected developerName: string = 'jsonz';
  // 静态属性
  private static num: number = 40;
  public constructor(name: string) {
    this.developerName = name;
  }
  set name(name: string) {
    this.developerName = name;
  }

  get name(): string {
    return this.developerName;
  }
  public abstract sayHi(): string;
}


class Cat extends Animal {
  protected developerName: string= 'jsonz';

  sayHi() {
    return `My name is ${this.name}`;
  }
}

let a = new Cat('Jack');
console.log(a.sayHi()); // My name is Jack

/**
抽象类和接口的区别
抽象类指的是一个基类，对类的抽象
接口更多的是对动作的抽象
比如 
一个门可以是抽象类， 报警器是一个功能
防盗门继承抽象类，有门把手等
防盗门实现报警器功能
汽车也有报警器功能
*/

// 抽象类 基类：门
abstract class Door {}
// 接口 报警
interface Alarm {
  alert();
}
// 接口 帮助
interface Help {
  open();
}

class SecurityDoor extends Door implements Alarm, Help {
  alert() {
    console.log('door alert');
  }
  open() {
    console.log('open')
  }
}

class Car implements Alarm {
  alert() {
    console.log('car alert');
  }
}

// 泛型 是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
function createArray<T>(length: number, value: any): Array<T> {
  let result: T[] = [];
  for (let i = 0; i<length; i++) {
    result[i] = value;
  }
  return result;
}

createArray<string>(3, 'x'); 

