/**
 * 广义表
 * 广义表和多维数组感觉概念性的东西比较多...
 */

class GeneralizedTableClass {
  tag: number; // 区分是原子还是子表 tag === LIST 意味着是子表，第二个为slink指向子表的地址; tag !== LIST表示第二个域是data，存放元素值;
  data: any= null;
  slink: GeneralizedTableClass=null;
  link: GeneralizedTableClass=null; // 指向下个元素对于的地址，若是最后一个则为null
  static LIST: 0;
  static ATOM: 1;
}

/**
 * @广义表
 * 建立广义表的存储结构
 */
function createGList(str: any) {
  let gl = new GeneralizedTableClass();
  if (str) {
    if (str === '(') {
      gl.tag = GeneralizedTableClass.LIST;
      gl.slink = createGList(gl.slink);
    } else {
      gl.tag = GeneralizedTableClass.ATOM;
      gl.data = str;
    }
  } else {
    gl = null;
  }
  if (gl !== null) {
    if (str === ',') {
      gl.link = createGList(gl.link);
    } else {
      gl.link = null;
    }
  }
  return gl;
}
