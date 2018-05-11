let bannerRender = (function () {

    //1.获取需要操作的元素或者元素集合
    let container = document.querySelector("#container"),
        wrapper = container.querySelector(".wrapper"),
        focus = container.querySelector(".focus"),
        arrowLeft = container.querySelector(".arrowLeft"),
        arrowRight = container.querySelector(".arrowRight"),
        slideList = null,
        focusList = null;

    //2.获取数据
    let queryData = function queryData() {
        return new Promise((resolve, reject)=>{
            let xhr = new XMLHttpRequest();
            xhr.open("get","json/banner.json",true);
            xhr.onreadystatechange = function () {
                if(xhr.readyState == 4 && xhr.status == 200){
                    resolve(JSON.parse(xhr.responseText));
                }
            };
            xhr.send(null);
        });
    };

    //3.数据绑定
    let bindHTML = function bindHTML(data) {
        let strSlide = ``,
            strFocus = ``;

        data.forEach(({img='img/default.gif', desc='默认描述'}, index)=>{
            strSlide += `<div class="slide"><img src="${img}" alt="${desc}"></div>`;
            strFocus += `<li class="${index == 0 ? 'active' : ''}"></li>`;
        });

        // strSlide += `<div class="slide"><img src="${data[0].img}" alt="${data[0].desc}"></div>`;

        wrapper.innerHTML = strSlide;
        focus.innerHTML = strFocus;

        //获取所有slide和li
        slideList = wrapper.querySelectorAll('.slide');
        focusList = focus.querySelectorAll('li');

        wrapper.appendChild(slideList[0].cloneNode(true));
        slideList = wrapper.querySelectorAll('.slide');

        //根据slide的个数，动态计算wrapper的宽度
        utils.css(wrapper, 'width', slideList.length * 1000);

    };

    //轮播图运动的基础参数
    let stepIndex = 0,//当前展示块的索引（步长）
        autoTimer = null,//自动轮播的定时器
        interval = 1000;//间隔多长时间自动切换一次

    //控制轮播图的运动
    let autoMove = function autoMove() {
        stepIndex++;

        if(stepIndex >= slideList.length) {
            //说明再往后切换就没有了，当前展示的是克隆的第一张
            utils.css(wrapper, 'left', 0);
            stepIndex=1;
        }

        // utils.css(wrapper, 'left', -stepIndex*1000);
        //基于自己封装的animate实现切换动画
        animate(wrapper, {
            left: -stepIndex*1000
        }, 200);//200 是从当前切换到下一张的动画时间 interval是间隔多久切换一次

        changeFocus();
    };

    //让焦点跟着轮播图的切换而切换（运动到克隆这一张的时候木业需要让第一个li有选中的样式）
    let changeFocus = function changeFocus() {
        let tempIndex = stepIndex;
        tempIndex == slideList.length - 1 ? tempIndex=0 : null;

        utils.each(focusList, (index, item)=>{
            index == tempIndex ? item.className = 'active' : item.className = '';
        });

    };

    //鼠标进入或离开控制自动的轮播的停止和开启
    let handleContainer = function handleContainer() {
        container.onmouseenter = function () {
            clearInterval(autoTimer);

            arrowLeft.style.display = arrowRight.style.display = 'block';
        };

        container.onmouseleave = function () {
            autoTimer = setInterval(autoMove, interval);
            arrowLeft.style.display = arrowRight.style.display = 'none';
        };
    };

    //点击焦点实现切换
    let handleFocus = function handleFocus() {
        [].forEach.call(focusList, (item, index)=>{
            item.onclick = function () {

                stepIndex = index;//点击的是谁，就让stepIndex运动到哪里

                animate(wrapper, {
                    left: -stepIndex*1000
                }, 200);

                changeFocus();
            }
        });
    };

    //给两个按钮绑定点击事件
    let handleArrow = function handleArrow() {
        arrowRight.onclick = autoMove;//点击右按钮和执行轮播是一样的

        arrowLeft.onclick = function () {
            stepIndex--;

            if(stepIndex < 0){
                utils.css(wrapper, 'left', -(slideList.length - 1)*1000);
                stepIndex = slideList.length - 2;
            }

            animate(wrapper, {
                left: -stepIndex*1000
            }, 200);

            changeFocus();
        }
    };

    return{
        init: function () {
            let promise = queryData();
            // promise.then((data)=>{
            //     bindHTML(data);
            // });
            promise.then(bindHTML).then(()=>{
                //开启定时器驱动的自动轮播
                autoTimer = setInterval(autoMove, interval);
            }).then(()=>{
                //左右按钮或者焦点切换
                handleContainer();
                handleFocus();
                handleArrow();
            });
        }
    }
})();

bannerRender.init();

