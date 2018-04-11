/*var layer = document.getElementById('layer'),
    bg = document.getElementById('bg');
layer.style.display = 'none';
bg.style.display = 'none';

var videoBtn = document.getElementById('videoBtn');
videoBtn.onclick = function () {
    layer.style.display = 'block';
    bg.style.display = 'block';
};

var btn = document.getElementById('btn');
btn.onclick = function () {
    layer.style.display = 'none';
    bg.style.display = 'none';
};*/


var layer = document.getElementById('layer'),
    bg = document.getElementById('bg');




var videoBtn = document.getElementById('videoBtn');
videoBtn.onclick = function () {
    layer.style.display = 'block';
    bg.style.display = 'block';
};
var btn = document.getElementById('btn');
btn.onclick = function () {
    hide();
};
function hide() {
    layer.style.display = 'none';
    bg.style.display = 'none';
}
hide();
/* 函数: 封装  多态  继承
* 封装: 减少重复代码 提高代码的重复利用率 - 低耦合 高内聚
* */


