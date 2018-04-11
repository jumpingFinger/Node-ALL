//1.想要操作谁 第一步先获取谁
var oTab = document.getElementById('tab'),
    oLis = oTab.getElementsByTagName('li'),
    oDivs = oTab.getElementsByTagName('div');

//2.先清空所有的当前的样式类名(cur) 只给我们点击的哪一项加上当前的cur
    for(var i = 0; i<oLis.length;i++){
        // 给当前项添加点击事件
        oLis[i].dali = i; /* 通过自定义属性把每一轮循环的索引存起来 方便点击里面使用这个索引*/
        oLis[i].onmouseover = function () {

            //就是在清空所有li 和 div 标签名上面的class = 'cur'
            for (var i = 0; i < oLis.length; i++) {
                oLis[i].className = null;
                oDivs[i].className = null;
            }

            //alert(i);// 都是最后for循环结束的结果
            //只让当前项添加当前cur的样式类名
            this.className = 'cur';
            oDivs[this.dali].className = 'cur';
        }
    }


/* 选项卡效果实现的思路
 1.要操作谁先获取谁 -> tab li div
 2.循环遍历每一个li   -> for 循环
 3.在上面的for循环里面进行一些操作 (第三步 是套在 第二步中执行的)
 1) 清空所有cur的样式类名 ->for
 2) 让当前添加cur的样式类名
 */