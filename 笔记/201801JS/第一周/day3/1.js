var num = 20;
~(function (num) {
    var name = "lily";
    var age = 10;
    num = 30;//不要直接操作全局下变量，会污染全局的变量，通过传参的方式
})(num);


~(function () {
    var name = "lucy";
    var age = 20;
})();



//jquery 整体框架
( function (global, factory) {

    "use strict";

    if (typeof module === "object" && typeof module.exports === "object") {
    }
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
    if (!noGlobal) {
        window.jQuery = window.$ = jQuery;
    }

})()



