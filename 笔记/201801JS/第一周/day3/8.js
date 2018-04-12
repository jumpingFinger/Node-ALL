var i=3;
function fn(){
    i*=2;
    return function(n){
        console.log(n*(++i))
    }
}
var f=fn();
f(3);//21
fn()(3);//45
f(4);//64
fn()(3);//99
f = null;