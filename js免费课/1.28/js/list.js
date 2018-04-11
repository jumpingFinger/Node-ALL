/*   id :""
 innerHTML:"01:课程介绍"
 innerText:"01:课程介绍"
 style:CSSStyleDeclaration   => 对象集合
 color:''
 fontSize:''
 backgroundColor:""
 * */

/*
 oLis[0].style.backgroundColor 获取的是一个值   操作的是值
 oLis[0].style 获取的是一个类数组集合            操作的是引用地址
 */
/*var a = 12;
 b = a; //b = a = 12
 b = 13; //b = 13
 console.log(a);  //12
 console.log(b); // 13


 var a = {name:'耿大大'}; //aaafff000
 var b = a; //b = a = aaafff000
 b.name = '周大大';  // aaafff000 -> name: '周大大'
 console.log(a); //name: '周大大'
 console.log(b); //name: '周大大'*/

/*var bg = oLis[0].style.backgroundColor;  //''
 bg = 'red'; // 'red'
 console.dir(oLis[0]); //background:''*/

/*var bg = oLis[0].style;
 bg.backgroundColor = 'red';
 console.dir(oLis[0]);   // backgroundColor:"red"*/


var oLis = document.getElementsByTagName('li');
for (var i = 0; i < oLis.length; i++) {
    var bg = oLis[i].style;
    /*if(i%2 == 0){
     bg.backgroundColor = 'red'
     }else{
     bg.backgroundColor = 'blue'
     }*/

    //i%2 == 0 ? bg.backgroundColor = 'red' :  bg.backgroundColor = 'blue';

    bg.backgroundColor = i % 2 == 0 ? 'red' : 'blue'
}

