let str = ``;
for (let i = 1; i <= 9; i++) {
    str += `<li>`;
    for (let j = 1; j <= i; j++) {
        str += `<span>
            ${j} * ${i} = ${i * j}
        </span>`;
    }
    str += `</li>`;
}
window.multiBox.innerHTML = str;

//=>动画
let spanList = window.multiBox.querySelectorAll('span');
for (let i = 0; i < spanList.length; i++) {
    /*
     * i=0 第一次循环
     *   设置了第一个定时器（等待时间：50MS）
     *   执行了MOVE方法，把此时I的值0传递给形参N
     *      形成一个私有的作用域A0，私有变量n=0，返回一个小函数（相当于返回一个地址:BBBCCC000）
     *   setTimeout(BBBCCC000, 50);
     *   定时器是异步编程，不需要等待50MS，继续执行下一次循环；而且A0作用域中的BBBCCC000被定时器占用了，此时的A0作用域不销毁（私有N也不销毁）
     *
     * i=1 第二次循环
     *   设置第二个定时（等待时间：100MS）
     *   执行MOVE(1)，形成一个新的私有作用域A1，存在一个私有变量N=1，把小函数的内存地址返回：BBBCCC111，把返回结果给定时器了，所以当前A1作用域不销毁
     *   setTimeout(BBBCCC111, 100);
     *
     * ...
     *
     * 共循环45次（有45个SPAN）
     *   形成45个不销毁的私有作用域
     *      A0~A44
     *   每一个私有作用域中都存在一个私有变量N
     *      N : 0~44
     *
     *   形成45个定时器
     *      定时器绑定的函数：BBBCCC000~BBBCCC044
     *      定时器的时间：50~2250
     *
     *  当到达50MS后，执行第一个定时器，执行BBBCCC000这个方法（它是在A0中创建出来的）
     *    执行的代码：spanList[n].style.opacity = 1;  此处的N是A0中的N,也就是0,也就是第一个SPAN（执行第一个定时器让第一个SPAN透明度变为1）
     *    ...
     */
    setTimeout(move(i), 50 * (i + 1));
}

function move(n) {
    return function () {
        spanList[n].style.opacity = 1;
    }
}