var oTab = document.getElementById('tab'),
    oLis = oTab.getElementsByTagName('li'),
    oDivs = oTab.getElementsByTagName('div');
for (var i = 0; i < oLis.length; i++) {
    oLis[i].dali = i;
    oLis[i].onmouseover = function () {

        for (var j = 0; j < oLis.length; j++) {
            oLis[j].className = null;
            oDivs[j].className = null;
        }

        this.className = 'cur';
        oDivs[this.dali].className = 'cur';
    }
}
