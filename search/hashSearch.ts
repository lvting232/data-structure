/**
 * 散列表
 * 以线性表中每一个元素的关键字key为自变量，通过一种函数H(key)计算出函数值，
 * 把这个函数值解释为一块连续存储空间的单元地址，
 * 将该元素存储到这个单元中。
 * 散列存储中使用的函数H称为散列函数或哈希函数，它实现关键字到存储地址的映射
 */

 /**
  * 散列函数的构造方式
  * 1. 直接地址法： H(key) = key + C
  * 2. 数字分析法: H(key) = 选择数字一些分布平均的组合，比如 3212和3112和3132，则选择2，3位组成地址
  * 3. 除余数法: H(key) = key % p; p 一般取最大质数。比如m=8，则取7；m=32则取31。最常用最简单
  * 4. 平方取中法：比如0100,0110,0111则平方为0010000,0012100,0012321,取345位的话地址就是 100,121,123
  * 5. 折叠法： k=98123657，从左到右每三位一段相加得1275，取低三位275为地址
  * 
  * 
  * 处理冲突方法：
  * 开放定址法：
  * 1. 线性探查法
  * 2. 二次探查法
  * 3. 双重散列法
  * 拉链法：
  * 用链表的方式解决冲突，既next指向下一个data
  * 
  */

/**
 * 查找
 * 1. 线性探查法解决冲突的查找和插入算法
 */
class NodeType {
    key: number;
}
class HashTable {
    data: NodeType[] = [];
}

// 散列函数采用除余法
function h(key: number, m: number) {
    return key % m;
}

// 采用线性探查法的散列表查找算法
function hashSearch1(ht: HashTable, key: number, m: number) {
    let d = h(key, m); // 计算散列地址
    let temp = d;
    // 不为空则循环
    while (ht[d].key) {
        if (ht[d].key === key) return d;
        else d = (d+1)%m;
        if (d === temp) return -1; // 查了一周回到原点，则代表没有找到
    }
    return d;
}

// 在散列表上插入一个结点的算法
function hashInsert1(ht: HashTable, s: NodeType, m: number) {
    let d = hashSearch1(ht, s.key, m);
    if (d === -1) return -1; // 表满
    else {
        if (ht[d].key === s.key) return 0; // 已存在结点
        else {
            ht[d] = s;
            return 1; // 插入成功
        }
    }
}

// 采用拉链法建立散列表上的查找和插入算法
class HTNode1 {
    key: number;
    next: HTNode1;
}
class HT {
    data: HTNode1[]= [];
}
// 查找
function hashSearch2(ht: HT, key: number, m: number) {
    let p = ht[h(key, m)];
    while (p!== null && p.key !== key) p = p.next;
    return p;
}
// 插入
function hashInsert2(ht: HT, s: HTNode1, m: number) {
    let p = hashSearch2(ht, s.key, m);
    if (p !== null) return 0; // 已经存在
    else {
        let d = h(s.key, m);
        s.next = ht[d];
        ht[d] = s;
        return 1; // 插入成功
    }
}
