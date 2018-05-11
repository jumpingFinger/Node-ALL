// let banner =(function(){
//     let container=document.querySelector('#container'),
//         wrapper=container.querySelector('.wrapper'),
//         focus=container.querySelector('.focus'),
//         arrowLeft=container.querySelector('.arrowLeft'),
//         arrowRight=container.querySelector('.arrowRight');
//     let slideList=null,
//         focusList=null,
//         interval=3000,
//         stepIndex=0,
//         speed=300,
//         autoTimer=null;
//
//     let getData=function (){
//
//         return new Promise((resolve,reject)=>{
//             let xhr=new XMLHttpRequest();
//             xhr.open('get','json/banner.json',true);
//             xhr.onreadystatechange=function (){
//                 if(xhr.readyState===4 && xhr.status===200){
//                     let data=JSON.parse(xhr.responseText);
//                     resolve(data);
//                 }
//             };
//             xhr.send(null)
//         })
//     };
//     let bindHTML=function (data){
//         let strSlide=``,
//             strFocus=``;
//         console.log(data);
//         data.forEach(({img,desc},index)=>{
//             strSlide+=`<div class="slide">
//             <img src="${img}" alt="${desc}">
//         </div>`;
//             strFocus+=`<li class="${index===0?'active':null}"></li>`;
//         });
//         wrapper.innerHTML+=strSlide;
//         focus.innerHTML+=strFocus;
//         slideList=wrapper.querySelectorAll('.slide');
//         focusList=focus.querySelectorAll('li');
//         wrapper.appendChild(slideList[0].cloneNode(true));
//         slideList=wrapper.querySelectorAll('.slide');
//         utils.css(wrapper,'width',slideList.length*1000);
//     };
//
//     let autoMove=function (){
//         stepIndex++;
//         if(stepIndex>=slideList.length){
//             utils.css(wrapper,'left',0);
//             stepIndex=1;
//         }
//         animate(wrapper,{
//             left:-stepIndex*1000
//         },speed);
//         changeFocus();
//     };
//     let changeFocus=function (){
//           let tempIndex=stepIndex;
//           if(tempIndex===slideList.length-1){
//               tempIndex=0;
//           }
//         focusList.forEach((item,index)=>{
//             item.className=index===tempIndex?'active':null;
//         })
//     };
//     let containerEvent=function (){
//         container.onmouseenter=function (){
//             clearTimeout(autoTimer);
//             arrowRight.style.display= arrowLeft.style.display='block';
//         };
//         container.onmouseleave=function (){
//             autoTimer=setInterval(autoMove,interval);
//             arrowRight.style.display= arrowLeft.style.display='none';
//         }
//     };
//     let FocusEvent=function (){
//         focusList.forEach((item,index)=>{
//             item.onclick=function (){
//                 stepIndex=index;
//                 animate(wrapper,{
//                     left:-stepIndex*1000,
//                 },speed);
//                 changeFocus();
//             }
//         });
//
//     };
//     let arrowEvent=function (){
//         arrowRight.onclick=autoMove;
//         arrowLeft.onclick=function (){
//             stepIndex--;
//             if(stepIndex<0){
//                 utils.css(wrapper,'left',-(slideList.length-1)*1000);
//                 stepIndex=slideList.length-2;
//             }
//             animate(wrapper,{
//                 left:-stepIndex*1000
//             },speed);
//             changeFocus();
//         }
//     };
//     return {
//         init :function(){
//             let promise=getData();
//             promise.then(bindHTML).then(()=>{
//                 autoTimer=setInterval(autoMove,interval)
//             }).then(()=>{
//                 containerEvent();
//                 FocusEvent();
//                 arrowEvent();
//             })
//         }
//     }
// })();
// banner.init();


let banner =(function(){
    let container=document.querySelector('#container'),
        wrapper=container.querySelector('.wrapper'),
        focus=document.querySelector('.focus'),
        arrowLeft=document.querySelector('.arrowLeft'),
        arrowRight=document.querySelector('.arrowRight'),
        focusList=null,
        slideList=null,
        interval=2000,
        speed=300,
        autoTimer=null,
        stepIndex=0,
        preIndex=0;

    let getData=function (){
        return new Promise((resolve)=>{
            let xhr=new XMLHttpRequest();
            xhr.open('get','json/banner.json',true);
            xhr.onreadystatechange=function (){
                if(xhr.readyState===4 && xhr.status===200){
                    let data=JSON.parse(xhr.responseText);
                    resolve(data);
                }
            }
            xhr.send(null);
        })
    };
    let bindHTML=function (data){
        let strSlide=``,
            strFocus=``;
        data.forEach(({img='img/banner1.jpg',desc},index)=>{
            strSlide+=` <div class="slide">
         <img src="${img}" alt="${desc}">
       </div>`;
            strFocus+=`<li class="${index===0?'active':''}">
</li>`;
        });
        wrapper.innerHTML+=strSlide;
        focus.innerHTML+=strFocus;
        slideList=wrapper.querySelectorAll('.slide');
        focusList=focus.querySelectorAll('li');
        wrapper.appendChild(slideList[0].cloneNode(true));
        slideList=wrapper.querySelectorAll('.slide');
        utils.css(wrapper,'width',slideList.length*1000);
    };
    let autoMove=function (){
        stepIndex++;
        if(stepIndex>slideList.length-1){
            utils.css(wrapper,'left',0);
            stepIndex=1;
        }
        animate(wrapper,{
            left:-stepIndex*1000
        },speed);
        changeFocus();
    };
    let changeFocus=function (){
        let tempIndex=stepIndex;
        if(tempIndex===slideList.length-1){
            tempIndex=0;
        }
        focusList.forEach((item,index)=>{
            item.className=tempIndex===index?'active':null;
        })
    };
    let containerEvent=function (){
        container.onmouseenter=function (){
            clearInterval(autoTimer);
            arrowRight.style.display=arrowLeft.style.display='block';
        };
        container.onmouseleave=function (){
          autoTimer=setInterval(autoMove,interval);
          arrowLeft.style.display=arrowRight.style.display='none';
        }
    };
    let FocusEvent=function (){
        focusList.forEach((item,index)=>{
            item.onclick=function (){
                if(preIndex===stepIndex){
                    if(preIndex===index){
                        return ;
                    }
                }
                if(stepIndex>=slideList.length-1){
                    wrapper.stu
                }
                stepIndex=index;
                animate(wrapper,{
                    left:-stepIndex*1000
                },speed);
                preIndex=stepIndex;
                changeFocus();
            }
        })
    };
    let arrowEvent=function (){
        arrowRight.onclick=autoMove;
        arrowLeft.onclick=function (){
            stepIndex--;
            if(stepIndex<0){
                utils.css(wrapper,'left',-(slideList.length-1)*1000);
                stepIndex=slideList.length-2;
            }
            animate(wrapper,{
                left:-stepIndex*1000
            },speed);
            changeFocus();
        }
    };
    return {
        init :function(){
            let promise=getData();
            promise.then(bindHTML).then(()=>{
                autoTimer=setInterval(autoMove,interval);
            }).then(()=>{
                containerEvent();
                FocusEvent();
                arrowEvent();
            })
        }
    }
})();
banner.init();



