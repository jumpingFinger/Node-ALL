


let changeSort =(function(){
    let productData=null,
        oUl=document.getElementById('list'),
        header=document.getElementById('header'),
        oLis=oUl.getElementsByTagName('li');

    let getData=()=>{
        let xhr=new XMLHttpRequest();//=>创建ajax实例
        xhr.open('get','./json/product.json',false);
        xhr.onreadystatechange=()=>{
            if(xhr.readyState===4 && xhr.status===200){
                productData=JSON.parse(xhr.responseText);
            }
        };
        xhr.send(null);
    };
    let bindHTML=()=>{
        let str=``;
        for (let i = 0; i < productData.length; i++) {
            let {title,
                img='img/1.jpg',
                price,
                hot,
                time
            } = productData[i];
            //=>自定义属性名最好叫做'data-xxx'
            str+=` <li data-hot='${hot}' data-price='${price}' data-time='${time}'><a href="javascript:;">
            <img src="${img}" alt="">
            <p>${title}</p>
            <span>￥${price}</span>
        </a></li>`;
        }
        list.innerHTML=str;
    };
    let sortList=function(){ //=>箭头函数很强大,但是不可以乱用,尤其是在需要改变函数中this的情况下 ,箭头函数中的tshi
       //=>按照价格升序排列
       //1. 基于getelemnetsbytagname获取的元素集合是一个类数组,
        let productAry=[].slice.call(oLis);

        //2.基于sort给所有的li按照其价格进行排序
        productAry.sort((a,b)=>{
            //=>a : 数组中的当前项
            //=>b ；数组中的下一项
        //    return a-b;//=>数组当前项减去下一项,如果返回的值大于0,则A/B交换位置,否则小于等0什么都不做

            //=>A是当前li,b是下一个li,我们应该获取每一个li的价格从而实现排序(首先数据绑定的时候,我们可以把后面需要用到的价格/时间/销量)存储到li的自定义属性上(在结构中显示,后期只能基于getAttribute这种模式获取)后期我们要用的时候,我们基于自定义属性获取到即可
            let cur=a.getAttribute('data-price');
                next=b.getAttribute('data-price');
             return cur-next;
        });

        //3.按照拍好序的数组 ,我们把li重新增加到页面中就可以了
        for (let i = 0; i < productAry.length; i++) {
            let curLi = arguments[i];
            oUl.appendChild(curLi); //=>appendChild :向容器的末尾追加新元素 ,但是页面中不是20个 ,还是原有的10个,只不过顺序改变了 ,这是为啥?
        }
    };

    return {
        init :function(){
            getData();
            bindHTML();
            sortList();
        }
    }
})();
changeSort.init();