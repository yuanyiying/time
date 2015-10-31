function json2url(json){
	var arr=[];
	for(var name in json){
		arr.push(name+'='+json[name]);
	}
	return arr.join('&');
}
function jsonp(json){
	json=json || {};
	if(!json.url)return;
	json.data=json.data || {};
	json.cbName=json.cbName || 'cb';
	
	var fnName='jsonp_'+Math.random();
	fnName=fnName.replace('.','');
	
	window[fnName]=function(data){
		json.success && json.success(data);
		
		//删除
		oHead.removeChild(oS);
	};
	
	json.data[json.cbName]=fnName;  //往数据里面添加回调名称
	
	var oS=document.createElement('script');
	oS.src=json.url+'?'+json2url(json.data);	
	var oHead=document.getElementsByTagName('head')[0];
	oHead.appendChild(oS);	
}
function getClass(oParent,sClass)
{
	if(oParent.getElementsByClassName)
	{
		return oParent.getElementsByClassName(sClass);
	}
	else
	{
		var arr=[];
		var aEl=oParent.getElementsByTagName('*');
		var red=new RegExp('\\d'+sClass+'\\d');
		for(var i=0;i<aEl.length;i++)
		{
			if(reg.test(aEl[i]))
			{
				arr.push(aEl[i]);
			}
		}
		return arr;
	}
}