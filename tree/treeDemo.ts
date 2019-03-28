import { createTreeForGeneralized, TreeNode, createTreeForCompleteTree, inOrderThread } from './TreeClass';

/**
 * 二叉树的遍历
 * 可以分为三个子问题，访问根结点，遍历左子树，遍历右子树
 * L左，D根，R右
 * 前序：访问根节点；前序遍历左子树；前序遍历右子树
 * 中序：中序访问左子树；访问根节点；中序访问右子树
 * 后序：后序访问左子树；后序访问右子树；访问根结点
 */

const demoTree = createTreeForGeneralized('A(B(D(E,F)),C)');
const demoTree2 = createTreeForCompleteTree('ABCDE@FG');
const demoTreeThread = createTreeForCompleteTree('ABCDE@FG');
inOrderThread(demoTreeThread);

// 前序递归
function preorder(bTree: TreeNode) {
  if (bTree !== null) {
    console.log(bTree.data);
    preorder(bTree.lchild);
    preorder(bTree.rchild);
  }
}

// 中序递归
function inorder(bTree: TreeNode) {
  if (bTree !== null) {
    preorder(bTree.lchild);
    console.log(bTree.data);
    preorder(bTree.rchild);
  }
}

// 后序递归
function postorder(bTree: TreeNode) {
  if (bTree !== null) {
    preorder(bTree.lchild);
    preorder(bTree.rchild);
    console.log(bTree.data);
  }
}

// 写一个简单的stack
class Stack {
  top= -1;
  data: any= [];

  stackEmpty(): boolean {
    return this.top === -1;
  }

  getTop() {
    return this.data[this.top];
  }

  pop() {
    const x = this.data[this.top];
    this.top --;
    return x;
  }

  push(val:any) {
    this.data[++this.top] = val;
  }
}

// 写一个简单的queue
class Queue {
  front= 0;
  rear= 0;
  data= [];
  queueEmpty() {
    return this.front === this.rear;
  }
  enQueue(val: any) {
    this.data[this.rear++] = val;
  }
  deQueue() {
    return this.data[this.front++];
  }
  getTop() {
    return this.data[this.front];
  }
}

// 利用栈的非递归中序
function inOrder(bTree: TreeNode) {
  const stack = new Stack();
  stack.push(bTree);

  while (!stack.stackEmpty()) {
    while(stack.getTop()) {
      stack.push(stack.getTop().lchild); // 添加左子树
    }
    stack.pop();
    if (!stack.stackEmpty()) {
      console.log(stack.getTop().data); // 输出
      stack.push(stack.pop().rchild); // 添加右子树
    }
  }
}

// 利用栈的非递归前序
function preOrder(bTree: TreeNode) {
  const stack = new Stack();
  stack.push(bTree);
  while (!stack.stackEmpty()) {
    const xNode= stack.pop();
    if (xNode !== null) {
      console.log(xNode.data);
      stack.push(xNode.rchild);
      stack.push(xNode.lchild);
    }
  }
}

// 非递归的按层遍历二叉树
function transLevel(bTree: TreeNode) {
  const queue = new Queue();
  if (bTree === null) return;
  queue.enQueue(bTree);
  console.log(bTree.data);
  let node;
  while (!queue.queueEmpty()) {
    node = queue.deQueue();
    if (node.lchild) {
      console.log(node.lchild.data);
      queue.enQueue(node.lchild);
    }
    if (node.rchild) {
      console.log(node.rchild.data);
      queue.enQueue(node.rchild);
    }
  }
}

/**
 * 5.3
 * 已知二叉树的链式存储结构，求二叉树的深度
 * 思路：
 * 1. 若为空，深度为0
 * 2. 深度为左右子树最大深度+1
 * 3. 递归
 */
function demo5_3(bTree: TreeNode) {
  return bTree? Math.max(demo5_3(bTree.lchild), demo5_3(bTree.rchild)) +1: 0;
}


/**
 * 5.4
 * 查x值在树中的结点以及层数
 * 2333 没用书里的例子，书里是两个函数，一个获取结点，一个获取深度
 * 这里用了两个队列，一个循环，一个存深度
 */
function demo5_6() {
  let xNode: TreeNode;
  let lH:number= 0;

  function d(bTree: TreeNode, value: string) {
    const queue = new Queue();
    const queue1 = new Queue();
    if (!bTree) return;
    
    let cNode: TreeNode;
    let count: number = 1;
    queue.enQueue(bTree);
    queue1.enQueue(count);

    while (!queue.queueEmpty() && !xNode) {
      count = queue1.deQueue();
      cNode = queue.deQueue();
      if (cNode.data === value) {
        xNode = cNode;
        lH = count;
      }

      if (cNode.lchild) {
        queue.enQueue(cNode.lchild);
        queue1.enQueue(count+1);
      }
      if (cNode.rchild) {
        queue.enQueue(cNode.rchild);
        queue1.enQueue(count+1);
      }
    }
  }

  d(demoTree2, 'G');
  console.log(xNode, lH);
}


/**
 * 查找某结点的后续结点
 * 如果 p.rtag === 1，则 p.rchild 为右线索指向后续结点
 * 如果 p.rtag === 0, 则 p.rchild指向右孩子，则要从p.rchild开始，沿左指针往下找
 * 复杂度 O(h); h为二叉树高度
 */
function demo5_x() {
  const demoT = createTreeForCompleteTree('ABE@CFGD@@@H@@');
  inOrderThread(demoT);
  function inorderNext(node:TreeNode) {
    if (node.rtag === 1) return node.rchild;
    else {
      node = node.rchild;
      while (node.ltag === 1) {
        node = node.lchild;
      }
      return node;
    }
  }
  let node = inorderNext(demoT.lchild);
  console.log(node);
}
demo5_x();