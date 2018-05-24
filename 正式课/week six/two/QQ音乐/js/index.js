let musicRender = (function () {
    let $headerBox = $('.headerBox'),
        $contentBox = $('.contentBox'),
        $footerBox = $('.footerBox'),
        $wrapper = $contentBox.find('.wrapper'),
        $lyricList = null,
        musicAudio = $('#musicAudio')[0],
        $playBtn = $headerBox.find('.headerBox'),
        $already = $footerBox.find('.already'),
        $duration = $footerBox.find('.duration'),
        $current = $footerBox.find('.current');
    let $plan = $.Callbacks();
    // let computedContent=function (){
    //   let winH=document.documentElement.clientWidth,
    //       font=parseFloat(document.documentElement.style.fontSize);
    //     $contentBox.css({
    //         height:winH-$headerBox.outerHeight()-$footerBox.outerHeight()-0.8*font
    //     })
    // };
    let computedContent = function () {
        let winH = document.documentElement.clientHeight,
            font = parseFloat(document.documentElement.style.fontSize);
        $contentBox.css({
            height: winH - $headerBox[0].offsetHeight - $footerBox[0].offsetHeight - 0.8 * font
        })
    };

    //获取歌词
    let queryLyric = function () {
        return new Promise((resolve) => {
            $.ajax({
                url: 'json/lyric.json',
                method: 'get',
                dataType: 'json',
                async: true,
                success: resolve
            })
        });
    };

    let bindHTML = function (lyricAry) {
        let str = ``;
        lyricAry.forEach(({
                              minutes,
                              seconds,
                              content
                          }) => {
            str += `<p data-minutes="${minutes}" data-seconds="${seconds}">${content}</p>`;//=>数据绑定的时候把歌词对应的分钟和秒设置为自定义属性存储起来,后期需要直接存储起来
        });
        console.log($wrapper[0]);
        $lyricList = $wrapper.find('p');
    };

    let playRun = function () {
        musicAudio.play();
        musicAudio.addEventListener('canplay', $plan.fire());//=>能够播放了
    };

    //=>控制暂停播放
    $plan.add(() => {
        $playBtn.css('display', 'block').addClass('move');
        $playBtn.tap(() => {
            if (musicAudio.paused) {
                //=>是否为暂停状态:是暂停我们让其播放
                musicAudio.play();
                $playBtn.addClass('move');
                return ;
            }
            //=>当前是播放状态我们让其暂停
            musicAudio.pause();
            $playBtn.removeClass('move');
        })
    });

    //=>控制进度条
    let autoTimer = null;
    $plan.add(() => {
        let duration = musicAudio.duration;//=>总时间单位是秒
        $duration.html(computedTime(duration));//=>这是干嘛??

        //=>随时监听不放状态
        autoTimer = setInterval(() => {
            let currentTime = musicAudio.currentTime;
            if (currentTime >= duration) {
                //=>播放完成
                $already.html(computedTime(duration));
                $current.css('width', '100%');
                clearInterval(autoTimer);

                musicAudio.pause();
                $playBtn.removeClass('move');
                return;
            }
            //=>正在播放中
            $already.html(computedTime(currentTime));
            $current.css('width', currentTime / duration * 100 + '%');
            matchLyric(currentTime);
        });
    });


    let computedTime = function (time) {
        let minutes = Math.floor(time / 60),
            seconds = Math.floor(time - minutes * 60);
        minutes < 10 ? minutes = '0' + minutes : null;
        seconds < 10 ? seconds = '0' + seconds : null;
        return minutes + ':' + seconds;
    };

    //=>匹配歌词实现歌词的对应
    let translateY = 0;
    let matchLyric = function (currentTime) {
        let [minutes, seconds] = computedTime(currentTime).split(':');
        //=>在歌词集合中帅选出我们想要展示的
        // let $cur=$lyricList.filter((index,item)=>{
        //     let itmeMinutes=item.attribute('data-minutes'),
        //         itmeSceonds=item.attribute('data-seconds');
        //     return itmeMinutes===minutes && itmeSceonds===seconds
        // });
        let $cur = $lyricList.filter(`[data-minutes]=${minutes}`).filter(`[data-seconds]=${seconds}`);

        if ($cur.length === 0) return;
        //=>当前歌词已经被选中五次了 (例如 :需要五秒完成才能h播放完成,我们定时器监听五次,第一次设置后,后面四次不需要重新设置了)
        if ($cur.hasClass('active')) return;
        let index = $cur.index();
        $cur.addClass('active')
            .siblings().removeClass('active');
        if (index > 4) {
            //=>已经对应超过四条歌词了,接下来每当对应一条都让wrapper向上移动一行
            let curH = $cur[0].offsetHeight;
            translateY -= curH;
            $wrapper.css('transform', 'translateY(${translateY}px)');
        }
    };
    return {
        init: function () {
            computedContent();
            let promise = queryLyric();
            promise.then((result) => {
                let {lyric = ''} = result,
                    obj = {30: ' ', 40: '(', 41: ')', 45: '-'};
                //=>format-data //=>格式化数据
                lyric = lyric.replace(/&#(\d+)/g, function (...arg) {
                    let [item, num] = arg;
                    item = obj[num] || item;
                    return item;
                });
                return lyric; //=>上一个then方法返回的结果会作为下个then的返回结果
            }).then(lyric => {
                // format-data :把歌词对应的分钟,秒,歌词内容等信息一次存储起来
                let lyricAry = [];
                lyric.replace(/\[(\d+)&#58;(\d+)&#46;\d+\]([^&#]+)(?:&#10;)?/g, (...arg) => {
                    let [, minutes, seconds, content] = arg;
                    lyricAry.push({
                        minutes,
                        seconds,
                        content
                    });
                });
                return lyricAry;
            }).then((lyricAry) => {
                bindHTML(lyricAry);
            }).then(playRun);
        }
    }
})();
musicRender.init();


