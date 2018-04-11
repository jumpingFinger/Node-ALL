/**
 * Created by Lenovo on 2018/3/10.
 */
~function () {
    var addbg = function () {
        var  oMain = document.getElementById('main'),
            oWrapper1=oMain.getElementsByClassName('wrapper1')[0],
            oScene = oWrapper1.getElementsByClassName('scene')[0],
            oItem =oScene.getElementsByClassName('item');
        for (var i = 0; i < oItem.length; i++) {
            oItem[i].curIndex=i;
            oItem[i].children[0].style.backgroundImage='url(images/'+oItem[i].curIndex + '.jpg)';
        }
    };
    addbg();
}();
~function () {
    function ChangeTab(tabBox,options) {
        var _default = {
            initIndex :0,
            eventType :'mouseover'
        };
        for (var key in options) {
            if (arguments.hasOwnProperty(key)) {
                _default[key]=options[key];
            }
        }
        this.initIndex=_default.initIndex;
        this.eventType=_default.eventType;

        this.tabBox=tabBox ;
        this.init();
    }
    ChangeTab.prototype={
        constructor :ChangeTab,
        init: function () {
            // console.log(utils.children(this.tabBox, 'ul'));
            // console.log(utils.children(this.tabBox, 'ul')[0]);


            this.tab = utils.children(this.tabBox, 'ul')[0];
            this.tabList = utils.children(this.tab, 'li');
            this.conList = utils.children(this.tabBox, 'div');
            this.prevIndex = 0;
            this.change();
            // this.clear();
        },
        change :function () {
            var _this =this;
            for (var i = 0; i < _this.tabList.length; i++) {
                // if( _this.prevIndex ==this.myIndex) return;
                _this.tabList[i].myIndex = i ;
                _this.tabList[i]['on'+_this.eventType]=function () {
                    _this.tabList[_this.prevIndex].className =null;
                    _this.conList[_this.prevIndex].className='oBox';
                    this.className=' selectedLi';
                    _this.conList[this.myIndex].className ='oBox selectedDiv';
                    _this.prevIndex=this.myIndex;
                }
            }
        }
    };
    window.ChangeTab = ChangeTab;
}();
~function () {
    var tabBox = document.getElementById('tabBox');

    var tab = new ChangeTab(tabBox, {
        eventType: 'onmouseover',
        initIndex: 0
    });

}();
~function () {
    var oMosaic= document.getElementById('mosaic-img'),
        oList=oMosaic.getElementsByTagName('li');
    for (var i = 0; i < oList.length; i++) {
        oList[i].currentIndex=i;
        oList[i].style.backgroundImage='url(images/mosaic'+  oList[i].currentIndex+'.jpg)';
    }
}();
~function () {
    var oView =document.getElementById('view'),
        oList =oView.getElementsByClassName('album');
    for (var i = 0; i < oList.length; i++) {
        oList[i].currentIndex=i;
        oList[i].children[0].style.backgroundImage='url(images/album'+oList[i].currentIndex+'.jpg)';
    }
}();
~function () {
    var oPr_ad =document.getElementById('pr_ad'),
        oList =oPr_ad.getElementsByTagName('li');

    for (var i = 0; i < oList.length; i++) {
        oList[i].currentIndex=i;
        oList[i].style.background='url(images/pr_ad'+oList[i].currentIndex+'.jpg)';
    }
}();
~function () {
    var oView =document.getElementById('view1'),
        oList =oView.getElementsByClassName('album');
    for (var i = 0; i < oList.length; i++) {
        oList[i].currentIndex=i;
        oList[i].children[0].style.backgroundImage='url(images/view1'+oList[i].currentIndex+'.jpg)';
    }
}();
~function () {
    var oView =document.getElementById('view2'),
        oList =oView.getElementsByClassName('album');
    for (var i = 0; i < oList.length; i++) {
        oList[i].currentIndex=i;
        oList[i].children[0].style.backgroundImage='url(images/view2'+oList[i].currentIndex+'.jpg)';
    }
}();
~function () {
    var oContent=document.getElementById('content'),
        oList=oContent.getElementsByClassName('aaa');
    var previous=0;
    for (var i = 0; i < oList.length; i++) {
        oList[i].currentIndex=i;
        oList[i].onmouseover=function () {
            oList[previous].className='clearfix aaa';
            this.className='clearfix aaa cur';
            previous=this.currentIndex;
        };
        oList[i].onmouseout=function () {
            this.className='clearfix aaa cur';
        };
    }


}();
~function () {
    var oBox = document.getElementsByClassName('oBox');
    var _oData=null;
    var xhr = new XMLHttpRequest();
    xhr.open('GET','js/date.json',false);
    xhr.onreadystatechange =function(){
        if(xhr.readyState===4 && xhr.status === 200){
            _oData = JSON.parse(xhr.responseText);
        }
    };
    xhr.send(null);
// console.log(_oData);
// console.log(_oData.zxgx);
    var str =``;
    _oData.zxgx.forEach(function(item){
        str+=`  <div class="aaa">
        <p>${item.huati}</p>
        <span>${item.date}</span>
    </div>`;
    });
    console.log(str);
    oBox[0].innerHTML = str;
    var str1 =``;
    _oData.wdxz.forEach(function(item){
        str1+=`  <div class="aaa">
        <p>${item.huati}</p>
        <span>${item.date}</span>
    </div>`;
    });
// console.log(str1);
    oBox[1].innerHTML = str1;
    var str2=``;
    _oData.rmht.forEach(function(item){
        str2+=`  <div class="aaa">
        <p>${item.huati}</p>
        <span>${item.date}</span>
    </div>`;
    });
// console.log(str2);
    oBox[2].innerHTML = str2;
}();


