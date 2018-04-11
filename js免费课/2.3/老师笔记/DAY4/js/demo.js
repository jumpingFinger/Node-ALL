/* 倒计时抢购*/
function computed() {
    var timeBox = document.getElementById('timeBox');

    var curTime = new Date(); // 电脑当前的时间
    var targetTime = new Date('2018/02/03 16:30'); //我们自己给定的活动结束的时间;
    var areaTime = targetTime - curTime;
    //console.log(areaTime);  //150621 毫秒数

    if (areaTime < 0) {
        timeBox.innerHTML = '活动已经结束啦~';
        window.clearInterval(timer);
        return;
    }
    /*得到的毫秒数 算出小时*/
    var hour = Math.floor(areaTime / (1000 * 60 * 60));

    /*从剩余的毫秒数中 算出分钟*/
    areaTime -= hour * 1000 * 60 * 60;
    /*减去小时占的毫秒数 剩下再去算分钟占的毫秒数*/
    var minutes = Math.floor(areaTime / (1000 * 60));

    /*从剩余的毫秒数中 算出秒*/
    areaTime -= minutes * 1000 * 60;
    var seconds = Math.floor(areaTime / 1000);

    /*补0的操作 只要小于10 就在前面补一个0*/
    hour < 10 ? hour = '0' + hour : hour;
    minutes < 10 ? minutes = '0' + minutes : minutes;
    seconds < 10 ? seconds = '0' + seconds : seconds;

    timeBox.innerHTML = hour + ':' + minutes + ':' + seconds;
}
computed();
var timer = window.setInterval(computed, 1000); //每隔1s执行一次函数



