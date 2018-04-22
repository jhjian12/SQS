$(document).ready(function(){
listq();
});
function listq(){//列出問題
    count = 0;
    $.ajax({
            url:'../model/Question/controller.php?act=showQuestionList',
            type: 'GET',
            async:false,
            success:function(result){
                    $('#listq').html("");
                    console.log(result);
                    var table = $('<table border="1"></table>');
                    var object = eval(result);
                    var title_checkbox = $('<th></th>').text("勾選");
                    var title_item = $('<th></th>').text("問項");
                    var title_dimension = $('<th></th>').text("服務構面");
                    var title_level = $('<th></th>').text("所屬等級");
                    var title_edit = $('<th></th>').text("修改問題");
                    var title_row= $('<tr></tr>').append(title_checkbox).append(title_item).append(title_dimension).append(title_level).append(title_edit);
                    table.append(title_row);
                    for(var i = 1;i<object.length;i++){
                            var td = $('<td id=item'+object[i].qid+'></td>').text(object[i].item);
                            var td1 = $('<td id=dim'+object[i].qid+'></td>').text(object[i].dimension);
                            var td2 = $('<td id=lev'+object[i].qid+'></td>').text(object[i].level);
                            var td3 = $('<td><button onclick=edit(this.id) id=q'+object[i].qid+'>修改</button></td>');
                            var td4 = $('<td><input type="checkbox" id=choice'+object[i].qid+'></td>');
                            var row = $('<tr></tr>').append(td4).append(td).append(td1).append(td2).append(td3);
                            table.append(row);
                    }
                    $('#listq').append(table);

            },
            error:function(err){
                console.log(err);
            }
    });
}
function edit(qid){//修改問題
    count++;
    var getqid= document.getElementById(qid);
    var getqid_id = document.getElementById(qid).id;
    var num = getqid_id.substr(1);
    var itemid = document.getElementById('item'+num);
    var dimensionid = document.getElementById('dim'+num);
    var levelid = document.getElementById('lev'+num);
    var getitem = document.getElementById('item'+num).innerHTML;
    var getdimension = document.getElementById('dim'+num).innerHTML;
    var getlevel = document.getElementById('lev'+num).innerHTML;
    //console.log(getdimension);
    var form=document.createElement("div");
    var textarea=document.createElement("input");
    var sel_d=document.createElement("select");
    var sel_l=document.createElement("select");
    var id = document.createElement("input");
    id.setAttribute("type","hidden");
    id.setAttribute("value",num);
    id.setAttribute("name","id");
    
    getqid.parentNode.appendChild(form);
    form.appendChild(id);
    form.setAttribute("name","form_"+qid);
    textarea.setAttribute("id","newitem");
    textarea.setAttribute("name","newitem");
    textarea.setAttribute("value",getitem);
    sel_d.setAttribute("id","newdimension");
    sel_d.setAttribute("name","newdimension");
    // $('#newdimension').val("3")
    // document.getElementById("newdimension"+num).value='1';
    //sel_d.setAttribute("value",getdimension);
    sel_l.setAttribute("id","newlevel");
    sel_l.setAttribute("name","newlevel");
    //sel_l.setAttribute("value",getlevel);
    while(itemid.hasChildNodes()){
        itemid.removeChild(itemid.firstChild);
    }
    while(dimensionid.hasChildNodes()){
        dimensionid.removeChild(dimensionid.firstChild);
    }
    while(levelid.hasChildNodes()){
        levelid.removeChild(levelid.firstChild);
    }
    itemid.appendChild(textarea);
    dimensionid.appendChild(sel_d);
    levelid.appendChild(sel_l);
    getqid.parentNode.removeChild(getqid);
    var dopt1 = document.createElement("option");
    dopt1.text=("有形性");
    dopt1.value=("有形性");
    sel_d.options.add(dopt1);
    var dopt2 = document.createElement("option");
    dopt2.text=("可靠性");
    dopt2.value=("可靠性");
    sel_d.options.add(dopt2);
    var dopt3 = document.createElement("option");
    dopt3.text=("回應性");
    dopt3.value=("回應性");
    sel_d.options.add(dopt3);
    var dopt4 = document.createElement("option");
    dopt4.text=("保障性");
    dopt4.value=("保障性");
    sel_d.options.add(dopt4);
    var dopt5 = document.createElement("option");
    dopt5.text=("關懷性");
    dopt5.value=("關懷性");
    sel_d.options.add(dopt5);
    if(getdimension=="有形性"){
        dopt1.setAttribute("selected","true");
    }else if(getdimension=="可靠性"){
        dopt2.setAttribute("selected","true");
    }else if(getdimension=="回應性"){
        dopt3.setAttribute("selected","true");
    }else if(getdimension=="保障性"){
        dopt4.setAttribute("selected","true");
    }else if(getdimension=="關懷性"){
        dopt5.setAttribute("selected","true");
    }
    var lopt1 = document.createElement("option");
    lopt1.text=1;
    lopt1.value=1;
    sel_l.options.add(lopt1);
    var lopt2 = document.createElement("option");
    lopt2.text=2;
    lopt2.value=2;
    sel_l.options.add(lopt2);
    var lopt3 = document.createElement("option");
    lopt3.text=3;
    lopt3.value=3;
    sel_l.options.add(lopt3);
    if(getlevel==1){
        lopt1.setAttribute("selected","true");
    }else if(getlevel==2){
        lopt2.setAttribute("selected","true");
    }else if(getlevel==3){
        lopt3.setAttribute("selected","true");
    }
    //document.getElementById("newdimension").value=getdimension;
    //document.getElementById("newlevel").value=getlevel;
}
var count = 0;
function update(){
    var result=[{"act":"updateQuestion"}];
    //for (var i = 0; i < 99999; i++) {
        var form=document.forms["questionform"];
        if(count==1){
            var data={};
            var newitem=form.elements.newitem.value;
            var newdimension=form.elements.newdimension.value;
            var newlevel=form.elements.newlevel.value;
            data.qid=form.elements.id.value;
            data.newitem=newitem;
            data.newdimension=newdimension;
            data.newlevel=newlevel;
            result.push(data);
        }else{
            for(var i=0;i < count;i++){
                var data={};
                var newitem=form.elements.newitem[i].value;
                var newdimension=form.elements.newdimension[i].value;
                var newlevel=form.elements.newlevel[i].value;
                data.qid=form.elements.id[i].value;
                data.newitem=newitem;
                data.newdimension=newdimension;
                data.newlevel=newlevel;
                result.push(data);
            }
        }
        
    //}
    if(confirm("確定更新問項內容?")){
        $.ajax({
                url:'../model/Question/controller.php',
                type: 'POST',
                contentType:"application/json",
                async:false,
                data:JSON.stringify(result),
                success:function(r){
                        var result=JSON.parse(r);
                        console.error(result);
                        if(result[0]['status']==200)
                            alert("success");
                },
                error:function(err){
                    console.log(err);
                }
        }); 
        console.log(result);
        listq();
    }else{
        alert("更新被取消");
        listq();
    }
}
function deleteq(){
    var result=[{"act":"delQuestion"}];
    for (var i = 0; i < 99999; i++) {
        var check=document.getElementById("choice"+i);
        if(check!=null){
            if(check.checked==true){
                console.log(check.id);
                var str = check.id;
                var data={};
                data.qid=str.slice(6,10);
                result.push(data);
            }
        }
    }
    if(confirm("確定刪除勾選項目?")){
        $.ajax({
                url:'../model/Question/controller.php',
                type: 'POST',
                contentType:"application/json",
                async:false,
                data:JSON.stringify(result),
                success:function(r){
                        var result=JSON.parse(r);
                    console.log(r);
                    console.log(result);
                        if(result[0]['status']==200){
                            listq();
                        }
                },
                error:function(err){
                    console.log(err);
                }
        }); 
    }else{
        listq();
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
        returnArray.push(actObject);
        returnArray.push(formObject);
        return returnArray;
}
function addq(){
    var form=$("#addq").serializeArray();
    var data = objectifyForm(form,"addQuestion");
	console.log(JSON.stringify(data));
    //var data = objectifyForm(form,"add");
    $.ajax({
            type: 'POST',
            url:'../model/question/controller.php',
            // contentType:"application/json",
            data:JSON.stringify(data),
            async:false,
            success:function(r){
                    console.log(r);
                    var result=eval(r);
                    if(result[0]['status']==200){
						listq();
                        document.getElementById('item').value = "";
                    }

                    if(result[0]['status']==400)
                        alert("add failed");
            },
            error:function(err){
                console.log("qqqqqqqq");
            }
    });
    listq();
}