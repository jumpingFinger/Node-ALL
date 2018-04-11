/*
{
    wd:js,
    oq:unicode
}
*/
var str = 'https://www.baidu.com/s?wd=js&oq=unicode';

//1.查找到问号的索引  indexOf('?')
var questionIndex = str.indexOf('?'); // 23

//2.把问号后面的参数全部截取出来   substr(n,m)/substring(n,m)/slice(n,m)
var questionStr = str.substring(questionIndex+1);//'wd=js&oq=unicode'

//3. 以& 进行拆分  split -> 数组
var ary = questionStr.split('&'); //["wd=js", "oq=unicode"]

//4.再继续以 = 把数组进行--拆分
var obj = {};
for (var i = 0; i < ary.length; i++) {
       var cur = ary[i]; //拿出数组我们要拆分的项 继续以= 进行拆分
       var newAry = cur.split('='); //["wd", "js"] ["oq", "unicode"]
      /* obj[属性名] = 属性值  obj[newAry[0]] = newAry[1]*/
      key = newAry[0];
      value = newAry[1];
      obj[key] = value;
}
console.log(obj); //{wd: "js", oq: "unicode"}


/* 思路:
* 1. 查找问号的索引  indexOf('?') -  > 索引
* 2. 利用查找得到的索引 截取问号后面所有的字符 - > substring(问号索引+1)
* 3. 把问号后面的字符找到 以& 进行拆分 -> 组数
* 4. 把得到的数组中的每一项再进行进一步的拆分 -> 以 = 进行拆分
* 5. 把拆分的数组的第一个给对象obj的key(属性名) 数组的第二项作为对象obj的value(属性值)
* */



