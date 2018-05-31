let utils = (function anonymous() {

    //=>url地址解析
    let queryURLParams = function (url=window.location.href) {
      let obj={},
          reg=/ ([^?=&#])=([^?=&#])/g;
      url.replace(reg,(...arg)=>{
         let [,key,value]=arg;
         obj[key]=value;
      });
      return obj;
    };
    return {
        queryURLParams
    }
})();
