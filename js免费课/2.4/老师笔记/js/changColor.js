var oUl = document.getElementById('list'),
    oLis = document.getElementsByTagName('li');
for (var i = 0; i < oLis.length; i++) {
    oLis[i].zhufeng = oLis[i].className = 'bg' + (i%3+1);
    oLis[i].onmouseover = function () {
        this.className = 'bg4'
    };
    oLis[i].onmouseout = function () {
        this.className =  this.zhufeng
    };
    oLis[i].index = i;
    oLis[i].onclick = function(){
        alert('我是第' + (this.index+1) + '个li的行!');
    }
}


