~function anonymous(window) {
    function AJAX(options){
        return new AJAX.prototype.init(options);
    }

    AJAX.prototype={
        constructor:AJAX,
        init:function (options){
            //=>init param
            let {
                data,
                url,
                method="get",
                dataType='JSON',
                async=true,
                cache=true,
                success,
                error
            }=options;
            //=>mount:把配置项挂载到实例上
            ['url','method','dataType','async','cache','success','error','data'].forEach((item)=>{
                this[item]=eval(item);
            });

            //=>send:发送ajax请求
            this.sendAjax();
        },
        sendAjax(){
            this.handleData();
            this.handleCache();

            //=>send
            let {method,url,async,error,success,data}=this;
            let xhr=new XMLHttpRequest();
            xhr.open(method,url,async);
            xhr.onreadystatechange=()=>{

                //=>success
                if(xhr.readyState===4){
                    //error
                    if(!/^(2|3)\d{2}$/.test(xhr.status)){
                        error && error(xhr.statusText,xhr);
                        return ;
                    }
                    //=>处理datatype
                    let result=this.handleDataType(xhr);
                    success && success(result,xhr);
                }
            };
            xhr.send(data);
        },
        handleDataType(xhr){
          let dataType=this.dataType.toUpperCase(),
              result=xhr.responseText;
          switch(dataType){
              case 'TEXT':
                  break;
              case 'JSON':
                  result=JSON.parse(result);
                  break;
              case 'XML':
                  result=xhr.responseXML;
                  break;
          }
          return result;
        },
        //=>处理cache
        handleCache(){
            let {url,method,cache}=this;
            if (/^GET$/i.test(method) && cache===false){
                url+=`${this.check()}_=${+(new Date())}`;//=>
                this.url=url;
            }
        },
        //=>处理data
        handleData(){
            let {data,method}=this;
            if(!data) return;
            if(typeof data ==='object'){
                //=>如果是个object对象,我们把它转为x-www-form-urlencoded这种模式 , 方便后期传递给莫服务器
                let str=``;
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        str+=`${key}=${data[key]}&`;
                    }
                }
                data=str.substring(0,str.length-1);
            }

            //=>根据请求方式不一样,传递给服务器的方式也不同
            if (/^(GET|DELETE|HEAD|TRACE|OPTIONS)$/i.test(method)){
                this.url+=`${this.check()}${data}`;
                this.data=null;
                return;
            }
            this.data=data;//=>post系列和put
        },
        //=>检测URL里面是否存在问号
        check(){
            return this.url.indexOf('?')>-1?'&':'?';
        }
    };
    AJAX.prototype.init.prototype=AJAX.prototype;
    window.ajax=AJAX;
}(window);