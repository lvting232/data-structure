import { CircyQueue } from './QueueClass';
import { SeqStack } from './StackClass';

function demo1() {
  
  function priority(v: string): number {
    switch(v) {
      case '(':
      case '#':
        return 0;
      case '-':
      case '+':
        return 1;
      case '*':
      case '/':
        return 2;
      default:
        return -1;
    }
  }

  function ctPost(str:string) {
    const queue = new CircyQueue();
    const stack = new SeqStack();
    stack.push('#');

    let i=0;
    let ch= '';
    let t = '';

    do {
      ch = str[i];
      i++;
      switch (ch) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          queue.enQueue(ch);break;

        case '(':
          stack.push(ch); break;
        
        case ')':
        case '#':
          do {
            t = stack.pop();
            if (t !== '(' && t !== '#') queue.enQueue(t);
          } while(t !== '(' && !stack.stackEmpty())
          break;

        case '+':
        case '-':
        case '*':
        case '/':
          while(priority(ch) <= priority(stack.getTop())) {
            t = stack.pop();
            queue.enQueue(t);
          }
          stack.push(ch);
          break;
      }
    } while (ch!== '#')
  }

  const output = ctPost('9-(2+4*7)/5+3#')
  console.log(output);
}

/**
 * 中缀表达式转后缀表达式
 * input: 4+2*3
 * output: 423*+
 *
 * input: 9-(2+4*7)/5+3#
 * output: 9247*+5/-3+
 * 思路:
 * 1. 遇到数字，直接输出到队列
 * 2. 遇到符号，如果栈中有其他更好的优先级，全部弹出，并把当前的压到栈中
 * 3. 遇到 (，压到栈中形成一个全新的符号环境
 * 4. 遇到 ), 把栈中所有符号输出，直到遇到 ( 或#停下
 * 符号优先级
 * (# 0
 * +- 1
 * *\/ 2
 * default -1
 */
function demo1_1(str: string): CircyQueue {
  function priority(o:string) {
    switch(o) {
      case '+':
      case '-':
        return 1;
      case '*':
      case '/':
        return 2;
      case '(':
      case '#':
        return 0;
      default: 
        return -1;
    }
  }

  function ctPost(str:string) {
    const queue = new CircyQueue();
    const stack = new SeqStack();
    stack.push('#');
    str += '#';

    let i =0;
    let ch= str[i];
    while (ch) {
      ch = str[i++];
      switch (ch) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          queue.enQueue(ch); break;

        case '+':
        case '-':
        case '*':
        case '/':
          while (priority(ch) <= priority(stack.getTop())) {
            queue.enQueue(stack.pop());
          }
          stack.push(ch);break;

        case '(':
          stack.push(ch);break;

        case ')':
        case '#':
          let t: string;
          do {
            t = stack.pop();
            if (t !== '(' && t!== '#') queue.enQueue(t);
          } while(t !== '(' && !stack.stackEmpty())
          break;

        case ' ': break;
      }
    };
    return queue;
  }
  return ctPost(str);
}

/**
 * 后缀计算 
 * 思路：
 * 用栈模拟后缀计算
 * 如果是数字，入栈
 * 如果非数字，那就只有运算符的情况，这时候就pop两个栈顶出来计算再压进栈内
 */
function demo2(queue: CircyQueue) {
  const stack = new SeqStack();
  while (!queue.queueEmpty()) {
    const curVal = queue.deQueue();
    if (curVal >= '0' && curVal <= '9') {
      stack.push(curVal);
    } else {
      const r = Number(stack.pop());
      const l = Number(stack.pop());
      let result: string|number = '';
      switch(curVal) {
        case '+':
          result = l + r; break;
        case '-':
          result = l - r; break;
        case '*':
          result = l * r; break;
        case '/':
          result = l / r; break;
      }
      stack.push(result+'');
    }
  }
  return stack.getTop();
}

console.log(demo2(demo1_1('9-(2+4*7)/5+3')));