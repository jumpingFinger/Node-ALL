
let changeSort =(function(){
    let productData=null,
        list=document.getElementById('list'),
        header=document.getElementById('header'),
        oLis=list.getElementsByTagName('li');
    let getData=()=>{
        let xhr=new XMLHttpRequest();
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
            str+=` <li data-hot="${hot}" data-price=${price} data-time=${time}><a href="javascript:;">
            <img src="${img}" alt="">
            <p>${title}</p>
            <span>￥${price}</span>
        </a></li>`;
        }
        list.innerHTML=str;
    };
    let bindEvent=()=>{
        let oAs=header.getElementsByTagName('a');
        oAs=[...oAs];
        oAs.forEach((item,index)=>{
            item.myIndex=index;
            item.flag=-1;
            item.onclick=function (){
                oAs.forEach((item)=>{
                    if(item !==this){
                        item.flag=-1;
                    }
                });
                this.flag*=-1;
                change.call(this);
            }
        });
    }; 
    let change =function (){
        let ary=['data-time','data-price','data-hot',];
        let {myIndex:_myIndex,flag:myFlag}=this;
        oLis=[...oLis];
        oLis.sort((a,b)=>{
            let cur=a.getAttribute(ary[_myIndex]),
                next=b.getAttribute(ary[_myIndex]);
            if(_myIndex===0){
                cur=cur.replace(/-/g,'');
                next=next.replace(/-/g,'');
            }
            return (cur-next)*myFlag;
        });
        let frg=document.createDocumentFragment();
        oLis.forEach((item)=>{
            frg.appendChild(item);
        });
        list.appendChild(frg);
    };
    return {
        init :function(){
            getData();
            bindHTML();
            bindEvent();
        }
    }
})();
changeSort.init();