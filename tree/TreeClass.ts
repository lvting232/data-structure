/**
 * 树（学完离散数学看这章比较好理解）
 * 一个结点拥有子树的数量称为该结点的度
 * 一颗树最大的度称为该树的度
 * 1： 在二叉树的第i层上最多有2^(i-1)个结点
 * 2： 深度为k的二叉树最多有 2^k -1个结点
 * 3:  对于任何一颗二叉树，若其终点结点数为n0,度数为2的结点有n2，那么n0 = n2 + 1
 * 4:  满二叉树： 深度为k且有2^k - 1个结点的树称为满二叉树，既所有结点的度都为二，所有叶子都在k层
 * 5:  完全二叉树： 若一棵树的k-1层是一颗满二叉树，k层上的结点都集中在该层的左边，则称完全二叉树。(满二叉树包含完全二叉树)
 * 6:  n个结点的完全二叉树的深度为 [logn]+1 (log(n+1))
 */

/**
 * 顺序存储的二叉树
 * 编号为i的结点Qi(0 < i <= n)
 * 1 若i = 0，Qi为根结点；否则Qi的双亲(parent)结点为 [(i-1)/2]
 * 2 若 (2i + 1) < n，则Qi的左孩子编号为 2i +1,否则无左孩子，Qi为叶子结点
 * 3 若 (2i + 2) < n, 则Qi的右孩子编号为 2i +2, 否则无右孩子
 */
export class TreeNode {
  data: any= null;
  lchild: TreeNode= null;
  rchild: TreeNode= null;
  ltag: number=0; // 0 代表lchild指向左孩子，1代表指向前驱
  rtag: number=0; // 0 代表rchild指向右孩子，1代表指向后驱
  constructor(data= null) {
    this.data = data;
  }
}

class Tree {
  binTNode: TreeNode= new TreeNode();
}

/**
 * 按广义表表示二叉树结构生成二叉树链表算法
 * (A(B(, D(E,F)),C))
 * 逗号左边为左孩子，逗号右边为右孩子，括号往内一层括号为一颗子树
 * 利用stack来存储parent
 */
export function createTreeForGeneralized(str: string): TreeNode {
  let { binTNode } = new Tree();
  let i =0;
  let ch = str[i];

  // 模拟一个栈
  const stack = [];
  let top = -1;

  // 判断是否是左孩子
  let isLeftChild = true;
  let treeNode: TreeNode;

  while (ch) {
    switch(ch) {
      case '(':
        stack[++top] = treeNode; isLeftChild = true; break;
      case ')':
        top--; break;
      case ',':
        isLeftChild=false; break;

      default:
        treeNode = new TreeNode();
        treeNode.data = ch;
        if (binTNode.data === null) {
          binTNode = treeNode;
        } else {
          stack[top][isLeftChild? 'lchild': 'rchild'] = treeNode;
        }
    }
    ch = str[++i];
  }
  return binTNode;
}

// const bTree = createTreeForGeneralized('A(B(,D(E,F)),C)');

/**
 * 根据补全'@'的完全二叉树创建二叉树
 * 两个结点， front和rear，front指向parent，rear指向当前结点。
 * 遇到 '@' 跳过
 * rear % 2 判断是左还是右，rear % 2 ===0，意味着移动到下个parent
 */
export function createTreeForCompleteTree(str: string) {
  let i = 0;
  let ch = str[i];
  const queue = [];
  let front = 0;
  let rear = 0;
  let { binTNode } = new Tree();

  while (ch && ch !== '#') {
    let node: TreeNode= null;
    if (ch !== '@') {
      node = new TreeNode(ch);
    }
    queue[rear] = node;
    if (rear === 0) {
      binTNode = node;
    } else {
      if (node !== null && queue[front]) {
        queue[front][rear % 2 === 1? 'lchild': 'rchild'] = node;
      }
      if (rear % 2 === 0) front ++;
    }
    ch = str[++i];
    rear++;
  }

  return binTNode;
}
// let bTree2 = createTreeForCompleteTree('ABC@D@@@@EF#');

/**
 * 二叉树的线索化
 * 如果根节点的lchild指针域为空，将左线索标志置1，同时把前趋结点的指针赋给根结点的左指针域，既给根节点加左线索
 * 如果根节点的rchild指针域为空，将右线索标志置1，同时把后趋结点的指针赋给根结点的右指针域，既给根节点加左线索
 * 将根结点指针赋予给存放前趋结点指针的变量，以便下一个结点设置前趋结点。
 * ·
 * @param bTree 树根结点
 * 
 */

export function inOrderThread(bTree: TreeNode) {
  let pre: TreeNode = null;
  function fn(bTree: TreeNode) {
    if (bTree !== null) {
      fn(bTree.lchild);
      if (bTree.lchild === null) {
        bTree.ltag = 1;
      }
      if (bTree.rchild === null) {
        bTree.rtag = 1;
      }
      if (pre) {
        if (pre.rtag === 1) pre.rchild = bTree;
        if (bTree.ltag === 1) bTree.lchild = pre;
      }
      pre = bTree;
      fn(bTree.rchild);
    }
  }
  fn(bTree);
}
