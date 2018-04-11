var oTab = document.getElementById('tab'),
    oLis = oTab.getElementsByTagName('li'),
    oDivs = oTab.getElementsByTagName('div');
function tabChange(index) {
    // 清空所有
    for (var i = 0; i < oLis.length; i++) {
        oLis[i].className = null;
        oDivs[i].className = null;
    }

    // 当前添加cur
    oLis[index].className = 'cur';
    oDivs[index].className = 'cur';

}
/*1.解决思路一: 自定义属性*/
/*for (var i = 0; i < oLis.length; i++) {
    oLis[i].zhufeng = i;
    oLis[i].onclick = function () {
        tabChange(this.zhufeng);
    }
}*/

/* 2.解决思路二: 闭包的思想  - 保存  存索引*/
/*for (var i = 0; i < oLis.length; i++) {
    /!*~function(i){
        oLis[i].onclick = function () {
            tabChange(i);
        }
    }(i)*!/

    /!* 内存释放 *!/
    oLis[i].onclick = function (i) {
        return function () {
            tabChange(i);
        }
    }(i)
}*/

/* 3.解决思路三: 利用es6块级作用域的思想*/
for (let i = 0; i < oLis.length; i++) {
    oLis[i].onclick = function () {
        tabChange(i);
    }
}

/* 在点击事件中 i 每次都是得到最后一个for循环结束后的索引*/


