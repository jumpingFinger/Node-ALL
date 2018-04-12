//不立即销毁
/*function fn(){
    var i = 0;
    return function(){
        i++;
        console.log(i)
    }
}
fn()();*/

//不销毁
function fn(){
    var i = 0;
    return function(){
        i++;
        console.log(i)
    }
}
var f = fn();
f();