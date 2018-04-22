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
function checkemail(){
    var tmp = document.getElementById('email').value;
    var emailRule = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if(tmp.search(emailRule)==-1){
        alert("郵件格式錯誤!");
        return 0;
    }
    return 1;
}
$(document).ready(function(){
    $("#Question").submit(function(event){
        event.preventDefault();
        if(checkemail()==1){
            var form=$("#Question").serializeArray();
            var data = objectifyForm(form,"contactUs");
            //console.log(JSON.stringify(data));
            $.ajax({
                    url:'../model/contact/controller.php',
                    data:JSON.stringify(data),
                    type: 'POST',
                    async:false,
                    success: function(result) {
                            console.log('woohoo!');
                            console.log(result);
                            alert('傳送成功，請靜候消息');
                    },
                    error: function(err) {
                            console.log('shit!');
                            console.log(err);
                    }
            });
        }
    });
    $("#showQuestionList").click(function(event){
                $.ajax({
                        url:'../model/question/controller.php?act=showQuestionList',
                        // contentType:"application/json",
                        type: 'GET',
                        async:false,
                        success: function(result) {
                                var obj = eval (result);
                                if(obj[0]['status']==200)
                                    alert("Success!");
                                if(obj[0]['status']==400)
                                    alert("Fail!");
                                if(obj[0]['status']==500)
                                    alert("Server is busy!");

                        },
                        error: function(err) {
                                console.log('shit!');
                                console.log(err);
                        }
                });
                event.preventDefault();
    });
});
$(".sendmess").click(function() {
    $(".bar").css("animationName", "send");
    SendMess();
})

function SendMess() {
    setTimeout(function() {
        $(".l1").css("display", "none");
        $(".l2").css("display", "none");
        $(".mailinput").css("display", "none");
        $(".messtxt").css("display", "none");
        $(".sendmess").css("display", "none");

        $(".success").css("display", "inline");
        $(".closemess").css("display", "inline");
    }, 1500);
}

$(".closemess").click(function() {
    $(".bar").css("animationName", "none");
    $(".l1").css("display", "inline");
    $(".l2").css("display", "inline");
    $(".mailinput").css("display", "inline");
    $(".messtxt").css("display", "inline");
    $(".sendmess").css("display", "inline");

    $(".success").css("display", "none");
    $(".closemess").css("display", "none");
    
    $(".mailinput").val("");
    $(".messtxt").val("");
    console.log(123);
})