import { LineStack, StackNode, SeqStack } from './StackClass';

/**
 * 利用栈做圆括号的匹配
 * 思路：
 * 用顺序栈来做简单粗暴
 * 遇到"("入栈，遇到")"判断是否为空，是就返回FLASE，否则退栈。
 * 循环过后判断是否栈空，是就返回True,否则不匹配
 */
function demo3_x1():boolean {
  const str = '(20+30)*50-(60/70';
  let i = 0;
  let ch = str[i];
  const seqStack = new SeqStack();
  while (ch) {
    if (ch === '(') {
      seqStack.push(ch);
    }
    if (ch === ')') {
      if (seqStack.stackEmpty()) return false;
      else seqStack.pop();
    }
    ch = str[++i];
  }
  return seqStack.stackEmpty();
}

/**
 * 字符串完全回文判断
 * 思路:
 * 字符的前一半入栈，然后出栈与后一半对比
 */
function demo3_x2(): boolean {
  const str = 'abcddcba';
  const str2 = 'abcdcba';

  function fn(data: string): boolean {
    const seqStack = new SeqStack();
    const len = data.length;
    for (let i = 0; i < len / 2; i++) {
      seqStack.push(data[i]);
    }
    for (let i = Math.floor(len / 2); i < len; i++) {
      if (seqStack.pop() !== data[i]) return false;
    }
    return true;
  }

  fn(str2);
  return fn(str);
}

/**
 * 网上偷了一个查找最长回文的，还没有理解透...
 */
var longestPalindrome_dp = function (s) {
  var i, j, len;
  // isPalindrom[i][j] represent s[i..j] is a parlindrom string or not.
  var isPalindrom = new Array(s.length);
  for (i = 0; i < s.length; i++) {
    isPalindrom[i] = new Array(s.length);
  }
  var maxLen = 1, longestBegin = 0;
  // initialize
  for (i = 0; i < s.length; i++) {
    isPalindrom[i][i] = true;
    if (i < s.length - 1 && s[i] === s[i + 1]) {
      isPalindrom[i][i + 1] = true;
      maxLen = 2;
      longestBegin = i;
    }
  }
  // compute
  for (len = 3; len <= s.length; len++) {
    for (i = 0; i < s.length; i++) {
      j = len + i - 1;
      if (s[i] === s[j] && isPalindrom[i + 1][j - 1]) {
        isPalindrom[i][j] = true;
        maxLen = len;
        longestBegin = i;
      }
    }
  }
  return s.slice(longestBegin, longestBegin + maxLen);
}

/**
 * 数制转换，既将十进制的N转化为d进制
 * N = (N/d) * d + N % d
 */
function demo3_x3() {
  function fn(n:number, d: number):string {
    const seqStack = new SeqStack();
    while (n) {
      seqStack.push(Math.floor(n % d)+'');
      n = Math.floor(n / d);
    }
    let str = '';
    while (!seqStack.stackEmpty()) {
      str += seqStack.pop();
    }
    return str;
  }
  console.log(fn(171, 8));
}
demo3_x3();

/**
 * x进制转10进制
 * 多项式计算
 * 比如 8进制的 253要转 10进制
 * 2 * 8^2 + 5 *8^1 + 3
 */
function demo3_x6(num: number|string, d: number):number {
  const strNum = num + '';
  const len = strNum.length;
  let result = 0;
  for (let i= 0; i< len; i++) {
    result += Number(strNum[i]) * Math.pow(d, len-i-1);
  }
  return result;
}
console.log(demo3_x6(253, 8));

/**
 * 递归实现阶乘
 */
function demo3_x4(num: number): number {
  if (num === 0) return 1;
  else return num * demo3_x4(num-1);
}

/**
 * 递归实现斐波那契
 */
function demo3_x5(num: number): number {
  if (num <= 1) return num;
  else return demo3_x5(num - 1) + demo3_x5(num -2);
}

/**
 * 3.4
 * 用递归实现某个函数
 * n < 2; fn = n + 1
 * n >= 2; fn = fn([n/2]) * fn([n/4])
 * 递归主要用来说明函数调用是利用了栈的原理。(调用栈如果联想到js的话，可以思考关于 尾调用优化的东西)
 */
function demo3_4(n: number): number {
  if (n < 2) return n+1;
  else return demo3_4(n/2) * demo3_4(n/4);
}