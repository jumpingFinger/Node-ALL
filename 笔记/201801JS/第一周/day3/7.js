function fn(){
    var i=5;
    return function(n){
        console.log(n*i++);
    }
}
var f=fn();
f(4);// 20
fn()(5);//25  函数运行后紧接着跟一个()，表示把前面函数运行后的返回值再运行下
f(6);//36



/*
var i = 0;
var a = i++;//先运算（赋值）后累加
console.log(a,i);//0 1

var b = ++i;//先累加后运算(赋值)
console.log(b,i);//1 1
*/
