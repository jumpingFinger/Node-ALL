
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
        oA[i].flag = -1;//之前的状态的先通过自定义属性flag保存 默认状态是降序
        oA[i].onclick = function(){
            //传参:当前点击元素的索引，这样才能知道按什么排序
            //点击时状态要跟之前的相反，只要*-1则就就是相反的状态
            //this.flag =this.flag*-1; //状态值传给sortFn方法,sort方法返回值就按照flag值得进行排序
            this.flag*=-1;//简写
           sortFn(this.index,this.flag);
        }
    }
    //1.获取元素 2.元素集合类数组转换成数组 3.通过sort方法排序 4.重新添加到页面，使其在页面上也能排好序
    var oUl = document.getElementById("product");
    var oLis = oUl.getElementsByTagName("li");//元素集合，是一个类数组
    var ary = utils.listToAry(oLis);
    function sortFn(n,flag){
        //每次点击时执行的逻辑
        var attrAry = ["data-price","data-hot","data-time"];
        var key = attrAry[n];//拿到了需要排序值的属性名 "data-price"
        ary.sort(function(a,b){//a 前一个li标签  b 后一个li标签
            //按照属性名对应属性值排序的
            var prev = a.getAttribute(key);
            var next = b.getAttribute(key);
            //对日期处理下
            prev = prev.replace(/-/g,"");
            next = next.replace(/-/g,"");
            return (prev - next)*flag; //排序是按照状态值（要么是-1，要么1）进行排序的
        });
        //4.遍历排序的数组，重新添加到页面
        var frg = document.createDocumentFragment();
        console.dir(frg);
        for(var i = 0;i<ary.length;i++){
            frg.appendChild(ary[i]);
        }
        oUl.appendChild(frg);//若没有则表示添加，若有则表示移动位置
    }

})();
