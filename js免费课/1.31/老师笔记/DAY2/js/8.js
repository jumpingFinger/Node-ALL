/* 马少帅思想*/
var licensePlate = document.getElementById('licensePlate'),
    shakeBtn = document.getElementById('shakeBtn');
var n = 0;
var str1 = 'ACEFGBO';
var str2 = 'QWERTYUIOPASDFGHJKLZXCVBNM0123456789';
shakeBtn.onclick = function () {
    n++;
    if (n > 3) {
        return;
    }
    var result = '';
    var index1 = random(str1.length-1,0);
    var ranStr1 = str1.charAt(index1);
    result = '京' + ranStr1;
    for (var i = 0; i < 5; i++) {
        var index2 =  random(str2.length - 1,0);
        var ranStr2 = str2.charAt(index2);
        result += ranStr2;
    }
    licensePlate.innerHTML = result;
};

function random(m,n) {
    return Math.round(Math.random(m - n) + n);
}