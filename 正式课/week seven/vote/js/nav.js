/*导航插件
*   导入插件后,可以动态向页面中man-box盒子的起始位置创建一个nav-box,并且完成相关的业务处理
*   1. 进入到登录页面或者注册页面,都会记录from-url,当登录或者注册成功的时候 ,跳转回到原有的页面
*   2.验证是否已经登录,展示不同的信息
*   3.完成其余的业务,例如 :退出,点击用户进入到详情页面等
* */



//=>当页面加载完成再做什么事情
$(function anonymouse(){
   let $mainBox=$('.mainBox'),
       $navBox=null,
       $navList=null;

   //=>验证是否登录了
    axios.get('/checkLogin').then(result=>{
        //=>控制导航的显示
        let code=parseFloat(result.code);
        $mainBox.prepend(`<nav class="navBox">
        <a href="index.html">首页</a>
        ${code===0?`<a href="javascript:;">登录</a>
        <a href="javascript:;">注册</a>`:`<a href="detail.html"></a>
            <a href="javascript:;">退出</a>`}
    </nav>`);
        $navBox=$mainBox.find('.navBox');
        $navList=$navBox.find('a');
        return code;
    }).then(code=>{
        //=>如果已经登录:获取登录用户的用户信息
        if(code===0) return;
        //=>等请求回来后在绑定用户名字
        return axios.get('/getUser');
    }).then(result=>{
        //=>未登录传递的是undefined,已登录传递的是用户的信息
        if(typeof result !== "undefined"){
            //=>这种的结构赋值很常用
            let {data:{name}}=result;
            $navList.eq(1).html(name);
        }
    }).then(()=>{
        //=>基于事件委托给navBox中的a绑定点击事件
        $navBox.tap(ev=>{
            let target=ev.target,
                tarTAG=target.tagName,
                tarINN=target.innerHTML;
            if(tarTAG!=='A') return;
            if (tarINN==='登录'){
                //=>获取当前页面的url(window.location),但传动的URL一定要编码,负责特殊字符会和跳转的地址冲突!!!(必须跳转),encodeURIComponent进行编码
                window.location.href=`login.html?formURL=${encodeURIComponent(window.location.href)}`;
                return;
            }
            if (tarINN==='注册'){
                window.location.href=`register.html?formURL=${encodeURIComponent(window.location.href)}`;
                return;
            }
            if (tarINN==='退出'){
                //=>在当前页面退出还是在当前页面
                axios.get('/exitLogin');
                //=>页面刷新(自己和自己相等就是页面刷新)
                window.location.href=window.location.href;
                return ;
            }
        })
    });




});
