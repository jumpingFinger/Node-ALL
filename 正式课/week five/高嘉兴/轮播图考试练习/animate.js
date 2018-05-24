/*
* 自己完成的动画库，UTILS。有BUG：索引切换速度比焦点快很多，图片切换有明显延迟。未解决？？？？？？
* */

let utils = (function () {
  let getCss = function (curEle,attr) {
    let val=null,
      reg=/^-?\d+(\.\d+)?(px|rem|pt|em)?$/;
    if ('getComputedStyle' in window){
      val=window.getComputedStyle(curEle,null)[attr];
      reg.test(val)?val=parseFloat(val):null;
    }
    return val;
  };

  let setCss=function (curEle,attr,val) {
    if (!isNaN(val)&&!/^(opacity|zIndex)$/.test(attr)){
      val+='px';
    }
    curEle['style'][attr]=val;
  };

  let setGroupCss=function (curEle,options) {
    for (let attr in options) {
      if (options.hasOwnProperty(attr)) {
        setCss(curEle,attr,options[attr]);
      }
    }
  };

  let css=function (...arg) {
    let len=arg.length,
      fn=getCss;
    len>=3?fn=setCss:(len===2&&typeof arg[1]==='object'?fn=setGroupCss:null);
    return fn(...arg);
  };

  //支持遍历数组对象等
  let each=function (obj,callBack) {
    if ('length' in obj){
      for (let i = 0; i < obj.length; i++) {
        let item = obj[i],
          res=callBack&&callBack(item,index,item);
        if (res===false)break;
      }
    }else {
      for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) {
          let item=obj[attr],
            res=callBack&&callBack(item,attr,item);
          if (res===false)break;
        }
      }
    }
  };

  return {css,each}

})();


~function(){

  let effect={
    Linear:(t,b,c,d)=>t/d*c+b
  };

  window.animate=function animate(ele,target,duration=1000,callback) {
    //判断第三个传递的参数是否为函数
    if (typeof duration==='function'){
      callback=duration;
      duration=1000;
    }

    let time=0,
      begin={},
      change={};
    utils.each(target,(key,value)=>{
      begin[key]=utils.css(ele,key);
      change[key]=value-begin[key];
    });

    clearInterval(ele.animateTimer);
    ele.animateTimer=setInterval(()=>{
      time+=17;
      if (time>=duration){
        clearInterval(ele.animateTimer);
        utils.css(ele,target);
        callback&&callback.call(ele);//???
        return;
      }
      //获取每个元素的当前位置，给元素设置
      utils.each(target,(key,value)=>{
        let cur=effect.Linear(time,begin[key],change[key],duration);
        utils.css(ele,key,cur);
      })
    },17)
  }

}();












