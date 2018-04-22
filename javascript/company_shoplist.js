//回傳總公司名稱
var test2 = [];
var count=0;
function reload(){
	var _clickTab = "shoplist.php";
	if("-1"==_clickTab.search("http://")){ //不是http://執行以下
			$.get(_clickTab,function(data){
			$("#iframe").html(data);
			});
			return false;
	}
}
function objectifyForm(formArray,actvalue) {//serialize data function
        var returnArray=[];
        var actObject = {};
        actObject.act=actvalue;
        var formObject = {};
        for (var i = 0; i < formArray.length; i++){
                formObject[formArray[i]['name']] = formArray[i]['value'];
        }
        formObject.caccount = nowcompany;
        formObject.status = "1";
        returnArray.push(actObject);
        returnArray.push(formObject);
        return JSON.stringify(returnArray);
}
var nowcompany="";
function test(){
    //var str="company1";
    var obj={};
    obj.act="listShopByCompany";
    var obj2={};
    $.ajax({
          url:'../model/user/company/controller.php?act=getuser',
          type: 'GET',
          async:false,
          success:function(r){
              console.log(r);
              if(r){
                nowcompany=r;
                obj2.account=r;
              }else{
                alert("您無此權限");
                location.href="user_frontpage.html";
              }
          },
          error:function(err){
              console.log(err);
          }
    });
    // obj2.account=getCookie('shopaccount');
    var arr=[];
    arr.push(obj);
    arr.push(obj2);
    return JSON.stringify(arr);
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
    //console.log(arr);

    $.ajax({
            url:'../model/user/shop/controller.php',
            data:JSON.stringify(arr),
            type: 'POST',
            async:false,
            success: function(result) {
                    var obj = eval (result);
                    if(obj[0]['status']==200){
                        window.location.reload(" shoplist.html ");
                        //alert("Success!");
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
function checkemail(){
    var tmp = document.getElementById('email').value;
    var emailRule = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if(tmp.search(emailRule)==-1){
        alert("郵件格式錯誤!");
        return 0;
    }
    return 1;
}

function checkphone(){
    var tmp = document.getElementById('phone').value;
    if(tmp.length != 10) {
        alert("電話格式錯誤!");
        return 0;
    }
    return 1;
}
function deleteshop(){
    var obj = {};
    obj.act="delShop";
    var arr = [];
    arr.push(obj);
    for(var i=0; i<test2.length; i++){
        console.log(test[i]);
        if(test2[i].checked==true){
            var e = {"account":test2[i].id};
            arr.push(e);
        }
    }
    console.log(JSON.stringify(arr));
    $.ajax({
            url:'../model/user/shop/controller.php',
            data:JSON.stringify(arr),
            type: 'POST',
            async:false,
            success: function(result) {
                    console.log(result);
                    var obj = eval (result);
                    if(obj[0]['status']==200){
                        shoplist();
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
function changebtn(e){
	count++;
    if(e){
		var id= parseInt(e.id.substr(6));
		$("#buttontd"+id).html("");
		var thiselement = $("#shopcname"+id).text();
		$("#shopcname"+id).html("<input name='shopcname' value='"+thiselement+"'>");
		var thiselement = $("#phone"+id).text();
		$("#phone"+id).html("<input name='phone' value='"+thiselement+"'>");
		var thiselement = $("#email"+id).text();
		$("#email"+id).html("<input name='email' value='"+thiselement+"'>");
		var thiselement = $("#address"+id).text();
		$("#address"+id).html("<input name='address' value='"+thiselement+"'>");
		var thiselement = $("#account"+id).text();
		$("#account"+id).after("<input type='hidden' name='account' value='"+thiselement+"'>");
		/*var thiselement = $("#industry"+id).text();
		$("#industry"+id).html("<select name='industry' value='"+thiselement+"'><option>咖啡店</option></select>");*/
    }
}
function updateshop(e){
	var result=[{"act":"updateShop"}];
    var form=document.forms["shopdata"];//取form的name
	console.log(form.elements.account);
	if(count==1){
        	var data = {};
    		data.shopcname = form.elements.shopcname.value; 
    		data.phone = form.elements.phone.value; 
    		data.email = form.elements.email.value; 
    		data.address = form.elements.address.value;
			data.account = form.elements.account.value;
    		result.push(data);
        }else{
        	for (var i = 0; i < form.elements.shopcname.length; i++) {
    		var data = {};
    		data.shopcname = form.elements.shopcname[i].value; 
    		data.phone = form.elements.phone[i].value; 
    		data.email = form.elements.email[i].value; 
    		data.address = form.elements.address[i].value;
			data.account = form.elements.account[i].value;
    		result.push(data);
    		}	
        }
		console.log(result);
	$.ajax({
            url:'../model/user/shop/controller.php',
            data:JSON.stringify(result),
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


function shoplist(){
    $.ajax({
        url:'../model/user/shop/controller.php',
        data:test(),
        // contentType:"application/json",
        type: 'POST',
        async:false,
        success: function(result) {
            var obj = eval (result);
            if(obj[0]['status']==200){
                var caccount=obj[1]['caccount'];
                console.log(caccount);
				var cname = [
							{
							  "act":"showCompanyInfo"
							},
							{
							  "account":caccount
							}
						  ]
				$.ajax({
						url:'../model/user/company/controller.php',
						data:JSON.stringify(cname),
						type: 'POST',
						async:false,
						success: function(result) {
								console.log(result);
								var obj = eval (result);
								if(obj[0]['status']==200){
									cname=(obj[1]['cname']);
								}
						},
						error: function(err) {
								console.log('shit!');
								console.log(err);
						}
				});
                var h1 = document.createElement('h1');
                h1.innerHTML=cname+"分店列表";
                var div = document.getElementById('shop');
                div.innerHTML=("");
                var table=document.createElement('table');
                var newtr=document.createElement('tr');
                div.appendChild(h1);
                div.appendChild(table);

                table.setAttribute("border","3");
                table.appendChild(newtr);
                var newtd=document.createElement('td');
                newtd.innerHTML="分店名稱";
                newtr.appendChild(newtd);
                var newtd=document.createElement('td');
                newtd.innerHTML="電話";
                newtr.appendChild(newtd);
                var newtd=document.createElement('td');
                newtd.innerHTML="信箱";
                newtr.appendChild(newtd);
                var newtd=document.createElement('td');
                newtd.innerHTML="帳號";
                newtr.appendChild(newtd);
                var newtd=document.createElement('td');
                newtd.innerHTML="產業";
                newtr.appendChild(newtd);
                var newtd=document.createElement('td');
                newtd.innerHTML="狀態";
                newtr.appendChild(newtd);
                var newtd=document.createElement('td');
                newtd.innerHTML="地址";
                newtr.appendChild(newtd);
                var newtd=document.createElement('td');
                var newbutton=document.createElement('button');
                newbutton.setAttribute("id","delete");
                newbutton.setAttribute("onclick","deleteshop(this)");
				newbutton.setAttribute("type","button");
                newbutton.innerHTML="刪除";
                newtr.appendChild(newtd);
                newtd.appendChild(newbutton);
                var newtd=document.createElement('td');
                newtd.innerHTML="修改資料";
                newtr.appendChild(newtd);
                for(var i=1;i<obj.length;i++){
                    var newtr=document.createElement('tr');
                    newtr.setAttribute("id","tr"+i);
                    newtr.setAttribute("value","tr"+i);
                    table.appendChild(newtr);

                    var newtd=document.createElement('td');
                    newtd.innerHTML=obj[i]['shopcname'];
                    newtd.setAttribute("id","shopcname"+i);
                    newtr.appendChild(newtd);

                    var newtd=document.createElement('td');
                    newtd.innerHTML=obj[i]['phone'];
                    newtd.setAttribute("id","phone"+i);
                    newtr.appendChild(newtd);

                    var newtd=document.createElement('td');
                    newtd.innerHTML=obj[i]['email'];
                    newtd.setAttribute("id","email"+i);
                    newtr.appendChild(newtd);

                    var newtd=document.createElement('td');
                    newtd.innerHTML=obj[i]['account'];
                    newtd.setAttribute("id","account"+i);
                    newtr.appendChild(newtd);

                    var newtd=document.createElement('td');
                    newtd.innerHTML=obj[i]['industry'];
                    newtd.setAttribute("id","industry"+i);
                    newtr.appendChild(newtd);

                    var newbut=document.createElement('button');
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
                    newtd.innerHTML=obj[i]['address'];
                    newtd.setAttribute("id","address"+i);
                    newtr.appendChild(newtd);

                    var newtd=document.createElement('td');
                    var newinput=document.createElement('input');
                    newinput.setAttribute("type","checkbox");
                    newinput.setAttribute("id",obj[i]['account']);
                    newinput.setAttribute("name","check");
                    test2.push(newinput);
                    newtr.appendChild(newtd);
                    newtd.appendChild(newinput);

                    var newtd=document.createElement('td');
                    newtd.setAttribute("id","buttontd"+i);
                    var newbutton=document.createElement('button');
                    newbutton.setAttribute("onclick","changebtn(this)");
					newbutton.setAttribute("type","button");
                    newbutton.innerHTML="修改資料";
                    newbutton.setAttribute("id","button"+i);
                    /*if(newbutton.click==true){
                        //console.log(newbutton.id);
                        var shopcname = document.getElementById(obj[i]['shopcname']).value;
                        var oldname=shopcname.innerHTML;
                        var newinput=document.createElement('input');
                        newinput.type='text';
                        shopcname.innerHTML=' ';
                        newtr.appendChild(newinput);
                    }*/
                    newtd.appendChild(newbutton);
                    newtr.appendChild(newtd);

                    /*$('#button'+i).click(function(){
                        var tr = document.getElementById('tr'+i);
                        console.log(tr);
                        while(tr.hasChildNodes()){
                            tr.removeChild(tr.firstChild);
                        }
                        var newinput=document.createElement("input");
                        newtr.appendChild(newinput);
                    });*/
                }
                /*$('#change').click(function(){
                    var change = document.getElementById("change").innerHTML;
                    $('#change').replaceWith(function() {
                        return '<input type="text" name="text" value="' + text + ' "<br>';
                    });
                });*/

            }
            if(obj[0]['status']==400)
                $('#shop').after("<h1>目前還沒有店家資料 請在下方新增您的店家</h1>");
            if(obj[0]['status']==500)
                alert("Server Error");
            //console.log(obj);
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
function back(){
	var _clickTab = "admin_memberManagement.php";
	if("-1"==_clickTab.search("http://")){ //不是http://執行以下
			$.get(_clickTab,function(data){
			$("#iframe").html(data);
			});
			return false;
	}
}
$(document).ready(function(){
    shoplist();
	$("#back").click(function(){
		back();
	});
    $("#newshop").submit(function(event){
        event.preventDefault();//防止網頁刷新
        if(checkphone()==1){
            var form=$("#newshop").serializeArray();//序列化表單
            var obj={};
            console.error(nowcompany);
            var data = objectifyForm(form,"addShop");
            console.log(data);
            $.ajax({
                url:'../model/user/shop/controller.php',
                data:data,
                type: 'POST',
                async:false,
                success: function(result) {
                    console.log(result);
                    result = eval(result);
                    if(result[0].status==200){
                        alert("新增成功");
                        shoplist();
                        document.getElementById('newshop').reset();
                    }else if(result[0].status==401){
                        alert("帳號重複");
                    }else{
                        alert("發生未預期的錯誤 請聯絡管理員");
                    }
                    
                },
                error: function(err) {
                    console.log('shit!');
                    console.log(err);
                }
            });
        };
    });
});

