let loginRender = (function () {
    let fromURL = utils.queryURLParams()['fromURL'];
    fromURL = fromURL ? decodeURIComponent(fromURL) : 'index.html';

    let $userPass=$('#userPass');
    let $userName=$('#userName');
    let $submit=$('#submit');

    let submitFn=function submitFn(){
        //=>可以验证输入的格式是否符合要求,如果不和服要求,没必要发送请求 (自己回去扩展)


        //=   hex_md5对字符串进行加密
      axios.post('/login',{
          name:$userName.val().trim(),
          password:hex_md5($userPass.val().trim())
      }).then (result=>{
          let code=parseFloat(result.code);
          if(code ===0){
              //=>登录成功
              window.location.href=fromURL;
              return;
          }
          alert('请检查用户名密码,登录还失败了!')
      })
    };

    return {
        init: function init() {
            $submit.tap(submitFn)
        }
    }
})();
loginRender.init();


~function () {
     let fn=n=>{
         let random=null,
             obj={},
             ary=[];
         for (let i = 0; i < n*n; i++) {
             random=Math.round(Math.random()*29+1);
             if(!obj[random]){
                 if(ary.length===n) return ary;
                 ary[ary.length]=random;
             }
             obj[random]=true;
         }
     };
    console.log(fn(10));
}();