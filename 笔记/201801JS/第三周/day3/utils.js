var utils = (function(){

    function win(attr, value) {
        if (typeof value === "undefined") {
            return document.documentElement[attr] || document.body[attr];
        } else {
            if (attr === "scrollTop" || attr === "scrollLeft") {
                document.documentElement[attr] = value;
                document.body[attr] = value;
            }

        }
    }
    return {
        win:win
    }
})()