$(document).ready(function(){
    var array=[];
    var obj={};
    var obj2={};
    obj.act="getContent";
    obj2.id=getCookie('notice');
	console.log("ssssssssss"+obj2.id);
    array.push(obj);
    array.push(obj2);
    console.log(array);
    $.ajax({
        url:'../model/announcement/controller.php',
        type: 'POST',
        async:false,
        data:JSON.stringify(array),
        success:function(result){
                var obj=eval(result);
                if(obj[0]['status']==200){
                    var subject = document.getElementById('subject');
                    var show_time = document.getElementById('show_time');
                    var content = document.getElementById('content');
                        //subject.setAttribute("value","hidden");
                    subject.innerHTML= obj[1]['subject'];
                    show_time.innerHTML= obj[1]['start_time']+'~'+obj[1]['end_time'];
                    content.innerHTML= obj[1]['content'];
                }
        },
        error:function(err){
            console.log('error');
        }
    });
    
    $("#returnto").click(function(){
		var _clickTab = "user_listnotice.html";
		if("-1"==_clickTab.search("http://")){ //不是http://執行以下
				$.get(_clickTab,function(data){
				$("#iframe").html(data);
				});
				return false;
		}
	})
    
});