~function () {
    let banner = options => new banner.prototype.init(options);
    banner.prototype = {
        constructor: banner,
        init: function (options) {
            this._default(options);
            let promise = this.getData();
            promise.then(() => {
                this.bindHTML();
                this.defaultStyle();
            }).then(() => {
                this.autoTimer = setInterval(() => {
                    this.autoMove();
                }, this.interval)
            }).then(() => {
                this.containerEvent();
                if (this.isFocus) {
                    this.focusEvent();
                }
                if (this.isArrow) {
                    this.arrowEvent();
                }
            })
        },
        _default: function (options) {
            this.options = {
                ele: null,
                url: null,
                isArrow: true,
                isFocus: true,
                focusEventType: 'click',
                isAuto: true,
                defaultIndex: 0,
                interval: 2000,
                speed: 200,
                direction:"horizontal",
                moveEnd: null
            };
            for (let key in options) {
                if (options.hasOwnProperty(key)) {
                    this.options[key] = options[key];
                }
            }
            for (let key in this.options) {
                if (this.options.hasOwnProperty(key)) {
                    this[key] = this.options[key];
                }
            }
            this.container = document.querySelector(this.ele);
            this.wrapper = this.container.querySelector('.wrapper');
            this.focus = this.container.querySelector('.focus');
            if(this.isArrow){
                this.arrowLeft = this.container.querySelector('.arrowLeft');
                this.arrowRight = this.container.querySelector('.arrowRight');
            }
            this.slideList = null;
            this.focusList = null;
            this.stepIndex = this.defaultIndex;
            this.autoTimer = null;
            this.previousIndex = null;
            this.width=null;
            this.height=null;
            this.arrowTimer=true;
        },
        getData: function () {
            let {url} = this;
            return new Promise((resolve) => {
                let xhr = new XMLHttpRequest();
                xhr.open('get', url, true);
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        this.data = JSON.parse(xhr.responseText);
                        resolve();
                    }
                };
                xhr.send(null);

            })
        },
        bindHTML: function () {
            let str = ``,
                focusStr = ``;
            this.data.forEach(({img, desc}, index) => {
                str += `<div class="slide">
         <img src="${img}" alt="${desc}">
       </div>`;
                focusStr += `<li class="${index === 0 ? 'active' : ''}"></li>`;
            });
            this.wrapper.innerHTML = str;
            this.isFocus ? this.focus.innerHTML = focusStr : null;
            this.slideList = this.wrapper.querySelectorAll('.slide');
            this.isFocus ? this.focusList = this.focus.querySelectorAll('li') : null;
            if(this.direction!=='gradualChange'){
                this.wrapper.appendChild(this.slideList[0].cloneNode(true));
                this.slideList = this.wrapper.querySelectorAll('.slide');
            }
        },
        defaultStyle:function (){
            if (!this.isFocus) {
                utils.css(this.focus, 'display', 'none');
            }
            if (this.isFocus) {
                this.focusList.forEach((item, index) => {
                    item.className = index === this.defaultIndex ? 'active' : null;
                });
            }
            this.height=utils.css(this.wrapper,'height');
            this.width=utils.css(this.slideList[0],'width');
            if(this.direction ==='horizontal'){
                this.slideList.forEach((item)=>{
                    utils.css(item,'float','left');
                });
                utils.css(this.wrapper, 'width', this.slideList.length * this.width);
            }else if(this.direction==='vertical'){
                this.slideList.forEach((item)=>{
                    utils.css(item,'display','block');
                });
                utils.css(this.wrapper, 'height', this.slideList.length *this.height);
                this.slideList.forEach((item)=>{
                    utils.css(item,'height',this.height);
                });
                utils.css(this.focus,{
                    transform: 'rotate(90deg)',
                    left:'93%',
                    top:'40%'
                });
            }else if (this.direction==='gradualChange'){
                this.slideList.forEach((item,index)=>{
                    utils.css(item,{
                        position:'absolute',
                        zIndex:0,
                        opacity:0
                    });
                    if(index===this.defaultIndex){
                        utils.css(item,{
                            position:'absolute',
                            zIndex:1,
                            opacity:1
                        });
                    }
                });
            }
        },
        autoMove: function () {
            this.stepIndex++;
            if(this.direction==="horizontal"){
                if (this.stepIndex >= this.slideList.length) {
                    utils.css(this.wrapper, 'left', 0);
                    this.stepIndex = 1;
                }
            }else if(this.direction==='vertical'){
                if(this.stepIndex>=this.slideList.length){
                    utils.css(this.wrapper, 'top', 0);
                    this.stepIndex = 1;
                }
            }else if(this.direction==='gradualChange'){
                if (this.stepIndex > this.slideList.length-1) {
                    this.stepIndex = 0;
                }
            }
            this.directionMove();
            if (this.isFocus) {
                this.changeFocus();
            }
        },
        changeFocus: function () {
            let curIndex = this.stepIndex;
            if(this.direction!=='gradualChange'){
                curIndex === this.slideList.length - 1 ? curIndex = 0 : null;
            }
            this.focusList.forEach((item, index) => {
                item.className = index === curIndex ? 'active' : null
            })
        },
        containerEvent: function () {
            this.container.onmouseenter = () => {
                clearInterval(this.autoTimer);
                if (this.isArrow && this.direction !=='vertical') {
                    this.arrowLeft.style.display = this.arrowRight.style.display = 'block';
                }
            };
            this.container.onmouseleave = () => {
                this.autoTimer = setInterval(() => {
                    this.autoMove();
                }, this.interval);
                if(this.isArrow && this.direction !=='vertical'){
                    this.arrowLeft.style.display = this.arrowRight.style.display = 'none';
                }
            };
        },
        focusEvent: function () {
            this.focusList.forEach((item, index) => {
                item['on' + this.focusEventType] = () => {
                    if(this.previousIndex ===this.stepIndex){
                        if (this.previousIndex === index ) return;
                    }
                    if(this.stepIndex===this.slideList.length - 1){
                        this.wrapper.style.left=0+'px';
                    }
                    this.stepIndex = index;
                    this.directionMove();
                    this.changeFocus();
                    this.previousIndex=this.stepIndex;
                }
            })
        },
        arrowEvent: function () {
                this.arrowRight.onclick=()=>{
                    if(this.arrowTimer){
                        this.autoMove();
                        if(this.direction==='gradualChange'){
                            this.arrowTimer=false;
                            let timer=setTimeout(()=>{
                                this.arrowTimer=true;
                                clearTimeout(timer);
                            },this.speed+800);
                        }
                    }
                };

            this.arrowLeft.onclick = () => {
                this.stepIndex--;
                if(this.direction==='horizontal'){
                    if (this.stepIndex < 0) {
                        utils.css(this.wrapper, 'left', -(this.slideList.length - 1) * this.width);
                        this.stepIndex = this.slideList.length - 2;
                    }
                    this.directionMove();
                    if (this.isFocus) this.changeFocus();
                }else{
                    if(this.arrowTimer){
                        if(this.stepIndex<0) this.stepIndex=this.slideList.length-1;
                        this.directionMove();
                        this.focusList.forEach((item, index) => {
                            item.className = index === this.stepIndex ? 'active' : null
                        });
                        // this.arrowTimer=false;
                        // let timer=setTimeout(()=>{
                        //     this.arrowTimer=true;
                        //     clearTimeout(timer);
                        // },this.speed+400);
                    }
                }

            }
        },
        directionMove:function (){
            if(this.direction==="horizontal"){
                animate(this.wrapper, {
                    left: -this.stepIndex * this.width
                }, this.speed);
            }else if(this.direction==='vertical'){
                animate(this.wrapper, {
                    top: -this.stepIndex *this.height
                }, this.speed);
            }else if(this.direction==='gradualChange'){
                this.slideList.forEach((item,index)=>{
                    utils.css(item,{
                        zIndex:0,
                        opacity:0
                    });
                    if(index===this.stepIndex){
                        animate(item,{
                            zIndex:1,
                            opacity:1
                        },this.speed+400);
                    }
                })
            }
        }
    };
    banner.prototype.init.prototype = banner.prototype;
    window.banner = banner;
}();
banner({
    ele:'#container',
    url: 'json/banner.json',
    // isFocus:false,
    interval:3000,
    steep:500,
    defaultIndex:3
});
banner({
    ele:'#container1',
    url: 'json/banner2.json',
    isArrow:false,
    focusEventType:'mouseover',
    defaultIndex:1,
    direction:"vertical"
});
banner({
    ele:'#container2',
    url: 'json/banner.json',
    interval:3000,
    steep:600,
    defaultIndex:3,
    direction:'gradualChange',
});