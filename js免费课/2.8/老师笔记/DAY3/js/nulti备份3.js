let str = ``;
for (let i = 1; i <= 9; i++) {
    str += `<li>`;
    for (let j = 1; j <= i; j++) {
        str += `<span>
            ${j} * ${i} = ${i * j}
        </span>`;
    }
    str += `</li>`;
}
window.multiBox.innerHTML = str;

//=>动画
let spanList = window.multiBox.querySelectorAll('span');
for (let i = 0; i < spanList.length; i++) {
    // spanList[i].style.opacity = 1; //=>这样处理是所有的SPAN一起出来 所以我们需要基于定时器，让每个SPAN等待一段时间在出来（每个SPAN等待的时间不一样，假设：第一个SPAN等到50MS，第二个等待100MS...）

    //=>每一次循环都设置一个定时器，而且定时器的等待时间是不一行的
    setTimeout(move(i), 50 * (i + 1));
    //=>设置定时器的时候就把MOVE执行了（并且把当前SPAN的索引传递给MOVE方法），到达时间执行的是MOVE的返回结果
}

function move(n) {
    //=>N:每一次循环执行MOVE，N存储的是当前SPAN对应的这个索引
    return function () {//=>当某个定时器到达时间执行的是返回的小函数：在这里我们把当前N索引对应的SPAN的透明度设置为1即可
        spanList[n].style.opacity = 1;
    }
}















