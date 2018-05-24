
$(function ($){
    let bannerRender=(function (){
       let $bannerContainer=$('.banner-container'),
           $banner=$('.banner'),
           $focus=$('.focus'),
           $bannerList=null,
           $focusList=null,
           autoTimer=null,
           interval=3000,
           initStep=0,
           preIndex=initStep;


        let getData=()=>{
            return new Promise(resolve=>{
                $.ajax({
                    url:'json/banner.json',
                    dataType:'json',
                    method:'get',
                    async:true,
                    success:resolve
                })
            })
        };

        let bindHTML=(data)=>{
            let str=``,
                strFocus=``;
            data.forEach(item=>{
               str+=`<li class="wraper">
                <img src="${item.pic}" alt="">
            </li>`;
                strFocus+=`<li><a href="javascript:;" class="focusList"></a></li>`;
            });

            $banner.html(str);
            $focus.html(strFocus);
            $bannerList=$banner.find('img');
            $focusList=$focus.find('a');
            $bannerList.eq(initStep).css({
                opacity:1,
                zIndex:16
            });
            $focusList.eq(initStep).addClass('active');
        };

        let autoPlay=()=>{
            initStep++;
            if(initStep>=$bannerList.length){
                initStep=0;
            }
            autoMove();
            changeFocus();
            preIndex=initStep;
        };
        let changeFocus=()=>{
            $focusList.eq(preIndex).removeClass('active');
            $focusList.eq(initStep).addClass('active');
        };

        let handleEvent=function (){

            $(document).on('mouseover',function (ev){
                let $target=$(ev.target);
                console.log($target.hasClass('banner-container'));
                if($target.hasClass('banner-container')){
                    console.log(1);
                    clearInterval(autoTimer) ;
                    autoTimer=null;
                }
            }).on('mouseout',function(ev){

                let $target=$(ev.target);
                if($target.hasClass('banner-container')){
                    console.log(2);
                    autoTimer=setInterval(autoPlay,interval);
                }
            });
            $bannerContainer.on('click',function (ev){
                let $target=$(ev.target);
                if($target.hasClass('focusList')) {
                    initStep=$target.parent().prevAll().length;
                    autoMove();
                    changeFocus();
                    preIndex=initStep;
                }else if($target.hasClass('arrow')){
                    if($target.hasClass('arrowLeft')){
                        initStep--;
                        if(initStep<0){
                            initStep=$bannerList.length-1;
                            autoMove();
                            changeFocus();
                            preIndex=initStep;
                        }
                    }else{
                        autoPlay();
                    }
                }
            });

        };

        let autoMove=()=>{
            $bannerList.eq(preIndex).css({
                zIndex:0,
                opacity:0
            });
            $bannerList.eq(initStep).stop().animate({
                zIndex:1,
                opacity:1
            },400);
        };

        return {
            init:function (){
                let promise=getData();
                promise.then(bindHTML)
                    .then(()=>{
                        autoTimer=setInterval(()=>{
                            autoPlay();
                        },interval);
                    }).then(()=>{
                    handleEvent();
                })
            }
        }
    })();
    bannerRender.init();
});