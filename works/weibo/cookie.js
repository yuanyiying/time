//设置cookie
function setCookie(name,value,iDay){
	if(iDay){
		var oDate=new Date();
		oDate.setDate(oDate.getDate+iDay);
		
		document.cookie=name+'='+value+';expires='+oDate;
	}else{
		document.cookie=name+'='+value;
	}
}
//获取到cookie
function getCookie(name){
	var arr=document.cookie.split('; ');
	for(var i=0; i<arr.length; i++){
		var arr2=arr[i].split('=');
		if(arr2[0]==name)return arr2[1];
	}
	return '';
}
//删除cookie
function removeCookie(name){
	setCookie(name,'asdfadsf',-1000);
}












