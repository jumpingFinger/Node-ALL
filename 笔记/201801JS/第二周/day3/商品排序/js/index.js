//1.动态数据绑定
//->ajax获取数据，字符串拼接的方式把数据绑定在页面上
var xhr = new XMLHttpRequest();
xhr.open("get", "json/data.json", false);
var data = null;
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
        data = utils.toJSON(xhr.responseText)
    }
};
xhr.send(null);

var oUl = document.getElementById("ul");
var str = '';
for (var i = 0; i < data.length; i++) {
    var cur = data[i];
    str += "<li data-price ='"+cur.price+"' data-hot ='"+cur.hot+"' data-time ='"+cur.time+"'>";
    str += "<img src=" + cur.picImg + ">";
    str += "<h3>" + cur.title + "</h3>";
    str += "<span>¥" + cur.price + "</span>";
    str += "<span>" + cur.hot + "</span>";
    str += "<span>" + cur.time + "</span>";
    str += "</li>"
}
oUl.innerHTML = str;
//2.获取A标签绑定点击事件
var menu = document.getElementById('menu');
var oA = menu.getElementsByTagName("a");
for (var j = 0; j < oA.length; j++) {
    oA[j].index = j;
    oA[j].flag = -1;//默认是降序    flag属性用来存储状态 -1 降序 1 升序
    oA[j].onclick = function () {
        //若是升序则变成降序，若是降序则变成升序
        //点击后的状态需要传给sortFn
        this.flag *=-1;
        sortFn(this.index,this.flag);
    }
}
//同一个A标签
//第一次：默认flag值存的是-1 降序  点击flag*-1= 1  return prev- next 升序
//第二次：获取flag值就是1 升序 点击flag*-1=-1 return (prev-next)*flag->next-prev 降序

//1.获取元素集合 2.类数组转换成数组 3.排序 4.重新添加到页面
var oLis = oUl.getElementsByTagName('li');
var ary = utils.listToArray(oLis);
function sortFn(n,flag) {
    var attrAry = ["data-price","data-hot","data-time"];
    ary.sort(function(a,b){
        var key = attrAry[n];
        var prev = a.getAttribute(key);
        var next = b.getAttribute(key);
        prev = prev.replace(/-/g,"");
        next = next.replace(/-/g,"");
        return (prev - next)*flag;
    });
    var frg = document.createDocumentFragment();
    for(var i = 0;i<ary.length;i++){
        frg.appendChild(ary[i]);
    }
    oUl.appendChild(frg);
}


