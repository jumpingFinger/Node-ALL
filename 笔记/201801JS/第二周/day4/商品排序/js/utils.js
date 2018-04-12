 var utils = (function(){
     /**
      * 类数组转换成数组
      * @param arg 类数组
      */
     function listToAry(arg){
         var ary = [];
         try{
             ary = [].slice.call(arg,0);
         }catch(e){
             for(var i = 0;i<arg.length;i++){
                 ary[i] = arg[i]
             }
         }
         return ary;
     }

     /**
      * json格式的字符串转换成JSON格式的对象
      * @param str
      */
     function toJSON(str){
        return  "JSON" in window?JSON.parse(str):eval("("+str+")");
     }
     return {
        listToAry : listToAry,
        toJSON :toJSON
     }
 })();