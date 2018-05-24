~function anonymous() {
    if(typeof  Subscribe ==='undefined') throw new ReferenceError('没有引入');
    class Drag extends Subscribe{
        constructor(ele){
            super();
            //=>this:drag的实例
            //=>this.pond=[] this.add () this.remove(); this.fire();

            //=>init parameters
            this.ele=ele;
            ['strX','strY','strL','strT','curT','curL'].forEach((item)=>{
                this[item]=null;
            });

            //=>发布订阅
            this.subDown=new Subscribe();
            this.subMove=new Subscribe();

            //=>拖拽开始
            this.DOWN=this.down.bind(this);
            this.ele.addEventListener('mousedown',  this.DOWN);
        }
        down(ev){
            let ele=this.ele;
            this.strX=ev.clientX;
            this.strY=ev.clientY;
            this.strL=ele.offsetLeft;
            this.strT=ele.offsetTop;

            this.Move=this.move.bind(this);
            this.Up=this.up.bind(this);
            document.addEventListener('mousemove',this.Move);
            document.addEventListener('mouseup',this.Up);

        }
        move(ev){
            let ele=this.ele;
            let curL=ev.clientX-this.strX+  this.strL,
                curT=ev.clientY- this.strY+ this.strT;
            ele.style.left=curL+'px';
            ele.style.top=curT+'px';
        }
        up (ev){
            document.removeEventListener('mousemove',this.Move);
            document.removeEventListener('mouseup',this.Up);
            this.fire(this.ele,ev);//=>子类的实例可以直接调取父类原型上的方法
        }
    }
}();