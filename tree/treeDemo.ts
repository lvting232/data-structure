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
const demoT = createTreeForCompleteTree('ABE@CFGD@@@H@@');
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
  inOrderThread(demoT);
  function inorderNext(node:TreeNode) {
    if (node.rtag === 1) return node.rchild;
    else {
      node = node.rchild;
      while (node && node.ltag === 1) {
        node = node.lchild;
      }
      return node;
    }
  }
  return inorderNext;
}

/**
 * 线索二叉树的遍历
 * 沿左指针往下查找，直到左线索标志为1的结点位置，该节点的左指针域必定为null(空)，他就是整个中序序列的第一个结点
 * 访问该节点，就可以依次找到结点的后续，直到中序后续为空为止
 * @TODO: !!!线索二叉树没怎么能理解，感觉这两个例子都是错的!!!
 */
function demo5_x1() {
  const inorderNext = demo5_x();
  function tinorderThrTree(tNode: TreeNode) {
    if (tNode !== null) {
      let xNode = tNode;
      while (xNode && xNode.ltag === 0) {
        xNode = xNode.lchild;
        do {
          console.log(xNode.data);
          xNode = inorderNext(xNode)
        } while (xNode !== null)
      }
    }
  }
  tinorderThrTree(demoT);
}

/**
 * 树的存储结构通常分为三种
 * 1. 双亲表示法
 * 一组连续空间用来存储树的结点，同时为每个结点附设一个指向双亲的指针 parent
 * 这种结构用来求parent 或者 root最便捷，但是如果用来求结点的孩子可能需要遍历整个结构
 * index data  parent
 *  0     A     -1
 *  1     B      0
 *  2     C      0
 *  3     D      0
 *  4     E      1
 */
class PTreeNode {
  data: any;
  parent: number;
}
class PTree {
  node: [];
  n: number;
  maxTreeSize: 100;
}

/**
 * 2. 孩子链表法
 * 树的每个结点都可能有多个子树，因此可以把每个结点的孩子结点看成一个线性表
 * n个结点就有n个孩子链表，为了便于查找，可将树中各结点的孩子链表的头结点存放在一个指针数组中
 */
class CTreeNode {
  child: number;
  data: any;
}
class CPTreeNode {
  data: any;
  firstChild: CTreeNode;
}
class CTree {
  nodes: CPTreeNode[];
  maxTreeSize: 100;
  n: number; // 结点数
  r: number; // 下标
}

/**
 * ps: 
 * 孩子链表方便找出某个节点的所有child
 * 双亲表示法方便找出某个结点的parent && parents
 * 所以有另一种就是结合孩子链表法与双亲表示法，这样既方便往下查找又方便向上查找，但是有一个缺点就是每个node都会多两个存储空间
 */

 /**
  * 3. 孩子兄弟表示法(react-16的fiber就是用这种链表法) 又称二叉链表示法，既以二叉链表作为树的存储结构
  * 链表中两个指针域分别指向该结点的第一个孩子结点和下一个兄弟结点
  * 命名为firshChild与nextSibling
  */


/**
 * 树与森林与二叉树的转换
 * 任何一棵树或一个森林都可以唯一的对应一颗二叉树，任何一颗二叉树也能唯一的对应于一个森林或一棵树
 * 树转为二叉树：类ReactFiber思路，首先在所有兄弟结点之间加一道连线，然后再对每个结点保留长子的连线，去掉该结点与其他孩子的连线。
 * 由于树根没有兄弟，所以转换后的二叉树，其根节点的右子树必为空
 * 森林转二叉树： 将森林里面的每棵树都转为二叉树，再将每个二叉树的根结点看作是兄弟连载一起，形成一颗二叉树
 * 
 * 二叉树到树、森林的转换
 * 若二叉树中结点x是双亲y的左孩子，则把x的右孩子、右孩子的右孩子，都与y用连线连起来，最后去掉双亲到右孩子的连线
 * 
 * 前序遍历森林
 * 1. 若森林非空
 * 2. 访问森林中的第一棵树的根节点
 * 3. 前序遍历第一棵树中的根节点的子树森林
 * 4. 前序遍历除去第一棵树之后剩余的树构成的森林
 * 
 * 后序遍历森林
 * 1. 若森林非空
 * 2. 后序遍历森林中第一棵树的根节点的子树森林
 * 3. 访问第一棵树的根节点
 * 4. 后序遍历除去第一棵树之后剩余的树构成的森林
 */