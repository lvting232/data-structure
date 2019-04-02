/**
 * 顶点 v
 * 边 e
 * e 取值范围 0 - 1/2(n(n-1))
 * 边数 = 度数 /2
 * 度数 = ID + OD
*/

import { CircyQueue } from './../stack_queue/QueueClass';
import { SeqStack } from './../stack_queue/StackClass';

const MAX_VERTEX_NUM = 50;
class MGraph {
    vexs= [];
    arcs= [];
}

/**
 * 
 * @param {Object} g 
 * @param {number} n 顶点数
 * @param {number} e 边数
 * 复杂度 o(n^2)
 */
function createMGraph(g: MGraph, n: number, e: number ) {
    for (let i= 0; i< n; i++)
        for (let j= 0; j< n; j++)
            g.arcs[i][j] = Infinity; // 初始化所有邻接元素为无穷大
    for (let k= 0; k< e; k++) {
        // 用户输入 i , j , w 用于赋值
        // 这里 i 直接取0， j取 1， w取随机数
        const w = Math.random();
        g.arcs[0][1] = w;
        g.arcs[1][0] = w; // 因为采用的是压缩存储，所以对角线对称
    }
}

/**
 * 邻接表表示法
 * 对于图G中的每个顶点 vi,把所有邻接于vi的顶点vj链成一个单链表，这个单链表称为顶点vi的邻接表
 * 无边图只需要 顺序结构的顶点表和链表结构的边表
 * 有向图需要 顺序结构的顶点表和出边表入边表
 * 详见 p146
 */
class EdgeNode { // 边表结点类型
    adjvex: number; //顶点的序号
    next: EdgeNode; // 下一条边的指针
}
class VNode {
    vertex: string; // 顶点域 
    link: EdgeNode; // 边表头指针
}
const Adjlist:VNode[] = [];
/**
 * 具体结构
 * 
 * 顶点表示一个数组(Adjlist)
 * Adjlist: VNode组成
 * 顶点域   边表头指针
 * v0 ---> (指向边表) 2 ---> 3 ---> ^
 */


function getchar() {
    return 'abcdefghijk'[Math.ceil(Math.random() * 10)];
}
function getRandom() {
    return Math.ceil(Math.random() * 10);
}
 /**
  * 无向图邻接表的建表算法
  * 复杂度 o(n+e)
  */
 function createGraph(gl: MGraph, n: number, e: number ) {

    // 这里循环是为了建立顶点表
    for (let i= 0; i< n; i++) {
        gl[i].vertex = getchar(); // 读入顶点信息
        gl[i].link = null;  // 初始化边表的头指针为空
    }

    // 采用头插入法建立每个顶点的邻接表
    for (let k = 0; k< e; k++) {
        // 读入边(vi, vj)的顶点序号
        let i = getRandom();
        let j = getRandom();

        // 申请新的边表结点
        const p = new EdgeNode();
        // 将邻接点的序号j赋给新结点的邻接点域
        p.adjvex = i;
        p.next = gl[j].link;

        // 将新结点插入到顶点vj的边表头部
        gl[j].link = p;
    }
 }


/**
 * 图的遍历
 * 深度优先搜索遍历 DFS
 * 依次从v出发搜索v的所有邻接点w，若w没被访问过，则访问并做标记，如果w被访问过，则访问下一个 
 */

// 以邻接矩阵为存储结构的深度优先搜索遍历算法 O(n^2)
const visited = {};
function DFS(g: MGraph, i, n) {
    console.log('v', i);
    visited[i] = 1;
    for (let j = 0; j< n; j++) { // 依次搜索vi的每个邻接点
        if (g.arcs[i][j] === 1 && !visited[j]) DFS(g, j, n); // 若 (vi, vj) ∈ E(G)，且 vj未被访问过，递归调用
    }
}

// 以邻接表为存储结构的深度优先搜索遍历算法 O(n+e)
const visited1 = {};
function DFS1(g: MGraph, i: number) {
    console.log('v', i);
    visited1[i] = 1;
    let p = g[i].link;
    while (p !== null) {
        let j = p.adjvex;
        if (!visited1[j]) DFS1(g, j);
        p = p.next;
    }
}

/**
 * 广度遍历算法 BFS
 * 从vi出发，依次访问vi的所有未被访问过的邻接点vi1, vi2, ...vin并标记
 * 并且按照vi1,...vin的次序，访问每一个顶点的所有未曾访问过的顶点并均标记为已访问
 * 算法的实现可以借助队列
 */

// 邻接矩阵为存储结构的广度优先搜索遍历算法 O(n^2)
const visited2 = [];
function BFS(g: MGraph, i: number, n: number) {
    const queue = new CircyQueue();
    let k, j;
    console.log('v', i);
    while (!queue.queueEmpty()) {
        k = queue.deQueue();
        for (j= 0; j< n; j++) {
            if (g.arcs[k][j] === 1 && !visited2[j]) {
                console.log('v', j);
                visited2[j] = 1;
                queue.enQueue(j);
            }
        }
    }
}

// 以邻接表为存储结构的广度优先搜索遍历算法 O(n+e)
function BFS1(g: MGraph, i, n) {
    const q = new CircyQueue();
    let j, k, p;
    console.log('v', i);
    visited2[i] = 1;
    q.enQueue(i);
    while (!q.queueEmpty()) {
        k = q.deQueue();
        p = g[k].link;
        while (p !== null) {
            j = p.adjvex;
            if (!visited2[j]) {
                console.log('v', j);
                visited2[j] = 1;
                q.enQueue(j);
            }
            p = p.next;
        }
    }
}

/**
 * 6.2
 * 编写一个实现连通图的深度优先遍历的非递归算法
 * 思路:
 * 访问起始顶点v：从v出发，访问一个与v相邻的顶点p后，从p出发访问与p相邻而未被访问过的顶点q，再从q出发，重复过程直到找不到未被访问过的邻接顶点为止
 * 回退到访问过但还有未被访问过的邻接点的顶点，从该顶点出发重复前面的步骤，直到所有顶点的邻接点都被访问过
 * 为此要用一个栈来保存被访问过的结点
 */
function demo6_2(g: MGraph, vi, n) {
    const stack = new SeqStack();
    console.log('v', g[vi].vertex);
    visited[vi] = 1;
    let p = g[vi].link;
    while (!stack.stackEmpty() && p !== null) {
        while (p) {
            if (visited[p.adjvex]) p = p.next;
            else {
                console.log('v', g[p.adjvex].vertex);
                visited[p.adjvex] = 1;
                stack.push(p);
                p = g[p.adjvex].link;
            }
            if (!stack.stackEmpty()) {
                p = stack.pop();
                p = p.next;
            }
        }
    }
}

/**
 * 最小生成树
 * 普利姆(Prim)算法
 * 假设G= (V, G)是一个具有n个顶点的连通图，T= (U, TE)是G的最小生成树，其中U是T的顶点集，TE是T的边集，U和TE的初始值窦唯空。
 * 算法开始时，首先从V中任取一个顶点，将它并入U中，此时U={v1}。只要U是V的真子集，就从那些一个端点在T中，另一个端点仍在T外的所有边中，找一条最短边
 * 假定为(vi, vj)，其中vi∈U，vj∈V-U，并把该边(vi, vj)和顶点vj分别并入T的边集TE和顶点集U，如此进行下去，每次往生成树里并入一个顶点和一条边，
 * 直到n-1次后把所有n个顶点都并入到生成树T的顶点集中，此时U=V，TE中包含n-1条边，此时T就是最小生成树
 * 
 * 总结：选定当前的一个点，然后选出该点的所有顶点中的最小边，递归此操作直至到达顶点，如果到达顶点，则返回到最开始继续找
 */

 /**
  * 克鲁斯卡尔(Kruskal)算法
  * 
  * 将图G中的边按权值从小到大的顺序依次选取E中的边(u, v)，若选取的边使生成树T不形成回路，则把它并入TE中，保留作为T的一条边:
  * 若选取的边使得生成树T形成回路，则将其舍弃，如此进行下去直到TE中包含n-1条边为止
  * 
  * 总结：选定所有的点，然后依次加上权值最小的边，如果该边会导致回路，则去除掉，直到所有的点都连接成树
  */

/**
 * 最小生成树一般可以应用在 多个城市的通讯之类的，最简单的例子 滴滴接客的地图线路规划
 * 一般都是带权有向图求最短路径
 * 迪杰斯特拉(Dijkstra)：按路径长度递增的顺序产生顶点的最短路径算法 P159
 * 思想：
 * 设有向图G=(V, E)，其中 V={1,2,...,n} cost表示G的邻接矩阵，cost[i][j]表示有向边<i, j>的权
 * 若不存在有向边<i, j>，则cost[i][j]为无穷大。
 * 设S是一个集合，其中的每个元素表示一个顶点v1
 * 数组 dist 记录ongoing源点到其他顶点当前的最短距离，其初始值为dist[i] = cost[vi][i], i= 2...n
 * 从S之外的顶点集合V-S中选出一个顶点w，使dist[w]的值最小。
 * 从源点到达w只通过s中的顶点，把w加入集合s中并调整dist中记录的从源点到V-S中每个顶点v的距离，
 * 既从原来的dist[v]和dist[w] + cost[w][v]中选择比较小的值做为新的dist[v]
 * 重复上述过程直到S包含V中其余顶点的最短路径
 * 
 * 算法的最终结果是：S记录了从源点到该顶点存在最短路径的顶点集合，
 * 数组dist记录了从源点到V中其余各顶点之间的最短路径长度，
 * path是最短路径的路径数组(?)
 * 其中path[i]表示从源点到顶点i的最短路径上顶点的前驱顶点
 */

/**
 * 拓扑排序
 * 可用一个有向图来表示项目间的先后关系，既有向边的起点活动是终点活动的前趋活动。
 * 顶点活动网也叫AOV网
 * 在AOV网中，如果不存在回路，所有活动可排成一个线性序列，使得每个活动的所有前趋活动都排在该活动的前面，这个序列就是拓扑序列
 * O(n+e)
 * 
 * 排序思路：
 * 1. 在有向图中选一个没有前趋的顶点（即入度为零）的顶点，输出
 * 2. 从有向图中删除该顶点及其与该顶点有关的所有边
 * 3. 重复执行上述两个步骤，直到全部顶点都输出或途中剩余的顶点中没有前趋顶点为止
 * 4. 输出剩余的无前趋结点
 */