/* 插入思路:  摸牌的思路
* handAry  -> ary[0]  8 12 24  26
* */
function insert(ary) {
    var handAry = [];
    handAry.push(ary[0]);/* 手上先握一张牌 我们一般默认取第一个*/
    for (var i = 1; i < ary.length; i++) {
        var cur = ary[i];
        for (var j = handAry.length-1; j >=0; j--) {
            if( cur > handAry[j]){
                handAry.splice(j+1,0,cur);
                break; // 直接跳出
            }
            if(j==0){
                handAry.unshift(cur);
            }
        }
    }
    return handAry;
}
console.log(insert([12, 24, 26, 34, 25, 46]));
//[12, 24, 25, 26, 34, 46]


/*
for (var i = 0; i < 5; i++) {
    console.log(i); //0 1 2 3 4
}
for (var i = 5-1; i >=0; i--) {
    console.log(i); //4 3 2 1 0
}*/
