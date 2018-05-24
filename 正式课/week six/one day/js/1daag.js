let box=document.querySelector('#box');


let subscribeDown=new Subscribe ();
let subscribeMove=new Subscribe ();
let subscribeUp=new Subscribe ();

let down=function (ev){
    this.strX=ev.clientX;
    this.strY=ev.clientY;

    this.strL=this.offsetLeft;
    this.strT=this.offsetTop;
    //=>绑定给document是为了防止鼠标操作过快,离开box盒子,导致焦点丢失问题
    // document.onmousemove=move.bind(this);
    // document.onmouseup=up;
    //=>此处我们使用DOM2事件绑定更好一些(这样可以避免由于DOM0只能绑定一个方法 ,后期可能会导其他方法覆盖我们的方法的问题)
    this.Move=move.bind(this);
    this.Up=up.bind(this);
    document.addEventListener('mousemove',this.Move);
    document.addEventListener('mouseup',this.Up);
    subscribeDown.fire(this,ev);
};

let move=function (ev) {
    //=>随时根据鼠标的移动计算出当前的位置
    let curL=ev.clientX-this.strX+  this.strL,
        curT=ev.clientY- this.strY+ this.strT;
    // let minL=0,minT=0;
    // let winW=document.documentElement.clientWidth ||document.body.clientWidth;
    // let winH=document.documentElement.clientHeight ||document.body.clientHeight;
    // let maxL=winW-this.strX,
    //     maxT=winH-this.strY;
    // curL=curL<minL?minL:(curL>maxL?maxL:curL);
    // curT=curT<minT?minT:(curT>maxT?maxT:curT);
    this.style.left=curL+'px';
    this.style.top=curT+'px';
    subscribeMove.fire(this,ev);
};

let up=function (ev) {
    // document.onmousemove=null;
    // document.onmouseup=null;
    document.removeEventListener('mousemove',this.Move);
document.removeEventListener('mouseup',this.Up);
subscribeUp.fire(this,ev);
};
box.onmousedown=down;

/*
* 浏览器有最小计算(反应时间),同样的距离移动,操作反应过来的次数就少,触发mousemove这个行为次数就会变少了,如果移动的慢,反应次数多,触发行为的次数也就多了
*
* =>水平方向的运动只跟即将松开手的一瞬间运动的速度有关系;我们需要获取的是即将松开一瞬间的速度
*
* */

//1.移动中随时计算速度
subscribeMove.add((curEle,ev)=>{
    //=>第一次开始运动,让lastFly(上一次的位置)以及speedFly(最新的速度)都为初始当前位置
    if( typeof curEle.speedFly ==='undefined'){
        curEle.lastFly=curEle.offsetLeft;
        curEle.speedFly=0;
        return;
    }
    //=>第二次移动 : 用当前的值-上一次的值,就是最新的差值(速度),当前最新的值很快就会成为下一次的上一次的值,知道拖动结束位置
    curEle.speedFly=curEle.offsetLeft-curEle.lastFly;
    curEle.lastFly=curEle.offsetLeft;
    console.log(curEle.speedFly);
});

//=>2.离开的时候做一些事情 (根据获取的speedFly)让元素动起来
subscribeUp.add((curEle,ev)=>{
    let minL=0,minT=0;
    let maxL=(document.documentElement.clientWidth ||document.body.clientWidth)-curEle.offsetWidth;
    let maxT=document.documentElement.clientHeight ||document.body.clientHeight-curEle.offsetHeight;
    // let curL=curEle.offsetLeft;




    let curL=curEle.offsetLeft,
        dir='right';
    curL<0?dir='left':null;
    curEle.speedFly = Math.abs(curEle.speedFly);
    curEle.flyTimer=setInterval(()=>{
        //=>ofsetLeft获取的值都会四舍五入,所以在当前left的基础上,+小于0.5的速度,下一次在获取当前left值的时候还是会被省略,也就是元素不在运动,此时结束定时器
        if (curEle.speedFly<0.5){
            clearTimeout(curEle.flyTimer);
            return
        }
       let curL=curEle.offsetLeft;
       curEle.speedFly*=0.98;
       if(dir==='right'){
           if(curL>=maxL){
               //=>向游走到达右边界
               curEle.style.left=maxL +'px';
               dir='left';
               return
           }
           curL+=curEle.speedFly;
       }else {
           if(curL<=-minL){
               curEle.style.left=minL +'px';
               dir='right';
               return ;
           }
           curL-=curEle.speedFly;
       }
        // if(curL<=maxL && curL>=0){ //=>正中间
        //     curL+=curEle.speedFly;
        // }else if(curL>maxL){ //=>最右边
        //     curL-=curEle.speedFly;
        // }else if(curL<minL){ //=>最左边
        //     curL+=curEle.speedFly;
        // }
        curEle.style.left=curL +'px';
    },17);
});

//=>3.当我们按住盒子的时候,还要结束当前所有正在运动的动画
subscribeDown.add((curEle,ev)=>{
    clearInterval(curEle.flyTimer);
    clearInterval(curEle.dropoTimer);
    curEle.speedFly=0;
});

subscribeUp.add((curEle)=>{
    let speed=9.8,
        minT=0,
        maxT=(document.documentElement.clientHeight ||document.body.clientHeight)-curEle.offsetHeight;
    let flag=0;

    curEle.dropoTimer=setInterval(()=>{
        if(flag>1){
            clearInterval(curEle.dropoTimer);
            return;
        }
        //=>实现速度衰减和加速
        speed+=9.8;
        speed*=.98;
        let curT=curEle.offsetTop;
        curT+=speed;
        // if(Math.abs(speed)<0.5){
        //     curEle.style.top=maxT+'px';
        //     clearInterval(curEle.dropoTimer);
        //     return;
        // }

        if(curT>=maxT){
            curEle.style.top=maxT+'px';
            speed*=-1;
            flag++;
            return;
        }
        curEle.style.top=curT+'px';
        flag=0;
    },17);
});