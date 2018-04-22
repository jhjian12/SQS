var company;
function change_level(){
    $("#newcompany_level option").remove();
    var original = Number(document.getElementById('chosen_company_level').innerHTML);
    //console.log(document.getElementById('chosen_company_level').innerHTML);
    var i;
    for(i=1;i<=3;i++){
        if(original!=i&&original<3){
            $("#newcompany_level").append($("<option></option>").attr("value",i).text(i));
        }
    }
}
function upgrade() {
    var result = [{"act":"levelup"}];
    var data = {};
    var account = company ;
    var level = document.getElementById('newcompany_level').value;
    var bank = document.getElementById('bank').value;
    data.account=account;
    data.level=level;
    data.bank=bank;
    data.email="1123";
    result.push(data);
    console.log(JSON.stringify(result));
    $.ajax({
        type: 'POST',
        url:'../model/contact/controller.php',
        // contentType:"application/json"
        data:JSON.stringify(result),
        async:false,
        success:function(r){
                var result=eval(r);
                alert(1);
                console.log(r);
        },
        error:function(err){
        }
    });

}
function get_account_level(){
    document.getElementById("chosen_company").innerHTML=company;//將選到的company_account寫入<div id="chosen_company">
    var result = [{"act":"showCompanyInfo"}]
    var data = {};
    var company_account = company;
    data.account = company_account;
    //console.log(company_account);
    result.push(data);
    console.log(JSON.stringify(result));
    $.ajax({
        url:'../model/user/company/controller.php',
        type: 'POST',
        //contentType:"application/json",
        async:false,
        data:JSON.stringify(result),
        success:function(r){    
                var result=JSON.parse(r);
                console.error(result);
                if(result[0]['status']==200){
                    // alert("success");
                    $("#chosen_company_level").text(result[1]['level']);
                }
                
        },
        error:function(err){
            console.log(err);
            alert("error");
        }
    }); 
}
$(document).ready(function(){
    $.ajax({
            url:'../model/user/company/controller.php?act=getuser',
            type: 'GET',
            async:false,
            success:function(r){
                company=r;
            },
            error:function(err){
                console.log(err);
            }
        });
    if(company){
        get_account_level();
        change_level();
    }else{
        document.getElementById("iframe").innerHTML="您無權修改方案，請洽公司或管理員";
    }
})