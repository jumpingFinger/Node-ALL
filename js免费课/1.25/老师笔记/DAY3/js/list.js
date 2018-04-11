var oList = document.getElementById('list'),
    oLis = oList.getElementsByTagName('li');
for (var i = 0; i < oLis.length; i++) {
    if(i%2 == 0){
        oLis[i].limeng = oLis[i].className = 'bg1'
    }else if(i %2 ==1){
        oLis[i].limeng = oLis[i].className = 'bg2';
    }
    oLis[i].onmouseover = function () {
        this.className = 'bg3'
    };
    oLis[i].onmouseout = function () {
        this.className =  this.limeng
    }
}
