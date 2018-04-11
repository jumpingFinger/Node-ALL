###课后任务
1、把WB升级为最新版本(2017版本)
 > IDE：开发工具
 > visual studio code 这个编辑器也可以
 > sublime text 3
 > hbuilder
 > atom
 > ...

2、回去后安装GIT
 > https://git-scm.com/
 > V：2.16.1

3、回去后安装NODE
 > https://nodejs.org/zh-cn/
 > V：8.9.4

------------

###定时器
JS中的定时器有两种：setTimeout / setInterval
> setTimeout([function],[interval])
> setInterval([function],[interval])
> 都是设置一个定时器，并且设置一个等待时间（[interval] 单位:MS），当到达时间后执行对应的函数（[function]），此处的函数是定时器把它执行的
```javascript
//=>基于函数表达式创建函数
var fn=function(){
    console.log('hello world!');
};

setTimeout(fn,1000);//=>1000MS后执行FN
setTimeout(fn(),1000);//=>设置定时器的时候，就已经把函数FN执行了，把执行的结果赋值给定时器，1000MS后定时器执行的是FN的返回结果

document.body.onclick=fn;//=>把FN赋值给BODY的点击事件，点击BODY的时候执行FN
document.body.onclick=fn();//=>事件绑定的时候就把FN执行了，点击BODY的时候后执行的是FN的返回结果
```

如何判定一个函数的返回结果？
> 只需要关注函数体中的RETURN即可，有RETURN，后面返回的是啥，函数执行的返回值就是啥，没有RETURN，返回的结果是UNDEFINED
> 函数体中只要执行了RETURN，那么RETURN后面的代码将都不在执行，类似于循环中BREAK和CONTINUE
```javascript
var fn=function(){};
fn();//=>返回结果:undeifned

var fn=function(n){
    return n;//=>return后面返回的都是值：把私有变量N的值返回（私有形参变量N的值是undefined，因为执行没有传递参数）
};
fn();//=>返回结果:undefined
fn(100);//=>返回结果:100

var fn=function(){
    return function(){

    }
};
var f = fn();
//=>f:是FN执行返回的那个小函数（准确说是返回小函数对应的空间地址）
```

综合练习：
```javacript
var fn = function () {
    console.log(1);
    return function () {
        console.log(2);
    }
};
setTimeout(fn, 1000);//=>1（1000MS中执行FN）
setTimeout(fn(), 1000);//=>1（设置定时器执行FN） 2（1000MS后执行FN返回的小函数）
```


###H5的语义化标签
> 每一个HTML标签都具备自己的语义（含义），项目开发的时候，我们应该合理的标签做合适的事情=>“标签语义化”

`传统标签`
- 块状标签
  + div
  + p
  + h1~h6
  + ul/li
  + ol/li
  + dl/dt/dd
  + ...
- 行内标签
  + span
  + a
  + i
  + em
  + strong
  + small
  + ...
- 特殊标签
  + img
  + input:text/password/radio/checkbox/file
  + form
  + select
  + label
  + textarea
  + ...

`H5中新增加一些语义化标签`
- 新增
  + section 普通区域
  + nav 导航区域
  + header 头部区域
  + main 主体区域
  + footer 尾部区域
  + article 文章区域
  + figure 配图区域
  + figcaption 配图说明
  + aside 与主体内容无关的侧边栏
  + summary
  + progress
  + datalist
  + mark
  + ...
- 修改（修改了原有标签的语义，呈现结果基本一样）
  + strong 现在不是加粗是重点朗读（效果：加粗）
  + small 现在不是变细是附属细则（效果：变小）
  + hr 现在是一条区域分割线（效果：一条线）
  + ...
- 删除（不建议使用，如果你用了，也不报错）
  + center
  + font
  + big
  + ...
- 给表单元素新增一些类别
  + input:search/email/tel/number/color/range/date/time...
  + ...







