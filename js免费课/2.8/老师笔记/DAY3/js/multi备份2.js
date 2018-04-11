//=>字符串拼接
// let str = '';
// for (let i = 1; i <= 9; i++) {
//     str += '<li>';
//     for (let j = 1; j <= i; j++) {
//         str += '<span>';
//         str += j + ' * ' + i + ' = ' + (j * i);
//         str += '</span>';
//     }
//     str += '</li>';
// }
// window.multiBox.innerHTML = str;

//=>练习一下字符串拼接
/*
 * 1、外层字符串是双引号，里层字符串不能直接的双引号（可以使用单引号，或者把双引号转义，再或者外层使用单引号）
 *
 * 2、如果想在字符串中嵌入一些外部的数据（例如想要把一个变量值嵌入到字符串中），外层使用的是单引号，我们里层嵌入的时候直接的 '+变量+' 即可
 */
// let aa = '//miaosha.jd.com/#5218185';
// let str = "";
// str += "<div class='slider_item sk_item sk_item_1 slider_active'>";
// str += '<div class="slider_item sk_item sk_item_1 slider_active">';
// str += "<div class=\"slider_item sk_item sk_item_1 slider_active\">";//=>把里层的双引号转义
// str += '<a class="sk_item_lk" href="' + aa + '">';

//=>ES6中提供了模板字符串，可以让我们更高效率的拼接字符
let url = '//miaosha.jd.com/#5218185';
let str = ``;//=>ES6模板字符串用的不是单引号，是TAB键上面的两个撇
//=>在ES6模板字符串中，使用${}嵌入JS代码
//1、JS代码可能是一个变量：相当于把变量的值嵌入到模板字符串中
//2、JS代码可能是一个表达式：相当于把表达式计算的结果嵌入到模板字符串中
//...
//不管什么情况，当前编写的JS代码一定是有结果的，我们是把结果嵌入到模板字符串中

str += `<div class="slider_item sk_item sk_item_1 slider_active">
    <a class="sk_item_lk" href="${url}" target="_blank">
        <div class="lazyimg lazyimg_loaded sk_item_img">
            <img src="" data-lazy-src="" class="lazyimg_img">
        </div>
        <p class="sk_item_name">海信（Hisense）LED55EC500U 55英寸 4K超高清 VIDAA4.0 智能电视 丰富影视教育资源 （黑色）</p>
        <div class="sk_item_price">
        <span class="mod_price sk_item_price_new">
            <i>¥</i>
            <span>2889.00</span>
        </span>
            <span class="mod_price sk_item_price_origin">
            <i>¥</i>
            <span>3499.00</span>
        </span>
        </div>
    </a>
</div>`;













