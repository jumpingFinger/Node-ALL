
~(function(){
    //1.通过ajax获取动态数据
    var xhr = new XMLHttpRequest();
    xhr.open("get","json/data.json",false);
    var data  = null
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)){
            data = utils.toJSON(xhr.responseText);
        }
    }
    xhr.send(null);

//2.数据绑定
    var str = "";
    var oUl = document.getElementById('product');
    for(var i = 0;i<data.length;i++){
        var curObj =  data[i];
        str+="<li data-price='"+curObj.price+"' data-hot='"+curObj.hot+"' data-time='"+curObj.time+"'>";
        str+="<img src="+curObj.picImg+">";
        str+="<h3>"+curObj.title+"</h3>";
        str+="<span>¥"+curObj.price+"</span>";
        str+="<span>"+curObj.hot+"</span>";
        str+="<span>"+curObj.time+"</span>";
        str+="</li>"
    }
    oUl.innerHTML = str;
})();

~(function(){
    var menu = document.getElementById("menu");
    var oA = menu.getElementsByTagName("a");
    for(var i = 0;i<oA.length;i++){
        oA[i].index = i;
        oA[i].flag = -1;
        oA[i].onclick = function(){
            this.flag*=-1;
            //sortFn(this.index,this.flag);不要一个一个传，只要让sortFn里的this变成当前点击的元素，则就能拿到点击元素的自定义属性
            //不是当前点击的元素，它的状态都应该设置成初始状态
            for(var j = 0;j<oA.length;j++){
                if(j!=this.index){
                    oA[j].flag = -1;
                }
            }
            sortFn.call(this);
        }
    }
    var oUl = document.getElementById("product");
    var oLis = oUl.getElementsByTagName("li");
    var ary = utils.listToAry(oLis);
    function sortFn(){
        var attrAry = ["data-price","data-hot","data-time"];
        var key = attrAry[this.index];
        //this跟作用域有关，不同的作用域里，this表示值不一样 ，但是变量可以跨作用域查找
        var that = this;
        ary.sort(function(a,b){
            var prev = a.getAttribute(key);
            var next = b.getAttribute(key);
            prev = prev.replace(/-/g,"");
            next = next.replace(/-/g,"");
            return (prev - next)*that.flag;
        });
        //4.遍历排序的数组，重新添加到页面
        var frg = document.createDocumentFragment();
        for(var i = 0;i<ary.length;i++){
            frg.appendChild(ary[i]);
        }
        oUl.appendChild(frg);//若没有则表示添加，若有则表示移动位置
    }
})();
