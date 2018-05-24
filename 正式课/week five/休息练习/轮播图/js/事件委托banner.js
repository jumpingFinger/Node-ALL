let bannerRender =(function(){
    //=>获取要操作的元素或者元素集合
    let container=document.querySelector('#container'),
        wrapper=container.querySelector('.wrapper'),
        focus=container.querySelector('.focus'),
        arrowLeft=container.querySelector('.arrowLeft'),
        arrowRight=container.querySelector('.arrowRight');
    let slideList=null,
        focusList=null,
        curOnclick=-1;

    //=>轮播图运动的基础参数
    let stepIndex=0,//=>继续当前展示块的索引
        autoTimer=null,//=>存储自动轮播的定时器
        interval=3000;//=>间隔多长时间切换一次


    //=>获取数据
    let queryData=function queryData(){
        return new Promise((resolve,reject)=>{
            let xhr=new XMLHttpRequest();
            xhr.open('get','json/banner.json',true);
            xhr.onreadystatechange=()=>{
                if(xhr.readyState===4 &&xhr.status===200){
                    let data=JSON.parse(xhr.responseText);
                    resolve(data);
                }else if(xhr.status!==200){
                    reject();
                }
            };
            xhr.send(null);
        });


    };

    let bindHTML=function (data){
        let strSlide=``,
            strFocus=``;
        data.forEach(({img='img/banner1.jpg',desc},index)=>{
            //=>结构的时候如果当前返回的数据中没有img,我们可以让其等于默认值
            strSlide+=` <div class="slide">
         <img src="${img}" alt="${desc}">
       </div>`;
            //=>ES6模板字符串中${}存放的是JS表达式,但是需要表达式有返回值 ,因为我们要把这个返回值拼到模板字符串中
            strFocus+=`<li class="${index===0?'active':''}">
        
</li>`;
        });
        wrapper.innerHTML=strSlide;
        focus.innerHTML=strFocus;

        //=>获取所有的slide 和li
        slideList=wrapper.querySelectorAll('.slide');
        focusList=focus.querySelectorAll('li');

        wrapper.appendChild(slideList[0].cloneNode(true));
        slideList=wrapper.querySelectorAll('.slide');
        //=>根据slide的个数动态计算wrapper的宽度
        utils.css(wrapper,'width',slideList.length*1000);
    };

    //=>控制轮播图的运动
    let autoMove=function (){
        stepIndex++;

        if(stepIndex>=slideList.length){
            utils.css(wrapper,'left',0);
            stepIndex=1;
        }
        //=>基于自主封装的animate实现切换动画
        animate(wrapper,{
            left:-stepIndex*1000
        },300);//=>200是从当前切换到下一张的动画时间 interval间隔多久切换一次
        //=>没一次运动完成需要让焦点跟着切换
        changeFocus();
    };
    //=>
    let changeFocus=function changeFocus(){
        //=>当轮播图运动到最后一张 (我们需要让第一个li的索引为0,有选中的样式)
        //=>之所以使用tempIndex是因为stepIndex对轮播图的切换有很大的作用 , 不能轻易修改
        let tempIndex=stepIndex;
        tempIndex===slideList.length-1? tempIndex=0:null;
        focusList.forEach((item,index)=>{
            item.className=index===tempIndex?'active':null;
        })
    };

    //=>handleContainer鼠标进入和离开控制自动轮播的暂停和开启
    let handleContainer=function (){
        container.onmouseenter=function(){
            clearInterval(autoTimer);
            arrowLeft.style.display= arrowRight.style.display='block';
        };
        container.onmouseleave=function (){
            autoTimer=setInterval(autoMove,interval);
            arrowLeft.style.display= arrowRight.style.display='none';
        };


        //=>基于事件委托实现左右切换和焦点切换

        let queryIndex=function (ele){
            //=>先获取它的所有各个,有几个各个它的索引就是几
            let ary=[],
                pre=ele.previousElementSibling;
            while (pre){
                ary.unshift(pre);
                pre=ele.previousElementSibling;
            }
            return ary.length
        };

        container.onclick=function (ev){
            let target=ev.target,
                tag=target.tagName,
                parent=target.parentNode;

            //=>焦点判断
            if(tag==='LI' && parent.className.indexOf('focus')>-1) {
                stepIndex=queryIndex(target);
                animate(wrapper,{
                    left:-stepIndex*1000
                },300);
                changeFocus();
                return
            }
            //=>左右按钮
            if(tag==='A' && parent.className.indexOf('arrow')>-1){
                if(parent.className.indexOf('arrowLeft')>-1){

                }
            }
        };
    };

    let handleFocus=function handleFocus(){
        focusList.forEach((item,index)=>{
            item.onclick=function (){
                if(curOnclick===index){
                    return ;
                }
                if(index===0 && stepIndex===slideList.length-1){
                    return
                }
                stepIndex=index;

                curOnclick=stepIndex;
            }
        })
    };

    //=>给两个按钮执行点击事件
    let handleArrow=function (){
        arrowRight.onclick=autoMove;
        arrowLeft.onclick=function (){
            stepIndex--;
            //=>如果索引减减小于0,当前是第一张了, 不能再向右运动了,此时我们让wrapper瞬间移动到最后一张,在让其运动到倒数第二张即可
            if(stepIndex<0){
                utils.css(wrapper,'left',-(slideList.length-1)*1000);
                stepIndex=slideList.length-2;
            }
            animate(wrapper,{
                left:-stepIndex*1000
            },300);
            changeFocus();
        }
    };
    return {
        init :function init(){
            let promise=queryData();
            promise.then(bindHTML).then(()=>{
                //=>开启定时器驱动的自动轮播
                autoTimer=setInterval(autoMove,interval)
            }).then(()=>{
                //=>左右按钮或者焦点切换
                handleContainer();
                handleFocus();
                handleArrow();
            });
        }
    }
})();
bannerRender.init();