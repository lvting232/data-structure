/**
 * 队列 (FIFO)
 * 从表的一端插入(rear)，从另一端删除(front)
 * 有顺序循环队列和链队列
 */

/**
 * @顺序队列
 */
export class SeqQueue {
  protected QueueSize: number= 100;
  protected front: number= 0;
  protected rear: number= 0;
  protected data:string[] = [];
}

/**
 * @顺序结构的循环队列
 * 牺牲一个空间来判断是否满
 * 约定入队之前，测试队尾指针在循环意义下加一是否等于头指针，若相等则认为以及满了，即尾指针rear所指向的单元始终是空的
 */
export class CircyQueue extends SeqQueue {
  /**
   * @顺序结构的循环队列
   * 置空队列
   */
  initQueue(): void {
    this.front = this.rear;
  }

  /**
   * @顺序结构的循环队列
   * 判断队列为空
   * @return {boolean} 队列是否为空
   */
  queueEmpty():boolean {
    return this.rear === this.front;
  }

  /**
   * @顺序结构的循环队列
   * 判断队列是否满了
   * @return {boolean} 队列是否满
   */
  queueFull():boolean {
    return (this.rear + 1) % this.QueueSize === this.front;
  }

  /**
   * @顺序结构的循环队列
   * 入队列
   * @param {string} val 进队的值
   */
  enQueue(val: string): void {
    if (this.queueFull()) throw new Error('queue overflow');
    else {
      this.data[this.rear] = val;
      this.rear = (this.rear + 1) % this.QueueSize;
    }
  }
  
  /**
   * @顺序结构的循环队列
   * 取队头结点
   * @return {string} val 队头的值
   */
  getFront(): string {
    if (this.queueEmpty()) throw new Error('queue empty');
    else return this.data[this.front];
  }

  /**
   * @顺序结构的循环队列
   * 出队列
   * @return {string} val 出队的值
   */
  deQueue():string {
    if (this.queueEmpty()) throw new Error('queue empty');
    else {
      const val = this.data[this.front];
      this.front = (this.front + 1) % this.QueueSize;
      return val;
    }
  }
}

/**
 * 链队列
 */
class QueueNode {
  data: string|null= null;
  next: QueueNode|null= null;
  constructor(data?: string) {
    if (data) this.data = data;
  }
}
export class LinkQueue {
  front: QueueNode|null= null;
  rear: QueueNode|null= null;
  constructor() {
    this.front = new QueueNode();
    this.rear = this.front;
  }

  /**
   * @链队列
   * 判断队空
   */
  queueEmpty():boolean {
    return this.rear === this.front;
  }

  /**
   * @链队列
   * 入队列
   * @param {string} val要入队的值
   */
  enQueue(val: string): void {
    const node = new QueueNode(val);
    this.rear.next = node;
    this.rear = node;
  }

  /**
   * @链队列
   * 取队头元素
   * @return {string} 直接返回队头的值
   */
  getFront():string {
    if (this.queueEmpty()) throw new Error('queue empty');
    return this.front.data;
  }

  /**
   * @链队列
   * 出队列
   * @return {string} 出队的值
   */
  deQueue():string {
    if (this.queueEmpty()) throw new Error('queue empty');
    else {
      const node = this.front;
      this.front = this.front.next;
      return this.front.data;
    }
  }
}
// 默认都会带头结点

