~function () {
    class Banner {
        constructor(options = {}) {
            let {
                ele,
                url,
                isArrow = true,
                isFocus = true,
                isAuto = true,
                defaultIndex = 0,
                interval = 3000,
                speed = 200,
                moveEnd
            } = options;
            //=>把所有的配置项信息都挂载到实例上 , 这样以后在原型的任何方法中都可以调取这些属性获取了
            ['ele', 'url', 'isArrow', 'isFocus', 'isAuto', 'defaultIndex', 'interval', 'speed', 'moveEnd'].forEach(item => {
                this[item] = eval(item);
            });
            //=>获取需要的元素,挂载到实例上
            this.container = document.querySelector('ele');
            this.wrapper = this.container.querySelector('.wrapper');
            this.focus = this.container.querySelector('.focus');
            this.arrowLeft = this.container.querySelector('.arrowLeft');
            this.arrowRight = this.container.querySelector('.arrowRight');
            this.slideList = null;
            this.focusList = null;
            this.stepIndex = defaultIndex;
            this.autoTimer = null;


            //=>调取init开启轮播图
            this.init();
            return new Banner.prototype.init(options)
        }

        //=>banner的主入口
        init() {
            let promise = this.queryData();
            promise.then(() => {
                this.bindHTML();
            }).then(()=>{
                if(this.isAuto){
                    this.autoTimer=setInterval(()=>{
                        this.autoMove();
                    },this.interval);
                }
            });
        }

        queryData() {
            let {url} = this;
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open('get', url, true);
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        this.data = JSON.parse(xhr.responseText);//=>获取的数据传到了实例上
                        resolve();
                    } else if (xhr.status !== 200) {
                        reject();
                    }
                };
                xhr.send(null);
            });
        }

        //=>数据绑定的方法
        bindHTML() {
            let strSlide = ``,
                strFocus = ``;
            this.data.forEach(({img = 'img/banner1.jpg', desc}, index) => {
                //=>结构的时候如果当前返回的数据中没有img,我们可以让其等于默认值
                strSlide += ` <div class="slide">
         <img src="${img}" alt="${desc}">
       </div>`;
                //=>ES6模板字符串中${}存放的是JS表达式,但是需要表达式有返回值 ,因为我们要把这个返回值拼到模板字符串中
                strFocus += `<li class="${index === 0 ? 'active' : ''}">
        
</li>`;
            });
            this.wrapper.innerHTML = strSlide;
            this.focus.innerHTML = strFocus;

            //=>获取所有的slide 和li
            this.slideList = this.wrapper.querySelectorAll('.slide');
            this.focusList = this.focus.querySelectorAll('li');

            this.wrapper.appendChild(this.slideList[0].cloneNode(true));
            this.slideList = wrapper.querySelectorAll('.slide');
            //=>根据slide的个数动态计算wrapper的宽度
            utils.css(this.wrapper, 'width', this.slideList.length * 1000);
        }

        autoMove(){
            this.stepIndex++;
            if(this.stepIndex>=this.slideList.length){
                utils.css(this.wrapper,'left',0);
                this.stepIndex=1;
            }
            //=>基于自主封装的animate实现切换动画
            animate(wrapper,{
                left:-this.stepIndex*1000
            },this.speed);//=>200是从当前切换到下一张的动画时间 interval间隔多久切换一次
            //=>没一次运动完成需要让焦点跟着切换
            this.changeFocus();
        }

        changeFocus(){
            let tempIndex=this.stepIndex;
            tempIndex===slideList.length-1? tempIndex=0:null;
            this.focusList.forEach((item,index)=>{
                item.className=index===tempIndex?'active':null;
            })
        }
    }

    window.Banner = banner;
    banner.prototype.init.prtotype=banner.prototype;
}();


//=>一个优秀的插件尽可能的支持更多的配置项目(大部分配置项都是有默认值的)
// new Banner({
//     ele:,//=>操作哪个容器 (选择器)
//     data: [],//=>需要绑定的数据
//     url: '',//=>获取数据的API地址 (插件内部帮我们获取数据)
//     isArrow: true,//=>是否支持左右切换
//     isFocus: true,//=>是否支持焦点切换
//     isAuto: true,//=>是否支持自动切换
//     defaultIndex: 0,//=>默认展示第几张
//     interval: 3000,//=>切换的速度
//     speed: 200,//=>切换速度
//     moveEnd: () => {  //=>支持回调函数 切换完成后处理的事情
//     },
//     ...
// });

//=>支持扩展,可以让用户自己在你的插件中扩展方法
//=>Banner.fn.extend({xxx:()=>{}})
