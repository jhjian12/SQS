var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}
function objectifyForm(formArray,actvalue) {//serialize data function
        //console.log(formArray);
        var qcardid = getUrlParameter('qcardid');
        var returnArray=[];
        var actObject = {};
        actObject.act=actvalue;
        var formObject = {};
        for (var i = 0; i < formArray.length; i++){
                formObject[formArray[i]['name']] = formArray[i]['value'];
        }
        formObject.shopaccount="testqqq";
        formObject.qcardid=qcardid;
        returnArray.push(actObject);
        returnArray.push(formObject);
        return returnArray;
}
var shop = '';
var QcardStatus;
function checkQcardStatus(){
    var act =[
                {
                    "act":"QcardStatus"
                },
                {
                    "qcardid":getUrlParameter("qcardid")
                }   
            ]
    $.ajax({
        type:'POST',
        data:JSON.stringify(act),
        url:'../model/Questionnaire/controller.php',
        async:false,
        success:function(result){
            console.log(result);
            result = eval(result);
            if(result[0]['status']==200){
                    QcardStatus = result[1]['status'];
                    console.log(QcardStatus);
            }else{
                alert("問卷發生異常 請重新條碼或聯絡管理員");
            }
        }
    });
}
function getshopbyid(){
    var act =[
                {
                    "act":"checkQcardId"
                },
                {
                    "qcardid":getUrlParameter("qcardid")
                }   
            ]
    $.ajax({
        type:'POST',
        data:JSON.stringify(act),
        url:'../model/Questionnaire/controller.php',
        async:false,
        success:function(result){
            console.log(result);
            result = eval(result);
            if(result[0]['status']==200){
                    shop = result[1]['shop'];
                    checkQcardStatus();
            }else{
                alert("問卷發生異常 請重新條碼或聯絡管理員");
            }
        }
    });
}
var questionlist;
function getShopCname(){
    var name =  "";
    var postdata = [
        {
              "act":"showShopInfo"
        },
        {
              "account":shop
        }
    ]
    $.ajax({
        type:'POST',
        data:JSON.stringify(postdata),
        url:'../model/user/shop/controller.php',
        async:false,
        success:function(result){
            result = eval(result);
            if(result[0]['status']==200){
                name = result[1].shopcname;
            }else{
                alert("問卷發生異常 請重新條碼或聯絡管理員");
            }
        }
    });
    return name;
}
$(document).ready(function(){
    getshopbyid();
    // console.error(shop);
    // console.log();
    $("#shopname").append(getShopCname());
    var returnarray=[];
    var obj={};
    var obj2={};
    if(QcardStatus==null){
        obj.act="showQuestionList";
        obj2.shop=shop;
        returnarray.push(obj);
        returnarray.push(obj2);
        console.log(JSON.stringify(returnarray));
        
        $.ajax({
            type :'POST',
            data :JSON.stringify(returnarray),
            url  :'../model/Questionnaire/controller.php',
            async:false,
            success : function(result) {
                console.log(result);
                var obj = eval(result);
                questionlist = obj;
                for (var i = 1; i < obj.length; i++) {
                    var row = "<tr>";
                    row+="<td>"+i+"</td>";
                    row+="<td>"+obj[i].item+"</td>";
                    row+="<td><input type='radio' value='1' name='exp_score,"+obj[i].qid+"' required/></td>";
                    row+="<td><input type='radio' value='2' name='exp_score,"+obj[i].qid+"' required/></td>";
                    row+="<td><input type='radio' value='3' name='exp_score,"+obj[i].qid+"' required/></td>";
                    row+="<td><input type='radio' value='4' name='exp_score,"+obj[i].qid+"' required/></td>";
                    row+="<td><input type='radio' value='5' name='exp_score,"+obj[i].qid+"' required/></td>";
                    row+="<td><input type='radio' value='1' name='feel_score,"+obj[i].qid+"' required/></td>";
                    row+="<td><input type='radio' value='2' name='feel_score,"+obj[i].qid+"' required/></td>";
                    row+="<td><input type='radio' value='3' name='feel_score,"+obj[i].qid+"' required/></td>";
                    row+="<td><input type='radio' value='4' name='feel_score,"+obj[i].qid+"' required/></td>";
                    row+="<td><input type='radio' value='5' name='feel_score,"+obj[i].qid+"' required/></td>";
                    $("#question").append(row);
                }
                //自動填入部分
                // for (var i = 0; i <85; i+=5) {
                //     $('input')[i].checked = true;
                // }
                // $("#question").append();
            },
            error : function(data) {
                alert("Server Error");
                //console.log("error");
            }
        });
    }else if(QcardStatus==0 ||QcardStatus==1){
        location.href="exchangeReward.html?qcardid="+getUrlParameter("qcardid");
    }

    $("#form").submit(function(e){
        e.preventDefault();
        var serializearray = ($("#form").serializeArray());
        var postdata = objectifyForm($("#form").serializeArray(),"response");
        var scorearr = [];
        for (var i = 0; i < serializearray.length; i++) {
            if (serializearray[i].name.match(/^.*score.*$/)) {
                // console.log();
                scorearr.push(serializearray[i]);
            }
        }
        console.log(scorearr);
        for (var i = 0; i < scorearr.length; i+=2) {
            var q = {};
            q.qid = scorearr[i].name.split(",")[1];
            q.exp_score = scorearr[i].value;
            q.feel_score = scorearr[i+1].value;
            console.log(q);
            postdata.push(q);
        }
        console.log(JSON.stringify(postdata));
        r = confirm("確定要送出嗎?")
        if(r){
            $.ajax({
                type :'POST',
                data :JSON.stringify(postdata),
                url  :'../model/Questionnaire/controller.php',
                async:false,
                success : function(result) {
                    console.log(result);
                    var obj = eval(result);
                    if(obj[0].status==200){
                        alert("填寫成功!");
                        location.href="exchangeReward.html?qcardid="+getUrlParameter("qcardid");
                    }else if (obj[0].status==400){
                        alert("此問卷已填寫過囉");
                    }else{
                        alert("發生未預期的錯誤 請聯絡管理員");
                    }
                },
                error : function(data) {
                    alert("Server Error");
                }
            });
        }
    })
    
});