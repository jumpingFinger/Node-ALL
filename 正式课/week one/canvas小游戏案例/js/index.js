/*
* 1.定义变量 ES6中的let定义一个变量
* 2.数组
* 3.函数
* 4.if判断
* 5.for 循环
* 6.定时器
* 7.创建一个img
* 8.canvas 中的API(内置定义的属性跟方法)
* 9.获取一个元素 (就是一个标签)
*
 */

//1.定义变量 ES6中的let定义一个变量
let canvas=document.getElementById('canvas');
let draw=canvas.getContext('2d');


//默认颜色是黑色
//设置颜色
draw.fillStyle='#ff6700';
draw.fillRect(100,100,200,200);

//2.清除一个矩形
//draw.clearRect(x左边,y坐标,宽,高);
draw.clearRect(150,150,100,100);

