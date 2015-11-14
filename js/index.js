// JavaScript Document
window.onload=function(){
	//分类导航
	var oMain_c=document.getElementById('main_c');
	var oMain_nav=oMain_c.children;
	var oBox=oMain_nav[oMain_nav.length-1];
	
	var iNow=0;
	for(var i=0; i<oMain_nav.length-1; i++){
		oMain_nav[i].index=i;
		oMain_nav[i].onmouseover=function(){
			//oBox.style.left=this.offsetLeft+'px';	
			startMove(oBox,this.offsetTop);
		};
		oMain_nav[i].onmouseout=function(){
			startMove(oBox,iNow*oMain_nav[0].offsetHeight);	
		};
		oMain_nav[i].onclick=function(){
			iNow=this.index;	
		};
	}
	(function(global){
		var top=0;
		var iSpeed=0;
		var timer=null;
		global.startMove=function(obj,iTarget){
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
	})(window);
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
		oMain_btn[i].onclick=function(){
			var a=this.index;
			var oHome_page_H=oHome_page[a].offsetHeight;
			if(a==3)
			{
				oHome_page_H=oHome_page[0].offsetHeight
			}
			move(oHome_main,{top:-a*oHome_page_H});
		};
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
	
	var nMaxTop=oItem.offsetHeight-oSSpan.offsetHeight;
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
	//js效果
	/*var oJscon2=document.getElementById('js_con_con2');
	alert(oJscon2)
	var oLi=oJscon2.getElementsByClassName('js_tab_li2');
	var oImg=oJscon2.getElementsByTagName('img');
	var oFont=oJscon2.getElementsByTagName('p');
	for(var i=0;i<oLi.length;i++)
	{
		oLi[i].index=i;
		oLi[i].onmouseover=function(){
			
			move(this.children[0],{top:-25});
			move(this.children[1],{height:40});
		};
		oLi[i].onmouseout=function(){
			
			move(this.children[0],{top:0});
			move(this.children[1],{height:0});
		};
	}*/
	//js_tab javascript内容点击出现
	/*var js_tab_Btn=document.getElementById('js_tab_btn');
	var js_Btn=js_tab_Btn.getElementsByTagName('p');
	var js_tab_Con=document.getElementById('js_tab_con');
	var js_Con=js_tab_Con.getElementsByClassName('js_con_con');
	var ojs_bg=document.getElementById('js_bg');
	for(var i=0;i<js_Btn.length;i++)
	{
		js_Btn[i].index=i;
		js_Btn[i].onclick=function(){
			for(var i=0;i<js_Btn.length;i++)
			{
				js_Btn[i].className='';
				js_Con[i].style.display='none';
			}
			this.className='active1';
			js_Con[this.index].style.display='block';
			ojs_bg.style.display='block';
			
		};
	}*/
	/*//js分块运动
	var oBlock=document.getElementById('block');
	var block_oBox=document.getElementById('block_box');
	var block_oBtn=document.getElementById('block_btn');
	var oImg=document.getElementById('img1');
	var block_close=document.getElementById('block_close');
	var bFlag=false;
	var now=0;
	var aSpan=[];
	var row=4;
	var col=7;
	block_close.onclick=function(){
		oBlock.style.display='none';
		ojs_bg.style.display='none';
	};
			
	var W=700/col;
	var H=400/row;

	for(var r=0; r<row; r++)
	{
		for (var c=0; c<col; c++)
		{
			var oSpan=document.createElement('span');
			var left=c*W;
			var top=r*H;
			oSpan.style.left=left+'px';
			oSpan.style.top=top+'px';
			oSpan.style.width=W+'px';
			oSpan.style.height=H+'px';
			
			oSpan.style.backgroundPosition=-left+'px -'+top+'px';
			
			block_oBox.appendChild(oSpan);
			aSpan.push(oSpan);
		}
	}
	
	// 点击
	block_oBtn.onclick=function (){
		if (bFlag)
		{
			return false;
		}
		now++;
		bFlag=true;
		
		// span
		for (var i=0; i<aSpan.length; i++)
		{
			aSpan[i].style.opacity=0;
			aSpan[i].style.backgroundImage='url(image/fk/'+now%3+'.jpg)';
			// background:url(image/fk/11.jpg)
		}
		
		var n=0;
		var timer=setInterval(function (){
			(function (index){
				move(aSpan[n], {opacity:1}, {
					complete:function (){
						if (index == aSpan.length-1)
						{
							// 最后一个运动完了
							oImg.src='image/fk/'+now%3+'.jpg';
							bFlag=false;
						}
					}	
				});
			})(n);
			
			n++;
			if (n == aSpan.length)
			{
				clearInterval(timer);
			}
		}, 200);
	};*/
	//百度下拉
	/*var BD_oT=document.getElementById('t1');
	var oUl=document.getElementById('ul1');	
	var BD_oBtn=document.getElementById('BD_btn1');
	var BD_close=document.getElementById('BD_close');
	var BD=document.getElementById('BD');
	BD_close.onclick=function(){
		BD.style.display='none';
		ojs_bg.style.display='none';
	};
	var iNow=-1;
	var oldValue='';
	BD_oT.onkeyup=function(ev){
		var oEvent=ev || event;
		if(oEvent.keyCode==40 || oEvent.keyCode==38)return;
		
		//回车搜索
		if(oEvent.keyCode==13){
			window.open('https://www.baidu.com/s?wd='+BD_oT.value,'_self');
			BD_oT.value='';
		}
		jsonp({
			url:'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
			data:{wd:BD_oT.value},
			success:function(json){
				var arr=json.s;
				oUl.innerHTML='';
				if(arr.length){
					oUl.style.display='block';
				}else{
					oUl.style.display='none';
				}
				
				for(var i=0; i<arr.length; i++){
					var oLi=document.createElement('li');
					oLi.innerHTML=arr[i];
					oUl.appendChild(oLi);
					
					(function(index){
						oLi.onmouseover=function(){
							for(var i=0; i<oUl.children.length; i++){
								oUl.children[i].className='';
							
							}	
							this.className='on';
							
							iNow=index;
						};
						
						oLi.onclick=function(){
							window.open('https://www.baidu.com/s?wd='+this.innerHTML,'_self');
							BD_oT.value='';	
						};
					})(i);
				}
				
				iNow=-1;
			}	
		});
		
		oldValue=BD_oT.value;	
	};
	*/
	//键盘控制
	/*BD_oT.onkeydown=function(ev){
		var aLi=oUl.children;
		var oEvent=ev || event;
		if(oEvent.keyCode==40){
			iNow++;
			if(iNow==aLi.length)iNow=-1;
			tab();
		}	
		if(oEvent.keyCode==38){
			iNow--;
			if(iNow==-2)iNow=aLi.length-1;
			tab();
			return false;
		}
		function tab(){
			for(var i=0; i<aLi.length; i++){
				aLi[i].className='';
			}
			if(iNow==-1){
				BD_oT.value=oldValue;
			}else{
				aLi[iNow].className='on';
				BD_oT.value=aLi[iNow].innerHTML;	
			}	
		}
	};
	//点击搜索
	BD_oBtn.onclick=function(){
		window.open('https://www.baidu.com/s?wd='+BD_oT.value,'_self');
		BD_oT.value='';	
	};*/
	//导航条
	/*(function(){
		var oNav=document.getElementById('nav');
		var aLi=oNav.getElementsByTagName('li');
		alert(aLi)
		var oNav_btn=document.getElementById('nav_btn');
		oNav_btn.onclick=function(){
			oNav.style.display='none';
			ojs_bg.style.display='none';
		};
		for (var i=0; i<aLi.length; i++)
		{
			(function (){
				var oEm=aLi[i].getElementsByTagName('em')[0];	
				aLi[i].onmouseover=function (){
					move(oEm, {height:36}, {
						duration:300
					});
				};
				
				aLi[i].onmouseout=function (){
					move(oEm, {height:0}, {
						duration:300
					});
				};
			})();
		}
	})();*/
	/*//圆顺序播放出来
	(function(){
		var oC=document.getElementById('circle');
		var oDiv=document.getElementById('c_div1');
		var oC_close=document.getElementById('c_close');
		
		oC_close.onclick=function(){
			oC.style.display='none';
			ojs_bg.style.display='none';
		};
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
	/*//日历
	var oC=document.getElementById('cale');
	var oCale_close=document.getElementById('cale_close');
	var oCDiv=document.getElementById('calendar');
	var oCSpan=oCDiv.getElementsByTagName('span')[0];
	var oCUl=oCDiv.getElementsByTagName('ul')[0];
	
	oCale_close.onclick=function(){
		this.parentNode.style.display='none';
		ojs_bg.style.display='none';
	};
	var oCT=document.getElementById('cale_t1');
	oCT.onfocus=function (){
		oCDiv.style.display='block';
	};
	oCT.onclick=function (ev){
		var oEvent=ev || event;
		oEvent.cancelBubble=true;
	};
	oCDiv.style.left=oCT.offsetLeft+201+'px';
	oCDiv.style.top=oCT.offsetTop+oCT.offsetHeight+153+'px';
	// 本月
	var now=0;
	create();
	// 下个月
	var oNext=oCDiv.getElementsByClassName('next')[0];
	oNext.onclick=function (ev){
		var oEvent=ev || event;
		now++;
		create();
		oEvent.cancelBubble=true;
	};
	// 上个月
	var oPrev=oCDiv.getElementsByClassName('prev')[0];
	oPrev.onclick=function (ev){
		var oEvent=ev || event;
		now--;
		create();
		oEvent.cancelBubble=true;
	};
	
	function create()
	{
		oCUl.innerHTML='';
		
		var oDate=new Date(); // ?
		oDate.setMonth(oDate.getMonth()+now);
		
		var y=oDate.getFullYear();
		var m=oDate.getMonth();
		oCSpan.innerHTML=y+'年'+toDub(m+1)+'月';
		
		// 空格
		var oDate=new Date(); // ?
		oDate.setMonth(oDate.getMonth()+now);
		oDate.setDate(1);
		var week=oDate.getDay();
		(week==0) && (week=7);
		for (var i=0; i<week-1; i++)
		{
			var oCLi=document.createElement('li');
			
			oCUl.appendChild(oCLi);
		}
		
		// 真实日期
		var oDate=new Date(); // ?
		oDate.setMonth(oDate.getMonth()+now);
		oDate.setMonth(oDate.getMonth()+1, 1);
		oDate.setDate(0);
		var total=oDate.getDate();
		for (var i=0; i<total; i++)
		{
			var oCLi=document.createElement('li');
			oCLi.innerHTML=toDub(i+1);
			
			oCUl.appendChild(oCLi);
		}
		
		// 周末
		var aCLi=oCUl.children;
		for (var i=0; i<aCLi.length; i++)
		{
			if (i%7==5 || i%7==6)
			{
				aCLi[i].className='week';
			}
		}
		
		// 今天
		if (now == 0)
		{
			var oDate=new Date();
			var today=oDate.getDate();
			for (var i=0; i<aCLi.length; i++)
			{
				if (aCLi[i].innerHTML == today)
				{
					aCLi[i].className='today';
					aCLi[i].innerHTML='今天';
				}
				else if (aCLi[i].innerHTML < today)
				{
					aCLi[i].className='past';
				}
			}
		}
		else if (now < 0)
		{
			for (var i=0; i<aCLi.length; i++)
			{
				aCLi[i].className='past';
			}
		}
		
		// 加事件
		if (now > 0)
		{
			for (var i=0; i<aCLi.length; i++)
			{
				aCLi[i].onclick=function (){
					oCT.value=oCSpan.innerHTML+this.innerHTML+'日';
				};
			}
		}
		else if (now == 0)
		{
			var today=new Date().getDate();
			for (var i=0; i<aCLi.length; i++)
			{	
				if (aCLi[i].innerHTML == '今天')
				{
					aCLi[i].onclick=function (){
						oCT.value=oCSpan.innerHTML+toDub(today)+'日';
					};
				}
				else if (aCLi[i].innerHTML > today)
				{
					aCLi[i].onclick=function (){
						oCT.value=oCSpan.innerHTML+this.innerHTML+'日';
					};
				}
			}
		}	
	}
	// 消失
	document.onclick=function (){
		oCDiv.style.display='none';
	};
	function toDub(n)
	{
		return n<10 ? '0'+n : ''+n;
	}	*/
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
	var oContact=document.getElementById('contact');
	var oContact_a=oContact.getElementsByTagName('a');
	var oContact_div=oContact.getElementsByTagName('div');
	for(var i=0;i<oContact_a.length;i++)
	{
		oContact_a[i].index=i;
		oContact_a[i].onmouseover=function(){
			this.style.background='';
			oContact_div[this.index].style.display='block';
		};
		oContact_a[i].onmouseout=function(){
			this.style.background='#6363FC';
			oContact_div[this.index].style.display='none';
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
	//个人介绍
	var oContact=document.getElementById('contact');
	var oContact_a=oContact.getElementsByTagName('a');
	var oContact_div=oContact.getElementsByTagName('div');
	for(var i=0;i<oContact_a.length;i++)
	{
		oContact_a[i].index=i;
		oContact_a[i].onmouseover=function(){
			this.style.background='#6363FC';
			oContact_div[this.index].style.display='block';
		};
		oContact_a[i].onmouseout=function(){
			this.style.background='';
			oContact_div[this.index].style.display='none';
		};
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
	//联系方式
	var oContact=document.getElementById('contact');
	var oContact_a=oContact.getElementsByTagName('a');
	var oContact_div=oContact.getElementsByTagName('div');
	for(var i=0;i<oContact_a.length;i++)
	{
		oContact_a[i].index=i;
		oContact_a[i].onmouseover=function(){
			this.style.background='#6363FC';
			oContact_div[this.index].style.display='block';
		};
		oContact_a[i].onmouseout=function(){
			this.style.background='';
			oContact_div[this.index].style.display='none';
		};
	}
	/*图片轮播*/
	/*var obanner=document.getElementById('banner');
	var abanner_Btn=document.getElementById('banner_div').getElementsByTagName('ol')[0].children;
	var obanner_ul=document.getElementById('banner_ul');
	var abanner_Li=banner_ul.children;
	var obanner_close=document.getElementById('banner_close');
	obanner_close.onclick=function(){
		obanner.style.display='none';
		ojs_bg.style.display='none';
	};
	for (var i=0; i<abanner_Btn.length; i++)
	{
		(function (index){
			abanner_Btn[i].onmouseover=function (){
				
				for (var i=0; i<abanner_Btn.length; i++)
				{
					abanner_Btn[i].className='';
					abanner_Li[i].style.zIndex=1;
					move(abanner_Li[i], {opacity:0}, 300);
				}
				
				this.className='active';
				abanner_Li[index].style.zIndex=2;
				move(abanner_Li[index], {opacity:1}, 300);
			};
		})(i);
	}
	var oBack=document.getElementById('back');
	var oHome=document.getElementById('home');
	oBack.onclick=function(){
		move(oHome,{top:0});
	
	};
	window.onscroll=function(){
		var oScroll=document.documentElement.scrollTop||document.body.scrollTop;
		if(oScroll>=50)
		{
			oBack.style.display='block';
			oBack.onclick=function(){
				oScroll=0;
			};
		}
	};*/
	/*图片时钟*/
	/*show();
	setInterval(show,1000);
	function show()
	{
		var odate=new Date();
		var y=odate.getFullYear();
		var month=odate.getMonth();
		var d=odate.getDate();
		var h=odate.getHours();
		var m=odate.getMinutes();
		var s=odate.getSeconds();
		var str=y+tab(month+1)+tab(d)+tab(h)+tab(m)+tab(s);
		var oClock=document.getElementById('clock');
		var oimg=oClock.getElementsByTagName('img');
		for(var i=0;i<oimg.length;i++)
		{
			oimg[i].src='images/'+str.charAt(i)+'.png';
		}
	}
	function tab(n)
	{
		return n<10?'0'+n:''+n;
	}*/
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
/*	进度条
	var oC=document.querySelector('#c1');		
	var oC2=document.querySelector('#c2');
	var ohome3_Div=document.querySelector('#home3_bar1');
	var oBar_close=document.getElementById('home3_bar_close');
	var color1=oC.value;
	var color2=oC2.value;
	oBar_close.onclick=function(ev){
		var oEvent=ev||event;
		this.parentNode.style.display='none';
		oEvent.cancelBubble='true';
		oH5_bg.style.display='none';
	};
	oC.onchange=function(){
		color1=this.value;
		ohome3_Div.style.background='-webkit-repeating-linear-gradient(-30deg, '+color1+' 0,'+color1+' 10px,'+color2+' 10px,'+color2+' 20px)';	
	};
	oC2.onchange=function(){
		color2=this.value;
		ohome3_Div.style.background='-webkit-repeating-linear-gradient(-30deg, '+color1+' 0,'+color1+' 10px,'+color2+' 10px,'+color2+' 20px)';	
	};*/
	/*时钟*/
	
	
};
	
