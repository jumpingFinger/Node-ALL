var utils = (function () {
    /**
     *
     * @param arg  类数组
     * @returns {Array} 转换后的数组
     */
    function listToArray(arg) {
        var ary = [];
        try {
            ary = [].slice.call(arg, 0);
        } catch (e) {
            for (var i = 0; i < arg.length; i++) {
                ary[i] = arg[i];
            }
        }
        return ary;
    }

    function toJSON(str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    }

    return {
        listToArray : listToArray,
        toJSON:toJSON
    }
})()
