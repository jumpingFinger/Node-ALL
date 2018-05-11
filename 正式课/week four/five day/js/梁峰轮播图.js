/**
 * options:
 *
 * 必须条件：
 * wrapper:容器
 *
 *
 * 是否延迟加载：
 * needGetData：true  是否需要获取数据
 * url:json数据地址
 * lazyImageTime：延迟加载图片时间
 *
 * initIndex：初始展示索引
 *
 * changeMode：ScrollX  水平滚动   fade 渐隐渐显
 *
 * isAutoChange：true 是否自动切换
 * autoTime: 3000  自动切换时间
 * changeTime: 200  切换所需时间
 *
 * arrow方面
 * isArrowChange：true  是否需要点击左右切换
 *
 *
 * focusList方面
 * isShowFocusList:true 是否展示focusList
 * focusChange：是否可以通过focusList切换
 * focusEvent：click  切换方式 默认click
 *
 */
(function () {
    function BannerPlugin(options) {
        return new init(options)
    }

    BannerPlugin.prototype = {
        constructor: BannerPlugin,

        initDefault: function (options) {
            //defaultOptions这里是为了设置默认值
            var defaultOptions = {
                    wrapper: null,
                    needGetData: true,
                    url: null,
                    lazyImageTime: 500,
                    initIndex: 0,
                    changeMode: null,
                    isAutoChange: true,
                    autoTime: 3000,
                    changeTime: 200,
                    isArrowChange: true,
                    focusChange: true,
                    focusEvent: 'click',
                    isShowFocusList: true
                },
                that = this;
            for (var attr in options) {
                if (options.hasOwnProperty(attr)) {
                    defaultOptions[attr] = options[attr]
                }
            }
            for (var key in defaultOptions) {
                that[key] = defaultOptions[key]
            }
            console.log(this);
        },

        getElement: function () {
            this.banner = this.wrapper.querySelector('.banner');
            this.focusBar = this.wrapper.querySelector('.focus-bar');
            if (this.isArrowChange) {
                this.arlBtn = this.wrapper.querySelector('#arrow-l');
                this.arrBtn = this.wrapper.querySelector('#arrow-r');
            };
            this.focusList = this.focusBar.querySelectorAll('li');
        },

        getData: function () {
            var xhr = new XMLHttpRequest(),
                initData = null;
            xhr.open('get', this.url, false);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                    initData = JSON.parse(xhr.responseText)
                }
            };
            xhr.send(null);
            this.initData = initData;
        },

        bindData: function () {
            var str1 = '',
                str2 = '';
            for (var i = 0; i < this.initData.length; i++) {
                var obj = this.initData[i];
                str1 += `<li><a href="#"><img src="" data-img="${obj.img}"></a></li>`;
                str2 += `<li></li>`
            }
            this.banner.innerHTML = str1;
            this.focusBar.innerHTML = str2;
            str1 = null;
            str2 = null;
            this.len = this.initData.length;
            this.initData = null;
            this.focusList = this.focusBar.querySelectorAll('li');
        },

        fadeInit:function () {
            utils.css(this.oList[this.initIndex],{
                opacity:1,
                zIndex:1
            });
        },

        getImg: function () {
            this.imgList = this.banner.querySelectorAll('img');
            for (var i = 0; i < this.imgList.length; i++) {
                this.lazyImg(i);
            }
        },

        lazyImg: function (i) {
            var that = this;
            setTimeout(function () {
                var tempImg = new Image();
                tempImg.src = that.imgList[i].getAttribute('data-img');
                tempImg.onload = function () {
                    that.imgList[i].src = tempImg.src;
                    if (i === that.imgList.length - 1) {
                        if (that.changeMode === 'scrollX') {
                            that.changeWidth();
                        }else if(that.changeMode === 'scrollY'){
                            that.changeHeight();
                        }
                    }
                }
            }, this.lazyImageTime)
        },

        changeWidth: function () {
            this.oList = this.banner.querySelectorAll('li');
            var a = this.oList[0].cloneNode(true);
            this.banner.appendChild(a);
            a = null;
            this.singleWdth = utils.css(this.oList[0], 'width');
            utils.css(this.banner, 'width', this.singleWdth * (this.oList.length + 1));
            console.log(this.focusList);
        },

        changeHeight: function () {
            this.oList = this.banner.querySelectorAll('li');
            var a = this.oList[0].cloneNode(true);
            this.banner.appendChild(a);
            a = null;
            this.singleHeight = utils.css(this.oList[0], 'height');
            utils.css(this.banner, 'height', this.singleHeight * (this.oList.length + 1));
        },

        ShowFocusList: function (index) {
            this.focusList[index].className = 'active';
        },

        change: function () {
            var that = this;
            var a = new Animate({
                ele: that.banner,
                target: {
                    left: -(that.initIndex) * that.singleWdth
                },
                sumTime: that.changeTime,
                callback: function () {
                    if (that.initIndex === that.len) {
                        that.initIndex = 0;
                        utils.css(that.banner, 'left', 0)
                    }
                    if (that.isShowFocusList) {
                        for (var i = 0; i < that.focusList.length; i++) {
                            var obj = that.focusList[i];
                            obj.className = ''
                        }
                        that.ShowFocusList(that.initIndex)
                    }
                }
            })
        },

        autoChange: function () {
            var that = this;
            this.autoTimer = setInterval(function () {
                that.initIndex++;
                that.change()
            }, that.autoTime)
        },

        bindArrow: function () {
            var that = this;
            that.arlBtn.onclick = function () {
                that.arlFn(that);
            };
            that.arrBtn.onclick = function () {
                that.arrFn(that)
            }
        },

        arlFn: function (that) {
            console.log(that);
            that.initIndex--;
            if (that.initIndex === -1) {
                utils.css(that.banner, 'left', -that.singleWdth * (that.len));
                that.initIndex = that.len - 1
            }
            that.change()
        },

        arrFn: function (that) {
            that.initIndex++;
            that.change()
        },

        hover: function () {
            if (!this.isAutoChange) {
                return
            }
            var that = this;
            that.banner.onmouseenter = function () {
                clearInterval(that.autoTimer)
            };
            that.banner.onmouseleave = function () {
                that.autoChange()
            }
        },

        changeByFocusList: function () {
            var that = this;
            for (var i = 0; i < this.focusList.length; i++) {
                (function (i) {
                    that.focusList[i]['on' + that.focusEvent] = function () {
                        that.initIndex = i;
                        that.change();
                    }
                })(i)
            }
        },

        init: function (options) {
            this.initDefault(options);
            this.getElement();
            if (this.needGetData) {
                this.getData();
                this.bindData();
                this.getImg();
            }else if(this.changeMode === 'scrollX'){
                this.changeWidth();
            }else if(this.changeMode === 'scrollY'){
                this.changeHeight();
            }
            if(this.changeMode === 'fade'){
                this.oList = this.banner.querySelectorAll('li');
                this.fadeInit();
                this.fadeIndex = this.initIndex;
                this.change = function () {
                    debugger;

                    if(this.initIndex === this.len){
                        this.initIndex = 0
                    }
                    utils.css(this.oList[this.fadeIndex],'zIndex',0);
                    utils.css(this.oList[this.initIndex],'zIndex',1);
                    var that = this,
                        a = new Animate({
                            ele: that.oList[that.initIndex],
                            target: {
                                opacity:1
                            },
                            sumTime: that.changeTime,
                            callback: function () {
                                if (that.isShowFocusList) {
                                    for (var i = 0; i < that.focusList.length; i++) {
                                        var obj = that.focusList[i];
                                        obj.className = ''
                                    }
                                    that.ShowFocusList(that.initIndex)
                                }
                                utils.css(that.oList[that.fadeIndex],'opacity',0);
                                that.fadeIndex = that.initIndex;
                            }
                        })
                }
            }else if(this.changeMode === 'scrollY'){
                this.change = function () {
                    var that = this;
                    var a = new Animate({
                        ele: that.banner,
                        target: {
                            top: -(that.initIndex) * that.singleHeight
                        },
                        sumTime: that.changeTime,
                        callback: function () {
                            if (that.initIndex === that.len) {
                                that.initIndex = 0;
                                utils.css(that.banner, 'top', 0)
                            }
                            if (that.isShowFocusList) {
                                for (var i = 0; i < that.focusList.length; i++) {
                                    var obj = that.focusList[i];
                                    obj.className = ''
                                }
                                that.ShowFocusList(that.initIndex)
                            }
                        }
                    })
                };
                this.arlFn = function (that) {
                    that.initIndex--;
                    if (that.initIndex === -1) {
                        utils.css(that.banner, 'top', -that.singleHeight * (that.len));
                        that.initIndex = that.len - 1
                    }
                    this.change(that)
                }
            }

            if (this.isShowFocusList) {
                this.ShowFocusList(this.initIndex)
            }
            if (this.isAutoChange) {
                this.autoChange();
                if (this.isArrowChange) {
                    this.bindArrow()
                }
            }
            this.hover();
            if (this.focusChange) {
                this.changeByFocusList()
            }

        }
    };
    var init = BannerPlugin.prototype.init;
    init.prototype = BannerPlugin.prototype;
    window.BannerPlugin = window.$banner = BannerPlugin;
})();
/*
$banner({
    url: 'js/data.json',
    wrapper: document.getElementById('wrapper'),
    changeMode: 'scrollX',
    lazyImageTime: 300,
    focusEvent: 'click'
});*/
