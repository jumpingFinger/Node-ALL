var btnList = document.getElementsByTagName('button');
// for (var i = 0; i < btnList.length; i++) {
//     btnList[i].myIndex = i;
//     btnList[i].onclick = function () {
//         alert(this.myIndex);
//     }
// }

// for (var i = 0; i < btnList.length; i++) {
//     btnList[i].onclick = (function (n) {
//         //=>N:私有变量  每一次循环都执行一个自执行函数，形成对应的私有作用域（当前案例形成五个私有作用域），每一个作用域中的N都存储了当前对应的序号（需要的索引）
//         return function () {
//             alert(n);
//         }
//     })(i);
// }

for (let i = 0; i < btnList.length; i++) {
    btnList[i].onclick = function () {
        alert(i);
    }
}