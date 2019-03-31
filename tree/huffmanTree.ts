/**
 * 树中所有叶子结点的带权路径长度之和称为树的带权路径长度
 * 带权路径长度最小的二叉树叫最优二叉树或哈夫曼树
 * 完全二叉树一定是最优二叉树，最优二叉树不一定是完全二叉树
 * 
 * 哈夫曼算法思路：
 * 1. 根据n个权值{w1, w2, w3, w4}对应的n个结点构成n棵二叉树的森林F={T1, T2, T3, ...Tn}。其中每颗二叉树Ti都只有一个权值为wi的根节点，其左右树都为空
 * 2. 在森林F中选出两科根节点的权值最小的树作为一颗新树的左、右子树，且置新树的附加根结点的权值为其左、右子树上根节点的权值之和
 * 3. 从F中删除这两棵树，同时把新树加到F中
 * 4. 重复2和3，直到F中只有一棵树为止，这时候就是哈夫曼树
 * 
 * 哈夫曼算法实现：
 * 1. 初始化森林中共有n棵只有根节点的二叉树
 * 2. 将当前森林中两颗根结点权值最小的二叉树，合并为一颗新的二叉树
 * 3. 每合并一次就产生一个新结点，森林中相应减少一棵树，要进行n-1次合并，共产生n-1个新结点
 * 4. 最后得到的哈夫曼树共有2n-1个结点，其中n个叶结点是初始森林的孤立结点。
 */

class HTNode {
  weight: number= 0;
  lchild: number= 0;
  rchild: number= 0;
  parent: number= 0;
}

class HuffmanTree {
  data= [];
  static m: 100;
}

/**
 * 具体实现
 * 1. 初始化2n-1个结点，将三个指针均置空，权值也置空 (0)
 * 2. 读入n个权值，存入数组HT的前n个元素中，他们是森林中n个孤立的根结点上的权值
 * 3. 对森林中的树进行n-1次合并，并产生n-1个新结点，依次存入数组HT的第i个元素。（所以2n-1是由原来的n个和后面生成的n-1个）
 * 3.1 在当前森林中的所有结点 HT[j] 中选取具有最小权值和次小权值的两个根节点，分别用s1和s2记住下标
 * 3.2 将根为HT[s1]和HT[s2]的两棵树合并，使其称为新结点HT[i]的左右孩子，得到一颗以新结点HT[i]为根的二叉树，
 *      同时修改HT[s1]和HT[s2]的双亲域parent,使其指向新结点HT[i]，并将HT[s1]与HT[s2]的权值的和作为新结点HT[i]的权值。
 */

 /**
  * 获取两个最小权值根节点并返回其在数组的下标s1和s2
  * 在 HT[1...k]中选择parent为0且权值最小的两个根结点
  */
function select(tree: HuffmanTree, k: number, ) {
  let j;
  let s1, s2;
  let minl= 101; // 最小权值
  for (let i = 1; i<= k; i++) {
    if (tree.data[i].weight < minl && tree.data[i].parent === 0) {
      j = i;
      minl = tree.data[i].weight;
    }
  }
  s1 = j; minl = 32767;
  for (let i= 1; i<= k; i++) {
    if (tree.data[i].weight < minl && tree.data[i].parent === 0 && i !== s1) {
      j= i;
      minl= tree.data[i].weight;
    }
  }
  s2 = j;
  return [s1, s2];
}

function chuffmanTree(hT: HuffmanTree) {
  let s1, s2;
  for (let i = 1; i <= HuffmanTree.m; i++) {
    hT[i].lchild = 0;
    hT[i].rchild = 0;
  }
}