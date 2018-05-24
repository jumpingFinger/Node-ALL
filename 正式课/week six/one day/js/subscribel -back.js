~function anonymous(window) {
    class Subscribe {
        constructor() {
            //=>创建一个容器,每个容器都有一个自己独有的容器,管理自己需要执行的方法即可
            this.pond = [];
        }
        //=>向计划表中添加增加方法:去重
        //=>fn : 我们需要增加的方法
        add (fn){
            let pond=this.pond,
                isExist=false;
            pond.forEach((item)=> item===fn?isExist=true:null);
            if(!isExist){
                pond.push(fn);
            }
        }
        //=>移除方法
        remove(fn){
            let pond=this.pond;
            pond.forEach((item,index)=>{
                if(item===fn){
                     pond.splice(index+1,1);
                }
            })
        }
        //=>通知计划表中的内容一次执行:如果传递参数了,分别把这些参数一次赋值给执行的每一个方法
        fire(...arg){
            let pond=this.pond;
            pond.forEach((item,index)=>{
                console.log(item, index);
                item(...arg);
            });
        }
    }
    window.Subscribe = Subscribe;
}(window);
let subscribe1 = new Subscribe();
let fn1=function (){
    console.log(1);
};
let fn2=function (){
    console.log(2);
};
let fn3=function (){
    console.log(3);
    subscribe1.remove(fn1);
    subscribe1.remove(fn2);
};
let fn4=function (){
    console.log(4);
};
subscribe1.add(fn1);
subscribe1.add(fn1);
subscribe1.add(fn2);
subscribe1.add(fn2);
subscribe1.add(fn3);
subscribe1.add(fn4);

let n=0;
let a=setInterval(()=>{
    console.log('aaaaaaaaaaaaaa');
    n++;
    if(n>2){
        clearInterval(a);
    }
    subscribe1.fire(100,200);
},2000);

