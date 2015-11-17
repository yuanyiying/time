ajax{
	url:url;
	type:'type'
	data:'data'
	success:
	error:
}
function ajax(obj,json,options){
	json=json||{};
	if(!(url in json))return;
	var url=json.url;
	var data=json.data||{};
	var type=json.type||'get';
	 if(window.XMLHttpRequest){
	 	var oAjax=new XMLHttpRequest();
	 }else{
	 	var oAjax=new ActiveObject('Microsoft.XMLHTTP');
	 }
	 switch(type.toLowerCase()){
	 	case 'get':
	 	oAjax.open('GET',url+'?'+json2url(data),true);
	 	break;
	 	
	 	case 'post':
	 	oAjax.open('POST',url.false);
	 	oAjax.setRquestHeader('Content-type')
	 }
}
