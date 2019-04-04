/**
 * 交换排序：冒泡排序
 */

/**
 * 冒泡排序
 * 通过相邻元素之间的比较和交换，使关键字比较小的元素逐渐从底部移动到顶部，就像水底下的气泡一样逐渐向上冒泡。
 * 将R[n]于R[n-1]比较，若R[n] < R[n-1]，则交换两个，接着对比R[n-1]和R[n-2]直到对比R[2]和R[1]。，第一趟排序结束，此时R[1]最小。
 * 再对比R[n]~R[2]以此类推，要进行n-1次
 * 
 * 稳定性排序 时间复杂度O(n^2)
 */

const arrar = [3123,1312,3123,65,12,412,1,2,34,123];

function demo1() {
    function buubleSort(array: any[]) {
        const len = array.length;
        let temp;
        for (let i= 0; i< len; i++) {
            for (let j= len; j>= i+1; j--) {
                if (array[j] < array[j-i]) {
                    temp = array[j-1];
                    array[j-1] = array[j];
                    arr[j] = temp;
                }
            }
        }
    }
}

/**
 * 快速排序，又称划分交换排序
 * 冒泡排序每次交换使相邻记录之间交换，所以总的比较和移动次数比较多
 * 快速排序，记录关键字的比较和交换是从两端到中间进行的，较大的数值可以一次性交换到比较后的为止，较小的能够换到前面的单元
 * 所以相对移动次数比较少
 * 
 * 基本思想：
 * 首先在当前无序区R[low...high]中任取一个记录作为排序比较的基准(x)，
 * 用此基准将当前无序区划分为两个较小的无序区R[low...i-1]和R[i+1...high]
 * 使左边的无序区中所有记录的关键字均小于基准的关键字，右边的无序区中所有关键字均大于基准关键字
 * 这个过程为一趟快速排序
 * 当R[low...i-1]和R[i+1...high]都非空，分别进行上述划分，直到所有无序区的记录均为已排好序
 * 
 * 具体操作： 设两个指针i和j，初始值分别为low何high，基准记录为x=R[i]
 * 从j所指为止向前搜索找到第一个关键字小于基准的值记录入当前i所指的为止，i自增1
 * 再从i所指的位置向后搜索，找到第一个关键字大于x的记录存入当前j所指的位置，j自减1
 * 重复直至i===j
 */
function demo2() {
    function partition(arr, i, j) {
        let index = arr[i];
        while (i < j) {
            while (i < j && arr[j] >= index) {
                j--;
            }
            if (i < j) {
                arr[i] = arr[j];
                i++;
            }
            while (i < j && arr[i] <= index) {
                i++;
            }
            if (i < j) {
                arr[j] = arr[i];
            }
        }
        arr[i] = index;
        return i;
    }

    function quickSort(arr, low, high) {
        if (low < high) {
            let p = partition(arr, low, high);
            quickSort(arr, low, p-1);
            quickSort(arr, p+1, high);
        }
    }
}