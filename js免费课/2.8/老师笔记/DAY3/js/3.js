function fn() {
    var i = 0;
    return function () {
        console.log(++i);
    }
}

var f = fn();
f();
f();