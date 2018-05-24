//
//   audio 常用的属性
//   duration ; 播放的总时间 (s)
//   currentTime:当前已经播放的时间 (s)
//   ended: 是否已经播放完成
//   paused :当前是否为暂停状态
//   volume :控制音量 (0~1)
//
//
//   [方法]
//   play  ()暂停
//   pause:
//   [事件]
//   canplay : 可以正常播放 (但是播放过程中可能出现卡顿)
//   canplaythrough: 资源加载完毕,可以顺畅的播放了
//   ended  :播放完成
//   loadedmetadata: 资源的基础信息已经加载完成
//   loaddeddata :整个资源都加载完成了
//   pause:触发了展厅
//   play :触发了播放
//   playing : 正在播放中
//


/*loading*/

let loadingRender = (function () {
    let $loadingBox = $('.loadingBox'),
        $curProgress = $loadingBox.find('.curProgress');

    let imgData = ["img/icon.png", "img/zf_concatAddress.png", "img/zf_concatInfo.png", "img/zf_concatPhone.png", "img/zf_course.png", "img/zf_course1.png", "img/zf_course2.png", "img/zf_course3.png", "img/zf_course4.png", "img/zf_course5.png", "img/zf_course6.png", "img/zf_cube1.png", "img/zf_cube2.png", "img/zf_cube3.png", "img/zf_cube4.png", "img/zf_cube5.png", "img/zf_cube6.png", "img/zf_cubeBg.jpg", "img/zf_cubeTip.png", "img/zf_emploment.png", "img/zf_messageArrow1.png", "img/zf_messageArrow2.png", "img/zf_messageChat.png", "img/zf_messageKeyboard.png", "img/zf_messageLogo.png", "img/zf_messageStudent.png", "img/zf_outline.png", "img/zf_phoneBg.jpg", "img/zf_phoneDetail.png", "img/zf_phoneListen.png", "img/zf_phoneLogo.png", "img/zf_return.png", "img/zf_style1.jpg", "img/zf_style2.jpg", "img/zf_style3.jpg", "img/zf_styleTip1.png", "img/zf_styleTip2.png", "img/zf_teacher1.png", "img/zf_teacher2.png", "img/zf_teacher3.jpg", "img/zf_teacher4.png", "img/zf_teacher5.png", "img/zf_teacher6.png", "img/zf_teacherTip.png"];


    let n = 0,
        length = imgData.length;
    let delayTimer = null;
    /*run:预先加载图片*/
    let run = function (callback) {
        imgData.forEach((item) => {
            let tempImg = new Image();
            tempImg.onload = () => {
                tempImg = null;
                $curProgress.css('width', ++n / length * 100 + "%");
                //=>加载完成: 让当前load页面消失 (通过回掉函数)
                if (n === length) {
                    clearTimeout(delayTimer);
                    callback && callback();
                }
            };
            tempImg.src = item;
        })
    };

    //=>设置最常等待时间(假设10秒完成,到达10s我们看到加载多少了,如果已经达到90%以上,我们可以正常访问内容了,如果不足这个比例 , 直接提示用户当前网络不佳 , 稍后重试)
    let maxDelay = function (callback) {
        delayTimer = setTimeout(() => {
            if (n / length >= 0.9) {
                $curProgress.css('width', '100%');
                callback && callback();
                return;
            }
            alert('非常遗憾,当前您的网络状况不佳,请稍后再试!');
            window.location.href = 'http://www.qq.com';//=>此时我们不应该继续加载图片,而是让其关掉页面或者跳转到其他页面
        }, 10000);
    };

    //=>done: 不管怎么完成的 ,做接下来该做的事情
    let done = function done() {
        //让用户看到加载条停留一秒完成
        let timer = setTimeout(() => {
            $loadingBox.remove();
            clearInterval(timer);
            phoneRender.init();
        }, 1000)
    };


    return {
        init: function () {
            $loadingBox.css('display','block');
            run(done);
            maxDelay(done);
        }
    }
})();


let phoneRender = (function () {
    let $phoneBox = $('.phoneBox'),
        $time = $phoneBox.find('span'),
        $answer = $phoneBox.find('.answer'),
        $answerMarkLink = $answer.find('.markLink'),
        $hang = $phoneBox.find('.hang'),
        $hangMarkLink = $hang.find('.markLink'),
        answerBell = $('#answerBell')[0],
        introduction = $('#introduction')[0];
    console.log(window.getComputedStyle($answer[0])['width']);
    let answerMarkTouch = function () {
        //=>1.remove answer
        $answer.remove();
        answerBell.pause();
        $(answerBell).remove();//=>一定要先暂停播放 在移除播放,要不然移除了还在播放声音

        //=>show hang
        $hang.css('transform', 'translateY(0rem)');
        $time.css('display', 'block');
        introduction.play();
        computedTime();
    };

    //=>计算播放时间
    let autoTimer = null;
    let computedTime = function () {
        let duration = introduction.duration;
        autoTimer = setInterval(() => {
            let val = introduction.currentTime;
            //=>播放完成
            if (val === duration) {
                closePhone();
                clearTimeout(autoTimer);
                return;
            }
            let minute = Math.floor(val / 60),
                second = Math.floor(val - minute * 60);
            minute = minute < 10 ? '0' + minute : minute;
            second = second < 10 ? '0' + second : second;
            $time.html(`${minute}:${second}`);
        }, 1000)
    };

    //=>关闭phone
    let closePhone=function () {
        clearInterval(autoTimer);
        introduction.pause();
        $(introduction).remove();
        $phoneBox.remove();
        messageRender.init();
    };

    return {
        init: function () {
            $phoneBox.css('display','block');
            //=>播放bell
            answerBell.play();
            answerBell.volume = 0.3;

            //=>点击answerMark
            $answerMarkLink.tap( answerMarkTouch);
            $hangMarkLink.tap(closePhone);
        }
    }
})();


let messageRender =(function(){
    let $messageBox=$('.messageBox'),
        $wrapper=$messageBox.find('.wrapper'),
        $messageList=$wrapper.find('li'),
        $keyBoard=$messageBox.find('.keyBoard'),
        $textInp=$keyBoard.find('span'),
        $submit=$keyBoard.find('.submit'),
        $demonMusic=$messageBox.find('#demonMusic');
    let step=-1,//=>记录当前展示信息的索引
        total=$messageBox.length+1,//=>记录的是信息的总条数(自己还要发一条us哦一加1)
        autoTimer=null,
        interval=2000;//=>记录多久发一条信息
    //=>展示信息

    let tt=0;
    let showMessage=function (){
        step++;
        if(step===2){
            //=>此时我们暂时结束自动发布信息,
            //=>让键盘跳出来,开始走手动发送
            clearInterval(autoTimer);
            handleSend();
            return
        }
        let $cur=$messageList.eq(step);
        $cur.addClass('active');
        /*messageList已经不对应*/
        if(step>=3){
            //=>展示的提哦啊书已经是四条或者四条以上了,此时我们让wrapper向上移动(移动的距离是新展示这一条的高度)
            let curH= $cur[0].offsetHeight;
          //     wraT=parseFloat($wrapper.css('top'));
              // $wrapper.css('top',wraT-curH);
            tt-=curH;
            $wrapper.css('transform','translateY(${tt}px)')
        }
       if(step>=total-1){
            //=>展示完了
           clearInterval(autoTimer);
           closeMessage();
       }


    };
    let handleSend=function (){
        $keyBoard.css('transform','translateY(0)').one('transitionend',()=>{
            //=>transitionend:监听当前元素transition动画结束的事件
            //=>有几个样式属性改变,事件就会触发几次

            let str='你就是个傻XXXX',
                textTimer=null,
                n=-1;
            textTimer=setInterval(()=>{
                let orginHTML=$textInp.html();
                $textInp.html(orginHTML+str[++n]);
                if(n>=str.length-1){
                    clearInterval(textTimer);
                    $submit.css('display','block');
                    return
                }
            },300)
        });
    };
    let handleSubmit=function (){
        //=>把新创建的li增加到页面中的第二个li的后面
        $(`  <li class="self">
                <i class="arrow"></i>
                <img src="img/zf_messageStudent.png" alt="" class="pic">
                ${$textInp.html()}
            </li>`).insertAfter($messageList.eq(1)).addClass('active');
        $messageList=$wrapper.find('li');//=>重要 :把新的li放到页面中,我们此时应该重新获取li,让messageList和页面中的li正对应,方便后期根据索引展示对应的li
        //=>该消失的消失
        $textInp.html('');
        $textInp.css('display','none');
        $keyBoard.css('transform','translateY(3.7rem)');

        //=>继续向下展示剩余的消息
        autoTimer=setInterval(showMessage,interval)
    };
    let closeMessage=function (){
        let delayTimer=setTimeout(()=>{
            $demonMusic[0].pause();
            $demonMusic.remove();
            $messageBox.remove();
            clearInterval(delayTimer);
            cubeRender.init();
        },1500)
    };


    return {
        init :function(){
            //=>加载模块立即展示一条信息,后期间隔interval在发送一条信息
            $messageBox.css('display','block');
            showMessage();
            autoTimer=setInterval(showMessage,interval);

            $submit.tap(handleSubmit);
        }
    }
})();

/*cube*/
let cubeRender=(function (){
    let $cubeBox=$('.cubeBox'),
        $cube=$('.cube'),
        $cubeList=$cube.find('li');

    //=>手指控制旋转
    let start=function (ev){
        //=>记录手指按下位置的起始坐标
        let point=ev.changedTouches[0];
        this.strX=point.clientX;
        this.strY=point.clientY;
        this.changeX=0;
        this.changeY=0;
    };
    let move=function (ev){
        //=>用最新手指的位置-起始的位置记录X/Y轴的偏移
        let point=ev.changedTouches[0];
        this.changeX=point.clientX-this.strX;
        this.changeY=point.clientY-this.strY;
    };
    let end=function (ev){
        //=>获取change/rotate值,
        // let point=ev.changedTouches[0];
        let {changeX,changeY,rotateX,rotateY}=this,
            isMove=false;
        //=>验证是否发生移动 ()
        Math.abs(changeX)>10 || Math.abs(changeY)>10?isMove=true:null;

        //=>只有发生移动再处理
        if (isMove){
            //1.左右滑动->changeX->changeY (正比:change越大rotate越大)
            //1.上下滑动->changeY->changeX (反比:change越大rotate越小)
            rotateX=rotateX-changeY;
            rotateY=rotateY+changeX;
            //=>赋值给魔方盒子
            $(this).css('transform',`scale(0.6) rotateX(${rotateX/2}deg) rotateY(${rotateY/2}deg)`);
            //=>让当前旋转的角度成为下一次起始的角度
            this.rotateX=rotateX;
            this.rotateY=rotateY;
        }
        //=>清空其他的自定义属性值
        ['strX','strY','changeX','changeY'].forEach((item)=>{
           this[item]=null;
        });
    };

    return{
        init:function (){
            $cubeBox.css('display','block');
            //=>手机操作cube,让cube跟着旋转

            //=>几率初始的旋转角度
            let cube= $cube[0];
            cube.rotateX=-35;
            cube.rotateY=35;
            $cube.on('touchstart',start)
                .on('touchmove',move)
                .on('touchend',end);

            /*点击每一个面跳转到详情区对应的页面*/
            $cubeList.tap((function (){
                $cubeBox.css('display','none');
                /*跳转到详情区域,通过传递点击li的索引,让其定位到具体的slide*/
                let index=$(this).index();
                detailRender.init(index);
            }));

        }
    }
})();

let detailRender=(function (){
    let $detailBox=$('.detailBox'),
        swiper=null,
        $dl=$('.page1>dl');

    let swiperInit=function (){
        swiper=new Swiper('.swiper-container',{
            effect:'coverflow',
            // loop:'true' ,//=>swiper有一个bug:3D切换设置loop为true的时候偶尔会出现无法切换的情况   //=>swiper无缝切换的原理 :把真实第一张克隆一份放到末尾,把真实最后一张也克隆一份放到开始(真实slide有五个,wrapper中会有7个slide)
            // onInit:(swiper)=>{
            //   参数是当前初始化的实例
            // },
            // onTransitionEnd:(swiper)=>{
            //     //=>切换动画完成执行的回调函数
            // },
            onInit: move,
            onTransitionEnd: move
        });


        //=>实例的私有属性
        //1.activeIndex 当前展示slide块的索引
        //2.slides :获取所有的slide的 (数组)
        //..
        //实例的公有方法 :
        //1.slideTo: 切换到指定索引的slide
    };

    let move=function (swiper){
        //=>swiper:当前创建的实例
        //1.判断当前是否为第一个slide:如果是让3D菜单展开,不是收起菜单
        let activeIn=swiper.activeIndex,
            slideAry=swiper.slides;
        slideAry=[].slice.call(slideAry);
        console.log(slideAry);
        console.log(slideAry);
        if(activeIn===0){
            //实现折叠效果
            $dl.makisu({
                select:'dd',
                overlap:0.6,
                speed:0.8
            });
            $dl.makisu('open');
        }else {
            //other page
            $dl.makisu({
                select:'dd',
                overlap:1
            });
            $dl.makisu('close');
        }

        //=>滑到哪一个页面,把当前页面设置对应的ID,其页面移除ID即可
        slideAry.forEach((item,index)=>{
            if(activeIn===index){
                item.id=`page${index+1}`;
                return;
            }
            item.id=null;
        })
    };
    return {
        init:function (index=0){
            $detailBox.css('display','block');

            if(!swiper){
                /*防止重复初始化*/
                swiperInit();
            }
            /*slideTo(index,0) : 0 是切换速度,0是立即切换没有动画效果  index:立即跳转做到哪个页*/
            swiper.slideTo(index,0);



        }
    }
})();

/*以后在真实的项目中,如果页面中有滑动的需求,我们一定要把document本身滑动的默认行为阻止掉(不阻止,浏览器中预览),会触发下拉刷新或者左右滑动切换页卡扥功能*/
$(document).on('touchestart touchemove touchend',function (ev){
         ev.preventDefault();
});







/*tips  开发的一个很重要的技巧*/
//=>开发过程中 ,由于当前项目板块众多 (每一个板块都是一个单例),我们最后好规划一种机制:通过标识的判断可以让程序只执行对应板块的内容 ,这样开发哪个板块 , 我们就把标识改为啥(HASH路由控制)

//=>获取当前页面的URL地址
let url = window.location.href;  //=>location.href='xxx'  这种写法是让其跳转到某一个页面
let well = url.indexOf('#'),
    hash = well === -1 ? null : url.substr(well + 1);
switch (hash) {
    case 'loading':
        loadingRender.init();
        break;
    case 'phone':
        phoneRender.init();
        break;
    case 'message':
        messageRender.init();
    case 'cube':
        cubeRender.init();
        break;
    case 'detail':
        detailRender.init();
    default:
        loadingRender.init();
}