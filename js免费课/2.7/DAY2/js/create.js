/*
 * 1、分析要完成的需求
 *  ->增加
 *  ->删除
 *
 * 2、想要操作哪些元素，先把这些元素获取到
 *  ->#newsBox
 *  ->#newsBox .item
 *  ->#newsBox .item li
 *  ->#newsBox .item .minus
 *  ->#newsBox .plus
 *
 * 3、按照思路一步步实现即可
 */
var newsBox = document.querySelector('#newsBox'),
    plus = newsBox.querySelector('.plus'),
    item = newsBox.querySelector('.item'),
    itemList = item.querySelectorAll('li'),
    minusList = item.querySelectorAll('.minus');

/*
 * 当点击plus增加的时候，我们需要：
 *   1、动态创建LI以及LI中的SPAN和A
 *   2、把动态创建的元素添加到UL的末尾
 *   3、给新增加的A标签绑定点击事件，点击的时候移除对应的LI
 */
plus.onclick = function () {
    //->创建LI
    var oLi = document.createElement('li');

    //->创建SPAN加入到LI中
    var oSpan = document.createElement('span');
    oSpan.innerHTML = Math.random();//=>innerHTML:向指定的容器中添加内容
    oLi.appendChild(oSpan);

    //->创建A加入到LI中
    var oLink = document.createElement('a');
    oLink.innerHTML = '-';
    oLink.className = 'minus';
    oLink.href = 'javascript:;';
    //=>绑定点击事件
    oLink.onclick = function () {
        var par = this.parentNode;
        item.removeChild(par);
    };
    oLi.appendChild(oLink);

    //->把创建完成的LI存放在UL中
    item.appendChild(oLi);
};

/*
 * 循环所有的minus按钮，绑定点击事件，点击的时候：
 *   1、获取当前点击按钮的父亲（也就是LI）
 *   2、在UL容器中把它的父亲移除掉即可
 *
 * 当前本次操作只对页面中现有的LI和MINUS起作用
 */
for (var i = 0; i < minusList.length; i++) {
    //minusList[i]：每一次循环得到的当前这个按钮
    minusList[i].onclick = function () {
        //=>this:代表点击的MINUS
        var par = this.parentNode;
        item.removeChild(par);
    }
}