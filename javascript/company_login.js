function objectifyForm(formArray,actvalue) {//serialize data function
        var returnArray=[];
        var actObject = {};
        actObject.act=actvalue;
        var formObject = {};
        for (var i = 0; i < formArray.length; i++){
                formObject[formArray[i]['name']] = formArray[i]['value'];
        }
        returnArray.push(actObject);
        returnArray.push(formObject);
        return returnArray;
}
$(document).ready(function(){
	$("#user").submit(function(event){
		event.preventDefault();
		var form = $('#user').serializeArray();
		var data = objectifyForm(form,"login");
		// console.log(JSON.stringify(data));
		$.ajax({
	            url:'../model/user/company/controller.php',
	            type: 'POST',
	            //contentType:"application/json",
	            async:false,
	            data:JSON.stringify(data),
	            success:function(r){//有成功的傳送資料
	                    var data=JSON.parse(r);
	                    if(data[0]['status']==200)
							_clickTab = "company_basedata.php"; // 找到連結a中的href標籤值
							if("-1"==_clickTab.search("http://")){ //不是http://執行以下
									$.get(_clickTab,function(data){
									$("#iframe").html(data);
									});
									return false;
							}
	                    if(data[0]['status']==400)
	                    	alert("password failed");
	                    if(data[0]['status']==401)
	                    	alert("no exist account");
	                    if(data[0]['status']==500)
	                    	alert("server is busy.");
	            },
	            error:function(err){
	                console.log(err);
	            }
	    });
	});
});
