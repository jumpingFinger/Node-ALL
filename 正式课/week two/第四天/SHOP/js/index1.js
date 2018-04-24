let changeSort=(function (){
    let productData=null;
    let oUl=document.getElementById('list');
    let getData=()=>{
      let xhr=new XMLHttpRequest();
      xhr.open('get','./json/product.json',false);
      xhr.onreadystatechange=()=>{
          if(xhr.readyState===4 && /2\d{2}/.test(xhr.status)){
              productData=xhr.responseText;
          }
      };
      xhr.send(null);
        productData=JSON.parse(productData);
    };
    let bindHTML=()=>{
      let str=``;
        for (let i = 0; i < productData.length; i++) {
            let {
                price,
                img,
                title,
                time,
                hot
            }=productData[i];
            str+=`<li data-price=${price} data-hot=${hot} data-time=${time}><a href="javascript:;">
            <img src=${img} alt="">
            <p>${title}</p>
            <span>￥${price}</span>
        </a></li>`;
            oUl.innerHTML=str;
            }
    };
    let change=function (){
        let ary=['data-time','data-price','data-hot'],
            oLis=document.getElementsByTagName('li');
            oLis=[...oLis];
        oLis.sort((a,b)=>{
            let cur=a.getAttribute(ary[this.index]),
                next=b.getAttribute(ary[this.index]);
            if(this.index===0){
                cur=cur.replace(/-/g,'');
                next=next.replace(/-/g,'');
            }
            return (cur-next)*this.flag;
        });
        let frg=document.createDocumentFragment();
        for (let i = 0; i < oLis.length; i++) {
            frg.appendChild(oLis[i]);
        }
        oUl.appendChild(frg);

    };
    let bindEvent=()=>{
        let oAs=document.getElementById('header');
        for (let i = 0; i < oAs.length; i++) {
            let item=oAs[i];
            item.flag=-1;
            item.index=i;
            item.onclick=function (){
                this.flag*=-1;
                for (let j = 0; j < oUl.length; j++) {
                   if(j!==this.index){
                       oUl[j].flag=-1;
                   }
                   change.call(this);
                }
            }

        }
    };


    return {
        init:function (){
            getData();
            bindHTML();
            bindEvent();
        }
    }
})();
changeSort.init();