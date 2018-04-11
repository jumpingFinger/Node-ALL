// let total = null;
// for (let i = 1; i <= 100; i++) {
//     if (i % 15 === 0) {
//         total += i;
//     }
// }
// console.log(total);//=>315

//=>函数执行的时候再调用自己执行就是递归
// let total = null;
// function fn(num) {
//     if (num > 100) {
//         //=>递归应该结束了
//         return;
//     }
//     if (num % 15 === 0) {
//         total += num;
//     }
//     fn(num + 1);
// }
// fn(1);
// console.log(total);


function fn(num) {
    if (num > 100) {
        //=>递归应该结束了
        return 0;
    }
    if (num % 15 === 0) {
        return num + fn(num + 1);
    }
    return fn(num + 1);
}

console.log(fn(1));