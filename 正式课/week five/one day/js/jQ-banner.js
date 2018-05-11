$(function (){
    let bannerRender =(function anonymous(){
        let $container=$('#container'),
            $wrapper=$container.children('.wrapper'),
            $focus=$container.children('.focus'),
            $arrowLeft=$container.children('.arrowLeft'),
            $arrowRight=$container.children('.arrowRight'),
            $focusList=null,
            $slideList=null;

        //=>query data
        let queryData=function  queryData (){
            return new Promise((resolve,reject)=>{
                $.ajax({
                    url:'json/banner.json',
                    method:'get',
                    dataType:'json',
                    async:true,
                    success:resolve,//=>这个重点重点!!!
                    error:reject
                })
            })
        };
        let bindTHML=function (data){
            let strSlide=``;
            let strFocus=``;
            $.each(data,(index,{img,desc})=>{
                strSlide+=` <div class="slide">
         <img src="${img}" alt="${desc}"></div>`;
                strFocus+=`<li class="${index===0?'active':''}"></li>`;
            });
            $wrapper.html(strSlide);
            $focus.html(strFocus);
            $focusList=$focus.find('li');
            $slideList=$wrapper.find('.slide');
        };
        //=>自动轮播
        let curIndex=0,
            previousIndex=0,
            autoTimer=null,
            interval=2000,
            speed=1000;
        let autoMove=function autoMove(){
            curIndex++;
            if(curIndex>$slideList.length-1){
                curIndex=0;
            }
            changeSlide();
        };

        let changeSlide=function (){
            //=>eq还是获取的是jQ的对象,get获取的是原生的JS对象,两个方法都是获取JQ集合中的某一项
            //animate和stop都是JQ提供的动画
            //=>切换思路 : 1.让当前的z-index=1,并且让上一个z-index=0(这样是为了保证不管结构是靠前的还是靠后的,始终当前这个都是层级最高的,也是优先展示的)
            //2.让当前的实现出现渐现效果 (opacity从0-1)
            //3.当前这个已经渐现出来 (动画结束),我们再让上一个透明度为零 (为了下一次展示它的时候,透明度从零开始渐现的)
            //4.让当前的索引变为下一次对应的上一次索引
            let $cur=$slideList.eq(curIndex),
                $pre=$slideList.eq(previousIndex);
            $cur.css('zIndex',1);
            $pre.css('zIndex',0);
            $cur.stop().animate({
                opacity:1
            },speed,()=>{
                //=>这个回调函数是动画结束要结束做的事情   move end
                $pre.css({
                    opacity:0
                });
                previousIndex=curIndex;
            });
            changeFocus();
        };
        let changeFocus=function (){
            $focusList.eq(curIndex).addClass('active');
            $focusList.eq(previousIndex).removeClass('active');
        };

        let handleMouse=function (){
            $container.on('mouseenter',()=>{
                clearInterval(autoTimer);
                //=>add:在一个JQ集合中增加一些新的元素 (获取新的JQ对象),有点类似两个集合合并
                $arrowLeft.add($arrowRight).css('display','block');
            }).on('mouseleave',()=>{
                autoTimer=setInterval(autoMove,interval);
                $arrowLeft.add($arrowRight).css('display','none');
            })
        };

        let handleArrow=function handleArrow(){
            $arrowRight.on('click',autoMove);
            $arrowLeft.on('click',()=>{
                curIndex--;
                if(curIndex<0){
                    curIndex=$slideList.length-1;
                }
                changeSlide();
            })
        };
        let handleFocus=function handleFocus(){
            $focusList.on('click',function (){
                let indexCur=$(this).index();
                if(curIndex===indexCur){return}
                curIndex=indexCur;
                changeSlide();
            })
        };
        return {
            init :function(){
                let promise=queryData();
                promise.then(data=>{
                   //=>获取数据成功后处理的事情(data就是获取的数据)
                    bindTHML(data);
                    autoTimer=setInterval(autoMove,interval);
                    handleMouse();
                    handleArrow();
                    handleFocus();
                });
            }
        }
    })();
    bannerRender.init();
});