/**
 * 栈(LIFO)
 * 插入、删除的一端称为栈顶(top)，另一端为栈底(button)
 * 有顺序存储结构与链式存储结构
*/


/**
 * @顺序存储结构栈
 * 可以多个栈共享空间，比如同时使用两个栈的时候，两个栈的栈底都置于顺序存储空间的两端
 * 这样除非两个栈顶相遇时才会造成溢出，更大的利用了空间
 */
export class SeqStack {
  private data: string[]= [];
  private stackSize= 100;
  private top: number= -1;

  /**
   * @顺序存储结构栈
   * 置空栈
   */
  initStack(): void {
    this.top = -1;
  }

  /**
   * @顺序存储结构栈
   * 判断栈空
   */
  stackEmpty(): boolean {
    return this.top === -1;
  }

  /**
   * @顺序存储结构栈
   * 判断栈满
   */
  stackFull(): boolean {
    return this.top === this.stackSize - 1;
  }

  /**
   * @顺序存储结构栈
   * 入栈（进栈）
   * @param v 要入栈的值
   */
  push(v: string) {
    if (this.stackFull()) throw new Error('stack overflow');
    this.top++;
    this.data[this.top] = v;
  }

  /**
   * @顺序存储结构栈
   * 出栈(退栈)
   * @return v
   */
  pop():string {
    if (this.stackEmpty()) throw new Error('stack underflow');
    else return this.data[this.top--];
  }

  /**
   * @顺序存储结构栈
   * 获取栈顶元素，不执行出栈操作
   * @return v
   */
  getTop():string {
    if (this.stackEmpty()) throw new Error('stack empty');
    else return this.data[this.top];
  }
}

/**
 * @链式存储结构栈
 */
// 链式存储结点
export class StackNode {
  data: string;
  next: StackNode|null= null;
  constructor(val: string) {
    this.data = val;
  }
}
// 链式栈
export class LineStack {
  private top: StackNode|null= null;

  /**
   * @链式存储结构栈
   * 判断栈空
   * @return boolean
   */
  stackEmpty():boolean {
    return this.top === null;
  }

  /**
   * @链式存储结构栈
   * 进栈
   * @param val 
   * @return 栈顶
   */
  push(val: string): StackNode {
    const node = new StackNode(val);
    node.next = this.top;
    this.top = node;
    return this.top;
  }

  /**
   * @链式存储结构栈
   * 出栈
   * @return 出栈的值
   */
  pop():string {
    if (this.stackEmpty()) throw new Error('stack empty');
    const val = this.top.data;
    this.top = this.top.next;
    return val;
  }

  /**
   * @链式存储结构栈
   * 获取栈顶元素,不执行出栈
   * @return value
   */
  getTop():string {
    if (this.stackEmpty()) throw new Error('stack empty');
    else return this.top.data;
  }
}