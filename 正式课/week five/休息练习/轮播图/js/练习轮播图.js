let utils=(function (){
    let getCss=(ele,attr)=>{
        let val=null,
            reg=/^-?\d+(\.\d+)?(px|rem|em)?$/;
        if('getComputedStyle' in window){
            val=window.getComputedStyle(ele)[attr];
        }
        return reg.test(val)?parseFloat(val):val;
    };
    let setCss=(ele,attr,value)=>{
        if(!isNaN(value)){
            if(!/^(opacity|zIndex)$/.test(attr)){
                value+='px';
            }
        }
        ele['style'][attr]=value;
    };
    let setGroupCss=(ele,options)=>{
        for (let key in options) {
            if (options.hasOwnProperty(key)) {
                setCss(ele,key,options[key]);
            }
        }
    };
    let css=(...arg)=>{
        let length=arg.length,
            fn=getCss;
        length>=3?fn=setCSS:(length===2 && arg[1] instanceof Object?fn=setGroupCss:null);
        return fn(...arg)
    }
    return {
        css
    }
})();
~function (){
    let effect={
        linear:({begin,duration,change,time})=>time/duration*change+begin
    };
    window.animate=function ({ele,target,duration=1000,callback}){
        let change={},
            begin={},
            time=0;
        for (let key in target) {
            if (!target.hasOwnProperty(key)) break;
            begin[key]=utils.css(ele,key);
            change[key]=target[key]-begin[key];
        }
        clearTimeout(ele.timer);
        ele.timer=setInterval(()=>{
            time+=17;
            let cur={};
            if(time>=duration){
                clearTimeout(ele.timer);
                utils.css(ele,target);
                callback.call(ele);
                return ;
            }
            for (let attr in target) {
                if (!target.hasOwnProperty(attr)) break;
                cur[attr]=effect.linear({
                    time:time,
                    duration:duration,
                    change:change[attr],
                    begin:begin[attr]
                })
            }
            utils.css(ele,cur);
        },17);
    };
}();

~function () {
    let banner=options=>new banner.prototype.init(options);
    banner.prototype={
        constructor:banner,
        init:function (options){
            this._default(options);
            let promise=this.getData();
            promise.then(()=>{
                this.bindHTML();
                this.defaultStyle();
            }).then(()=>{
                this.autoTimer=setInterval(()=>{
                    this.autoMove();
                },this.interval);
            }).then(()=>{
                this.containerEvent();
                if(isFocus){
                    this.focusEvent();
                }
                if(this.isArrow){
                    this.arrowEvent();
                }
            })
        },
        _default:function (options){
            this.options={
                ele:null,
                url:null,
                isArrow:true,
                isFocus:true,
                focusEventType:'click',
                defaultIndex:0,
                interval:2000,
                speed:200,
                directions:'horizontal',
                moveEnd:null
            }
            for (let key in options) {
                if (!options.hasOwnProperty(key)) break;
                this.options[key]=options[key];
            }
            for (let key in this.options) {
                if (!this.options.hasOwnProperty(key)) break;
                this[key]=this.options[key];
            }
            this.container=document.querySelector('this.ele');
            this.wrapper=this.container.querySelector('.wrapper');
            this.focus=this.container.querySelector('.focus');
            if(isArrow){
                this.arrowLeft=this.container.querySelector('.arrowLeft');
                this.arrowRight=this.container.querySelector('.arrowRight')
            }
            this.slideList=null;
            this.focusList=null;
            this.stepIndex=this.defaultIndex;
            this.autoTimer=null;
            this.previousIndex=null;
            this.width=null;
            this.height=null;
            this.arrowTimer=null;
        },
        getData:function (){
            let {url}=this;
            return new Promise((resolve)=>{
                let xhr=new XMLHttpRequest();
                xhr.open('get',url,true);
                xhr.onreadystatechange=()=>{
                    if(xhr.readyState===4 && xhr.status===200){
                        this.data=JSON.parse(xhr.responseText);
                        resolve();
                    }
                }
                xhr.send(null);
            })
        },
        bindHTML:function (){
            let str=``,
                focusStr=``;
            this.data.forEach(({img,desc},index)=>{
                str+=`<div class="slide">
         <img src="${img}" alt="${desc}">
       </div>`;
                focusStr += `<li class="${index === 0 ? 'active' : ''}"></li>`;
            });
            this.wrapper.innerHTML=str;
            // this.isFocus?this.focus.innerHTML.
        }
    }
}();
