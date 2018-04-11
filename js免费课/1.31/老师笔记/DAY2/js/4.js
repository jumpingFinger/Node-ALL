/* 点击获取的四位验证码 - 有可能出现重复的情况*/
var code = document.getElementById('code'),
    codeBox = document.getElementById('codeBox');

var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
//console.log(str.length); // 62
code.onclick = function () {
    var result = '';
    for (var i = 0; i < 4; i++) {
        var ran = Math.round(Math.random()*61); //随机索引
        var ranStr = str.charAt(ran); //随机索引对应的字符
        result +=ranStr;
    }
    codeBox.innerHTML = result;
};


