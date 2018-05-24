~function anonymous(window) {
    if(typeof Callbacks==='undefined') throw new ReferenceError('没有引入Callbacks');
    class Drag extends Callbacks{
        constructor(ele){
            super();
            this._default(ele);
            this.downCallbacks=new Callbacks;
            this.moveCallbacks=new Callbacks;
            this._down=this.down.bind(this);
            this.ele.addEventListener('mousedown',this._down);
        }
        _default(ele){
            this.ele=ele;
            ['startX','startY','startL','startT','curT','curL'].forEach((item)=>{
                this[item]=null;
            });
        }
        down(ev){
            let ele=this.ele;
            this.startX=ev.clientX;
            this.startY=ev.clientY;
            this.startL=ele.offsetLeft;
            this.startT=ele.offsetTop;

            this._move=this.move.bind(this);
            this._up=this.up.bind(this);
            document.addEventListener('mousemove',this._move);
            document.addEventListener('mouseup',this._up);
            this.ele.style.zIndex=2;
            this.downCallbacks.fire(this.ele,ev);
        }
        move(ev){
            let ele=this.ele;
            let curL=ev.clientX-this.startX+this.startL,
                curT=ev.clientY-this.startY+this.startT;
            let minL=0,
                minT=0,
                winW=document.documentElement.clientWidth ||document.body.clientWidth,
                winH=document.documentElement.clientHeight ||document.body.clientHeight,
                maxL=winW-ele.clientWidth,
                maxT=winH-ele.clientHeight;
                curL=curL<minL?minL:(curL>maxL?maxL:curL);
                curT=curT<minT?minT:(curT>maxT?maxT:curT);
                ele.style.left=curL+'px';
                ele.style.top=curT+'px';
               this.moveCallbacks.fire(this.ele,ev);
        }
        up(ev){
            document.removeEventListener('mousemove',this._move);
            document.removeEventListener('mouseup',this._up);
            this.fire(this.ele,ev);
        }
    }
    window.Drag=Drag;
}(window);