/**
 * 顺序查找
 * 从一端开始，顺序扫描线性表，依次把扫描到的关键字和给定的值比较
 * 若关键字等于k则表明查找成功，返回下标
 */


/**
 * 实现简单粗暴
 * 查找最多需要n+1次
 * 平均查找长度 (n+1)/2
 * 如果查找成功和不成功机会相等，顺序查找的平均查找长度： 
 * ( ( n+1) / 2 + (n + 1)) / 2 = 3/4 (n+1)
 * 
 * 优点： 对表结构无要求，适用性高
 * 缺点： 效率低
 */
function seqSearch(arr: [], v: number) {
    let i = 0;
    while (arr[i] !== v) {
        i++;
    }
    return i;
}

/**
 * 假设要查找的顺序表示按关键字递增有序的，如果要按前面所给的顺序查找算法同样是可以实现的
 * 表有序的条件就没能用上，这其实就是资源上的浪费。
 * ( (n + 1) / 2 + (n + 1)/ 2)/ 2 = (n + 1) /2
 */
function seqSearch1(arr: [], v: number) {
    const len = arr.length;
    let i = 0;
    while (arr[i] > len) {
        i--;
    }
    if (arr[i] === v) {
        return i;
    }
    return 0;
}

/**
 * 二分查找,又称折半查找。
 * 二分查找要求查找对象必须是顺序存储结构的有序表
 * 
 * 首先将待查的k值和有序表R[1..n]的中间位置mid上记录的关键字进行比较，如果相等，查找成功，返回mid
 * 否则，若R[mid]>k，则k在R[1..mid-1]中，接着在左子表中进行二分查找即可
 * 否则在右子表二分查找。
 * 
 * log2(n+1)
 * 
 * 二分查找的过程是递归的
*/
function binSearch(arr, value, low, high) {
    if (low <= high) {
        let mid = Math.ceil(low + high) / 2;
        if (arr[mid] === value) return mid;
        if (arr[mid] > value) return binSearch(arr, value, low, mid-1);
        else return binSearch(arr, value, mid+1, high);
    } else return 0;
}

// 非递归的实现
function binSearch1(arr, value) {
    let low = 0; 
    let high = arr.length;
    let mid;
    while (low <= high) {
        mid = Math.ceil((low + high) /2);
        if (arr[mid] === value) return mid;
        if (arr[mid] > value) high = mid-1;
        else low = mid +1;
    }
}

/**
 * 索引顺序查找，又叫分块查找，是一种介于顺序查找和二分查找之间的查找方法
 * 将表R[1..n]均分为b块，前B1块中的结点个数为s=[n/b]，第b块的结点数 <= s;
 * 每一块的关键字不一定有序，但前一块的最大关键字必须小于后一块的最小关键字，即要求表是”分块有序“的
 * 抽取各块中的最大关键字及其起始位置构成一个索引表ID[1..b]，
 * 即ID[i](1<=i<=b)中存放着第i块的最大关键字及该块在表R中的起始位置
 * 
 * 分块查找的基本思想是: 首先查找索引表，可用二分查找或顺序查找，然后在确定的块中进行顺序查找
 * 由于分块查找实际上是联系查找过程，所以整个查找过程的平均查找长度，是两次查找的平均查找长度之和
 * O(√2)
 */