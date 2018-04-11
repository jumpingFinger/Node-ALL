/*
 方法三: 利用对象的键值对的方法
 var obj = {1:1,2:2,3:3}

 var obj = {name:'zhufeng'}
 obj.age -> undefined
 {1:1}
 {1:1,2:2}
 {1:1,2:2,3:3}
 {1:1,2:2,3:3,1:1}
 如果typeof obj[i] !== 'undefined' 存在 我们就不往obj里面存了
 var ary = [12,13,14,13]
 */
var ary = [1, 2, 3, 1, 2, 1, 4, 1, 1, 2, 4, 1];
var obj = {};
for (var i = 0; i < ary.length; i++) {
    var cur = ary[i];
    // 对象里重复了
    if (typeof obj[cur] !== 'undefined') {
        /*ary.splice(i,1);*/
        ary[i] = ary[ary.length - 1];
        ary.length--;
        /* 用最后一项把重复项替换 然后把最后一项删除*/
        i--;
        continue;
    }
    // 往对象obj里面存的前提条件是我们obj里面不存在
    obj[cur] = cur;
}
console.log(ary);
