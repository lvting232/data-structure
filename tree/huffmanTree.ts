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
  static n= 100;
  static m= 199; // 2n-1
  _m: number;
  _n: number;
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
  let j: number;
  let s1: number, s2: number;
  let minl= 101; // 最小权值
  for (let i = 0; i< k; i++) {
    if (tree.data[i].weight < minl && tree.data[i].parent === 0) {
      j = i;
      minl = tree.data[i].weight;
    }
  }
  s1 = j; minl = 32767;
  for (let i= 0; i< k; i++) {
    if (tree.data[i].weight < minl && tree.data[i].parent === 0 && i !== s1) {
      j= i;
      minl= tree.data[i].weight;
    }
  }
  s2 = j;
  return [s1, s2];
}

function chuffmanTree(hT: HuffmanTree) {
  let s1: number= 0;
  let s2: number= 0;
  for (let i = 1; i <= HuffmanTree.m; i++) {
    hT[i] = new HTNode();
  }
  for (let i= 1; i<= HuffmanTree.n; i++) { //输入前n个叶节点
    hT[i].weight = Math.ceil(Math.random() * 10);
    console.log( Math.ceil(Math.random() * 100)); // 这里其实是手动输入前面n个的权值
    for (let j = HuffmanTree.n + 1; j<= HuffmanTree.m; j++) { // 在 H[1...i-1]中选择parent为0且权值最小的两个根节点
      [s1, s2] = select(hT, i-1); // 序号分别是s1和s2
    }
    hT[s1].parent = i; 
    hT[s2].parent = i;
    hT[i].lchild = s1;
    hT[i].rchild = s2;
    hT[i].weight = hT[s1].weight + hT[s2].weight; // 权值相加
  }
}

/**
 * 自己的思路实现一遍，看这个就好
 * 1. 写一个查询函数，从0 - i中返回权值最小的
 * 2. 初始化n个结点
 * 3. 用户输入权值
 * 4. 循环 对前面输入一个值，然后每输入一个值就循环获取最前的值？
 */

function selectNode(ht: HuffmanTree, k: number) {
  let s1: number; let s2:number;
  let min = Infinity;
  for (let i = 0; i< k; i++) {
    let item = ht.data[i];
    if (item.parent === 0 && item.weight < min) {
      s1 = i; min = item.weight;
    }
  }
  min = Infinity;
  for (let i = 0; i< k; i++) {
    let item = ht.data[i];
    if (item.parent === 0 && item.weight < min && i !== s1) {
      s2 = i; min = item.weight;
    }
  }
  return [s1, s2];
}
function demo_x() {
  let ht = new HuffmanTree();
  ht._n = 4;
  ht._m= 2 * ht._n -1;
  // 初始化结点
  for (let i = 0; i< ht._m; i++) {
    ht.data[i] = new HTNode();
  }

  // 初始化结点的值
  for (let i= 0; i< ht._n; i++) {
    ht.data[i].weight = Math.ceil(Math.random() * 100);
  }
  createHuffmanTree(ht);
}
function createHuffmanTree(ht: HuffmanTree) {
  const n = ht._n; // 原来的树结点
  const m = 2 * n -1; // 构建需要的空间
  let s1 = 0; // 选择的lchild
  let s2 = 0;  // 选择的rchild

  for (let i= n; i< m; i++) {
    // 选出最小的两个
    [s1, s2] = selectNode(ht, i);
    console.log(select(ht, i), selectNode(ht, i));
    ht.data[s1].parent = i;
    ht.data[s2].parent = i;
    ht.data[i].lchild = s1;
    ht.data[i].rchild = s2;
    ht.data[i].weight = Number(ht.data[s1].weight) + Number(ht.data[s2].weight);
  }
}

/**
 * 5.5
 * 某种系统在通信中只可能出现8中字符：a, b, c, d, e, f, g, h。它们
 * 在电文中出现的频率分别 0.06、0.15、0.07、0.09、0.16、0.27、0.08、0.12
 * 现在已百分比为权值，既频率*100算，建立哈夫曼树。
 */
function demo5_5() {
  const ht = new HuffmanTree();
  
  ht._n = 8;
  ht._m = ht._n * 2 -1;
  let arr = ['6', '15', '7', '9', '16', '27', '8', '12'];
  for (let i= 0; i<ht._n; i++) {
    ht.data[i] = new HTNode();
    ht.data[i].weight = arr[i];
  }
  for (let i= ht._n; i< ht._m; i++) {
    ht.data[i] = new HTNode();
  }
  createHuffmanTree(ht);
}

/**
 * 哈夫曼编码：数据压缩技术
 * 树中从根到每个叶子都有一条路径，对路径上的各分支约定指向左子树的分支表示“0”码，
 * 指向右子树的分支表示“1”码
 * 取每条路径上的“0”和“1”的序列作为每个叶子结点对应的字符编码，这就是哈夫曼编码
 * 
 * 通常数据压缩的过程叫编码，反之称为解码
 * 电报通信是由传递文字的二进制码组成的字符。 比如"ABCDBACA"有四种字符，只需要两位二进制码表示即可
 * A B C D 分别是: 00、 01、 10、 11
 * 上述的字符可转为： 0001101101001000总长16位
 * 
 * 不大理解的 字符集编码的存储结构及其算法描述
*/