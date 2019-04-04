整个待排序都在内存中处理，不涉及数据的内、外村交换，则称为内部排序，反之称为外部排序

内部排序根据策略不同可分为： 插入、选择、交换、归并、分配排序

排序时间开销一般可以用算法执行中关键字的比较次数和记录的移动次数来衡量

选择排序
插入排序
交换排序
归并排序

总觉得书里的实现方法很绕，后面有时间的时候看思路自己实现

# 时间复杂度
直接插入、直接选择、冒泡排序 O(n^2)
快速、归并、堆排序 O(nlog2N)
希尔排序算法时间复杂度很难计算，接近O(nlog2N) 或 O(n^1.25)
基数排序 O(d*(rd+n)) rd是基数，d是关键字位数，n是元素个数

# 稳定性
直接插入、冒泡、归并、基数排序稳定
直接选择、希尔、快速、堆排序不稳定

# 辅助空间（空间复杂度）
直接插入、直接选择、冒泡、希尔和堆排序 O(1)
快排 O(nlog2n)
归并 O(n)
基数排序 O(n+nd)

# 排序方法的选取
若数目n比较小（比如 n<= 50) 可以采用插入排序或选择排序
若比较大应该选择 快速排序、堆排序、归并排序
若排序记录按关键字基本有序，适宜选择直接插入排序或冒泡排序
若n很大，关键字位数很小，采用基数排序

