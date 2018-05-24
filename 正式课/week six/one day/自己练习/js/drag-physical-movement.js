let dragModule = (function () {
    let drag1 = new Drag(box);
    let drag2 = new Drag(box1);

    let computedDistance = function (ele) {
        if (!ele.previousDistance) {
            ele.previousDistance = ele.offsetLeft;
            ele.curDistance = 0;
            return;
        }
        ele.curDistance = ele.offsetLeft - ele.previousDistance;
        ele.previousDistance = ele.offsetLeft;
    };
    let stopMove = function (ele) {
        clearInterval(ele.Xtimer);
        clearInterval(ele.Ytimer);
        ele.curDistance = undefined;
    };
    let moveX = function (ele) {
        let minL = 0,
            maxL = document.documentElement.clientWidth - ele.clientWidth;
        let curDistance = ele.curDistance;
        ele.Xtimer = setInterval(() => {
            if (Math.abs(curDistance) < 0.5) {
                change(ele);
                clearInterval(ele.Xtimer);
                return;
            }
            curDistance *= 0.98;
            let curL = ele.offsetLeft;
            if (curDistance <= 0) {
                curL += curDistance;
                ele.style.left = curL + 'px';
                if (curL < minL) {
                    ele.style.left = minL + 'px';
                    curDistance *= -1;
                    return;
                }
            } else {
                curL += curDistance;
                ele.style.left = curL + 'px';
                if (curL > maxL) {
                    ele.style.left = maxL + 'px';
                    curDistance *= -1;
                    return;
                }
            }
        }, 17)
    };
    let moveY = function (ele) {
        let acceleratedSpeed = 5,
            speed=9.8,
            maxT= document.documentElement.clientHeight - ele.clientHeight,
            flag=0;
        ele.Ytimer=setInterval(()=>{
            speed += acceleratedSpeed;
            speed *= .98;
            if(flag>1){
                change(ele);
                clearInterval(ele.Ytimer);
                return;
            }
            let curT=ele.offsetTop;
            curT+=speed;
            ele.style.top = curT + 'px';
            if(curT>maxT){
                ele.style.top = maxT + 'px';
                speed *= -1;
                flag++;
                return;
            }
            flag=0;
        },17);
    };
    //=>这种办法太不好了...........................
    let change = function (ele) {
        document.querySelectorAll('div').forEach( item => {
            item.style.zIndex = 0;
        });
        ele.style.zIndex = 1;
    };
    return {
        init: function () {
            drag1.downCallbacks.add(change);
            drag2.downCallbacks.add(change);
            drag1.moveCallbacks.add(computedDistance);
            drag2.moveCallbacks.add(computedDistance);
            /*鼠标再次以上停止动画*/
            drag1.downCallbacks.add(stopMove);
            drag2.downCallbacks.add(stopMove);
            drag1.add(moveX);
            drag2.add(moveX);
            drag1.add(moveY);
            drag2.add(moveY);
        }
    }
})();
dragModule.init();