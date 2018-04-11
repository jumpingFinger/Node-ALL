// var fn = function () {
//     console.log(1);
//     return function () {
//         console.log(2);
//     }
// };
// setTimeout(fn, 1000);//=>1（1000MS中执行FN）
// setTimeout(fn(), 1000);//=>1（设置定时器执行FN） 2（1000MS后执行FN返回的小函数）

//=>ES6箭头函数
// var fn = function () {
//     return function () {
//         return 100;
//     }
// };

// let fn = () => {
//     return 100;
// };
// let fn = () => 100;

// let fn = () => {
//     return () => {
//         return 100;
//     };
// };
// let fn = () => () => 100;
