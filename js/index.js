// JavaScript Document
window.onload=function(){
	function addEvent(obj,fnC,fn){
		if(obj.addEventListener){
			return obj.addEventListener(fnC,fn,false);
		}else{
			return obj.attachEvent('on'+fnC,fn);
		}
	}
	//分类导航
	(function(){
		var oMain_c=document.getElementById('main_c');
		var oMain_nav=oMain_c.children;
		var oBox=oMain_nav[oMain_nav.length-1];
		var iNow=0;
		for(var i=0; i<oMain_nav.length-1; i++){
			oMain_nav[i].index=i;
			
			oMain_nav[i].onmouseover=function(){
				//oBox.style.left=this.offsetLeft+'px';	
				startMove(oBox,-(304-this.offsetTop));
				
			};
			
			oMain_nav[i].onmouseout=function(){
				startMove(oBox,-(304-iNow*oMain_nav[0].offsetHeight));	
			};
			addEvent(oMain_nav[i],'click',function(){iNow=this.index;});
			
		}
		var top=0;
		var iSpeed=0;
		var timer=null;
		function startMove(obj,iTarget){
			clearInterval(timer);
			timer=setInterval(function(){
				iSpeed+=(iTarget-top)/5;	
				iSpeed*=0.7;
				top+=iSpeed;
				obj.style.top=Math.round(top)+'px';
				if(Math.round(iSpeed)==0 && Math.round(top)==iTarget){
					clearInterval(timer);
				}
			},30);	
		}
	})();
	

	var oBar_html=document.getElementById('bar_html');
	var ojs_con_btn2=document.getElementById('js_con_btn2');
	var oBar_css=document.getElementById('bar_css');
	var oBar_js=document.getElementById('bar_javascript');
	var oBar_jq=document.getElementById('bar_jquery');
	var oBar_css3=document.getElementById('bar_css3');
	var oBar_html5=document.getElementById('bar_html5');
	//分类导航
	var oMain_c=document.getElementById('main_c');
	var oMain_btn=oMain_c.getElementsByTagName('div');
	var oHome=document.getElementById('home');
	var oHome_page=getClass(oHome,'page');
	var oHome_main=document.getElementById('home_main');
	for(var i=0;i<oMain_btn.length;i++)
	{
		oMain_btn[i].index=i;
		addEvent(oMain_btn[i],'click',function(){
			var a=this.index;
			var oHome_page_H=oHome_page[a].offsetHeight;
			if(a==3)
			{
				oHome_page_H=oHome_page[0].offsetHeight
			}
			move(oHome_main,{top:-a*oHome_page_H});
		});
		
		
	}
	//自定义滚动条
	var oSBox=document.getElementById('box');
	var oItem=document.getElementById('item');
	var oSSpan=document.getElementById('span1');
	var top=0;
	var oCont=document.getElementById('content');
	var nBoxH=parseInt(getStyle(oSBox, 'height'));//框的高度
	var nContH=oCont.offsetHeight;//内容高度
	var nMaxContTop=nContH-nBoxH;//最大的高度
	addWheel(oSBox, function (down){
		if (down){top-=5;}
		else{top+=5;}
		if (top > 0){top=0;}
		else if (top < -nMaxContTop)
			{top=-nMaxContTop;}
		oCont.style.top=top+'px';
		var nSpanTop=top/nMaxContTop*nMaxTop;
		oSSpan.style.top= -nSpanTop+'px';
	});
	function addWheel(obj, fn)
	{
		if (window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1)
		{
			obj.addEventListener('DOMMouseScroll', function (ev){
				var down=ev.detail>0 ? true : false;
				fn(down);
				ev.preventDefault();
			}, false);
		}
		else
		{
			obj.onmousewheel=function (){
			var down=event.wheelDelta>0 ? false : true;
			fn(down);
			return false;
			};
		}
	}
	function getStyle(obj, sName)
	{
		return (obj.currentStyle || getComputedStyle(obj, false))[sName];
	}	
	// 算高度
	var nSpanH=oItem.offsetHeight/(nContH/nBoxH);
	// if (nSpanH < 50) nSpanH=50;
	(nSpanH<20) && (nSpanH=20);
	oSSpan.style.height=nSpanH+'px';
	
	var nMaxTop=oItem.offsetHeight-oSSpan.offsetHeight+50;
	// 拖拽
	oSSpan.onmousedown=function (ev){
		var oEvent=ev || event;
		var disY=oEvent.clientY-oSSpan.offsetTop;
		document.onmousemove=function (ev){
			var oEvent=ev || event;
			top=oEvent.clientY-disY;
			setTop();
		};
		document.onmouseup=function (){
			document.onmousemove=null;
			document.onmouseup=null;
			oSSpan.releaseCapture && oSSpan.releaseCapture(); 
		};
		oSSpan.setCapture && oSSpan.setCapture();
		return false;
	};
	function setTop()
	{
		if (top < 0)
		{
			top=0;
		}
		else if (top > nMaxTop)
		{
			top=nMaxTop;
		}
		oSSpan.style.top=top+'px';
		// 算比例
		var nContTop=top/nMaxTop*nMaxContTop;
		oCont.style.top=-nContTop+'px';
	}
	function getStyle(obj, sName)
	{
		return (obj.currentStyle || getComputedStyle(obj, false))[sName];
	}
	//tab
	var oFold=document.getElementById('fold');
	var oBtn=oFold.getElementsByTagName('li');
	var oCon=oFold.getElementsByTagName('ul');
	for(var i=0;i<oBtn.length;i++)
	{
		oBtn[i].onclick=function(){
			for(var i=0;i<oBtn.length;i++)
			{
				move(oCon[i],{height:0});
			}
			move(this.children[1],{height:80});
		};
	}			
	
	/*(function(){
		var oC=document.getElementById('circle');
		var oDiv=document.getElementById('c_div1');
		var oC_close=document.getElementById('c_close');

		var R=oDiv.offsetWidth/2;
		var a=0; // 角度
		var total=5;
		
		var aSpan=[];
		for (var i=0; i<total; i++)
		{
			var oSpan=document.createElement('span');
			oDiv.appendChild(oSpan);
			aSpan.push(oSpan);
		}
		
		var n=0;
		oC.onclick=function (){
			n++;
			if (n%2 == 1)
			{
				for (var i=0; i<total; i++)
				{
					var target=360*i/total;
					
					move2(aSpan[i], target);
					console.log(aSpan[i].style.left)
				}
			}
			else
			{
				for (var i=0; i<total; i++)
				{
					move2(aSpan[i], 0);
				}
			}
		};
		
		function move2(obj, target)
		{
			var start=obj.a || 0;
			var dis=target-start;
			var count=Math.floor(1000/30);
			var n=0;
			clearInterval(obj.timer);
			obj.timer=setInterval(function (){
				n++;
				var a=start+dis*n/count;
				var x=R+Math.sin(a2d(a))*R;
				var y=R-Math.cos(a2d(a))*R;
				obj.style.left=x+'px';
				obj.style.top=y+'px';
				if (n == count)
				{
					clearInterval(obj.timer);
					obj.a=a;
				}
			}, 30);
		}
		function a2d(a)
		{
			return a*Math.PI/180;
		}
	})();*/
	//拉钩
	(function(){
		var oUl1=document.getElementById('js_con_con1');
		var aDiv=oUl1.getElementsByClassName('js_tab_li1');
	for (var i=0; i<aDiv.length; i++)
	{
		enter(aDiv[i]);
		leave(aDiv[i]);
	}
	function enter(obj){
		var olgSpan=obj.getElementsByClassName('lg')[0];
		obj.onmouseenter=function (ev){
			var oEvent=ev || event;
			var n=getN(obj, oEvent);
			console.log(n);
			switch (n)
			{
				case 0:
					olgSpan.style.left='400px';
					olgSpan.style.top=0;
					break;
					
				case 1:
					olgSpan.style.left=0;
					olgSpan.style.top='240px';
					break;
				
				case 2:
					olgSpan.style.left='-400px';
					olgSpan.style.top='0';
					break;
					
				case 3:
					olgSpan.style.left='0';
					olgSpan.style.top='-240px';
					break;
			}
			
			move(olgSpan, {top:0, left:0});
		};
	};
	
	function leave(obj){
		var olgSpan=obj.getElementsByClassName('lg')[0];
		
		obj.onmouseleave=function (ev){
			var oEvent=ev || event;
			var n=getN(obj, oEvent);
			switch (n)
			{
				case 0:
					var left=400;
					var top=0;
					break;
					
				case 1:
					var left=0;
					var top=240;
					break;
				
				case 2:
					var left=-400;
					var top=0;
					break;
					
				case 3:
					var left=0;
					var top=-240;
					break;
			}
			
			move(olgSpan, {top:top, left:left});
		};
	};
	function getN(obj, ev)
	{
		var x=obj.offsetLeft+obj.offsetWidth/2-ev.clientX;
		var y=obj.offsetTop+obj.offsetHeight/2-ev.clientY;
		console.log('x'+x+';'+'y'+y+';')
		return Math.round((d2a(Math.atan2(y, x))+180)/90)%4;
	}
	function d2a(d)
	{
		return d*180/Math.PI;
	}
	})();
	
	//js点击每一个li 弹出框 div
	var ojs_effect=document.getElementById('js_con_con1');
	var ojs_li=ojs_effect.getElementsByClassName('lg');
	var oChild=ojs_effect.getElementsByClassName('children');
	for(var i=0;i<ojs_li.length;i++)
	{
		ojs_li[i].index=i;
		ojs_li[i].onclick=function(){
			oChild[this.index].style.display='block';
			ojs_bg.style.display='block';
		};
	}
	
	//网址
	var oWork=document.getElementById('work');
	var oWeb=getClass(oWork,'web');
	for(var i=0;i<oWeb.length;i++)
	{
		oWeb[i].onmouseover=function(){
			this.style.background='rgba('+ran(0,256)+','+ran(0,256)+','+ran(0,256)+',1)';
		};
		oWeb[i].onmouseout=function(){
			this.style.background='rgba('+ran(0,256)+','+ran(0,256)+','+ran(0,256)+',1)';
		};
	}
	function ran(n,m){
		return Math.ceil(Math.random()*(m-n)+n);
	};
	//官网
	var oWork_Btn=document.getElementById('work_btn');
	var oWork_ul=document.getElementById('work_ul');
	var awork_Li=oWork_ul.getElementsByTagName('li');
	//布局转换
	var awPos=[];
	for (var i=0; i<awork_Li.length; i++)
	{
		var left=awork_Li[i].offsetLeft;
		var top=awork_Li[i].offsetTop;
		
		awork_Li[i].style.left=left+'px';
		awork_Li[i].style.top=top+'px';
		
		awPos.push({left:left, top:top});
	}
	
	for (var i=0; i<awork_Li.length; i++)
	{
		awork_Li[i].style.position='absolute';
		awork_Li[i].style.margin=0;
	}
	
	
	//进度条
	var ojs_con_con2=document.getElementById('js_con_con2');
	var oBar_html=document.getElementById('bar_html');
	var ojs_con_btn2=document.getElementById('js_con_btn2');
	var oBar_css=document.getElementById('bar_css');
	var oBar_js=document.getElementById('bar_javascript');
	var oBar_jq=document.getElementById('bar_jquery');
	var oBar_css3=document.getElementById('bar_css3');
	var oBar_html5=document.getElementById('bar_html5');
	var oHome=document.getElementById('home');
	var opass_js=document.getElementById('pass_js');
	move(oBar_html,{width:500},{easing:Tween.Elastic.easeInOut,duration:4000});
	move(oBar_css,{width:500},{easing:Tween.Elastic.easeInOut,duration:4000});
	move(oBar_js,{width:450},{easing:Tween.Elastic.easeInOut,duration:4000});
	move(oBar_jq,{width:450},{easing:Tween.Elastic.easeInOut,duration:4000});
	move(oBar_css3,{width:400},{easing:Tween.Elastic.easeInOut,duration:4000});
	move(oBar_html5,{width:400},{easing:Tween.Elastic.easeInOut,duration:4000});
	
	
	/*css3*/
	var oHome3_con=document.getElementById('home3_con');
	var oHome3_con_li=getClass(oHome3_con,'home3_con_children');
	var oHome3_con_div=getClass(oHome3_con,'home3_active');//整个div
	var oH5_bg=document.getElementById('h5_bg');
	for(var i=0;i<oHome3_con_div.length;i++)
	{
		oHome3_con_li[i].index=i;
		oHome3_con_li[i].onclick=function(){
			for(var i=0;i<oHome3_con_div.length;i++)
			{
				oHome3_con_div[i].style.display='none';
			}
			oHome3_con_li[this.index].children[1].style.display='block';
			oH5_bg.style.display='block';
		};
	}
};
	
