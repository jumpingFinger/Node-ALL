var url = 'http://www.zhufengpeixun.cn/stu?name=lucy&age=28&lx=#teacher';


/*==START==*/
var HASH,
    ASK,
    RESULT = {};
//=>获取HASH和ASK
var link = document.createElement('a');
link.href = url;
HASH = link.hash.substring(1);
if (HASH.length > 0) {
    RESULT['HASH'] = HASH;
}
//=>解析ASK
ASK = link.search.substring(1);
if (ASK.length > 0) {
    ASK.split('&').forEach(function (item) {
        var temp = item.split('='),
            key = temp[0],
            val = temp[1];
        RESULT[key] = val;
    });
}

console.log(RESULT);