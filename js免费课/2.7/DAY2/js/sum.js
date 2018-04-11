// var sum = function () {
//     var arg = arguments,
//         total = null;
//     for (var i = 0; i < arg.length; i++) {
//         var item = Number(arg[i]);
//         if (isNaN(item)) continue;
//         total += item;
//     }
//     return total;
// };
//
// sum(10, 20, 30);

// var sum = function () {
//     var total = null;
//     for (var i = 0; i < arguments.length; i++) {
//         total += arguments[i];
//     }
//     return total;
// };
// console.log(sum(10, 20, 30, 40));


// var sum = function () {
//     // var total = null;
//     //=>ARGUMENTS是类数组,不是数组(不能直接使用数组中的一些方法,例如：PUSH/JOIN...)
//     //console.log(arguments.join('+'));//=>Uncaught TypeError: arguments.join is not a function
//
//     //=>数组求和
//     // var arg = [10, 20, 30, 40];
//     // for (var i = 0; i < arg.length; i++) {
//     //     total += arg[i];
//     // }
//
//     // eval(arg.join('+'))
//     //=>先把数组中的每一项拼接成 "XX+XX..." 这样的字符串
//     //=>使用EVAL把拼接好的字符串变为JS表达式执行
//
//     // [].join.call(arguments,'+') //=>理解为：arguments.join('+')
//     return eval([].join.call(arguments, '+'));
// };
// console.log(sum(10, 20, 30, 40));


// let sum = (n, m, ...arg) => {
//     // console.log(arguments);//=>Uncaught ReferenceError: arguments is not defined  =>ES6箭头函数中没有ARGUMENTS
//
//     // ...ARG：除了前面形参以外传递的实参值，都会存储在ARG变量中（存储的结果是一个数组，数组中包含剩余传递的值） =>“ES6中三个点的一个作用：剩余运算符”
//     // 如果前面没有形参变量，那么ARG存储的是所有传递进来的实参信息，等价于原有的ARGUMENTS（ARG是数组 ARGUMENTS是类数组）
//     console.log(n);//=>10
//     console.log(m);//=>20
//     console.log(arg);//=>[30, 40]
// };
// sum(10, 20, 30, 40);

// let sum = (...arg) => {
//     return eval(arg.join('+'));
// };
let sum = (...arg) => eval(arg.join('+'));
sum(10, 20, 30, 40);