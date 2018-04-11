/* 于校斌思想*/
var plateNumberBox = document.getElementById('plateNumberBox'),
    btn = document.getElementById('btn');
function regainPlateNumber() {
    var areaStr = 'ABCEFGO',
        areaStr2 = 'QWERTYUIOPASDFGHJKLZXCVBNM0123456789',
        result = '京';
    var n = Math.round(Math.random() * (areaStr.length - 1)),
        char = areaStr[n];
    result = result + char + ' ';
    for (var i = 0; i < 5; i++) {
        var m = Math.round(Math.random() * (areaStr2.length - 1)),
            char2 = areaStr2[m];
        result += char2;
    }
    plateNumberBox.innerHTML = result;
}

var count = 0;
btn.onclick = function () {
    if (count < 3) {
        regainPlateNumber();
        count++;
    }
    else {
        alert('摇号次数已达到上限，摇号不易，且摇且珍惜！');
        btn.disabled = 'disabled';
    }
};
