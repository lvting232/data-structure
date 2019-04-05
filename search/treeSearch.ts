/**
 * 二叉排序树
 * 若右子树非空，右子树所有结点的值都大于根节点的值
 * 若左子树非空，左子树所有结点的值都小于根节点的值
 * 左右子树又是一颗二叉排序树
 */

function getM() {
    return Math.ceil(Math.random() * 100);
}

class BSTNode {
    key: number;
    other: null;
    lchild: BSTNode;
    rchild: BSTNode;
    constructor(other?) {
        this.key = getM();
        this.other = other || '';
    }
}

/**
 * 二叉树的插入和生成
 * 若BST为空，则新结点S作为根节点插入到空树中
 * 当BST为非空，插入结点的关键字S.key与根节点T.key比较，若S.key等于T.key，说明树中已经有该节点，无需插入
 * 若小于T.key，则插入到左子树，否则插入右子树
 */

function insertBST(t: BSTNode, s: BSTNode) {
    let p = t;
    let f;
    while (p) {
        f= p;
        if (s.key < p.key) p= p.lchild;
        else p = p.rchild;
    }
    if (t === null) t= s;
    else if (s.key < f.key) f.lchild = s;
    else f.rchild = s;
    return t;
}

/**
 * 二叉树的生成
 * 每输入一个结点数据，就生成一个新结点，然后调用插入算法插入
*/
function createBST() {
    let t = null;
    let i = 0;
    while (i < 20) {
        const s = new BSTNode();
        t = insertBST(t, s);
    }
    return t;
}

/**
 * 二叉树的向上查找
 * 若二叉树为空，直接失败
 * 若二叉树的值等于当前查找的，返回指针
 * 若二叉树结点的值大于查找的，则查找左子树，否则往右子树查找，递归
 * 
 * 查找的时间复杂度O(log2N)
 */
function searchBST(t: BSTNode, value: number) {
    if (t === null || t.key === value) return t;
    else if (value < t.key) return searchBST(t.lchild, value);
    else return searchBST(t.rchild, value);
}

/**
 * 二叉排序树删除
 * 
 * 设要删除的结点是p，p的父节点是f
 * 若p是叶子结点，直接删除p
 * 若p只有一棵子树（左子树或者右子树），直接用p的左子树（右子树）取代p的位置称为f的一棵子树。
 * 若p即有左子树又有右子树，有两种处理方式可以选
 * 1. 用p的直接前趋结点代替p，即从p的左子树中选择值最大的结点s放在p的位置，然后删除结点s，s是p的左子树中最右的结点且没有右子树
 * 2. 用p的直接后续结点代替p，即从p的右子树中选择值最小的结点s放在p的位置，然后删除结点s，s是p的右子树中最左的结点且没有左子树。
 */


/**
 * B树
 * B树是一种平衡的多路查找树，它在文件系统中非常有用。
 * 定义：
 * 一棵m(m>=3)阶的B树，或为空树，或满足下列性质的m叉树
 * 1. 每个结点至少包含下列信息域 (n, p0, k1, p1, k2, ...,kn, pn)
 * 其中，n为关键字的个数；ki(1<=i<=n)为关键字，且ki<ki+1(1<=i<=n-1);
 * pi(0<=i<=n)为指向子树根节点的指针，且pi所指向子树中所有结点的关键字均小于ki+1,pn所指子树中所有及诶按关键字均大于kn;
 * 2. 树中每个节点至多有m颗子树。
 * 3. 若树为非空，则根结点至少有1个关键字，至多有m-1个关键字。若根节点不是叶子，则它至少有两颗子树
 * 4. 所有的叶节点都在同一层上，并且不带信息，叶子的层数为树的高度h
 * 5. 每个非根节点中包含的关键字个数满足： [m/2]-1 <= n <= m-1。因为每个内部结点的度数正好是关键字总数+1
 * 所以，除根节点之外的所有非终端结点至少有[m/2]棵子树，至多有m棵子树
 */

/**
 * B树结点类型定义
 */
class BTNode {
    keynum: number; // 结点中关键字个数，即结点的大小
    key: []; // 关键字向量
    parent: BTNode;
    ptr: BTNode[]; // 子树指针向量
}

/**
 * B树上插入和删除元素的运算比较复杂，要求进行运算后的结点中的关键字个数 >= [m/2]-1
 * 因此操作涉及到结点的分裂和合并问题
 * 结点超过m阶的话，结点上的第key[m/2]向上一层分裂
 */

/**
 * B树查找
 * 若B树非空，找到树根结点，依次与关键字向量中的每个关键字比较，直到 K >= ki (0 <= i <= n = keynum)
 */
function searchBTree(t: BTNode, value) {
    let p = t;
    let i;
    let pos = null;
    while (p !== null) {
        i = p.keynum;
        while (value < p.key[i]) {
            i--;
        }
        if (value === p.key[i] && i >0) {
            pos = i;
            return p;
        } else {
            p = p.ptr[i];
        }
    }
    return null;
}

/**
 * B+树
 * B+树与B树的区别在于：
 * 1. 有K个孩子的结点必含有k个关键字
 * 2. 所有叶节点中包含了关键字的信息及指向相对应结点的指针，且叶结点本身依照关键字的大小从小到大顺序链接
 * 3. 所有非终端结点可看成是索引部分，结点中仅包含其子树中的最大关键字（或最小关键字）
 */
