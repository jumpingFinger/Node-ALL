/* 快速排序
 * 原理: 找出一个中间值  跟中间值进行比较 小于中间值放在左边  大于中间值放在右边
 *  左边       26       右边
 *  12 24 25            34  46
 * */

function quick(ary){
    if(ary.length <=1){  // 如果数组里面为空或者只有一项 不需要进行下面的操作去找中间项 直接把ary返回即可
        return ary;
    }
    var centerIndex = Math.floor(ary.length/2);
    //console.log(centerIndex);  //索引3 34
    var centerValue = ary.splice(centerIndex,1)[0]; //34
    //console.log(centerValue); //[34]
    var aryLeft = [];
    var aryRight = [];
    for (var i = 0; i < ary.length; i++) {
       ary[i] < centerValue ? aryLeft.push(ary[i]):null;
       ary[i] > centerValue ? aryRight.push(ary[i]):null;
    }
    return  quick(aryLeft).concat(centerValue,quick(aryRight))
}
console.log(quick([12, 24, 26, 34, 25, 46]));
//[12, 24, 25, 26, 34, 46]
// [12, 24, 26,25]   34  [46]
// quick( [12, 24, 26,25])    34    [46]








/* 递归: 函数自己调用自己*/
/*function sum(num) {
 console.log(num); //1   2   3  4   5
 if (num >= 5) {
 return 0
 }
 sum(num + 1); //sum(2) sum(3)  sum(4) sum(5)  0
 }
 sum(1);*/
/*面试题:1-100 之间能被3整除  而且还要被5整除的数相加的结果
 15 + 30 + 45 +  60 +  75  + 90  = 315
 * */
var total = null;
for (var i = 1; i < 100; i++) {
    if (i % 3 == 0 && i % 5 == 0) {
        total += i;
    }
}
console.log(total);  //315


function sum(num) {
    if(num >=100){
        return 0;
    }
    if (num % 15 == 0) {
        return num + sum(num + 1);
    }

    return sum(num + 1);
}
console.log(sum(1)); //315
//num 1    2             15
//sum(2)  sum(3) ....   15+sum(16)
//15   15+sum(16)
//     15+sum(17)
//    15+sum(30) = 15+ 30 + sum(31)
 //              ...
//               =  15+30 +45+60+75+90+...+ sum(100)
//               =  15+30 +45+60+75+90 + 0 =




