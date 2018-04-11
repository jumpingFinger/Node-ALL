var text = document.querySelector('.text'),
    submit = document.querySelector('.submit');

submit.onclick = (function () {
    //=>私有作用域A
    var i = 0;//=>I是A的私有变量

    return function () {//=>自执行函数执行,把返回的小函数(小函数的空间地址)赋值给外面的CLICK事件 submit.onclick=BBBCCC000；以后点击的时候执行的是小函数；
        text.innerHTML = ++i;
    }
    //=>由于我们把小函数返回给CLICK了，导致A这个作用域是不能销毁的
})();

//=>自执行函数:创建和执行一起完成
// (function () {
//
// })();


/*利用全局变量方式*/
// var total = 0;
// submit.onclick = function () {
//     //total++;//=>让全局下的total累加1
//     //text.innerHTML = total;
//
//     text.innerHTML = ++total;
// };
/*
 * i++和++i的区别
 *   都是在自身基础上累加1，但是在和其它值运算的时候，运算的顺序不一样
 *   i++：先拿原有值和别人运算，然后本身在加1
 *   ++i：先本身加1，把加完后的结果在和别人运算
 */
// var i = 1;
// console.log(5 + i++);//=>6 i=2
// i = 1;
// console.log(5 + (++i));//=>i=2 7
// var i = 1;
// console.log(5 + (i++));//=>加括号也是按照先计算在累加的机制来的 =>6

// var i = 2;
// console.log(5 + (i++) + (++i) + 4 + (--i) + (i--) + 3 + (++i) + (i++));
/*
 * 5 + (i++)  =>5+2=7 i=3
 * 7 + (++i)  =>i=4 7+4=11
 * 11 + 4  =>15
 * 15 + (--i) =>i=3 15+3=18
 * 18 + (i--) =>18+3=21 i=2
 * 21 + 3 =>24
 * 24 + (++i) =>i=3 24+3=27
 * 27 + (i++) =>27+3=30 i=4
 */

// submit.count = 0;//=>设置自定义属性
// submit.onclick = function () {
//     text.innerHTML = ++this.count;
// };

// submit.onclick = function () {
//     // var old = text.innerHTML;//=>获取的结果是字符串
//     // old = parseFloat(old);//=>转换为数字
//     // old++;
//     // text.innerHTML = old;
//
//     text.innerHTML++;
// };




