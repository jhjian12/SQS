var count=0;
var deletearr = [];
var shopobj;
var i;
function reload(){
	var _clickTab = "admin_memberManagement.php";
	if("-1"==_clickTab.search("http://")){ //不是http://執行以下
			$.get(_clickTab,function(data){
			$("#iframe").html(data);
			});
			return false;
	}
}
$(document).ready(function(){
    listCompany();
	$('.shop a').click(function() {
			// 找出 li 中的超連結 href(#id)
			var $this = $(this),
			_clickTab = $this.attr('href'); // 找到連結a中的href標籤值
            var shop = _clickTab.split("?")[1].split("=")[1];
            document.cookie = "shopaccount="+shop;
			if("-1"==_clickTab.search("http://")){ //不是http://執行以下
					$.get(_clickTab,function(data){
					$("#iframe").html(data);
					});
					return false;
			}
	})
    $("#newshop").submit(function(event){
        event.preventDefault();//防止網頁刷新
        if(checkemail()==1 || checkphone()==1){
            var form=$("#newshop").serializeArray();//序列化表單
            // console.log(form);
            var data = objectifyForm(form,"addShop");
            console.log(data);
            // console.log(JSON.stringify(data));
            $.ajax({
                url:'../model/user/shop/controller.php',
                data:data,
                type: 'POST',
                async:false,
                success: function(result) {
                    console.log(result);
                },
                error: function(err) {
                    console.log('shit!');
                    console.log(err);
                }
            });
        };
    });
    $("#add").click(function(event){
        event.preventDefault();//防止網頁刷新
        var emailid=document.getElementById('email');
        var check_email=emailid.value;
        var phoneid=document.getElementById('phone');
        var check_phone=phoneid.value;
        console.log(check_email);
        if (check_email.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1){
            if(check_phone.length==10){
                if(isNaN(check_phone)==true){
                    alert("電話格式錯誤，必須輸入數字");
                } else {
                    var form=$("#form").serializeArray();
                    var data = objectifyForm(form,"addCompany");
                    console.log(JSON.stringify(data));
                    $.ajax({
                        type :"POST",
                        url  :'../model/user/company/controller.php',
                        data :JSON.stringify(data),
                        async:false,
                        success : function(result) {
                            reload();
                            document.getElementById('form').reset();
                        },
                        error : function(result) {
                            alert("Server Error");
                            //console.log("error");
                        },

                    });
                }   
            } else if(check_phone.length<10){
                alert("電話格式錯誤，輸入過少數字");
            }else {
                alert("電話格式錯誤，輸入過多數字");
            }
            
        } else {
            alert("電子郵件格式錯誤");
        }
        
    });
});
function objectifyForm(formArray,actvalue) {//serialize data function
        //console.log(formArray);
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
function listCompany(){
	i=0;
	count=0;
    $.ajax({
        url:'../model/user/company/controller.php?act=listCompany',
        type: 'GET',
        async:false,
        success: function(result) {
            shopobj =eval(result);
            var obj = eval (result);
            if(obj[0]['status']==200){
                var div = document.getElementById('tbody');
                div.innerHTML="";
                for(var i=1;i<obj.length;i++){
                    var newtr=document.createElement('tr');
					newtr.setAttribute("id","tr"+i);
                    div.appendChild(newtr);

                    var newtd=document.createElement('td');
                    var newinput=document.createElement('input');
                    newinput.setAttribute("type","checkbox");
                    newinput.setAttribute("id",obj[i]['account']);
                    newinput.setAttribute("name","check");
                    deletearr.push(newinput);
                    newtr.appendChild(newtd);
                    newtd.appendChild(newinput);

                    var newtd=document.createElement('td');
                    newtd.setAttribute("class","shop");
                    var account = obj[i]['account'];
                    newtd.innerHTML="<a href='shoplist.php?account="+account+"'>"+obj[i]['cname']+"</a>";
                    newtr.appendChild(newtd);


                    var newtd=document.createElement('td');
                    newtd.setAttribute("onclick","changeinput(this)");
                    newtd.innerHTML=obj[i]['account'];
                    newtr.appendChild(newtd);


                    var newtd=document.createElement('td');
                    newtd.innerHTML=obj[i]['email'];
                    newtr.appendChild(newtd);

                    var newtd=document.createElement('td');
                    newtd.innerHTML=obj[i]['industry'];
                    newtr.appendChild(newtd);

                    var newtd=document.createElement('td');
                    newtd.innerHTML=obj[i]['phone'];
                    newtr.appendChild(newtd);

                    var newbut=document.createElement('button');
					newbut.setAttribute("type","button");
                    if(obj[i]['status']==0){
                        newbut.innerHTML = "啟用";
                        newbut.setAttribute("name",obj[i]['account']);
                        newbut.setAttribute("value","open");
                        newbut.setAttribute("onclick","changeStatus(this)");
                    } else if(obj[i]['status']==1){
                        newbut.innerHTML = "停用";
                        newbut.setAttribute("name",obj[i]['account']);
                        newbut.setAttribute("value","close");
                        newbut.setAttribute("onclick","changeStatus(this)");
                    }
                    newtr.appendChild(newbut);

                    var newtd=document.createElement('td');
                    newtd.innerHTML=obj[i]['level'];
                    newtr.appendChild(newtd);

					var newtd=document.createElement('td');
					var edit = document.createElement("button");
					edit.setAttribute("type","button");
					edit.setAttribute("id",i);
					edit.setAttribute("onclick","editmode(this)");
					newtd.appendChild(edit);
					edit.innerHTML="修改";
                    newtr.appendChild(newtd);


                }


            }
            if(obj[0]['status']==400)
                alert("Fail!");
            if(obj[0]['status']==500)
                alert("Server Error");
            // console.log(obj);
            //console.log(1);
            //console.log(obj);
            //console.log(obj)
            /*for (var i = 0; i < obj.length; i++) {
            $("#main").append(obj[i].item+" "+obj[i].dimension+" "+obj[i].level+"<br>");
            };*/
        },
        error: function(err) {
            console.log('shit!');
            console.log(err);
        }
    });
}
function editmode(e){
	//console.log(shopobj[e.id]);
	$("#tr"+e.id).html("");
	$("#tr"+e.id).append("<td></td>");
	$("#tr"+e.id).append("<td><input name='cname' value='"+shopobj[e.id].cname+"'></td>");
	$("#tr"+e.id).append("<td id='account"+i+"'>"+shopobj[e.id].account+"</td>");
	$("#tr"+e.id).append("<td><input type='email' name='email' value='"+shopobj[e.id].email+"'></td>");
	$("#tr"+e.id).append("<td><input name='industry' value='"+shopobj[e.id].industry+"'></td>");
	$("#tr"+e.id).append("<td><input type='tel' name='phone' value='"+shopobj[e.id].phone+"'></td>");
	$("#tr"+e.id).append("<td></td>");
	$("#tr"+e.id).append("<td><input name='level' value='"+shopobj[e.id].level+"'></td>");
	count++;
	i++;
}
function changeStatus(e){
    var account = e.name;
    var obj={};
    obj.act = "changeStatus";
    //console.log(obj);
    var obj2 = {};
    obj2.account = account;
    //console.log(obj2);
    var arr = [];
    arr.push(obj);
    arr.push(obj2);
    console.log(arr);

    $.ajax({
            url:'../model/user/company/controller.php',
            data:JSON.stringify(arr),
            type: 'POST',
            async:false,
            success: function(result) {
                    var obj = eval (result);
                    if(obj[0]['status']==200){
						console.log(12323);
                        reload();
                    }
                    if(obj[0]['status']==400)
                        alert("Fail!");
                    if(obj[0]['status']==500)
                        alert("server error!");
            },
            error: function(err) {
                    console.log('shit!');
                    console.log(err);
            }
    });
}
function deleteCompany(){
    var obj = {};
    obj.act="delCompany";
    var arr = [];
    arr.push(obj);
    for(var i=0; i<deletearr.length; i++){
        console.log(test[i]);
        if(deletearr[i].checked==true){
            var e = {"account":deletearr[i].id};
            arr.push(e);
        }
    }
    if(confirm("確定要刪除嗎?")){
		$.ajax({
				url:'../model/user/company/controller.php',
				data:JSON.stringify(arr),
				type: 'POST',
				async:false,
				success: function(result) {
						console.log(result);
						var obj = eval (result);
						if(obj[0]['status']==200){
							reload();
						}
						if(obj[0]['status']==400)
							alert("Fail!");
						if(obj[0]['status']==500)
							alert("server error!");
				},
				error: function(err) {
						console.log('shit!');
						console.log(err);
				}
		});
	}else{

	}
}
function edit(){
    var arr = [];
    var obj={"act":"updateCompanyByAdmin"};
    arr.push(obj);
    var oform = document.forms['companydata'];
	if(count==1){
		var name = oform.elements.cname.value;
			  var account = document.getElementById("account"+0).innerHTML;
			  var email = oform.elements.email.value;
			  var industry = oform.elements.industry.value;
			  var phone = oform.elements.phone.value;
			  var level = oform.elements.level.value;
			  var obj={};
			  obj.newcname=name;
			  obj.account=account;
			  obj.newemail=email;
			  obj.newindustry=industry;
			  obj.newphone=phone;
			  obj.newlevel=level;
			  arr.push(obj);
	}else{
		for(var i=0; i<count; i++){
			console.log(i);
			  var name = oform.elements.cname[i].value;
			  var account = document.getElementById("account"+(i)).innerHTML;
			  var email = oform.elements.email[i].value;
			  var industry = oform.elements.industry[i].value;
			  var phone = oform.elements.phone[i].value;
			  var level = oform.elements.level[i].value;
			  var obj={};
			  obj.newcname=name;
			  obj.account=account;
			  obj.newemail=email;
			  obj.newindustry=industry;
			  obj.newphone=phone;
			  obj.newlevel=level;
			  arr.push(obj);
		}
	}
    console.log(arr);
    if (obj.newemail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1){
        if(obj.newphone.length==10){
            if(isNaN(obj.newphone)==true){
                alert("電話格式錯誤，必須輸入數字");
            } else {
                $.ajax({
                    url:'../model/user/company/controller.php',
                    data:JSON.stringify(arr),
                    type: 'POST',
                    async:false,
                    success: function(result) {
                            console.log(result);
                            var obj = eval (result);
                            if(obj[0]['status']==200){
                                reload();
                            }
                            if(obj[0]['status']==400)
                                alert("Fail!");
                            if(obj[0]['status']==500)
                                alert("server error!");
                    },
                    error: function(err) {
                            console.log('shit!');
                            console.log(err);
                    }
                });
            }   
        } else if(obj.newphone.length<10){
            alert("電話格式錯誤，輸入過少數字");
        }else {
            alert("電話格式錯誤，輸入過多數字");
        }
        
    } else {
        alert("電子郵件格式錯誤");
    }
    
}
