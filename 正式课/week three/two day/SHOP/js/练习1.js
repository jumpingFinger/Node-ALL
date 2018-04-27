let sortRender =(function(){
    let data=null,
        headerBox=document.getElementById('headerBox'),
        productBox=document.getElementById('productBox'),
        oLinks=headerBox.getElementsByTagName('a');
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
        console.log(data);
        let str=``;
        data.forEach(({    time,
                          img,
                          price,
                          title,
                          hot}
        )=>{
            str+=`<li data-price=${price} data-hot=${hot} data-time=${time}><a href="#">
        <img src="${img}" alt="">
        <p title="HUAWEI P10 Plus 6GB+128GB 全网通版（钻雕金）">${title}</p>
        <span>￥${price}</span>
        <span>时间:${time}</span>
        <span>热度${hot}</span>
    </a></li>`;
        });
        productBox.innerHTML=str;
        oLis=productBox.getElementsByTagName('li');
        oLis=[...  oLis];
    };
    let bindEvent=()=>{
        oLinks=[...oLinks];
        let ary=['data-time','data-price','data-hot'];
        oLinks.forEach((item,index)=>{
            item.flag=-1;
            item.onclick=function(){
                this.flag*=-1;
                oLinks.forEach((item)=>{
                    if(this!==item){
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
                console.log(oLis);
                let frg=document.createDocumentFragment();
                oLis.forEach((item)=>{
                    productBox.appendChild(item);
                });
                productBox.appendChild(frg);
                frg=null;
            }
        });
    };
    return {
        init :function(){
            getData();
            bindHTML();
            bindEvent();
        }
    }
})();
sortRender.init();
