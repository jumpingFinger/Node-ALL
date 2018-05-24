let banner = (function () {

//获取操作的元素
  let container = document.querySelector('#container'),
    wrapper = container.querySelector('.wrapper'),
    focus = container.querySelector('.focus'),
    arrowLeft = container.querySelector('.arrowLeft'),
    arrowRight = container.querySelector('.arrowRight'),
    slideList = null,
    focusList = null;




  //获取绑定数据
  let queryData = function () {

    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', 'json/banner.json', true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          let data = JSON.parse(xhr.responseText);
          resolve(data);
        }
      };
      xhr.send(null);
    })
  };
  let bindHTML = function (data) {
    let str = ``,
      strFocus = ``;

      data.forEach((item, index) => {
      let {img, desc} = item;
      str += `<div class="slide">
            <img src="${img}" alt="${desc}">
        </div>`;
      strFocus += `<li class="${index === 0 ? 'active' : ''}"></li>`;
    });

    wrapper.innerHTML+=str;
    focus.innerHTML+=strFocus;

    slideList=container.querySelectorAll('.slide');
    focusList=container.querySelectorAll('li');

    wrapper.appendChild(slideList[0].cloneNode(true));
    slideList=container.querySelectorAll('.slide');
      console.log(wrapper);
      //动态计算wrapper的宽度
    utils.css(wrapper,'width',slideList.length*1000);

  };

  let step=0,
    interval=3000,
    autoTimer=null;
  let autoMove=function () {
    step++;
    if (step>=slideList.length){
      utils.css(wrapper,'left',0);
      step=1;
    }
    // console.log(-step*1000);
    animate(wrapper,{
      left:-step*1000
    },200);
    console.log(1);
    console.log(wrapper.style.left);
    focusChange();
  };

  let focusChange=function () {
    let tempIndex=step;
    tempIndex===slideList.length-1?tempIndex=0:null;
    [].forEach.call(focusList,(item,index)=>{
      item.className=index===tempIndex?'active':'';
    })
  };

  let handelFocus=function () {

  };

  let handelArrow=function () {

  };

  let handelContainer=function () {

  };


  return {
    init: function () {
      let promise = queryData();
      promise.then(bindHTML).then(()=>{
        autoTimer=setInterval(autoMove,interval)
      }).then(()=>{
        handelContainer();
        handelFocus();
        handelArrow();
      })
    }
  }
})();
banner.init();