$(function ($) {
    let test=false;
    /*loading part*/
    let loadingRender = (function () {
        let $loadingBox = $('.loadingBox'),
            $curProgress = $('.curProgress');
        let imgData = ["img/icon.png", "img/zf_concatAddress.png", "img/zf_concatInfo.png", "img/zf_concatPhone.png", "img/zf_course.png", "img/zf_course1.png", "img/zf_course2.png", "img/zf_course3.png", "img/zf_course4.png", "img/zf_course5.png", "img/zf_course6.png", "img/zf_cube1.png", "img/zf_cube2.png", "img/zf_cube3.png", "img/zf_cube4.png", "img/zf_cube5.png", "img/zf_cube6.png", "img/zf_cubeBg.jpg", "img/zf_cubeTip.png", "img/zf_emploment.png", "img/zf_messageArrow1.png", "img/zf_messageArrow2.png", "img/zf_messageChat.png", "img/zf_messageKeyboard.png", "img/zf_messageLogo.png", "img/zf_messageStudent.png", "img/zf_outline.png", "img/zf_phoneBg.jpg", "img/zf_phoneDetail.png", "img/zf_phoneListen.png", "img/zf_phoneLogo.png", "img/zf_return.png", "img/zf_style1.jpg", "img/zf_style2.jpg", "img/zf_style3.jpg", "img/zf_styleTip1.png", "img/zf_styleTip2.png", "img/zf_teacher1.png", "img/zf_teacher2.png", "img/zf_teacher3.jpg", "img/zf_teacher4.png", "img/zf_teacher5.png", "img/zf_teacher6.png", "img/zf_teacherTip.png"];

        /*预加载图片*/
        let n = 0,
            length = imgData.length,
            delayTimer = null,
            unfinished=false;
        let finish = function () {
            /*移除当前板块进入iphone环节*/
            let timer = setTimeout(() => {
                $loadingBox.remove();
                clearTimeout(timer);
            }, 1500)
        };
        let loading = function run(callback) {
            imgData.forEach((item) => {
                let tempImg = new Image();
                tempImg.onload = function () {
                    tempImg = null;
                    if(!unfinished)
                    $curProgress.css('width', (++n) / length * 100 + '%');
                    if (n + 10 >= length) {
                        callback && callback();
                    }
                };
                tempImg.src = item;
            });
        };

        /*加载时间过长的处理*/
        let maxDelay = (callback) => {
            delayTimer = setTimeout(() => {
                clearTimeout(delayTimer);
                if(n/length>0.9){
                    $curProgress.css('width', '100%');
                    callback && callback();
                    return;
                }
                unfinished=true;
                alert('刷新');
                window.location.href='http://www.baidu.com';
            },10000)
        };

        return {
            init: function () {
                $loadingBox.css('display', 'block');
                loading(finish);
                maxDelay(finish);
                if(test){
                    phoneRender.init();
                }
            }
        }
    })();

    let phoneRender=(()=>{
        let $phoneBox=$('.phoneBox'),
            answerBell=$phoneBox.find('#answerBell')[0],
            introduction = $('#introduction')[0],
            $answer = $phoneBox.find('.answer'),
            $answerMarkLink = $answer.find('.markLink'),
            $hang = $phoneBox.find('.hang'),
            $hangMarkLink = $hang.find('.markLink'),
            $time = $phoneBox.find('span');
        let answerMarkTouch=()=>{
            /*移除来电模块和移除来电声音*/
            $answer.remove();
            /*tips:移除一个音频之前一定要先把音频暂停了*/
            answerBell.pause();
            $(answerBell).remove();
            /*显示通话模块*/
            $hang.css('transform','translateY(0)');
            $time.css('display','block');

            /*这里用oncanplay或者loadedmetadata*/
                introduction.play();
                introduction.volume=0.3;

            computedTime();
        };

        /*计算通话时间*/
        let autoTimer=null;
        let computedTime=()=>{
            autoTimer=setInterval(()=>{
                let time=introduction.currentTime,
                    duration=introduction.duration;
                if(time===duration){
                    closePhone();
                    return;
                }
                let minute=Math.floor(time/60),
                    seconds=Math.floor(time-minute*60);
                minute=minute<10?'0'+minute:minute;
                seconds=seconds<10?'0'+seconds:seconds;
                $time.html(`${minute}:${seconds}`);
            },1000)
        };

        let closePhone=()=>{
            clearInterval(autoTimer);
            introduction.pause();
            $(introduction).remove();
            /*移除结构为啥*/
            $phoneBox.remove();
            if(test){
                messageRender.init();
            }
        };

        return {
            init:function (){
                $phoneBox.css('display','block');

                /*这里的事件怎么用,包起来不起作用啊...郁闷*/
                answerBell.onloadedmetadata=function (){
                    answerBell.play();
                    answerBell.volume=0.1;
                };
                $answerMarkLink.tap(answerMarkTouch);
                $hangMarkLink.tap(closePhone);
            }
        }
    })();

    let messageRender=(()=>{
        let $messageBox=$('.messageBox');

        let showMessage=function (){

        };


        return {
            init:function (){
                $messageBox.css('display','block');
                showMessage();


            }
        }
    })();
    ~function () {
        let url = window.location.href,//=>获取当前页面的URL地址  location.href='xxx'这种写法是让其跳转到某一个页面
            well = url.indexOf('#'),
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
                break;
            default:
                if(test){
                    loadingRender.init();
                }
        }
    }();
});