/**
 * 插入排序： 直接插入、希尔排序
 * 
 * 书里的数据类型是
 * define MAXSIZE 100
 * typedef int KeyType;
 * typedef struct {
 *   KeyType key;
 *   InfoType otherinfo;
 * } RecType
 * typedef RecTyle SeqLIst[MaxSize+1];
 * SeqList R;
 * 
 * js里面直接写一个随机的数组就行了
 */
const array = [5421,1,21,412,31,2312,4,124,12];


/**
 * 插入排序
 * 每次将一个待排序的记录按其关键字的大小插入到前面已安排好序的文件中的适当位置，直到全部记录插入完为止
 * 插入排序主要包括：直接插入排序和希尔排序两种
 */

/**
 * 直接插入排序：假设待排序的记录存储在数组R[1..n]中，
 * 在排序过程的某一时刻，R被划分为两个子区间，R[1...i-1]和R[i...n]，其中前一个为已经排好序的有序区
 * 后一个为无序区，开始时有序区只含有一个元素R[1]，无序区为R[2,...n]
 * 排序过程中，只需每次从无序区中取出第一个元素，把它插入到有序区的适当位置，使之成为新的有序区，
 * 依次这样经过n-1次插入后，无序区为空，有序区包含了全部n个元素，至此排序完毕
 * 
 * 稳定性排序 空间复杂度O(1) 时间复杂度 O(n^2)
 */
function demo1() {
    function insertSort(list: number[]) {
        const len = list.length;
        let temp:number;
        let j: number;
        for (let i= 1; i< len; i++) {
            if (list[i] < list[i-1]) { // 如果 list[i] >= 有序区的最大，则不需要动
                temp = list[i];
                for (j= i-1; temp < list[j]; j--) {
                    list[j+1] = list[j];
                }
                list[j+1] = temp;
            }
        }
    }
    insertSort(array);
}

/**
 * 希尔排序：缩小增量排序
 * 先取定一个小于n的整数d1作为第一个增量，把数组R中的全部元素分为d1个组
 * 所有下标距离为d1的倍数的元素放在同一组中，即R[1], R[1+d1], R[1+2d1]...为第一组
 * R[2], R[2+d1], R[2+2d1]...为第二组...接着在各组内进行直接插入排序；
 * 然后再取d2(d2 < d1)为第二个增量，重复上述分组和排序，直到所取的增量dt= 1(dt<dt-1<...<d2<d1),
 * 把所有的元素放在同一组中进行直接插入排序为止
 * 非稳定性排序 
 * 希尔排序的时间依赖于增量序列，如何选择该序列使得比较次数和移动次数最少，至今未能从数学上解决。
 * 一般有几个特征，最后一个增量必须为1，尽量避免增量序列中的增量di互为倍数。
 */
/**
 * 
 * @param arr 待排序数组
 * @param dk 当前的增量
 * @param n 
 */
function demo2() {
    
    function shellInsert(arr: number[], dk: number, n: number) {
        for (let i= dk; i< n; i++) {
            if (arr[i] < arr[i - dk]) {
                let temp = arr[i];
                let j = i - dk;
                while (j >= 0 && temp < arr[j]) {
                    arr[j+dk] = arr[j];
                    j = j- dk;
                }
                arr[j+dk] = temp;
            }
        }
    }

    // d为增量序列比如 [5, 3, 1]
    function shellSort(arr: number[], d: number[]) {
        let len = arr.length;
        let dLen = d.length;
        for (let k= 0; k< dLen; k++) {
            shellInsert(arr, d[k], len)
        }
    }
    // 定义好增量序列的调用方法
    // shellSort(array, [5, 3, 1]);

    // 默认用1的增量序列调用
    // shellInsert(array, 1, array.length);
}
