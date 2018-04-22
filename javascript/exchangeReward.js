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
$(document).ready(function(){
    checkQcardStatus();
    if(QcardStatus==0){
        $("#content").append("<button onclick='getReward()'>點擊按鈕即可兌換您的優惠</button>");
    }else if(QcardStatus==1){
        $("#content").append("本優惠卷已被使用過囉!");
    }else{
        $("#content").append("此優惠卷無法使用 請重刷條碼或聯絡管理員");
    }
});
function getReward(){
    r = confirm("確定要兌換嗎?");
    if(r){
        var act =[
                    {
                        "act":"getReward"
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
                        alert("兌換成功");
                        history.go(0);
                }else{
                    alert("發生異常 請重試或聯絡管理員");
                }
            }
        });
    }
}