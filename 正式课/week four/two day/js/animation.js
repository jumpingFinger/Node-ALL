~function () {
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
                    value+='px'
                }
            }
            ele['style'][attr]=value;
        };
        let setGroupCss=(ele,options)=>{
            for (let key in options) {
                if (!options.hasOwnProperty(key)) break;
                setCss(ele,key,options[key]);
                console.log(getCss(ele, key));
            }
        };
        let css=(...arg)=>{
            let length=arg.length,
                fn=getCss;
            length>=3?fn=setCss:(length===2 && typeof arg[1]==='object'?fn=setGroupCss:null);
            return fn(...arg);
        };
        return {
            css
        }
    })();
    let effect={
        linear:({time,duration,begin,change})=>time/duration*change+begin
    }
    window.animate=function ({ele,target,duration=1000,callback=new Function()}){
        let change={},
            time=0,
            begin={};
        for (let attr in target) {
            if (!target.hasOwnProperty(attr)) break;
            begin[attr]=utils.css(ele,key);
            change=target[attr]-begin[attr];
        }
        clearTimeout(ele.timer);
        ele.timer=setInterval(function (){
            time+=17;
            if(time>=duration){
                utils.css(ele,target);
                clearTimeout(ele.timer);
                callback.call(ele);
                return;
            }
            let cur={};
            for (let key in target) {
                if (!target.hasOwnProperty(key)) break;
                    cur[key]=effect.linear({duration:duration,time:time,change:change[key],begin:begin[key]});
            }
            utils.css(ele,cur);
        },17)
    }
}();
