var count=0;
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
var checkbtn=[];
function initialize(){
    count=0;
    //console.log(form);
    //console.log(JSON.stringify(data));
    $('#addFQ').hide();
    $('#showadd').show();
    var returnarray=[];
    var actobj={};
    var obj={};
    actobj.act = "getData";
    obj.type="admin";
    obj.status="all";
    returnarray.push(actobj);
    returnarray.push(obj);
    $.ajax({
        type :"POST",
        data:JSON.stringify(returnarray),
        url  :"../model/QA/controller.php",
        async:false,
        success : function(result) {
            var obj=eval(result);

            if(obj[0]['status'] == 200){
                var tbody = document.getElementById('tbody');
                tbody.innerHTML="";
                var delbtn = document.getElementById('deletebtn');
                delbtn.setAttribute("type","button");
                for(var i=1;i<obj.length;i++){
                    var tr = document.createElement("tr");
                    tr.setAttribute("id","tr"+i);
                    tbody.appendChild(tr);
                    /*var form = document.createElement("form");
                    form.setAttribute("id","form"+i);
                    tr.appendChild(form);*/
					
					var td = document.createElement("td");                    
                    var input = document.createElement("input");
                    input.setAttribute("type","checkbox");                    
                    input.setAttribute("id",obj[i]['id']);
                    input.setAttribute("name","check");
                    checkbtn.push(input);
                    tr.appendChild(td);
                    td.appendChild(input);

                    var td = document.createElement("td");
                    tr.appendChild(td);
                    td.innerHTML=i;

                    var td = document.createElement("td");
                    tr.appendChild(td);
                    td.setAttribute("id","question"+i);
                    td.innerHTML=obj[i]['question'];

                    var td = document.createElement("td");
                    tr.appendChild(td);
                    td.setAttribute("id","reply"+i);
                    td.innerHTML=obj[i]['reply'];

                    var td = document.createElement("td");
                    tr.appendChild(td);
                    td.innerHTML=obj[i]['addq_time'];

                    var td = document.createElement("td");
                    td.setAttribute("id","buttontd"+i);
                    tr.appendChild(td);
                    var reply = document.createElement("button");
                    reply.innerHTML="修改";
                    reply.setAttribute("type","button");
                    reply.setAttribute("name","reply");
                    reply.setAttribute("id","button"+i);
                    reply.setAttribute("onclick","changebtn(this)");
                    td.appendChild(reply);
                    
                    
                    var td = document.createElement("td");
                    var input = document.createElement("input");                    
                    input.setAttribute("type","hidden");
                    input.setAttribute("id","hid"+i);
                    input.setAttribute("name","id");
                    input.setAttribute("value",obj[i]['id']);
                    td.appendChild(input);
                    tr.appendChild(td);
                                                                                                   
                    var oform = document.forms['form'];

                }
            }
        },
        error : function(data) {
            alert("Server Error");
            //console.log("error");
        },
    });
}
function deleteFQ(){
    var obj={};
    obj.act="delete";
    console.log(obj);
    var arr=[];
    arr.push(obj);
    for(var i=0; i<checkbtn.length; i++){
        if(checkbtn[i].checked==true){
            var e = {"id":checkbtn[i].id};
            arr.push(e);
        }
    }
    console.log(JSON.stringify(arr));
    $.ajax({
            url:'../model/QA/controller.php',
            data:JSON.stringify(arr),
            type: 'POST',
            async:false,
            success: function(result) {
                    console.log(result);
                    var obj = eval (result);
                    if(obj[0]['status']==200){
                        initialize();
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
    if(e){
        count++;
        var a = e.id;
        var i = a.substr(6);
        var question = document.getElementById('question'+i);        
        var oldquestion = question.innerHTML;
        //console.log(oldshopcname);
        while(question.hasChildNodes()){
            question.removeChild(question.firstChild);
        }
        var newinput=document.createElement("input");
        newinput.type="text";
        newinput.value=oldquestion;
        newinput.setAttribute("id","questionid");
        newinput.setAttribute("name","questionid");
        question.appendChild(newinput);
        
        var hid = document.getElementById('hid'+i)
        hid.setAttribute("name","hid");
        
        
        
        var reply = document.getElementById('reply'+i);
        var oldreply = reply.innerHTML;
        while(reply.hasChildNodes()){
            reply.removeChild(reply.firstChild);
        }
        
        var newinput=document.createElement("input");
        newinput.type="text";
        newinput.value=oldreply;
        newinput.setAttribute("id","replyid");
        newinput.setAttribute("name","replyid");
        reply.appendChild(newinput);
        
        var oldtd = document.getElementById('buttontd'+i);
        while(oldtd.hasChildNodes()){
            oldtd.removeChild(oldtd.firstChild);
        }
               
    }
}

function update(){
    var result=[{"act":"update"}];
    var form =document.forms["questiondata"];
    if(count==1){
        var data={};
        data.question=form.elements.questionid.value;
        data.reply =form.elements.replyid.value;
        data.id =form.elements.hid.value;
        result.push(data);
    }else{
        for(var i = 0;i < form.elements.replyid.length; i++) {
            var data={};
            data.question=form.elements.questionid[i].value;
            data.reply =form.elements.replyid[i].value;
            data.id =form.elements.hid[i].value;
            result.push(data);
        }
    }
        $.ajax({ 
                        url:'../model/QA/controller.php',
                        data:JSON.stringify(result),
                        type:'POST',
                        async:false,
                        success:function(result){
                            var obj = eval (result);
                            if(obj[0]['status']==200){
                                initialize();
                            }
                            if(obj[0]['status']==400)
                                alert("Fail!");
                            if(obj[0]['status']==500)
                                alert("Server Error!");
                        },
                        error: function(err) {
                            console.log('shit!');
                            console.log(err);
                        }
                    });
    }


$(document).ready(function(){
    initialize();
    $("#addFQ").submit(function(event){
        event.preventDefault();
            var form=$("#addFQ").serializeArray();
            var data = objectifyForm(form,"add");
            $.ajax({
                    url:'../model/QA/controller.php',
                    data:JSON.stringify(data),
                    type: 'POST',
                    async:false,
                    success: function(result) {
                        var obj = eval (result);
                        if(obj[0]['status']==200)
                            initialize();
                        if(obj[0]['status']==400)
                            alert("Fail!");
                        if(obj[0]['status']==500)
                            alert("Server error!");
                    },
                    error: function(err) {
                            console.log('shit!');
                            console.log(err);
                    }
            });
    });
    $("#showadd").click(function(event){
        event.preventDefault();
        $("#addFQ").show();
        $("#showadd").hide();
    })
});
