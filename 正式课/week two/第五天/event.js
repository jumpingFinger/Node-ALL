(function (){
	//=> on : 给当前元素的某个事件绑定某个方法 
var on =function (curEle,type,fn) {
	if(document.addEventListener){
		curEle.addEventListener(type,fn,false);
		return ;
	}
	//=>创建自定义事件池, : 没有才去创建(创建到当前元素的自定义属性上,以后在其他的方法中需要这个事件池,直接获取使用即可)
    //=>每一个事件应该有一个自己独有的自定义事件池 , 防止事件之间的冲突
    if(typeof curEle[type +'Pond']==='undefined'){
    	curEle[type +'Pond']=[];
    	//=>只要执行on就说明当前元素的这个事件行为将要被触发 , 我们绑定方法,此时我们应该把run先放在内置的事件池中 (当行为触发的时候, 先执行run,在run中在把我们自定义事件池中的方法执行)
    	curEle.attachEvent('on'+type,function(){
    		run.call(curEle,e);//=>保证元素执行的时候,run里面的this已经是curEle了
    	});//=>把run只能向内置的事件池放一次 (所以代码字写在这里)
    }	
    var ary=curEle[type +'Pond'];
    //=>去重操作 : 增加之前首先看一下当前自定义事件池是否有这个方法 ,有这个方法 , 我们就不增加了
    for (var i =0; i <ary.length; i++) {
    	if(ary[i]===fn){
    		return;
    	}
    }


    //=>向自定义的事件池中增加方法
    ary.push(fn);



	curEle.attachEvent('on'+type,fn);
}
//=>off: 移除当前元素某个事件绑定的某个方法
var off=function (curEle,type,fn){
	if(document.removeEventListener){
		curEle.removeEventListener(type,fn,false);
		return ;
	}
	//=>从自定义事件池中把某个方法移除
	var ary=curEle[type +'Pond'];
	if(ary){
		for (var i = 0; i < ary.length; i++) {
			if(ary[i]===fn){
				//=>这一项就是想移除的
				ary.splice(1,1); //!!!!这里是有问题,问题是啥自己测试.
				break;
			}
		}
	}
//	curEle.detachEvent('on' + type ,fn) ;
}

// run: 把自定义事件池中存放的方法依次执行 ,并且处理this等问题 
var run =function (e) {
	//=>通过上面的处理 this : curEle 
	var ary=curEle[e.type+'Pond'];
	if(ary){
		for (var i = 0; i < var item=ary.length; i++) {
			var item=ary[i];
			item.call(this,e);//=>把item里面的this变成curEle
		};

	}

}
})();

(function () {
	//=>ON :向事件池中追加方法
	function on(curEle,type,fn) {
		//=>1. 把fn放到当前这个元素curEle的假的事件池中type中
		//自己的自定义属性作为假的事件池
		if(typeof curEle['Pond'+type]){//=>什么时候才创建 , 没有才创建
		curEle['Pond' +type] = []; 
		//=>把run让让到内置的事件池中
		//=>区分IE和谷歌两个内置事件池
		curEle.addEventListener(type,run,false);//=>这么写不对,应该是IE6-8中才需要这样处理,所有使用attachEvent绑定才可以,这样是指让当前机制在谷歌下跑起来
		//=>1.此时run方法中的this :curEle
		//=>2.run中传递了事件对象(E),和window.event相同
		}
		var pondAry=curEle['Pond'+type];
		//=>每次增加之前做个去重的处理
		for (var i = 0; i < pondAry.length; i++) {
			if(pondAry[i]===fn){ //=>fn在自己的池子中已经存在了
 				return;
			}
		}
		pondAry.push(fn);
	}

	//=>off:移除事件池中的某个方法 
	function off(curEle,type,fn) {
		var pondAry=curEle['Pond'+type];
		if(!pondAry) return ; //=>没有执行on就执行了off,所以就不用管了
		for (var i = 0; i < pondAry.length; i++) {
			if(pondAry[i]===fn){
			//	pondAry.splice(i,1);//=>数组塌陷问题 , 我们删除的时候不能让原始数组中的索引改变
				pondAry[i]=null;
				break;
			}
		}
	}

	//=>run :把自己造的假事件池中的方法依次执行
	function run(e) {
		//=>this :curEle
		//=>e :window.event
		//=>把事件对象e的兼容处理好 : 把绑定方法执行的时候,我们处理好的e传递给方法.以后在绑定的方法中直接用即可,不用考虑兼容问题了,类似有JQ中的事件绑定中的e)
		//如何把run放在内置事件池里,我给当前某个元素绑方法,那么说明在on方法中让run方法,如果有不创建.如果没有创建一个内置的事件池中
		if(typeof e.target==='undefined'){
			e.target=e.srcElement;
			e.which=e.keyCode;
			e.pageX=e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft);//=>当前文档的模式不一样,做不同的操作
			e.pageY=e.clientY+(document.documentElement.scrollTop||document.body.scrollTop)
			//=>阻止事件的冒泡传播
			e.preventDefault=function () {
				e.returnValue=fasle;
			};
			e.stopPropagation=function () {
				e.cancelBubble=true;
			};
		}

	//	var pondAry=curEle['Pond'+type];
	//=>通过this优化
		var pondAry=this['Pond'+e.type];
		if(!pondAry) return ;
		for (var i = 0; i < pondAry.length; i++) {
			var item=pondAry[i];

			if(itemFn===null){
				//=>当前这一项在执行的过程中被off方法移除掉了(null不能执行,执行会报错)
				pondAry.splice(i,1);
				i--;	
 				continue;
 			//=>在这里推出两种数组塌陷的情况
 			//1. 就是当前这个循环 , 我要删除某一项,如果i++的话就跳过一项,这种数组塌陷i--一下
 			//2. 我循环一个数组 , 当循环到一半的时候, 我在另外一个地方把数组改了,也会导致数组塌陷,我不能直接删除数组里面的东西,我只能让想删掉的某一项为null,当下次循环的手,我把这些为null的干掉就可以了
			}


	//		itemFn();//=>为啥让Fn这么执行呢??看不懂,看不懂!!!! 
			//=>当前的itemFn();里面的this :window e :undefined
			itemFn.call(this,e);//=>当itemFn执行的时候,我们让里面的this是我上级作用域里的this,再把上级作用域的e传给itemFn里面
		}
	}
})();

(function () {
	Function.prototype.myBind=function myBind(context){
		context=context || window;
		var _this=this,
			outerArg=Array.prototype.splice.call(arguments,1);
		if('bind' in Function.prototype){
			outerArg.unshift(context);
			return _this.bind.apply(_this,outerArg);
		}
		return function (){
			var innerArg=Array.prototype.slice.call(arguments);
			outerArg=outerArg.concat(innerArg);
			_this.apply(context,outerArg);
		};
	};
	function on(curEle,type,fn) {
		if (document.addEventListener){
			curEle.addEventListener(type,fn,false);
			return;
		}
		if(typeof curEle['Pond'+type]){
			curEle['Pond' +type] = []; 
			curELe.attachEvent('on'+type,run.bind(curEle));
		}
		var pondAry=curEle['Pond'+type];
		for (var i = 0; i < pondAry.length; i++) {
			if(pondAry[i]===fn){ 
				return;
			}
		}
		pondAry.push(fn);
	}
	function off(curEle,type,fn) {
		if (document.removeEventListener){
			curEle.removeEventListener(type,fn,false);
			return;
		}
		var pondAry=curEle['Pond'+type];
		if(!pondAry) return ; 
		for (var i = 0; i < pondAry.length; i++) {
			if(pondAry[i]===fn){
				pondAry[i]=null;
				break;
			}
		}
	}
	function run(e) {
		if(typeof e.target==='undefined'){
			e.target=e.srcElement;
			e.which=e.keyCode;
			e.pageX=e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft);//=>当前文档的模式不一样,做不同的操作
			e.pageY=e.clientY+(document.documentElement.scrollTop||document.body.scrollTop)
			e.preventDefault=function () {
				e.returnValue=fasle;
			};
			e.stopPropagation=function () {
				e.cancelBubble=true;
			};
		}
		var pondAry=this['Pond'+e.type];
		if(!pondAry) return ;
		for (var i = 0; i < pondAry.length; i++) {
			var item=pondAry[i];
			if(itemFn===null){
				pondAry.splice(i,1);
				i--;	
 				continue;
			}
			itemFn.call(this,e);
		}
	}
})();

~function (){
	Function.prototype.myBind=function myBind(context=window,..outer){
		if (Function.prototype.bind) {
			return this.bind(...arguments);
		}	
		return (...inner)=>this.apply(context,outer.concat(inner));
	};
	let on=function (curEle,type,fn) {
		if(document.addEventListener){
			curEle.addEventListener(type,fn,false);
			return;
		}
		if (typeof curEle['Pond'+type]==='undefined') {
			curEle['Pond'+type]=[];
			// curEle.attachEvent('on'+type,function(){
			// 	run.call(curEle,e);
			// });
			curEle.attachEvent('on'+type,run.myBind(curEle));
		}
		let pondAry=curEle['Pond'+type];
		for (let i = 0; i < pondAry.length; i++) {
			if (pondAry[i]===fn) {
				return;
			}
		}
		pondAry.push(fn);
	};
	let off=function (curEle,type,fn) {
		if (document.removeEventListener) {
				curEle.removeEventListener(type,fn,false);
				return;
		}
		let pondAry=curEle['Pond'+type];
		if (!pondAry) return;
		for (let i = 0; i < pondAry.length; i++) {
			let itemFn=pondAry[i];
			if(itemFn===fn){
				pondAry[i]=null; //=>不能写itemFn=null;
				break;
			}
		}
	};
	let run=function (e){
		e=e||window.event;
		if(e.target){
			e.target=e.srcElement;
			e.pageX=e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft);
			e.pageY=e.clientY+(document.documentElement.scrollTop||documentElement.body.scrollTop);
			e.preventDefault=function(){
				e.returnValue=false;
			};
			e.stopPropagation=function (){
				e.cancelBubble=true;
			}
		}
		let pondAry=this['Pond'+e.type];
		if(!pondAry) return;
		for (var i = 0; i < pondAry.length; i++) {
			let itemFn=pondAry[i];
			if(itemFn===fn){
				pondAry.splice(i,1);
				i--; 
				continue;
			}
			itemFn.call(this.e);
		}
	};

	window.$event={
		on : on,
		off : off
	}
}();