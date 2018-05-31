~function anonymous(window) {
    //=>设置支持的默认配置项
    let _default = {
        url: '',
        baseURL: '',
        method: 'GET',
        headers: {},
        dataType: 'JSON',
        data: null,//=>post 系列请求基于请求主体传递给服务器的内容
        params: null,//=>get系列请求基于问号传参传递给服务器的内容
        cache: true
    };


    //=>基于promise设计模式管理ajax请求
    let myAxios = function myAxios(options) {
        //=>options必须融合了: 默认配置信息,用于基于defaluts修改的信息,用户执行get/post方法传递的配置信息 , 越靠后的优先级越高
        let {url, baseURL, method, headers, dataType, data, params, cache} = options;

        //=>把传递的参数进一步处理
        if (/^(GET|DELETE|HEAD|OPTIONS)$/.test(method)){
            //=>get系列
            if(params){
                url+=`${myAxios.check(url)}${ myAxios.formatData(params)}`;
            }
            if(cache===false){
                url+=`${myAxios.check(url)}_=${+(new Date())}`
            }
            data=null;//=>get系列就是请求主体什么都不放的
        }else {
            //=>post系列
            if (data){
                data=myAxios.formatData(data);
            }
        }

        //=>基于promise发送ajax
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest;
            xhr.open(method, `${baseURL}${url}`);
            //=>如果headers存在,我们还需要设置请求头
            if(headers !==null && typeof headers ==='object'){
                for (let attr in headers) {
                    if (headers.hasOwnProperty(attr)) {
                        let value=headers[attr];
                        if(/[\u4e00-\u9fa5]/.test(value)){
                            //=>请求头中不能有中文,我们把他进行编码
                            //encodeURLComponent/decodeURLComponent
                            value=encodeURLComponent(value);
                        }
                        xhr.setRequestHeader(attr,headers[attr]);
                    };
                }
            }
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (/^(2|3)\d{2}$/.test(xhr.status)) {
                        let result = xhr.responseText;
                        dataType = dataType.toUpperCase();
                        result = dataType === 'JSON' ? JSON.parse(result) : (dataType === 'XML' ? xhr.responseXML : result);
                        resolve(result,xhr);
                    }
                    console.log(xhr.statusText);
                    reject(xhr.statusText, xhr);
                }
            };
            console.log(data);
            xhr.send(data);
        })

    };

    //=>get  这个处理很重要

    ['get','delete','head','options'].forEach(item=>{
        myAxios[item]=function (url,options={}){
            options={
                ..._default,//=>默认值或者基于defaults修改的值
                ...options,//=>用户调取方法传递配置项
                url:url,//=>请求的url地址 (第一个参数 :默认的配置项和传递的配置项都不会出现url,只能这样获取)
                method:item.toUpperCase()//=>以后执行肯定是myAxios.head执行,不会设置method这哥配置项,我们自己需要配置才可以
            };
            return myAxios(options)
        }
    });

    //=>post系列

    ['post','put','patch'].forEach(item=>{
        myAxios[item]=function (url,data={},options={}){
            options={
                ..._default,//=>默认值或者基于defaults修改的值
                ...options,//=>用户调取方法传递配置项
                url:url,//=>请求的url地址 (第一个参数 :默认的配置项和传递的配置项都不会出现url,只能这样获取)
                method:item.toUpperCase(),//=>以后执行肯定是myAxios.head执行,不会设置method这哥配置项,我们自己需要配置才可以
                data:data
            };
            return myAxios(options)
        }
    });
    // myAxios.get = function (url, options) {
    //
    // };
    // myAxios.post = function (url, data, options) {
    //
    // };
    //=>把默认设置暴露出去,后期用户在使用的时候可以自己设置一些基础的默认值 (发送ajax请求按照配置的信息进行处理)
    myAxios.defaults = _default;

    //=>把对象变为urlencoded格式的字符串
    myAxios.formatData=function formatData (obj){
        let str=``;
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)){
                str+=`${attr}=${obj[attr]}&`;
            }
        }
        return str.substring(0,str.length-1);
    };
    myAxios.check=function check(url){
        return url.indexOf('?')>=-1?'&':'?';
    };
    window.myAxios = myAxios;
}(window);