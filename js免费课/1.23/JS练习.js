/**
 * Created by Lenovo on 2018/1/23.
 */
alert('ghahahfkdsahfjsakf')

var lian = "12313";
undefined
var lian = "12313"; cons
VM1802:1 Uncaught ReferenceError: cons is not defined
at <anonymous>:1:21
(anonymous) @ VM1802:1
var lian = "12313"; console.log(lian)
VM1837:1 12313
undefined
var obj={name:"马少帅",age:27,friends:["习大大","耿大大"]}
undefined
obj
{name: "马少帅", age: 27, friends: Array(2)}
obj.sex="男"
"男"
obj
{name: "马少帅", age: 27, friends: Array(2), sex: "男"}
obj.sex=null
null
obj
{name: "马少帅", age: 27, friends: Array(2), sex: null}
delete obj.sex
true
obj
{name: "马少帅", age: 27, friends: Array(2)}
delete.["name"]
VM1927:1 Uncaught SyntaxError: Unexpected token .
    delete obj.["name"]
VM1973:1 Uncaught SyntaxError: Unexpected token [
    obj
{name: "马少帅", age: 27, friends: Array(2)}
delete obj.name
true
obj
{age: 27, friends: Array(2)}
obj.name="马少帅"
"马少帅"
obj
{age: 27, friends: Array(2), name: "马少帅"}
delete obj["name"]
true
obj
{age: 27, friends: Array(2)}
obj[name]="马少帅"
"马少帅"
obj
{age: 27, friends: Array(2), "": "马少帅"}
delete obj.""
VM2098:1 Uncaught SyntaxError: Unexpected string
obj["name"]="马少帅"
"马少帅"
obj
{age: 27, friends: Array(2), "": "马少帅", name: "马少帅"}
delete obj[""]
true
obj
{age: 27, friends: Array(2), name: "马少帅"}
var obj ={name:"马少帅",age:8}; var age ="56";
undefined
obj[age]   obj["age"]
VM2122:1 Uncaught SyntaxError: Unexpected identifier
obj[age]; obj["age"];
8
ogj[age]
VM2125:1 Uncaught ReferenceError: ogj is not defined
at <anonymous>:1:1
(anonymous) @ VM2125:1
obj[age]
undefined
obj["age"]
8
var a=12; var b=a ; b=13;
13
console.log(a)
VM2190:1 12
undefined
var n={name:"马少帅"}; var m=n; m.name="李克冉";console.log(n.name);
VM2246:1 李克冉
undefined
console.log(n.name);
VM2248:1 李克冉
undefined