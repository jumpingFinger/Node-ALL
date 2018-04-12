/*
function fn(){
    var i = 0;
    return function(){//内部的函数，这个函数也是一个闭包
        i++;
        console.log(i);
    }
}
fn()();
*/

var num = 10;
var obj = {
    num:20,
    fn:(function(n){
        //上级作用域->window
        return function(){
            console.log(n);
        }
    })(num)
}
obj.fn();

var utils = (function(){

    return { //把所有需要的内容封装一个对象里暴露给外界
        add:function(){},
        get:function(){}
    }
})()


