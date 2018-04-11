var str = 'http://www.zhufengpeixun.cn/stu?name=lucy&age=28&lx=&sex#teacher';

/*
 * 利用A标签元素对象的固有属性解析出URL每部分的信息值
 *  1、动态创建A标签，并且把需要解析的URL赋值给A标签的HREF属性
 *  2、从A元素对象中通过属性解析出对应的信息
 *   hash:存储的是HASH值(带#)
 *   host:存储的是当前URL的域名+端口
 *   hostname:存储的是域名
 *   pathname:存储的是请求资源文件路径名称
 *   protocol:存储的是请求协议 HTTP/HTTPS...
 *   search:存储的是问号传递参数的信息 （带?）
 *   ...
 */
var link = document.createElement('a');
link.href = str;
var HASH = link.hash.substring(1),
    ASK = link.search.substring(1);

//=>ASK:'name=lucy&age=28&lx=&sex'
/*
 * 把获取的问号参数值进一步处理
 *   1、按照 & 进行拆分  =>["name=lucy", "age=28", "lx=", "sex"]
 *   2、循环每一组，给每一组单独进行处理
 */
var aryASK = ASK.split('&');
var result = {};//=>存储最后的结果
aryASK.forEach(function (item, index) {
    //=>ITEM:循环的每一项
    var temp = item.split('='),
        key = temp[0],
        val = temp[1];//=>SEX没有等号,拆分结果没有第二项,获取的值默认就是UNDEFINED
    result[key] = val;
});
result['HASH'] = HASH;
console.log(result);


//=>forEach
// var ary = [12, 23, 34];
// // for (var i = 0; i < ary.length; i++) {
// //     var item = ary[i];
// //     console.log(item);
// // }
// //=>数组当中有几项,传递的函数（回调函数）就被执行几次,每一次都传递三个参数：item当前循环这一项,index当前循环这项的索引,input当前循环的数组
// ary.forEach(function (item, index) {
//     //=>函数被执行三次
//     //=>item:当前循环的这一项（分别输出 12 23 34）
//     //=>index:当前循环这一项的索引（分别输出 0 1 2）
//     console.log(item, index);
// });




