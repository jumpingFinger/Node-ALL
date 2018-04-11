/*
 方法二:利用indexOf  ary.indexOf(i) > -1
 indexOf [IE6~8 不兼容]
 1  newAry  [2,3,1,2,1,4,1,1,2,4,1]
 思路: 找出一个当前项 ary[i] 找到当前项后面所有项 而且以一个新数组返回
 然后我们当前项 在新数组中有没有重复 如果重复了 就去数组中 删除掉重复的那项
 */
var ary = [1, 2, 3, 1, 2, 1, 4, 1, 1, 2, 4, 1];
for (var i = 0; i < ary.length; i++) {
    var cur = ary[i];
    var curNextAry = ary.slice(i + 1);
    // 用indexOf 检测的结果 大于 -1 代表数组中存在 说明重复了
    if (curNextAry.indexOf(cur) > -1) {
        ary.splice(i, 1);
        i--;
    }
}
console.log(ary);


