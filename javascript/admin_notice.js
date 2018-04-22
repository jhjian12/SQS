$(document).ready(function(){
initialize();
});
function initialize(){
    //listnotice
    var category = document.getElementById('listcategory').value;
    //console.log(category);
    var result = [{"act":"getData"}];
    var data={};
    data.category = category;
    result.push(data);
    //console.log(JSON.stringify(result));
    $.ajax({
            url:'../model/announcement/controller.php?',
            type: 'POST',
            async:false,
            data :JSON.stringify(result),
            success:function(result){
            		//console.log(result);
                    $('#noticeform').html("");
                    // console.log(result);
                    var table = $('<table border="1"></table>');
                    $('#noticeform').append(table);
                    var object = eval(result);
                    for(var i = 0;i<object.length;i++){
                        if(i ==0){
                            var td = $('<td id=subject0></td>').text('主旨');
                            var td1 = $('<td id=category0></td>').text("公告類型");
                            var td3 = $('<td id=start_time0></td>').text('公告開始時間');
                            var td4 = $('<td id=end_time0></td>').text('公告結束時間');
                            // var td5 = $('<td></td>').text(object[i].shop_account);
                            // var td6 = $('<td></td>').text(object[i].industry);
                            var td7 = $('<td id=edit_td></td>').text('修改');
                            var tr8 = $('<td></td>');
                            var row = $('<tr id=tr0></tr>').append(tr8).append(td).append(td1).append(td3).append(td4).append(td7);
                            table.append(row);
                        } else if(i!=0){
                            var td = $('<td id=subject'+object[i].id+'></td>').text(object[i].subject);
                            if(object[i].category=="system")
                                var td1 = $('<td id=category'+object[i].id+'></td>').text("系統公告");
                            if(object[i].category=="learn")
                                var td1 = $('<td id=category'+object[i].id+'></td>').text("小知識系列");
                            if(object[i].category=="other")
                                var td1 = $('<td id=category'+object[i].id+'></td>').text("其他");
                            var td3 = $('<td id=start_time'+object[i].id+'></td>').text(object[i].start_time);
                            var td4 = $('<td id=end_time'+object[i].id+'></td>').text(object[i].end_time);
                            // var td5 = $('<td></td>').text(object[i].shop_account);
                            // var td6 = $('<td></td>').text(object[i].industry);
                            var td7 = $('<td><button onclick=edit(this.id) id=q'+object[i].id+'>修改</button></td>');
                            var tr8 = $('<td><input type="checkbox" id=choice'+object[i].id+'></td>');
                            var row = $('<tr id=tr'+object[i].id+'></tr>').append(tr8).append(td).append(td1).append(td3).append(td4).append(td7);
                            table.append(row);
                        }
                    }
            },
            error:function(err){
                console.log(err);
            }
    });
}
function upload(){
    var result=[{"act":"add"}];
	var data={};
	var form = document.getElementById('announcement');
	var getstart= form.release_start.value;
	var getend= form.release_end.value;
	var getsubject = form.subject.value;
	var getcategory = form.category.value;
	var getcontent = form.content.value;
	//console.log(getsubject);
	data.subject = getsubject;
	data.category = getcategory;
	data.content = getcontent;
	data.start_time = getstart;
	data.end_time = getend;
	result.push(data);
	console.log(JSON.stringify(result));
    $.ajax({
            url:'../model/announcement/controller.php',
            type: 'POST',
            contentType:"application/json",
            async:false,
            data:JSON.stringify(result),
            success:function(r){
                    var result=JSON.parse(r);
                    //console.error(result);
                    if(result[0]['status']==200)
                        alert("success");
                        location.reload();
            },
            error:function(err){
                console.log(err);
            }
    });
}
var count=0;
function edit(id){//修改問題
    count++;
    var getid= document.getElementById(id);
    var getbuttonid= document.getElementById(id).id;
    var num=getbuttonid.substr(1);
    var subject_old= document.getElementById("subject"+num).innerHTML;
    var category_old= document.getElementById("category"+num).innerHTML;
    var start_time_old= document.getElementById("start_time"+num).innerHTML;
    var end_time_old=document.getElementById("end_time"+num).innerHTML;
    //console.log(end_time_old);
    
    var div_form = document.createElement('div');
    getid.parentNode.appendChild(div_form);
    var id=document.createElement('input');
    div_form.appendChild(id);
    id.setAttribute("name","id");
    id.setAttribute("value",num);
    id.setAttribute("type","hidden");
    
    document.getElementById("subject"+num).innerHTML=null;
    document.getElementById("category"+num).innerHTML=null;
    document.getElementById("start_time"+num).innerHTML=null;
    document.getElementById("end_time"+num).innerHTML=null;
    
    var subject_place= document.getElementById("subject"+num);
    var subject_input = document.createElement('input');
    subject_place.appendChild(subject_input);
    subject_input.setAttribute("id","subject_input");
    subject_input.setAttribute("name","subject_input");
    subject_input.setAttribute("value",subject_old);
    
    var category_place= document.getElementById("category"+num);
    var category_select = document.createElement('select');
    category_place.appendChild(category_select);
    category_select.setAttribute("id","category_select");
    category_select.setAttribute("name","category_select");
    var category_option_A = document.createElement('option');
    category_select.appendChild(category_option_A);
    category_option_A.setAttribute("id","category_option_A");
    category_option_A.setAttribute("name","category_option_A");
    var category_option_B = document.createElement('option');
    category_select.appendChild(category_option_B);
    category_option_B.setAttribute("id","category_option_B");
    category_option_B.setAttribute("name","category_option_B");
    var category_option_C = document.createElement('option');
    category_select.appendChild(category_option_C);
    category_option_C.setAttribute("id","category_option_C");
    category_option_C.setAttribute("name","category_option_C");
    
    
    category_option_A.text=("系統公告");
    category_option_A.value=("system");
    category_option_B.text=("小知識系列");
    category_option_B.value=("learn");
    category_option_C.text=("其他");
    category_option_C.value=("other");
    if(category_old =="系統公告"){
        category_option_A.setAttribute("selected","true");
    } else if(category_old =="小知識系列"){
        category_option_B.setAttribute("selected","true");
    } else if(category_old =="其他"){
        category_option_C.setAttribute("selected","true");
    }
    
    var start_time_place= document.getElementById("start_time"+num);
    var start_time_input = document.createElement('input');
    start_time_place.appendChild(start_time_input);
    start_time_input.setAttribute("id","start_time_input");
    start_time_input.setAttribute("name","start_time_input");
    start_time_input.setAttribute("type","datetime-local");
    var first_start=start_time_old.substr(0,10);
    var last_start=start_time_old.substr(11,8);
    start_time_old=first_start+"T"+last_start;
    start_time_input.setAttribute("value",start_time_old);
    
    var end_time_place=document.getElementById("end_time"+num);
    var end_time_input = document.createElement('input');
    end_time_place.appendChild(end_time_input);
    end_time_input.setAttribute("id","end_time_input");
    end_time_input.setAttribute("name","end_time_input");
    end_time_input.setAttribute("type","datetime-local");
    var first=end_time_old.substr(0,10);
    var last=end_time_old.substr(11,8);
    end_time_old=first+"T"+last;
    end_time_input.setAttribute("value",end_time_old);
    //刪除修改button
    getid.parentNode.removeChild(getid);
    
}
function update_notice(){
    var form=document.forms["noticeform"];
    var result=[{"act":"update"}];
    if(form!=null){
        if(count==1){
            var subject=form.elements.subject_input.value;
            var category=form.elements.category_select.value;
            var start_time=form.elements.start_time_input.value;
            var end_time=form.elements.end_time_input.value;
            var data={};
            data.id=form.elements.id.value;
            data.subject=subject;
            data.category=category;
            data.start_time=start_time;
            data.end_time=end_time;
            result.push(data);
        } else {
            for(var i=0;i<count;i++){
                console.log(i);
                var subject=form.elements.subject_input[i].value;
                var category=form.elements.category_select[i].value;
                var start_time=form.elements.start_time_input[i].value;
                var end_time=form.elements.end_time_input[i].value;
                var data={};
                data.id=form.elements.id[i].value;
                data.subject=subject;
                data.category=category;
                data.start_time=start_time;
                data.end_time=end_time;
                result.push(data);
            }
        }
        //console.log(JSON.stringify(result));
        if(confirm("您確定要更新嗎?")){
            $.ajax({
                url:'../model/announcement/controller.php',
                type: 'POST',
                contentType:"application/json",
                async:false,
                data:JSON.stringify(result),
                success:function(r){
                        var result=JSON.parse(r);
                        //console.error(result);
                        if(result[0]['status']==200)
                            alert("有問題");
                },
                error:function(err){
                    console.log(err);
                    alert("wrong");
                }
            });
        
        } else{
            alert("取消更新");
        }
        
    }
    location.reload();
}
function delete_notice(){
    var result=[{"act":"del"}];
    for (var i = 0; i < 1000; i++) {
        var check=document.getElementById("choice"+i);
            console.log(check);
        if(check!=null){
            if(check.checked==true){
                console.log(check.id);
                var str = check.id;
                console.log(str);
                var data={};
                data.id=str.slice(6,10);
                result.push(data);
            }
        }
    }
    //console.log(JSON.stringify(result));
    if(confirm("您確定要刪除嗎?")){
        $.ajax({
                url:'../model/announcement/controller.php',
                type: 'POST',
                contentType:"application/json",
                async:false,
                data:JSON.stringify(result),
                success:function(r){
                        var result=JSON.parse(r);
                        console.log(r);
                        console.log(result);
                        if(result[0]['status']==200){
                            location.reload();
                        }
                },
                error:function(err){
                    console.log("why");
                }
        });
    }else{
        alert("取消刪除");
    }
    location.reload();
}