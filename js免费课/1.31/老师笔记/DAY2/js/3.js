/*0-61之间的随机的字符  四个
* 0-61 获取0-61之间的随机整数
* Math.round(Math.random()*(m-n)+n) -> 获取n-m的随机整数
* */
var codeBox = document.getElementById('codeBox');
var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
//console.log(str.length); // 62
var result = '';
for (var i = 0; i < 4; i++) {
    var ran = Math.round(Math.random()*61); //随机索引
    var ranStr = str.charAt(ran); //随机索引对应的字符
    result +=ranStr;
}
codeBox.innerHTML = result;

