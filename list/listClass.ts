/**
 * 线性表
*/


// 顺序存储线性表
// 提供的方法都是以1开始的，操作data都是以0开始的，所以有点混
abstract class List {
  protected data: number[]; // 存放表节点
  protected length: number; // 线性表的当前表长
  protected listSize: number= 100; // 最长100位
}

export class SeqList extends List {
  public data= [];
  protected length= 0;

  /**
   * @param list 默认的list值
   */
  constructor(list?: any[]) {
    super();
    if (list) {
      this.data = list;
      this.length = list.length;
    }
  }

  /**
   * @顺序存储结构线性表
   * 置空表
   */
  initList(): void {
    this.data = [];
  }

  /**
   * @顺序存储结构线性表
   * 查表长
   * @return 返回长度
   */
  listLength(): number {
    return this.length;
  }

  /**
   * @顺序存储结构线性表
   * 取表中第i个元素
   * @param i 获取的下表，以1开始
   */
  getNode(i: number): number {
    if (i >= 1 && i <= this.listLength()) {
      return this.data[i-1];
    } else {
      throw new Error('i值越界');
    }
  }

  /**
   * @顺序存储结构线性表
   * 按值查找
   * @param val 要查询的值
   * @return 第一个值为val的新元素，返回位置，如果没有，返回0
   */
  locateNode(val: any): number {
    const len = this.listLength();
    for (let i = 0; i < len; i++) {
      if (this.getNode(i+1) === val) return i+1;
    }
    return 0;
  }

  /**
   * @顺序存储结构线性表
   * 插入，在表L的第i个元素插入一个值为val的新元素，表长度+1
   * 顺序结构存储的线性表要从后面一个一个往后移
   * 复杂度 O(n)
   * @param i 要插入的位置
   * @param val 要插入的值
   */
  insertList(i: number, val: any): void {
    if (i < 1 || i > this.listLength()) throw new Error('position error');
    if (i > this.listSize) throw new Error('overload');

    for (let j = this.listLength()-1; j>= i -1; j--) 
      this.data[j+1] = this.data[j];

    this.data[i-1] = val;
    this.length++;
  }

  /**
   * @顺序存储结构线性表
   * 删除值
   * 顺序结构存储的线性表，要从某个指一直往前移，挤掉要删除的值，表长度 -1
   * 复杂度 O(n)
   * @param i 要删除的位置
   * @return 返回删除的值
   */
  deleteList(i: number): any {
    if (i < 1 || i > this.listLength()) throw new Error('position error');

    const val = this.getNode(i);
    for (let j = i; j <= this.listLength(); j++)
      this.data[j-1] = this.data[j];

    this.length--;
    return val;
  }

  /**
   * @顺序存储结构线性表
   * 获取list
   * @return list
  */
  getList(): any[] {
    return this.data;
  }
}


// 链式存储线性表
class LineNode {
  data: string;  // 存数据
  next: LineNode | null= null; // 下一个结点
  constructor(data: string|null= null) {
    this.data = data;
  }
}

// 双向链表
// 有头结点，开始结点，终端结点；终端结点的next指向头结点，头结点的prior指向终端结点；每个结点都有prior指向前一个，前一个的next指向后一个
// xNode.prior.next === xNode; head.prior === rear; rear.next === head;
class DLineNode {
  data: string;
  next: DLineNode|null = null; // 下一个结点
  prior: DLineNode|null = null; // 上一个结点
  constructor(data: string | null = null) {
    this.data = data;
  }
}

// LineList 链式，有head和rear，双向则多一个prior
// 默认都是带头结点的尾插入法
export class LineList {
  head: DLineNode|LineNode= null; // 头结点
  rear: DLineNode|LineNode= null; // 尾结点
  constructor(headData?: any) {
    if (typeof headData !== 'undefined') {
      this.head = new LineNode(headData);
    }
  }

  /**
   * @单向链表
   * 按结点序号查找
   * @param head 结点
   * @param i 要查找的结点序号，0是头结点
   * @returns 查找的结点或null
   */
  static getNodeI(head: LineNode, i: number): LineNode {
    if (i === 0) return head;
    let j = 1;
    let xNode = head.next;
    while (xNode !== null  && j < i) {
      xNode = xNode.next;
      j++;
    }
    return (j === i)? xNode: null;
  }

  /**
  * @单向链表
  * 按值查找，返回该值结点或null
  * @param head 结点
  * @param val 要查找的值
  * @return 查找的结点或null
  */
  static getNodeVal(head: LineNode, val: string): LineNode {
    let xNode = head.next;
    while (xNode.data !== val && xNode !== null) {
      xNode = xNode.next;
    }
    return xNode;
  }

  /**
   * @单向链表
   * 插入运算
   * 先生成一个结点xNode，再进行插入操作，插入操作是先把xNode.next指向i-1.next，再把i-1.next指向xNode 完成入链
   * @param head 结点
   * @param i 要插入的位置，以1开始，0是head
   * @param val 要插入的结点的值
   */
  static insertList(head: LineNode, i: number, val: string): void {
    const xNode = new LineNode(val);
    const preNode = LineList.getNodeI(head, i - 1);
    xNode.next = preNode.next;
    preNode.next = xNode;
  }

  /**
   * @单向链表
   * 删除运算
   * i-1.next 指向 i.next，返回删除的lineNode
   * @param head 结点
   * @param i 要删除的位置，以1开始，0是head
   * @return 返回删除的结点的值
   */
  static deleteList(head: LineNode, i: number): string {
    const xNode = LineList.getNodeI(head, i);
    const preNode = LineList.getNodeI(head, i-1);
    preNode.next = xNode.next;
    return xNode.data;
  }

  /**
   * @循环链表
   * 查找值，要注意判断 xNode !== head
   * @param head 结点
   * @param val 要查找的值
   * @return LineNode || null
   */
  static getNodeValueCycle(head: LineNode, val: string): LineNode {
    let xNode = head.next;
    while (xNode && xNode !== head&& xNode.data !== val) {
      xNode = xNode.next;
    }
    return xNode;
  }

  /**
   * @双向链表插入
   * @param node 在该结点的前一个插入值
   * @param val 要插入的值
   */
  static dLInsert(node: DLineNode, val: string) {
    const xNode = new DLineNode(val);
    xNode.prior = node.prior;
    xNode.next = node;
    xNode.prior.next = xNode;
    node.prior = xNode;
  }

  /**
   * @双向链表删除
   * @partam 要删除的结点
   * @return 返回删除的值
   */
  static dLDelete(node: DLineNode): string {
    const val = node.data;
    node.prior.next = node.next;
    node.next.prior = node.prior;
    return val;
  }
}

// 头插法创建，head保存的是最新的node
export function createListF(data: string): LineNode {
  let i= 0;
  let ch = data[i];
  let { head } = new LineList();
  while (ch) {
    const node = new LineNode(ch);
    node.next = head;
    head = node;
    i++;
    ch = data[i];
  }
  return head;
}

// 尾插法创建，head保存第一个链，rear保存最新的链
export function createListR(data: string): LineNode {
  let { head, rear } = new LineList();
  let i = 0;
  let ch = data[i];
  while (ch) {
    const node = new LineNode(ch)
    if (head === null) head = node;
    else rear.next = node;
    rear = node;
    i++;
    ch = data[i];
  }
  return head;
}

// 尾插法创建，默认都有头结点，省去判断
export function createListR2(data: string=''): LineNode {
  let { head, rear } = new LineList(null);
  rear = head;
  let i = 0;
  let ch = data[i];
  while (ch) {
    const node = new LineNode(ch);
    rear.next = node;
    rear = node;
    ch = data[++i];
  }
  return head;
}

// 尾插入法创建，默认有头结点，循环链表(既尾节点的next指向头结点)
export function createListRCycle(data: string= ''): LineNode {
  let { head, rear } = new LineList(null);
  rear = head;
  let i = 0;
  let ch = data[i];
  while(ch) {
    const node = new LineNode(ch);
    rear.next = node;
    rear = node;
    ch = data[++i];
  }
  rear.next = head;
  return head;
}

// 尾插入法创建双向数据循环链表，并且加一个参数来满足demo2_8的需求
export function createDoubleLineListCycle(data: string = '', prior?: DLineNode|null): DLineNode {
  const head = new DLineNode(null);
  let rear = head;

  let i = 0;
  let ch = data[i];
  while (ch) {
    const node = new DLineNode(ch);
    rear.next = node;
    node.prior = typeof prior === 'undefined' ? rear : prior;
    rear = node;
    ch = data[++i];
  }
  rear.next = head;
  head.prior = rear;
  return head;
}
