var str = 'http://www.zhufengpeixun.cn/stu?name=lucy&age=28&lx=&sex#teacher';
/*
 * 把一个URL地址问号传参和HASH值部分信息捕获
 *  {
 *    name:'lucy',
 *    age:28,
 *    lx:'',
 *    sex:undefined,
 *    HASH:'teacher'
 *  }
 *
 * URL地址解析：
 *   xxx.html?xxx=xxx&xxx=xxx  （问号传参）
 *   xxx.html#xxx （哈希值）
 *   xxx.html?xxx=xxx#xxx
 *   xxx.html?xxx=xxx&xxx=xxx#xxx
 *   xxx.html?xxx=&xxx=xxx#xxx
 *   xxx.html?xxx=xxx&xxx#xxx
 *   ...
 *
 *   有哈希值，哈希值一定在URL末尾，并且是以#开始的
 *   问号传递的参数都在?后面，一般都是xxx=xxx的模式，有可能没有值，也有可能没有等号
 *   ...
 */

/*
 * 1、HASH值比较容易处理
 *  ->验证是否存在HASH
 *  ->如果不存在HASH值我们不需要处理
 *  ->如果存在HASH值
 *    ->在原有URL中获取HASH值
 *    ->把原有URL中的HASH干掉
 */
var indexHash = str.indexOf('#');//=>获取#在URL中第一次出现位置的索引（不包含#返回-1） <=>ES6针对字符串新增加 includes 方法，验证是否存在某个字符 =>str.includes('#') 返回TRUE是包含,FALSE是不包含
if (indexHash !== -1) {
    //=>包含#有哈希值
    var HASH = str.substring(indexHash + 1);//=>字符串截取：substr/substring/slice
    str = str.substring(0, indexHash);//=>相当于把HASH部分干掉(此时URL中无HASH)
}

/*
 * 2、处理问号传参
 *   ->验证是否存在问号
 *   ->不存在不处理
 *   ->存在问号
 *     ->把问号后面的信息截取掉(此时已经不会存在HASH值了,上面处理了)
 */
var indexASK = str.indexOf('?');
if (indexASK !== -1) {
    var ASK = str.substring(indexASK + 1);//=>获取问号后面的所有信息
}