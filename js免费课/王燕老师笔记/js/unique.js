~function () {
    var ary=[22,5,3,3,3,5],
        obj={};
    // for(var i = 0 ; i <ary.length;i++) {
    //     var cur=ary[i];
    //     if(obj[cur]==cur){
    //         ary.splice(i,1);
    //         i--;
    //     }else {
    //
    //     }        obj[cur]= cur ;
    // }

    /*
     * 用obj
    /*
     */
    for(var i = 0 ; i <ary.length;i++) {
        var cur=ary[i];
        if(obj[cur]){    //=>用obj[cur]==true来做判断
            ary.splice(i,1);
            i--;
        }else {
            obj[cur]= true ;
        }
    }
    // console.log(ary);
}();
~function () {
    // Array.prototype.myUnqiue=function () {
    //     var obj={};
    //     for (var i = 0; i < this.length; i++) {
    //         var cur=this[i];
    //         if(obj[cur]){
    //             this[i]=this[this.length-1];
    //             this.length--;
    //             i--;
    //             continue;
    //         }
    //         obj[cur]=true;
    //     }
    //     obj=null;
    //     return this;
    // };
}();

//任意数求和
~function () {
    var num=0;
    for (var i = 0; i < 100; i++) {
        num+=i;
    }
    // console.log(num);
}();

// function sum(num) {
//     function sum(num) {
//         if (num = 100) {
//             return num;
//         }
//         return sum(num + 1);
//     }
//     console.log(sum(1));
// }
//
// console.log(sum(1));

//1到100求和
~function () {
    var sum= function (n) {
        if(n==100) {
            return 100;
        }
        return n+sum(n+1);
    };
    // console.log(sum(1));

}();
//1-100的奇数之和
~function () {
    var sum =function (n) {
            if(n>10) return 0;
            // if(n%2==0){
            //     return sum(n+1);
            // }else {
            //     return n+sum(n+1);
            // }
            return n%2 ==0? sum(n+1):n+sum(n+1);
        }
// console.log(sum(1));
}();
//用数组的方法
~function () {
    var ary=[];
    for (var i = 0; i < 101; i++) {
        ary[i]=i;
    }
    var total= eval(ary.join('+'));
    // console.log(total);
}();


//快速排序
~function () {
  //快速排序:取出数组的中间项,将其他项和中间项进行比较,若比中间项小放入left数组中,若比中间项大则放入right数组中,left和right重复以上逻辑

    var ary=[3,65,7,12,56];
    var quickSort=function (ary) {
        if (ary.length<=1) return ary;
        var pointValue=ary.splice(Math.floor(ary.length/2),1)[0],
            left=[],
            right=[];
        for (var i = 0; i < ary.length; i++) {
            var cur=ary[i];
            if(cur<pointValue){
                left.push(cur);
            }else {
                right.push(cur);
            }
        }
        return quickSort(left).concat(pointValue,quickSort(right))
    };
    // console.log(quickSort(ary));
}();

//快速排序 练习1
~function () {
    var ary=[3,65,7,12,56];

    var quickSort =function (ary) {
        if(ary.length<=1) return ary;
        var  pointValue=ary.splice(Math.floor(ary.length/2),1)[0],
            left=[],
            right=[];
        for (var i = 0; i < ary.length; i++) {
            var  cur= ary[i];
            cur<pointValue?left.push(cur):right.push(cur);
        }
        return quickSort(left).concat(pointValue,quickSort(right))
    }
    // console.log(quickSort(ary));
}();

//快速排序 练习2
~function () {
    var ary=[3,65,7,12,56];
    var quickSort =function (ary) {
        if(ary.length<=1) return ary;
        var pointValue=ary.splice(Math.floor(ary.length/2),1)[0],
            left=[],
            right=[];
        for (var i = 0; i < ary.length; i++) {
            var cur=ary[i];
            cur<=pointValue?left.push(cur):right.push(cur);
        }
        return quickSort(left).concat(pointValue,quickSort(right));
    }
    // console.log(quickSort(ary));
}();

//快速排序 练习3
~function () {
    var ary=[3,65,7,12,56];

    Array.prototype.myQuickSort=function myQuickSort() {
        if(this.length<=1) return this;
        var pointValue=this.splice(Math.floor(this.length/2),1)[0],
            left=[],
            right=[];
        for (var i = 0; i < this.length; i++) {
            var cur=this[i];
            cur<=pointValue?left.push(cur):right.push(cur);
        }
        return left.myQuickSort().concat(pointValue,right.myQuickSort());
    };

    // console.log(ary.myQuickSort());
}();

~function () {
    var ary=[3,65,7,12,56];

   Array.prototype.myBullueSort=function myBullueSort() {
        for (var i = 0; i < this.length-1; i++) {
            for (var j = 0; j < this.length-i-1; j++) {
                if(this[j]>this[j+1]){
                    var temp=null;
                    temp=this[j];
                    this[j]=this[j+1];
                    this[j+1]=temp;
                }
                temp=null;
            }
        }
        return this;
    };
    console.log(ary.myBullueSort());
}();


~function () {
    Array.prototype.myUnqiue=function myUnqiue(){
        var obj={};
        for (var i = 0; i < this.length; i++) {
            var cur=this[i];
            if(obj[cur]){
                this[i]=this[this.length-1];
                this.length--;
                i--;
            }
            obj[cur]=true;
        }
        obj=null;
        return this;
    };
    var ary=[22,5,3,3,3,5];
    console.log(ary.myUnqiue());
}();


~function () {
    var ary=[3,65,7,12,56];
    Array.prototype.myQuickSort=function myQuickSort(){
        if(this.length<=1) return this;
        var pointValue=this.splice(Math.floor(this.length/2),1),
            left=[],
            right=[];
        this.forEach(function(value) {
            value<pointValue?left.push(value):right.push(value);
        });
        return left.myQuickSort().concat(pointValue,right.myQuickSort());
    };
    console.log(ary.myQuickSort());
}();

//=>数组去重
~function () {
    ary=[22,5,3,3,3,5];

    Array.prototype.myUnique=function myUnique(){
        var obj={};
        this.forEach(function (value,index) {
            if(obj[value]){
                this[index]=this[this.length-1];
                this.length--;
            }
            obj[value]=true;
        });
        obj=null;
        return this;
    };
    console.log(ary.myUnique());
}();


//reduce
~function () {
    var numbers = [15, 2, 1, 4];

    function getSum(total,num) {
        return total+num;
    }
    var total=numbers.reduce(getSum);
    console.log(total);
}();


//从3~67之间取随机的步重复的四个整数放入数组ary中
~function () {
    var ary=[];
    for (var i = 0; i < 4; i++) {
        // ary[i]= Math.round(Math.random()*64+3);
        var randNum= Math.round(Math.random()*64+3);
        if(ary.indexOf(randNum)==-1){  //=>若是重复则需要重新再取一次,i的不能累加,该保持不变
            ary[ary.length]=randNum;
        }else {
            i--;
        }
    }
    console.log(ary);

    /*
    次数不确定时更实用while循环

   while(条件) {

   }
     */


}();

//
~function () {
    var ary1 =[];
    while (ary1.length<4) {
        var randNum= Math.round(Math.random()*64+3);
        if(ary.indexOf(randNum)==-1){
            ary1.push(ary1.push(Math.round(Math.random()*64+3)))
        }
    }
    // console.log(ary1);
}();

~function () {
    //需求:从数组中取出四个不重复的数字, 拼接成一个字符串
    var ary =[1,5,7,5,8,13,10,5,8,6,99,34,67];
    var newAry=[];
    // for (var i = 0; i < 4; i++) {
    //     // Math.floor(Math.random()*ary.length   向下取边界也可以
    //     var index=Math.round(Math.random()*(ary.length-1));
    //     if( newAry.indexOf(ary[index])== -1){
    //         newAry[i]=ary[index];
    //     }else {
    //         i--;
    //     }
    // }
    while(newAry.length<=4){
        var index=Math.round(Math.random()*(ary.length-1));
        if(newAry.indexOf(ary[index])== -1){
            newAry[newAry.length]=ary[index];
        }
    }
    // console.log(newAry.join(""));
}();

~function () {
    function continuous(str,num){
        return new Array(num).join(str);
    }
    console.log(continuous('hello',5));
    /*
    数组里 new Array 有三种情况   第一种  new Array(5)   这里面的5是数组的长度    第二种new Array(‘5’)   是实参传递  这里里面有一个      new Array(5,19)  这是两个实参 里面有两项
     */
}();

~function () {
    function getChilds(ele,attr) {
        var ary=[];
        for(var i=0;i<ele.childNodes.length;i++){
            var item = ele.childNodes[i];
            if(item.nodeType === 1){
                if( typeof attr !=='undefined'){
                    if(item.nodeName.toLowerCase() === attr.toLowerCase()){
                        ary[ary.length] = item;
                    }
                }else{
                    ary[ary.length] = item;
                }
            }
        }
        return ary ;
    }
    var oUl=document.getElementById('oUl','li');

    getChilds(oUl)
}();

//1.获取某个元素的相邻哥哥(弟弟)元素节点 getPrevious getNext
//2.获取某个元素的所有的哥哥(弟弟)元素节点   getPressiblings   getNexts
//3.获取某个元素所有的兄弟节点   getSiblings(ele)
//4.获取某个元素的索引  getIndex


~function () {
    var oLi1=document.getElementById('oLi1');
        //getPrevious
        function getPrevious (ele) {
        var cur=ele.previousSibling;
        while(cur &&cur.nodeType !==1) {
            cur=cur.previousSibling;
        }
        return cur;
        }
        console.log(getPrevious(getPrevious(oLi1)));

    //getNext
    function getNext (ele) {
        var cur=ele.nextSibling;
        while(cur &&cur.nodeType !==1) {
            cur=cur.nextSibling;
        }
        return cur;
    }
    console.log(getNext(oLi1));

    //getPressiblings
    function getPressiblings (ele){
        var cur=getPrevious(ele),
            ary=[cur];
        while(getPrevious(cur)){
            ary.push(cur);
            cur=getPrevious(cur);
        }
        return ary;
    }
    console.log(getPressiblings(oLi1));

    //getNexts
    function getNexts (ele){
        var cur=getNext(ele),
            ary=[cur];
        while(getNext(cur)){
            ary.push(cur);
            cur=getNext(cur);
        }
        return ary;
    }
    console.log(getNexts(oLi1));

    //getSiblings
    function getSiblings (ele){
        return getPressiblings(ele).concat(getNexts(ele))
    }

    console.log(getSiblings(oLi1));

    //getIndex
    function getIndex(ele){
        var ary=getPressiblings(ele);
        return ary.length
    }
    console.log(getIndex(oLi1));
}();


//插入排序
~function () {
    //插入排序:先把数组的第一项拿出来让在新的数组中, 老数组拿出来一个排,倒着顺序和新数组里的比较 , 若比新数组的这项大,就插入在新数组的这一项的后面,若比新数组的这一项小,就继续往前找直到找到比自己小的,插入到他的后面
    // 若没有比这个小的的,就插入这个新数组的最前面
    var ary=[8,56,32,16,2,5];
   var newAry=[ary[0]];
   // var newAry=ary.splice(0,1);
    for (var i = 1; i < ary.length; i++) {
           var curOld=ary[i];
        for (var j = newAry.length-1; j>=0;) {
            var curNew=newAry[j];
            if(curOld>curNew){
                newAry.splice(j+1,0,curOld);
                break;
            }else{
                j--;
                if(j==-1){
                    newAry.unshift(curOld);
                }
            }
        }
    }
    // console.log(newAry);
}();

//插入排序新拍从左往右排序
~function () {
    // var ary=[8,56,32,16,2,5],
    //     newAry=ary.splice(0,1);
    // console.log(newAry);
    // for (var i = 0; i < ary.length; i++) {
    //  var curOld=ary[i];
    //     for (var j = 0; j < newAry.length; j++) {
    //        var curNew=newAry[j];
    //         if(curOld<curNew ){
    //             newAry.splice(j,0,curOld);
    //             break;
    //         } else{
    //             newAry.push(curOld);
    //         }
    //     }
    // }
    // console.log(newAry);

}();

//插入排序 不行
// ~function () {
//     var ary=[8,56,32,16,2,5],
//         newAry=ary.splice(0,1);
//     for (var i = 0; i < ary.length; i++) {
//         var itemOld=ary[i];
//         // console.log(itemOld);
//         for (var j = 0; j < newAry.length; j++) {
//             var itemNew=newAry[j];
//             // console.log(itemNew);
//             if(itemOld>itemNew){
//                 newAry.splice(j+1,0,itemOld);
//                      break;
//                 // console.log(newAry);
//             }else{
//                 newAry.splice(j,0,itemOld);
//             }
//
//         }
//     }
// }();
~function () {
    var ary=[8,56,32,16,2,5],
        newAry=ary.splice(0,1);
    for (var i = 0; i < ary.length; i++) {
        var itemOld = ary[i];
        for (var j = newAry.length - 1; j >= 0;) {
            var itemNew = newAry[j];
            if (itemOld > itemNew) {
                newAry.splice(j + 1, 0, itemOld);
                break;
            } else {
                j--;
                if (j == -1) {
                    newAry.unshift(itemOld);

                }
            }
        }
    }
    // console.log(newAry);
}();
~function () {
    Array.prototype.insertionSort=function insertionSort (){
        var newAry=this.splice(0,1);
        this.forEach(function (value){
           for(var j=newAry.length-1;j>=0;){
                var itemNew=newAry[j];
                if(value>itemNew){
                    newAry.splice(j+1,0,value);
                    break;
                }else{
                    j--;
                    if(j===-1){
                        newAry.unshift(value);
                    }
                }
            }
        });
        return newAry
    };
    var ary=[8,56,32,16,2,5];
    console.log(ary.insertionSort());
}();

