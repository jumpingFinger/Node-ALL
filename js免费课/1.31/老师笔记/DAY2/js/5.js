/* 需求升级 - 点击获取的四位不重复验证码 */
var code = document.getElementById('code'),
    codeBox = document.getElementById('codeBox');
var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
//console.log(str.length); // 62
code.onclick = function () {
    var result = '';
    for (var i = 0; i < 4; i++) {
        var ran = Math.round(Math.random()*61); //随机索引
        var ranStr = str.charAt(ran); //随机索引对应的字符
        if(result.indexOf(ranStr) > -1){
            //如果存在 直接跳过 进行下一轮循环
            i--;
            continue;
        }
        // 拼接的前提条件:  我们的结果中不存在 才进行拼接
        result +=ranStr;
    }
    codeBox.innerHTML = result;
};


