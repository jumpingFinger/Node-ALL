/*
<div id = 'layer'>
    <button id = 'btn'></button>
    <video src='video/video.mp4' controls = 'controls'></video>
</div>
<div id = 'bg'></div>
* */


//1.创建一个播放器的弹窗  <div id = 'layer'></div>
var oDiv = document.createElement('div');
oDiv.id = 'layer';
document.body.appendChild(oDiv);

//2.创建一个关闭的x 按钮
var btn = document.createElement('button');
btn.id = 'btn';
btn.innerHTML = 'x';
oDiv.appendChild(btn); //把创建的button按钮添加到div中

//3.创建一个播放器video
//<video src="" autoplay= 'autoplay' controls = 'controls'></video>
//autoplay自动播放   controls 播放器的控件 可以控制播放器播放和暂停
var video = document.createElement('video');
video.src= 'video/video.mp4';
video.setAttribute('controls','controls');
oDiv.appendChild(video);

//4.创建一个遮罩层 <div id = 'bg'></div>
var bg = document.createElement('div');
bg.id = 'bg';
document.body.appendChild(bg);

// 默认我们创建的弹窗和背景是隐藏起来的
document.body.removeChild(oDiv);
document.body.removeChild(bg);

// 要操作谁 先获取谁  video.play(); 播放  video.pause() 暂停
var videoBtn = document.getElementById('videoBtn');
videoBtn.onclick = function () {
    //弹窗和背景显示
    document.body.appendChild(oDiv);
    document.body.appendChild(bg);

    video.setAttribute('autoplay','autoplay');
    video.removeAttribute('controls','controls');

    //console.log(btn); // <button id= 'btn'>x</button>
    var oBtn = document.getElementById('btn');

    //oBtn的层级不够 console  alert
    oBtn.onclick = function () {
        document.body.removeChild(oDiv);
        document.body.removeChild(bg);
    };
};










