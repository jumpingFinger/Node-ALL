let down=function (e) {
	//=>this :oBox
	this.strX=e.clientX;
	this.strY=e.clientY;
	this.strL=this.offsetLeft;
	this.strT=this.offsetTop;
	//=>绑定方法的时候,向事件池中存放的是执行myBind返回的匿名函数 (问题:移除的时候不知道移除谁)
	this._MOVE=move.myBind(this);
	this._UP=up.myBind(this);
	$event.on(document,'mousemove',this._MOVE);
	$event.on(document,'mouseup',this._UP);

	//=>结束当前盒子正在运行的动画,开始新的拖拽
	clearInterval(this.timerDrop);
	clearInterval(this.timerDrop);
};
let move=function (e) {
	//=>this :oBox
	let curL=e.clientX-this.strX+this.strL,
		curT=e.clientY-this.strY+this.strT;
		curL=curL<0?0:(curL>maxL?maxL:curL);
		curT=curT<0?0:(curT>maxT?maxT:curT);
		this.style.left=curL+'px';
		this.style.top=curT+'px';


		//=>计算水平方向的速度
		if(!this.preFly){//=>第一次进来没有上一次的值,我把当前的值赋给上一个值
			this.preFly=this.offsetLeft;
		}else{
			this.speedFly=this.offsetLeft-this.preFly;
			this.preFly=this.offsetLeft;
		}
		

};
let up=function (e) {
	//=>this:oBox
	$event.off(document,'mousemove',this._MOVE);
	$event.off(document,'mouseup',this._UP);

	//=>松开鼠标后,让盒子飞吧
	moveFlay.call(this);
	moveDrop.call(this);

};

//=>水平方向飞
let moveFlay=function (){
	//=>this:oBox
	let speedFly=this.speedFly;

	this.tiemrFly=setInterval(()=>{
		//=>由于JS盒子模型属性获取的结果是整数 (会四舍五入),所以速度如果小于0.5,我们本次加的速度值在下一次获取的时候还会被省略掉(此时盒子应该是不动的)
		if (Math.abs(speedFly)<0.5) {
			clearInterval(this.tiemrFly);
			return;
		}

		speedFly*=0.99;//=>指数衰减的运动(速度乘以小于1的值肯定越来越小)
		console.log(speedFly);
		let curL=this.offsetLeft+speedFly;
	//	curL>maxL?speedFly*=-1:(curL<0?speedFly*=-1:null);
		if (curL>maxL || curL<0 ) {
			speedFly*=-1;//=>控制反方向运动
			curL=curL>maxL?maxL:(curL<0?0:null);//=>控制不管怎么走都不要超过边界
		}
		this.style.left=curL+'px';
	},17);
};

//=>垂直方向
let moveDrop=function (){
	//给垂直方向一个固定的速度
	let speedDrop=3,
		flagDrop=0;
	this.timerDrop=setInterval(()=>{
		if(flagDrop>=2){
			clearInterval(this.timerDrop)
			return;
		}
		speedDrop*=0.98;
		speedDrop+=3;
		let curT=this.offsetTop+speedDrop;
		if (curT>=maxT) {
			speedDrop*=-1;
			curT=maxT;
			flagDrop++;
		}else{
			flagDrop=0;
		}
		this.style.top=curT+'px';
	},17);
};

let oBox=document.getElementById('box'),
	maxL=(document.documentElement.clientWidth||document.body.clientWidth)-oBox.offsetWidth;
	maxT=(document.documentElement.clientHeight||document.body.clientHeight)-oBox.offsetHeight;
	console.log(maxT);
$event.on(oBox,'mousedown',down);

/* 事件触发
	1.浏览器都有一个自己最小的反应时间 , 当我们移动过程中 ,浏览器总会在最小的反应时间内触发mousemove事件行为
	 移动形同距离之下 
	 =>移动速度快,浏览器反应过来的次数就少 (触发事件的次数也就少)
	 =>移动速度慢,浏览器反应过来的次数就多(触发事件的次数也就多)
	2.水平方向运动的速度取决于最后即将松开手瞬间的移动速度 
*/