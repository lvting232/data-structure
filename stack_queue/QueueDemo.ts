import { LinkQueue } from './queueClass';

/**
 * 假设用一个带头结点的循环单链表表示队列，该队列只设一个指向队尾的指针rear，不设头指针
 * 编写相对应的初始化队列、入队、出队算法
 * 既每个node有一个指向next的指针，该队列有头结点，有rear指向最后的指针，最后的next指向头结点
 * 空队列的情况，头结点(rear)的next指向自己
 */
function demo3_7() {
  class QueueNode {
    data:string=null;
    next:QueueNode=null;
    constructor(data: string= null) {
      this.data = data;
    }
  }
  class QueueList {
    rear: QueueNode=null;
    constructor() {
      this.rear= new QueueNode();
      this.rear.next = this.rear;
    }

    /**
     * 入队
     * @param {string} val要入队的值
     */
    enQueue(val: string) {
      const node = new QueueNode(val);
      node.next = this.rear.next;
      this.rear.next = node;
      this.rear = node;
    }

    /**
     * 出队列
     * @return {string} 出列的val值
     */
    deQueue():string {
      if (this.rear.next === null) throw new Error('queue empty');
      else {
        const node = this.rear.next;
        this.rear.next = node.next;
        if (this.rear.next === this.rear) this.rear.next = null;
        const t = node.next;
        return t.data;
      }
    }
  }

  const queueList = new QueueList();
  queueList.enQueue('a');
  queueList.enQueue('b');
  queueList.enQueue('c');
  queueList.enQueue('d');
  queueList.deQueue();
  queueList.deQueue();
  queueList.deQueue();
  queueList.deQueue();
}