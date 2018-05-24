~function ($) {
    if(typeof $==='undefined'){
        throw new SyntaxError('必须依赖于jquery~!');}

        class Drag{
            constructor(ele,options={}){
                if(typeof ele ==='undefined' ||ele.nodeType!==1){
                    throw new ReferenceError('ele is a must pass parameter and must be an element node')
                }
            //=>init parameters
                //=>小技巧不错
                let emptyFn=function (){
                    //=>空函数没用 : 我们可以把它赋值给所有的回调函数默认值,也就是回调是空函数,执行的这个空函数
                };

                let {
                    selecotr=ele,
                    dragStart=emptyFn,
                    draging=emptyFn,
                    dragEnd=emptyFn
                }=options;
                /*
                * dragTarget:通过谁来移动
                * ele : 移动谁
                * */
                this.ele=ele;//=>要移动谁
                this.dragTarget=selecotr;//=>通过谁来拖拽
                if(typeof selecotr==='string'){
                    //=>传递一个选择器进来了
                    //=>我们是想通过操作ele中的某个元素来实现拖拽
                    this.dragTarget=$(ele).find(selecotr)[0];
                }

                this.dragStart=dragStart;
                this.draging=draging;
                this.dragEnd=dragEnd;

                //=>drag-start:保证执行原型上的方法,方法中的this都是当前类的实例
                this.dragTarget.addEventListener('mousedown',this.down.bind(this))
            };
            //=>mousedown触发
            down(ev){
                let $ele=$(this.ele);
                this.starX=ev.pageX;
                this.starY=ev.pageY;
                this.starL=$ele.offset().left;
                this.starT=$ele.offset().top;

                this.Move=this.move.bind(this);
                this.Up=this.up.bind(this);
                document.addEventListener('mousemove',this.down);

                this.dragStart();//this:实例
            }
            //=>mousemove
            move(ev){
                let {starX,starY,starL,starT}=this,
                    curL=ev.pageX-starX+starL,
                    curT=ev.pageY-starY+starT;
                $(this.ele).css({
                    top:curL,
                    left:curT
                });
                this.curL=curL;
                this.curT=curT;
                this.draging();
            }
            //=>mouseup
            up (){
                document.removeEventListener('mousemove',this.Move);
                document.removeEventListener('mouseup',this.Up);
                this.dragEnd();
            }

        }


        window.Drag=Drag;
}(jQuery);
/*
*  ele : 当前要拖拽的元素
*  selector:配置项要是拖动自己还是拖动自己下面的某一个元素来实现拖拽
*  */
// new Drag(ele,{
//     selector:'h3',//=>selector:当前需要操作的目标元素选择器(按住他实现移动)
// });