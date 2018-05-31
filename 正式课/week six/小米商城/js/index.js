$(function ($) {
    let bannerRender = (function () {
        let $bannerContainer = $('.banner-container'),
            $banner = $('.banner'),
            $focus = $('.focus'),
            $bannerList = null,
            $focusList = null,
            autoTimer = null,
            interval = 3000,
            initStep = 0,
            preIndex = initStep;
        let getData = () => {
            return new Promise(resolve => {
                $.ajax({
                    url: 'json/banner.json',
                    dataType: 'json',
                    method: 'get',
                    async: true,
                    success: resolve
                })
            })
        };

        let bindHTML = (data) => {
            let str = ``,
                strFocus = ``;
            data.forEach(item => {
                str += `<li class="wraper">
                <img src="${item.pic}" alt="" class="img">
            </li>`;
                strFocus += `<li><a href="javascript:;" class="focusList"></a></li>`;
            });

            $banner.html(str);
            $focus.html(strFocus);
            $bannerList = $banner.find('img');
            $focusList = $focus.find('a');
            $bannerList.eq(initStep).css({
                opacity: 1,
                zIndex: 16
            });
            $focusList.eq(initStep).addClass('active');
        };

        let autoPlay = () => {
            initStep++;
            if (initStep >= $bannerList.length) {
                initStep = 0;
            }
            autoMove();
            changeFocus();
            preIndex = initStep;
        };
        let changeFocus = () => {
            $focusList.eq(preIndex).removeClass('active');
            $focusList.eq(initStep).addClass('active');
        };

        let handleEvent = function () {

            $(document).on('mouseover', function (ev) {
                let $target = $(ev.target);
                if ($target.hasClass('img') || $target.hasClass('focus') || $target.hasClass('arrow')) {
                    clearInterval(autoTimer);
                    autoTimer = null;
                }
            }).on('mouseout', function (ev) {
                let $target = $(ev.target);
                if ($target.hasClass('img')) {
                    autoTimer = setInterval(autoPlay, interval);
                }
            });
            $bannerContainer.on('click', function (ev) {
                let $target = $(ev.target);
                if ($target.hasClass('focusList')) {
                    initStep = $target.parent().prevAll().length;
                    autoMove();
                    changeFocus();
                    preIndex = initStep;
                } else if ($target.hasClass('arrow')) {
                    if ($target.hasClass('arrowLeft')) {
                        initStep--;
                        if (initStep < 0) {
                            initStep = $bannerList.length - 1;
                        }
                        autoMove();
                        changeFocus();
                        preIndex = initStep;
                    } else {
                        autoPlay();
                    }
                }
            });

        };

        let autoMove = () => {
            $bannerList.eq(preIndex).css({
                zIndex: 0,
                opacity: 0
            });
            $bannerList.eq(initStep).stop().animate({
                zIndex: 1,
                opacity: 1
            }, 400);
        };

        return {
            init: function () {
                let promise = getData();
                promise.then(bindHTML)
                    .then(() => {
                        autoTimer = setInterval(() => {
                            autoPlay();
                        }, interval);
                    }).then(() => {
                    handleEvent();
                })
            }
        }
    })();
    bannerRender.init();

    let menuRender = (function () {
        let $menu = $('#menu'),
            $nav = $('.nav'),
            $navList = $nav.find('.navList'),
            $detailedList = null;
        let getData = () => {
            return new Promise((resolve) => {
                $.ajax({
                    url: 'json/menu1.json',
                    dataType: 'json',
                    method: 'get',
                    success(result) {
                        resolve(result);
                    }
                })
            });
        };
        let bindHTML = (data) => {
            data.forEach((item, index) => {
                let str = ``;
                str += `<div class="detailedList"><div class="detailed">`;
                item.forEach((item) => {
                    str += `<ul>`;
                    item.forEach((item) => {
                        str += `<li class="list">
                        <a href="javascript:;">
                            <img src="img/img/${item.imgUrl}" alt="">
                            <span>${item.name}</span>
                        </a>
                    </li>`;
                    });
                    str += `</ul>`;
                });
                str += `</div></div>`;
                $navList[index].innerHTML += str;
                $detailedList = $navList.eq(index).find('.detailedList');
                $detailedList.addClass(`${index}`);
            });
            $detailedList = $navList.find('.detailedList');
            $detailedList.each((index, item) => {
                let length = $(item).find('ul').length;
                $(item).css('width', `${240 * length}`);
            })
        };
        return {
            init() {
                let promise = getData();
                promise.then(bindHTML);
            }
        }
    })();
    menuRender.init();

    let navigationRender = (function () {
        let $navigationBox = $('.navigationBox'),
            $nav = $navigationBox.find('.nav'),
            $links = $nav.find('a');
        let getData = () => {
            return new Promise(resolve => {
                $.ajax({
                    url: 'json/navigationBox.json',
                    dataType: 'json',
                    method: 'get',
                    success: resolve
                })
            })
        };
        let bindHTML = result => {
            result.forEach((item, index) => {
                let str = ``;
                str += `<ul class="item-children">
                    <div class="container">
                        <ul>`;
                item.forEach(item => {
                    let {pic, flags, title, price} = item;
                    str += ` <li>
                                <div class="flags">
                          ${flags ? `<span>${flags}</span>` : ""}          
                                </div>
                               <div class="img">
                                   <img src="${pic}" alt="">
                               </div>
                                <div class="title">${title}</div>
                                <p class="price">${price}</p>
                            </li>`;
                });
                str += `</ul></div></ul>`;
                $links.get(index).innerHTML += str;
            });
        };
        return {
            init: function () {
                let promise = getData();
                promise.then(bindHTML);
            }
        }
    })();
    navigationRender.init();

    let xmFlashPurchaseRender = (function () {
        let $xmFlashPurchase = $('.xm-flashPurchase');

        let count = function () {
            let $count = $xmFlashPurchase.find('.count'),
                $boxs = $count.find('.box'),
                $title = $count.find('.title');

            let startTime = null,
                targetTime = new Date('2018/05/29 00:00:00'),
                changeTime = null,
                hours = null,
                minutes = null,
                seconds = null,
                autoTimer = null,
                aryTime = [];
            let computedTime = () => {
                startTime = new Date();
                changeTime = startTime - targetTime;
                if (changeTime <= 0) {
                    $title.html('本场活动已经结束');
                    $boxs.each((index, item) => {
                        $(item).html(`--`);
                    });
                    clearInterval(autoTimer);
                    return;
                }
                hours = Math.floor(changeTime / 1000 / 60 / 60);
                minutes = Math.floor((changeTime - hours * 1000 * 60 * 60) / 1000 / 60);
                seconds = Math.floor((changeTime - hours * 1000 * 60 * 60 - minutes * 1000 * 60) / 1000);
                hours = hours < 10 ? `0${hours}` : hours;
                minutes = minutes < 10 ? `0${minutes}` : minutes;
                seconds = seconds < 10 ? `0${seconds}` : seconds;
                aryTime = [hours, minutes, seconds];
                $boxs.each((index, item) => {
                    $(item).html(aryTime[index]);
                });
            };
            computedTime();
            autoTimer = setInterval(computedTime, 1000);
        };

        let productRender = (function anonymous() {
            let $productDes = $xmFlashPurchase.find('.product-description'),
                productDesWidth=0;
            let queryData = function () {
                return new Promise(resolve => {
                    $.ajax({
                        url: 'json/productDescription.json',
                        dataType: 'json',
                        method: 'get',
                        async: true,
                        success: resolve
                    })
                })
            };
            let bindHTML = (result) => {
                 let   $list = $productDes.find('.list'),
                    $lists = $list.find('li'),
                     aryColor=['#e53935;','#00c0a5','#ffac13','#83c44e','#ffac13','#00c0a5','#e53935','#83c44e',];


                result.forEach((item,index)=> {
                    let str = ``;
                    let {pic, title, desc, price: {curPrice, prePrice}} = item;
                    str += `
                    <li>
                        <div class="bg"></div>
                        <div class="content">
                            <a href="javascript:;">
                                <img src="${pic}" alt="">
                            </a>
                            <h3 class="title">${title}</h3>
                            <p class="desc">${desc}</p>
                            <p class="price">
                                <span>${curPrice}</span>
                                <del>${prePrice}</del>
                            </p>
                        </div>
                    </li>
                `;
                    $list[0].innerHTML += str;
                    $lists = $list.find('li');
                    $lists.eq(index).css({
                        borderTopColor: aryColor[index]
                    });
                    let length = $lists.length,
                       width = parseFloat($lists.eq(0).css('width'))+14;
                    $list.css('width', length * width);
                    productDesWidth=$productDes[0].scrollWidth;
                });
            };
            let bindEvent=function (){
                //=>获取按钮
                let $boxHeader=$xmFlashPurchase.find('.box-header'),
                    $move=$boxHeader.find('.move');
                $move.on('click',function (ev){
                    let target=ev.target,
                        $target=$(target);
                    if($target.hasClass('iconfont')){
                        $target=$(target).parent();
                        target=$target[0];
                    }
                    if(target && $target.hasClass('arrow')){
                        if($target.hasClass('arrowRight') && !$target.hasClass('active')){
                            moveAnimate($productDes[0],productDesWidth/2,300);
                            $target.children('.iconfont').addClass('active')
                                .parent().siblings().children('.iconfont').removeClass('active');
                        }else if($target.hasClass('arrowLeft') && !$target.hasClass('active')){
                            moveAnimate($productDes[0],0,300);
                            $target.children('.iconfont').addClass('active')
                                .parent().siblings().children('.iconfont').removeClass('active');
                        }
                    }

                });

                let moveAnimate=function (ele,target,duration){
                    let start=ele.scrollLeft,
                        total=target-start,
                        change=0,
                        step=total/duration,
                        autoTimer1=null,
                        interval=17;
                    if(target===start) return;
                    let move=function (){
                        change+=step*interval;
                        if(Math.abs(change)>980){
                            console.log(ele.scrollLeft,1,target,change);
                            ele.scrollLeft=target;
                            clearInterval(autoTimer1);
                            return ;
                        }
                        ele.scrollLeft=start+change;
                    };
                    autoTimer1=setInterval(move,interval);
                }
            };
            return {
                init: function () {
                    let promise = queryData();
                    promise.then(bindHTML)
                        .then(bindEvent);
                }
            }
        })();

        return {
            init: function () {
                count();
                productRender.init();

            }
        }
    })();
    xmFlashPurchaseRender.init();
});



