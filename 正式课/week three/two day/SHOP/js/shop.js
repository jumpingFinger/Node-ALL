let productRender = (function () {
    //=>自执行函数形成的私有作用域不销毁('闭包')
    //=>1.里面的方法和变量等和外界不冲突
    //=>2.里面创建的值也不会销毁
    let data = null,
        productBox = document.getElementById('productBox'),
        headerBox=document.getElementById('headerBox'),
        oLinks=headerBox.getElementsByTagName('a'),
        oLis=productBox.getElementsByTagName('li');
    //=>getData:基于ajax从服务器端获取数据
    let getData = () => {
        let xhr = new XMLHttpRequest();
        xhr.open('get', 'json/product.json', false);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
            }
        };
        xhr.send(null);
    };
    //=>bindHTML :完成数据的绑定 (基于ES6模板字符串)
    let bindHTML = () => {
        let str = ``;
        data.forEach(({
                          price,
                          hot,
                          time,
                          title,
                          img
                      })=>{
            str += `<li data-price="${price}" data-hot="${hot}" data-time="${time}"><a href="#">
            <img src="${img}" alt="">
            <p title="HUAWEI P10 Plus 6GB+128GB 全网通版（钻雕金）">${title}</p>
            <span>￥${price}</span>
            <span>时间:${time}</span>
            <span>热度:${hot}</span>
        </a></li>`;
        });
        productBox.innerHTML = str;
    };

    let bindEvent = () => {
        oLinks=[...oLinks];
        oLinks.forEach((item,index)=>{
            item.flag=-1;
            item.onclick=function (){
                //1.给product-list进行排序(依据点击列的不同进行排序)
                //点击的时候需要获取每一个li价格/热度等信息,此时我们可以在绑定的时候,把这些信息存储到自定义属性上
                //A;根据点击li的索引获取按照谁来排序
                this.flag*=-1;
                let ary=['data-time','data-price','data-hot'];
                [].sort.call(oLis,(a,b)=>{
                        let cur=a.getAttribute(ary[index]),
                            next=b.getAttribute(ary[index]);
                        if(index===0){
                            cur=cur.replace(/-/g,'');
                            next=next.replace(/-/g,'');
                        }
                        return (cur-next)*this.flag;
                });
                //2.按照最新顺序一次添加到容器中
                [].forEach.call(oLis,(item)=>{
                    productBox.appendChild(item);
                })
            }
        });
    };
    return {
        init: function () {//init当前模块的入口,想要实现完整的业务逻辑,我们执行init即可,规划哪些方法先,哪些方法先执行后执行,init相当于当前模块的指挥官('命令设计模式')//=>命令模式 : 基于高级单例模式的模块化开发
            getData();
            bindHTML();
            bindEvent();
        }
    }
})();
productRender.init();