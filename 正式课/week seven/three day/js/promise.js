let promise1=new Promise((resolve,reject)=>{
    $.ajax({
        url:'JSON/date1.json',
        success(result){
            resolve(result);
        },
        error(msg){
            reject('no');
        }
    })
});
promise1.then(
    result=>{
        console.log('then1 ok',result);
        return 100
    }
).catch(msg=>{
    //=>第一个catch
    //1.异步请求失败会执行它
    //2.第一个then方法失败也会执行它
    console.log('catch1', msg);
}).then(
    (result)=>{
        console.log('then2 ok',result);
    }
).catch(msg=>{
    console.log('catch2', msg);
}).finally(

);


//=>js中的异常捕获 (把抛出异常的错误捕获到,不让其阻止浏览器的执行)
try{
    //=>正常执行的代码
}catch(e){
    //=>try中的代码报错会走它
}finally{
   //=>不管try中的代码中成功或者失败都会执行
}


// promise1.then(
//     result=>{
//         console.log('then1 ok',result);
//         return 100
//
//     },
//     msg=>{
//         console.log('then1 no',msg);
//         return 200
//     }
// ).then(
//     (result)=>{
//         console.log('then2 ok',result);
//     },(msg)=>{
//         console.log('then2 no',msg);
//     }
// );

//=>建立不要使用then中的第二个参数 (这样看起来很乱) , 而是建议我们使用Promise.prototype.catch来管理失败的情况





// console.log(promise1.then(
//     result => {
//         console.log('then1 ok', result);
//         return 100
//     },
//     msg => {
//         console.log('then1 no', msg);
//         return 200
//     }
// )===promise1);//=>false


// promise1.then(
//     result=>{
//         console.log('then1 ok',result);
//         1();
//         return 100
//     },
//     msg=>{
//         console.log('then1 no',msg);
//         return 200
//     }
// ).then(
//     (result)=>{
//         console.log('then2 ok',result);
//     },(msg)=>{
//         console.log('then2 no',msg);
//     }
// );//=>输出的是then2 no TypeError: 1 is not a function