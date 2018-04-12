var name='珠峰';
var age=300;
name=(function(name,age){
    arguments[0]='珠峰培训';//arguments[0]和第一个形参name是一一映射的关系
    age=age || "";
    console.log(name,age);//"珠峰培训" ,""
})(name);
console.log(name,age);//undefined,300