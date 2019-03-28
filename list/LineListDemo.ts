/**
 * 2.1 - 2.4 都是顺序存储线性表
 *  链式存储线性表
 */

import { SeqList, createListF, createListR, createListR2, LineList, createListRCycle, createDoubleLineListCycle } from './listClass';

/**
 * 2.1
 * 假设有两个线性表LA 和 LB 分别表示两个集合 A和B，现要求一个新集合 A = A ∪ B。
 * 思路：
 * 扩大线性表LA，将LB中不在LA中出现的元素插入到LA中。
 * 只要从线性表LB中依次取出每个元素，按值在LA中查找，若没有则插入
 */
function demo2_1() {
  function union(lA: SeqList, lB: SeqList): SeqList {
    let len = lA.listLength(); // 获取LA的表长
    for (let i = 1; i < len; i++) {
      const value = lB.getNode(i);
      if (lA.locateNode(value) === 0) {
        lA.insertList(++len, value);
      }
    }
    return lA;
  }

  const lA = new SeqList([1, 2, 3]);
  const lB = new SeqList([1, 2, 3, 4,]);
  union(lA, lB);
}

/**
 * 2.2 删除线性表L中重复的元素
 * 思路：
 * while循环 lA i,获取当前值v1
 *  while循环 lA j = i+1，获取当前值v2 与 v1 对比，相同则删除，否则j++
 */
function demo2_2() {
  const lA = new SeqList([1, 2, 3, 4, 4, 4, 4, 4]);
  function purge(lA: SeqList) {
    let i = 1;
    while (i < lA.listLength()) {
      const val = lA.getNode(i);
      let j = i+1;
      while (j < lA.listLength()) {
        const nextVal = lA.getNode(j);
        if (nextVal === val) lA.deleteList(j)
        else j++;
      }
      i++;
    }
  }
  purge(lA);
}

/**
 * 2.3 逆转表
 * 思路:
 * 以表长度的一半为循环次数，对换两个值
 */
function demo2_3() {
  function converts(lA: SeqList) {
    const len = lA.listLength();
    const time = Math.ceil(len / 2);
    let temp: number;
    for (let i= 0; i< time; i++) {
      temp = lA.data[i];
      lA.data[i] = lA.data[len- 1- i];
      lA.data[len- 1- i] = temp;
    }
  }
  const lA = new SeqList([1,2,3,4,5]);
  const lB = new SeqList([1,2,3,4]);
}

/**
 * 2.4 找出最大值和最小值和所在位置
 */
function demo2_4() {
  interface MaxMin {
    max: number;
    min: number;
    maxIndex: number;
    minIndex: number;
  }
  function maxMin(lA: SeqList): MaxMin {
    let max = lA.getNode(1);
    let min = lA.getNode(1);
    let maxIndex = 1;
    let minIndex = 1;
    const len = lA.listLength();
    for (let i= 0; i< len; i++) {
      const index = i + 1;
      const val = lA.getNode(index);
      if (val > max) {
        max = val;
        maxIndex = index;
      }
      if (val < min) {
        min = val;
        minIndex = index;
      }
    }
    return {
      max, min, maxIndex, minIndex,
    }
  }

  const lA = new SeqList([1,2,3,4,5]);
  maxMin(lA);
}

function demo2_lineList() {
  const header = createListF('abc'); // 头插入法
  const headRear = createListR('abc'); // 尾插入法
  const headRearHadDefaultHeadNode = createListR2('abc'); // 有默认头结点的尾插入法
  const nodeI = LineList.getNodeI(headRearHadDefaultHeadNode, 2); // data.b
  const nodeV = LineList.getNodeVal(headRearHadDefaultHeadNode, 'b'); // data.next = c
  LineList.insertList(headRearHadDefaultHeadNode, 1, 'c2');
  const nodeD = LineList.deleteList(headRearHadDefaultHeadNode, 1); // c2
}

/**
 * 2.5
 * 头指针为a的带头结点的单链表A分解成两个单链表 A 和 B，A包含原有A的奇数结点，B包含偶数结点
 * 思路：
 * 创建LineA和LineB，三个指针，一个指向lineA当前被遍历的结点，一个指向lineA最新结点，一个指向lineB最新结点
 * nextNode 依次链入 LineA和LineB，最后再重置尾节点指向即可
 * 复杂度: O(n)
*/
function demo2_5() {
  const headA = createListR2('abcdefghijk');
  const headB = createListR2();
  let nodeA = headA;
  let nodeB = headB;
  let nextNode = headA.next;
  while (nextNode !== null) {
    // 奇数结点
    nodeA.next = nextNode;
    nodeA = nextNode;
    nextNode = nextNode.next;
    if (nextNode !== null) {
      // 偶数结点
      nodeB.next = nextNode;
      nodeB = nextNode;
      nextNode = nextNode.next;
    }
  }
  // 重置最后一个结点指向
  nodeA.next = nodeB.next = null;
}

/**
 * 2.6
 * 两个链表按结点数据值递增有序，写一个算法将两个单链表合并为一个有序单链表
 * 思路：
 * 三个结点指针，nodeA,nodeB,nodeC
 * nodeA !== null && nodeB !== null,判断哪个大 nodeC就链向哪一个，然后改变下个链向的位置
 * 最后再把nodeC链向剩余的结点
 * 复杂度 O(n)
 */
function demo2_6() {
  const headA = createListR2('19');
  const headB = createListR2('2345678');
  const headC = createListR2();
  let nodeA = headA.next;
  let nodeB = headB.next;
  let nodeC = headC;
  while (nodeA && nodeB) {
    if (nodeA.data <= nodeB.data) {
      nodeC.next = nodeA;
      nodeC = nodeA;
      nodeA = nodeA.next;
    } else {
      nodeC.next = nodeB;
      nodeC = nodeB;
      nodeB = nodeB.next;
    }
  }
  nodeC.next = nodeA || nodeB;
}

/**
 * 2.7
 * 循环单向链表查找某个值
 */
function demo2_7() {
  const headA = createListRCycle('abcdef');
  LineList.getNodeValueCycle(headA, 'b');
}

/**
 * 2.8
 * 有个头结点指针为head的循环双向链表，其结点类型包括三个域， prior, next,data
 * 但是其 prior为NULL，所以其实是一个单循环链表，试着修改成为真正的双向循环链表
 * 思路：
 * 建一个指针，指向xNode= head.next，对其循环值要不等于head(既一次循环到底)
 * 将 xNode.next.prior 指向 xNode 即可，最后再把head.prior指向rear
 */
function demo2_8() {
  const head = createDoubleLineListCycle('abc', null); // 此时的双向链表是 [prior: null, data: data, next: next] 复合题干预期
  let xNode = head;
  while (xNode.next !== head) {
    xNode.next.prior = xNode;
    xNode = xNode.next;
  }
}

/**
 * 顺序表和链表的比较
 * 经常查找以顺序表为宜 O(1)
 * 经常插入删除等操作以链表为宜 O(n)
 */