//1.要操作谁 先获取谁
var oTab = document.getElementById('tab'),
    oLis = oTab.getElementsByTagName('li'),
    oDivs = oTab.getElementsByTagName('div');
for (let i = 0; i < oLis.length; i++) {
    var previousIndex =  0;
    oLis[i].onclick = function () {
        // 性能的优化: 用户点击的当前项 也是上一项 就不需要进行任何的操作
        if(previousIndex  == i){
            return;
        }
        // 2.清空被选中的上一个
        oLis[previousIndex].className = null;
        oDivs[previousIndex].className = null;

        //3.給当前加cur类名
        this.className  = 'cur';
        oDivs[i].className = 'cur';

        previousIndex = i;
    }
}