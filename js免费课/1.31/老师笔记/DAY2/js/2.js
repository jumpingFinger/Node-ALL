/*URL: 域名? 参数 = 参数 & 参数 = 参数  wd js oq unicode*/
var str = 'https://www.baidu.com/s?wd=js&oq=unicode';
var str1 = 'https://www.baidu.com/s?wd=vue&oq=unicode';
var str2 = 'https://www.baidu.com/s?wd=node&oq=unicode&age=8';
var str3 = 'https://www.baidu.com/s';
/* 封装: queryURLParameter*/

function queryURLParameter(url){
    /*如果问号不存在 indexOf -> -1 我们不需要进行下面的操作 直接把obj返回即可*/
    var obj = {};
    if(url.indexOf('?') === -1){
          return obj;
    }
    var questionIndex = url.indexOf('?'); // 23
    var questionStr = url.substring(questionIndex+1); // 'wd=js&oq=unicode' 
    var ary = questionStr.split('&');     //     ['wd=js','oq=unicode']
    for (var i = 0; i < ary.length; i++) {  
        var cur = ary[i];					  //  cur= ary[0]= 'wd=js';     cur =ary[1]='oq=unicode';
        var newAry = cur.split('=');         // newAry =['wd','js']    newAry =['oq','unicode']
        obj[newAry[0]] = newAry[1];      obj[newAry[0]]=newAry[1]
    }
    return obj;     //   obj={'wd':'js'}       obj={'oq':'unicode'}
}
console.log(queryURLParameter(str)); //{wd: "js", oq: "unicode"}
console.log(queryURLParameter(str1)); //{wd: "vue", oq: "unicode"}
console.log(queryURLParameter(str2)); //{wd: "node", oq: "unicode"}
console.log(queryURLParameter(str3)); // {}


/*
var str = "https://www.baidu.com?age = 8& name = zhufeng"
function 函数名(url){

}
函数名("https://www.baidu.com?age = 8& name = zhufeng");
函数名(str);
 */

