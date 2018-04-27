let productRender =(function(){
    let data=null,
        headerBox=document.getElementById('headerBox'),
        productBox=document.getElementById('productBox'),
        oLiks=headerBox.getElementsByTagName('a'),
        oLis=null;
    let getData=()=>{
        let xhr=new XMLHttpRequest();
        xhr.open('get','json/product.json',false);
        xhr.onreadystatechange=()=>{
            if(xhr.readyState===4 && xhr.status===200){
                data=JSON.parse(xhr.responseText);
            }
        };
        xhr.send(null);
    };
    let bindHTML=()=>{
        let str=``;
        data.forEach(({
            time,
            price,
            title,
            hot,
            img
                      })=>{
            str+=`<li data-price=${price} data-hot=${hot} data-time=${time}><a href="#">
        <img src="${img}" alt="">
        <p title="HUAWEI P10 Plus 6GB+128GB 全网通版（钻雕金）">${title}</p>
        <span>￥${price}</span>
        <span>时间：${time}</span>
        <span>热度：${hot}</span>
    </a></li>`;
        });
        productBox.innerHTML=str;
        oLis=productBox.getElementsByTagName('li');
        oLis=[...oLis];
    };
    let bindEvent=()=>{
        oLiks=[...oLiks]
        oLiks.forEach((item,index)=>{
            let ary=['data-time','data-price','data-hot'];
            item.flag=-1;
            item.onclick=function (){
                this.flag*=-1;
                oLiks.forEach((item)=>{
                    if(item!==this){
                        item.flag=-1;
                    }
                });
                oLis.sort((a,b)=>{
                   let cur=a.getAttribute(ary[index]),
                       next=b.getAttribute(ary[index]);
                   if(index===0){
                       cur=cur.replace(/-/g,'');
                       next=next.replace(/-/g,'');
                   }
                   return (cur-next)*this.flag
                });
                let frg=document.createDocumentFragment();
                oLis.forEach((item)=>{
                   frg.appendChild(item);
                });
                productBox.appendChild(frg);
                frg=null;
            }
        })
    };
    return {
        init :function(){
            getData();
            bindHTML();
            bindEvent();
        }
    }
})();
productRender.init();


data.forEach(()=>{
    //=>动态创建DOM的方式(外层容器基于creatElemnt完成,可以基于创建DOM完成,也可以基于字符串拼接完成)
    let curLi=document.createElement('li');
    curLi.innerHTML=``;
    document.querySelector('.productBox').appendChild(curLi);
});
for(let i=0;i<ary.length;i++){
    let item =ary[i];
}