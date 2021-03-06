var user;
var userdata;
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
$(document).ready(function(){
    function getJson(){
        var company=user;
        var data = [];
        var obj ={};
        obj.act="showCompanyInfo";
        data.push(obj);
        var obj = {};
        obj.account = company;
        data.push(obj);
        return data;
    }
    function initialize(){
        $.ajax({
            url:'../model/user/company/controller.php',
            data:JSON.stringify(getJson()),
            type: 'POST',
            async:false,
            success:function(r){
                $("#tbody").html("");
                $("#back").hide();
                $("#edit").hide();
                $("#editmode").show();
                var result = eval(r);
                userdata=result;
                $("#tbody").append("<td>"+result[1].account+"</td>");
                $("#tbody").append("<td>"+result[1].cname+"</td>");
                $("#tbody").append("<td>"+result[1].phone+"</td>");
                $("#tbody").append("<td>"+result[1].email+"</td>");
                $("#tbody").append("<td>"+result[1].industry+"</td>");
                $("#tbody").append("<td>"+result[1].level+"</td>");
            },
            error:function(err){
                console.log(err);
            }
        });
    }
    $("#editmode").click(function(){
        $("#back").show();
        $("#edit").show();
        $("#editmode").hide();
        $("#tbody").html("");
        $("#tbody").append("<td>"+userdata[1].account+"</td>");
        $("#tbody").append("<td><input name='newcname' value='"+userdata[1].cname+"'></td>");
        $("#tbody").append("<td><input name='newphone' value='"+userdata[1].phone+"'></td>");
        $("#tbody").append("<td><input name='newemail' value='"+userdata[1].email+"'></td>");
        $("#tbody").append("<td>"+userdata[1].industry+"</td>");
        $("#tbody").append("<td>"+userdata[1].level+"</td>");
    });
    $("#back").click(function(){
        initialize();
    });
    $("#edit").click(function(){
        var data =objectifyForm($("#userdata").serializeArray(),"updateCompany");
        data[1].account=userdata[1].account;
        data[1].industry=userdata[1].industry;
        data[1].level=userdata[1].level;
        $.ajax({
                url:'../model/user/company/controller.php',
                type: 'POST',
                data:JSON.stringify(data),
                async:false,
                success:function(r){
                    var result = eval(r);
                    console.log(result[0].status);
                    if(result[0].status==200){
                        initialize();
                    }
                },
                error:function(err){
                    console.log(err);
                }
        });
    });
    $("#analy").click(function(){
        var _clickTab = "shop.php";
        if("-1"==_clickTab.search("http://")){ //不是http://執行以下
                $.get(_clickTab,function(data){
                $("#iframe").html(data);
                });
                return false;
        }
    })
    $("#upgrade").click(function(){
        var _clickTab = "shop_changelevel.php";
        if("-1"==_clickTab.search("http://")){ //不是http://執行以下
                $.get(_clickTab,function(data){
                $("#iframe").html(data);
                });
                return false;
        }
    })
    $("#pickup").click(function(){
        var _clickTab = "pickquestion.php";
        if("-1"==_clickTab.search("http://")){ //不是http://執行以下
                $.get(_clickTab,function(data){
                $("#iframe").html(data);
                });
                return false;
        }
    })
    $.ajax({
            url:'../model/user/company/controller.php?act=getuser',
            type: 'GET',
            async:false,
            success:function(r){
                user=r;
            },
            error:function(err){
                console.log(err);
            }
    });
    initialize();
})
