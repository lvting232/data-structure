/**
 * 归并排序
 * 将待排序的文件看成n个长度为1的有序子文件，把这些子文件两两归并，得到 [n/2]个长度为2的有序子文件
 * 然后把这[n/2]个有序的子文件两两归并，最后得到一个长度为n的有序文件为止
 * 
 * 总感觉书里的实现算法很绕？
 * O(nlog2n)
 */
function merge(arr, arr2, low, m, high) {
    let i = low;
    let j = m+1;
    let k = low;
    while (i <= m && j<=high) {
        if (arr[i] <= arr[j]) {
            arr2[k++] = arr[i++];
        } else {
        }
        arr2[k++] = arr[j++];
    }
}

function mergePass(arr, arr2, len, n) {
    let i ;
    for (i = 1; i+2*len-1 <= n; i = i+2*len) {
        merge(arr, arr2, i, i+len - 1, i+2*len - 1);
    }
    if (i+len - 1 < n) {
        merge(arr, arr2, i, i+len -1, n);
    } else {
        for (let j= i; j<=n; j++) {
            arr2[j] = arr[j]
        }
    }
}

function mergeSort(arr, arr2, n) {
    let len = 1;
    while (len < n) {
        mergePass(arr, arr2, len, n);
        len = len * 2;
        mergePass(arr2, arr, len, n);
        len = len * 2;
    }
}