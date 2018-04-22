//可選擇的數量
var canselected=5;
//基本題數量
var basicquantity =0;
var shop='';
var level;
var memorystr="";
$(document).ready(function(){
		// $.ajax({
  //           url:'../model/user/company/controller.php?act=getuser',
  //           type: 'GET',
  //           async:false,
  //           success:function(r){
  //               shop=r;
  //           },
  //           error:function(err){
  //               console.log(err);
  //           }
		// });
        console.error(shop);
        level = getlevel(shop);
        getquestionlist(level);
        $("#form").submit(function(event){
                event.preventDefault();
                $("input").removeAttr("disabled");
                var cbxVehicle = new Array();
                $('input:checkbox:checked').each(function(i) { cbxVehicle[i] = this.value; });
                // console.log(cbxVehicle);
                $("input").attr("disabled","true");
                var data ="";
                for (var i = 0; i < cbxVehicle.length; i++) {
                        if(i==0)
                                data=data+cbxVehicle[i];
                        else
                                data=data+","+cbxVehicle[i];
                }
                // console.log(data);
                var arr = [];
                var act={};
                act.act="selectQuestion";
                var post={};
                post.account=shop;
                post.selected=data;
                arr.push(act);
                arr.push(post);
                // console.log(arr);
                $.ajax({
                        url:'../model/user/shop/controller.php',
                        data:JSON.stringify(arr),
                        type:'POST',
                        async:false,
                        success:function(result){
                            var obj = eval (result);
                            if(obj[0].status==200)
                                alert("填寫完成");
                        },
                        error: function(err) {
                            console.log('shit!');
                            console.log(err);
                        }
                    });
        });
})
function choose(){
        var selected=0;
        var f = document.forms[0];
        if(level==2){
                basicquantity=0;
                for (var i = 0; i < f.basic.length; i++) {
                if(f.basic[i].checked)
                        basicquantity++;
                }
        }
        for (var i = 0; i < f.advanced.length; i++) {
                if(f.advanced[i].checked)
                        selected++;
        }
        // console.log("已選"+selected);
        // console.log(basicquantity);
        // console.error("總共可選"+canselected);
        // console.error("基礎題目"+basicquantity);
        if(selected>=canselected-basicquantity){
                // console.log($("#tbodyadvanced :checked"));
                $("#tbodyadvanced input:checkbox:not(:checked)").attr("disabled","true");
                $("#tbodybasic input:checkbox:not(:checked)").attr("disabled","true");
        }else{
                $("#tbodyadvanced input").attr("disabled",false);
                if(level==2)
                        $("#tbodybasic input").attr("disabled",false);
        }
        // console.log(f.advanced.length);
        // console.log(f.basic[0]);
        console.log(selected);
}
function showquestionlist(result){
        var tbody =$("#tbodybasic");
        console.log(result);
        var count=1;
        for(var i=1; i<result.length; i++){
                if(result[i].level==1){
                        tbody.append("<tr><td>"+(count++)+"</td><td>"+result[i].item+"</td><td><input type='checkbox' name='basic' value='"+result[i].qid+"' onClick='choose();'></td></tr>");
                        // tbody.append("");
                        // tbody.append("");
                        // tbody.append("");
                        // tbody.append("<td><input type='checkbox' name='checkbox' value='"+result[i].qid+"' onClick='choose();'>第1個</td>");
                        // tbody.append("<td>"+level+"</td>");
                        // tbody.append("");
                        basicquantity++;
                }
        }
        var tbody =$("#tbodyadvanced");
        for(var i=1; i<result.length; i++){
                if(result[i].level==2){
                        tbody.append("<tr><td>"+(count++)+"</td><td>"+result[i].item+"</td><td><input type='checkbox' name='advanced' value='"+result[i].qid+"' onClick='choose();'></td></tr>");
                        // tbody.append("");
                        // tbody.append("");
                        //         // tbody.append("<td><input type='checkbox' name='checkbox' value='"+result[i].qid+"' onClick='choose();' disabled='true' checked='true'></td>");
                        //         tbody.append("");
                        // // tbody.append("<td>"+level+"</td>");
                        // tbody.append("");        
                }
                
        }      
}
function memory(str){
        // console.log(str.split(","));
        var arr =str.split(",");
        var f = document.forms[0];
        // console.log(f.basic.length);
        for (var i = 0; i < f.basic.length; i++) {
                for(var j=0; j<arr.length; j++){
                        // console.log(arr[j]);
                        // console.log(f.basic[i].value);
                        if(arr[j]==f.basic[i].value)
                                // console.log("123");
                                f.basic[i].setAttribute("checked","true");
                }
        }
        for (var i = 0; i < f.advanced.length; i++) {
                for(var j=0; j<arr.length; j++){
                        // console.log(arr[j]);
                        // console.log(f.advanced[i].value);
                        if(arr[j]==f.advanced[i].value)
                                // console.log("123");
                                f.advanced[i].setAttribute("checked","true");
                }
        }
}
function getlevel(user){
        var level;
        var data = [];
        var act = {};
        act.act="showCompanyInfo";
        var shopdata ={};
        shopdata.account = user;
        data.push(act);
        data.push(shopdata);
        console.error(JSON.stringify(data));
        $.ajax({
                url:'../model/user/company/controller.php',
                type: 'POST',
                async:false,
                data:JSON.stringify(data),
                success:function(r){
                        result=eval(r);
                        console.log(result);
                        level = result[1].level;
                        if(memorystr=result[1].question){
                                level =-1;
                        }
                },
                error:function(err){
                        console.log(err);
                }
        });
        return level;
}
function getquestionlist(level){
        var result;
        $.ajax({
                url:'../model/question/controller.php?act=showQuestionList',
                type:'GET',
                async:false,
                success:function(r){
                        result = eval(r);
                        if(result[0].status=="200"){
                                if(level==-1){
                                        showquestionlist(result);
                                        $("input").attr("disabled","true");
                                        memory(memorystr);
                                        $("#description").append("您已填寫過 此為您的問卷問題");
                                        $("#submit").remove();
                                }
                                else if(level==0){
                                        showquestionlist(result);
                                        $("input").attr("disabled","true");
                                        $("#tbodybasic input").attr("checked","true");
                                        $("#description").append("您的等級為基本方案 不需要填寫喔");
                                        $("#submit").remove();
                                }
                                else if(level==1){
                                        showquestionlist(result);
                                        $("#tbodybasic input").attr("disabled","true");
                                        $("#tbodybasic input").attr("checked","true");
                                        $("#description").append("您的方案為A 可加選進階題庫"+(canselected-basicquantity)+"題");
                                }else if(level==2){
                                        showquestionlist(result);
                                        // $("#tbodybasic input").attr("disabled","true");
                                        $("#description").append("您的方案為B 可供全部自由選");
                                        $("#tbodybasic input").attr("checked","true");
                                }else{
                                        //是店家 找公司資料
                                        showquestionlist(result);
                                        $.ajax({
                                            url:'../model/user/shop/controller.php?act=getuser',
                                            type: 'GET',
                                            async:false,
                                            success:function(r){
                                                shop=r;
                                            },
                                            error:function(err){
                                                console.log(err);
                                            }
                                        });
                                        
                                        var comapny;
                                        var account = shop;
                                        var data = [];
                                        var act = {};
                                        act.act="showShopInfo";
                                        var shopdata ={};
                                        shopdata.account = account;
                                        data.push(act);
                                        data.push(shopdata);
                                        console.log(JSON.stringify(data));
                                        $.ajax({
                                                url:'../model/user/shop/controller.php',
                                                type: 'POST',
                                                async:false,
                                                data:JSON.stringify(data),
                                                success:function(r){
                                                        result=eval(r);
                                                        // console.error(result[1].caccount);
                                                        level=getlevel(result[1].caccount);
                                                        // console.error(memorystr);
                                                        memory(memorystr);
                                                        $("input").attr("disabled","true");
                                                        $("#description").append("無權限修改 此為您的問卷問題");
                                                        $("#submit").remove();
                                                },
                                                error:function(err){
                                                        console.log(err);
                                                }
                                        });
                                        
                                }
                        }
                }
        })
}