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
function store(data){
    if(data){
        var buttonid=data.id;
        var num=buttonid.substr(4);
        var formid="qa_data"+num;
        console.log(formid);
        var form=$("#"+formid).serializeArray();
        var data = objectifyForm(form,"reply");
        console.log(data);
        $.ajax({
            url:'../model/QA/controller.php',
            data:JSON.stringify(data),
            type: 'POST',
            async:false,
            success: function(result) {
                //console.log(result);
                var obj=eval(result);
                if(obj[0]['status'] == 200){
                    alert("寄送成功");
                    window.location.reload("reply_QA.html");

                }
            },
            error : function(data) {
                alert("Server Error");
                //console.log("error");
            },
        });
    }
}
function reply(){
        var data = [{"act":"reply"}];
        var oform = document.forms['form'];
        for (var i = 0; i < oform.length; i++) {
                if(oform[i].value!=""){
                        var obj = {};
                        obj.reply=oform[i].value;
                        obj.id=oform[i].id;
                        data.push(obj);
                }
        }
        $.ajax({
            url:'../model/QA/controller.php',
            data:JSON.stringify(data),
            type: 'POST',
            async:false,
            success: function(result) {
                //console.log(result);
                var obj=eval(result);
                if(obj[0]['status'] == 200){
                        listQA();
                }
            },
            error : function(data) {
                alert("Server Error");
                //console.log("error");
            },
        });
}
function listQA(){
    //console.log(form);
    //console.log(JSON.stringify(data));
    var returnarray=[];
    var actobj={};
    var obj={};
    actobj.act = "getData";
    obj.type="other";
    obj.status="process";
    returnarray.push(actobj);
    returnarray.push(obj);
    $.ajax({
        type :"POST",
        data:JSON.stringify(returnarray),
        url  :"../model/QA/controller.php",
        async:false,
        success : function(result) {
            //console.log(result);
            var obj=eval(result);

            if(obj[0]['status'] == 200){
                var tbody = document.getElementById('tbody');
                tbody.innerHTML="";
                for(var i=1;i<obj.length;i++){
                    var tr = document.createElement("tr");
                    tbody.appendChild(tr);

                    var td = document.createElement("td");
                    tr.appendChild(td);
                    td.innerHTML=i;

                    var td = document.createElement("td");
                    tr.appendChild(td);
                    td.innerHTML=obj[i]['question'];

                    var td = document.createElement("td");
                    tr.appendChild(td);
                    td.innerHTML=obj[i]['email'];

                    var td = document.createElement("td");
                    tr.appendChild(td);
                    td.innerHTML=obj[i]['addq_time'];

                    var td = document.createElement("td");
                    tr.appendChild(td);
                    var reply_text = document.createElement("textarea");
                    reply_text.setAttribute("name","reply");
                    reply_text.setAttribute("id",obj[i]['id']);
                    td.appendChild(reply_text);

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
$(document).ready(function(){
    listQA();
});
