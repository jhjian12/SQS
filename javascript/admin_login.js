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
$(document).ready(function(){
    $("#adlogin").submit(function(event){
        event.preventDefault();
        var form=$("#adlogin").serializeArray();
        var data = objectifyForm(form,"login");
        //console.log(form);
        console.log(JSON.stringify(data));
        $.ajax({
            type :"POST",
            url  :'../model/user/admin/controller.php',
            data :JSON.stringify(data),
            async:false,
            success : function(data) {
                console.log(data);
                var obj=eval(data); 
                if(obj[0]['status'] == 200){
                    document.location.href="admin_frontpage.php";
                } else if(obj[0]['status']==400){
                    alert("error!Please login again!");
                } else if(obj[0]['status']==401){
                    alert("No this account! Please register for an account!");
                }
            },
            error : function(data) {
                alert("Server Error");
                //console.log("error");
            },
        });
    });
});




/*$(document).ready(function(){
    $("#login").click(function(event){
        $.ajax({
            type :"POST",
            url  : "",
            data : { 
                account:$("#account").val(), password:$("#password").val(),                         
            },
            async:false,
            success : function(data) {
                console.log(data);
            },
            error : function(data) {
                console.log(data);
            },
        });
    });
});
*/