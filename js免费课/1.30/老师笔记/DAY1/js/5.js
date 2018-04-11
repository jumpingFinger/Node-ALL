/*在原型上扩展一个叫做去重的方法 myUnqiue
 借用obj对象属性名和属性值的方法去实现
 * */
Array.prototype.myUnqiue = function myUnqiue() {
    var obj = {};
    for (var i = 0; i < this.length; i++) {
        var cur = this[i];
        if (typeof obj[cur] !== 'undefined') {
            this[i] = this[this.length - 1];
            this.length--;
            i--;
            continue;
        }
        obj[cur] = cur;
    }
    return this; /*返回实例*/
};
var ary = [12, 13, 13, 14, 12, 15, 12, 14, 13];
var ary1 = [12, 13, 13, 14, 12, 15, 12, 14, 13, 13, 14, 12, 15, 12, 14, 13];
console.log(ary.myUnqiue().sort(function(a,b){
    return b-a;
}));
console.log(ary1.myUnqiue().reverse());