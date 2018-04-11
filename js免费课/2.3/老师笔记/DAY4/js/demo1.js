var ary = [1, 2, 3, 1, 2, 4, 3, 1, 2];

// 双for循环
// 比较的轮数 最后一个不需要拿出来和后面的进行比较 ary.length-1
/*
for (var i = 0; i < ary.length - 1; i++) {
    var cur = ary[i];  //当前项 i 当前项的后一项 i+1
    for (var j = i + 1; j < ary.length; j++) {
        if(cur == ary[j]){ //拿出来的项跟当前项相等 重复
            ary[j] = ary[ary.length-1];
            delete ary.length;
            j--;
        }
    }
}

*/

//indexOf
/*for (var i = 0; i < ary.length; i++) {
    var cur = ary[i];  /!*当前项*!/
    var nextAry = ary.slice(i+1); /!* 把当前项后面项全部查找到*!/
    if(nextAry.indexOf(cur) > -1){  //说明存在 重复了
        ary[i] = ary[ary.length-1];
        ary.length--;
        i--;
    }
}*/


// 借用obj的特性
var obj = {};
for (var i = 0; i < ary.length; i++) {
     var cur = ary[i];
     if(typeof  obj[cur] !== 'undefined'){ //如果obj里没有对应的属性名  获取的结果是undefined  测试重复  不是undefined
         ary[i] = ary[ary.length-1];
         ary.length--;
         i--;
         continue;
     }
     obj[cur] =  cur;
}
console.log(ary);




