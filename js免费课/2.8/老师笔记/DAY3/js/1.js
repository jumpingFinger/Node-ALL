var btnList = document.getElementsByTagName('button');

for (var i = 0; i < btnList.length; i++) {
    //btnList[i]：当前本次循环对应的按钮
    btnList[i].onclick = function () {
        alert(i);//=>这样处理弹出的永远是5
    }
    //=>事件绑定是异步编程,我们绑定完成事件后，不需要等待点击，直接继续执行下一个任务（也就是下一轮的循环），所以导致：当我们点击按钮的时候，循环都已经结束了，全局下的I已经是循环最后的结果5
}
/*
 * i=0 第一次循环
 *   btnList[0].onclick = function () {alert(i)}
 *
 * i=1 第二次循环
 *   btnList[1].onclick = function () {alert(1)}
 *
 * ...
 *
 * i=4 第五次循环
 *   btnList[4].onclick = function () {alert(4)}
 *
 * i=5 循环结束
 */

/*
 * JS中的同步编程和异步编程
 *  [同步 sync]
 *    当前这件事彻底完成后，才可以做下一件事情
 *  [异步 async]
 *    当前这件事不需要彻底完成（处于等待中），我们先把下面的事情进行处理，处理完成后，返回头在处理当前的事情
 *
 *  JS中大部分操作都是同步的，异步处理的不多：
 *   1、定时器都是异步的
 *   2、事件绑定都是异步的
 *   3、AJAX中存在同步异步
 *   4、回调函数也可以理解为异步的
 *   5、ES6中的promise是专门处理异步的机制
 *   6、ES6中的async/await
 *   ...
 */
