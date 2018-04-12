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
    str += "<li>";
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
    oA[j].onclick = function () {
        sortFn(this.index)//把当前点击的A标签的索引当成实参，这样就能知道按照哪个进行排序
    }
}

//1.获取元素集合 2.类数组转换成数组 3.排序 4.重新添加到页面
var oLis = oUl.getElementsByTagName('li');
var ary = utils.listToArray(oLis);
function sortFn(n) {
    //假如 n = 0; 就是按照价格进行排序
    ary.sort(function(a,b){
        var aSpan = a.getElementsByTagName("span")[0].innerHTML.substr(1);
        var bSpan = b.getElementsByTagName("span")[0].innerHTML.substr(1);
        return aSpan - bSpan;
    })

    //排序后li重新添加到页面
    var frg = document.createDocumentFragment();
    for(var i = 0;i<ary.length;i++){
        frg.appendChild(ary[i]);
    }
    oUl.appendChild(frg);
}


