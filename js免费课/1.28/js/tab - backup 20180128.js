var oTab = document.getElementById('tab'),
    oLis = oTab.getElementsByTagName('li'),
    oDivs = oTab.getElementsByTagName('div');
for (var  i = 0; i < oLis.length; i++) {
    var previousIndex =  0;
    oLis[i].index = i;
    oLis[i].onclick = function () {
        if(previousIndex  == this.index){
            return;
        }

        oLis[previousIndex].className = null;
        oDivs[previousIndex].className = null;

        this.className  = 'cur';
        oDivs[this.index].className = 'cur';

        previousIndex = this.index;
    }
}