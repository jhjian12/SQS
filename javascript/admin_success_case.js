var img;
$(document).ready(function(){
initialize();
});
function initialize(){
    count=0;
    //shop initialize
    $.ajax({
            type: 'GET',
            url:'../model/user/shop/controller.php?act=listShop',
            // contentType:"application/json"
            async:false,
            success:function(r){
                    var result=eval(r);
                    for(var i=1; i<result.length; i++){
                        $("#shop_account").append($("<option></option>").attr("value", result[i]['account']).text(result[i]['account']));
                    }
            },
            error:function(err){
            }
    });
    //listcase
    $.ajax({
            url:'../model/sucessedcase/controller.php?act=getData',
            type: 'GET',
            async:false,
            success:function(result){
                    $('#listcase').html("");
                    // console.log(result);
                    var table = $('<table border="1"></table>');
                    var object = eval(result);
                    // console.log(object);
                    var title_checkbox = $('<th></th>').text("勾選");
                    var title_id = $('<th></th>').text("id");
                    var title_title = $('<th></th>').text("標題");
                    var title_content = $('<th></th>').text("內文");
                    var title_addtime = $('<th></th>').text("加入時間");
                    var title_status = $('<th></th>').text("狀態");
                    var title_shopacc = $('<th></th>').text("帳戶");
                    var title_industry = $('<th></th>').text("產業別");
                    var title_edit = $('<th></th>').text("修改");
                    var title_row = $('<tr></tr>').append(title_checkbox).append(title_id).append(title_title).append(title_content).append(title_addtime).append(title_status).append(title_shopacc).append(title_industry).append(title_edit);
                    table.append(title_row);
                    for(var i = 1;i<object.length;i++){
                            var td = $('<td></td>').text(object[i].id);
                            var td1 = $('<td id=title'+object[i].id+'></td>').text(object[i].title);
                            var td2 = $('<td id=content'+object[i].id+'></td>').text(object[i].content);
                            var td3 = $('<td id=add'+object[i].id+'></td>').text(object[i].add_time);
                            var td4 = $('<td id=status'+object[i].id+'></td>').text(object[i].status);
                            var td5 = $('<td id=shop_acc'+object[i].id+'></td>').text(object[i].shop_account);
                            var td6 = $('<td id=industry'+object[i].id+'></td>').text(object[i].industry);
                            var td7 = $('<td><button type=button onclick=edit(this.id) id=q'+object[i].id+'>修改</button></td>');
                            var tr8 = $('<td><input type="checkbox" id=choice'+object[i].id+'></td>');
                            var row = $('<tr></tr>').append(tr8).append(td).append(td1).append(td2).append(td3).append(td4).append(td5).append(td6).append(td7);
                            table.append(row);
                    }
                    $('#listcase').append(table);

            },
            error:function(err){
                console.log(err);
            }
    });
}
function objectifyForm(formArray,actvalue) {//serialize data function
        var returnArray=[];
        var actObject = {};
        actObject.act=actvalue;
        var formObject = {};
        for (var i = 0; i < formArray.length; i++){
            formObject[formArray[i]['name']] = formArray[i]['value'];
        }
        formObject.img = img;
        returnArray.push(actObject);
        returnArray.push(formObject);
        // returnArray.push(e.target.result);
        //console.log(returnArray);
        return returnArray;
}
function updatecase(){
    var result=[{"act":"update"}];
        var form=document.forms["caseform"];//取form的name
        if(count==1){
            var data = {};
            data.id = form.elements.id.value; 
            data.title = form.elements.newtitle.value; 
            data.status = form.elements.newstatus.value; 
            data.shop_account = form.elements.newshop_account.value; 
            data.content = form.elements.newcontent.value; 
            result.push(data);
        }else{
            for (var i = 0; i < form.elements.newtitle.length; i++) {
            var data = {};
            data.id = form.elements.id[i].value; 
            data.title = form.elements.newtitle[i].value; 
            data.status = form.elements.newstatus[i].value; 
            data.shop_account = form.elements.newshop_account[i].value; 
            data.content = form.elements.newcontent[i].value; 
            result.push(data);
            }   
        }
        // console.log(result);
    $.ajax({
            url:'../model/sucessedcase/controller.php',
            type: 'POST',
            //contentType:"application/json",
            async:false,
            data:JSON.stringify(result),
            success:function(r){
                    var result=JSON.parse(r);
                    // console.log(result);
                    if(result[0]['status']==200)
                        alert("success");
            },
            error:function(err){
                console.log(err);
                alert("error");
            }
    });
    initialize();
}
function readImage(input) {
    //console.log(input);
      if ( input.files && input.files[0] ) {
        var FR= new FileReader();
        FR.onload = function(e) {
          // e.target.result = base64 format picture
          $('#img').attr( "src", e.target.result );
          img= e.target.result;
        };
        FR.readAsDataURL( input.files[0] );
      }
    }
function upload(){
    var result=[{"act":"add"}];
    //document.getElementById('uploadImage').value
    var form=document.forms["success_case"];
    // var data = objectifyForm(form,"add");
    //console.log(form);
    var data={};
    var title=form.elements.title.value;
    var status=form.elements.status.value;
    var content=form.elements.content.value;
    var shop_account=form.elements.shop_account.value;
    var imgname = document.getElementById('uploadImage').value;
    imgname = imgname.split(/(\\|\/)/g).pop()
    //console.log(imgname);
    data.title=title;
    data.status=status;
    data.content=content;
    data.shop_account=shop_account;
    data.img = img;
    data.imgname = imgname;
    result.push(data);
    //console.log(JSON.stringify(result));
    $.ajax({
            type: 'POST',
            url:'../model/sucessedcase/controller.php',
            // contentType:"application/json",
            data:JSON.stringify(result),
            async:false,
            success:function(r){
                    //console.log(r);
                    var result=eval(r);
                    if(result[0]['status']==200){
                        alert("success");
                        window.location.reload();
                    }
                    if(result[0]['status']==400)
                        alert("add failed");
            },
            error:function(err){
                console.log("qqqqqqqq");
            }
    });
    initialize();
}

function deletecase(){
    var result=[{"act":"del"}];
    for (var i = 0; i < 1000; i++) {
        var check=document.getElementById("choice"+i);
            //console.log(check);
        if(check!=null){
            if(check.checked==true){
                //console.log(check.id);
                var str = check.id;
                //console.log(str);
                var data={};
                data.id=str.slice(6,10);
                result.push(data);
            }
        }
    }
    //console.log(JSON.stringify(result));
    $.ajax({
            url:'../model/sucessedcase/controller.php',
            type: 'POST',
            contentType:"application/json",
            async:false,
            data:JSON.stringify(result),
            success:function(r){
                    var result=JSON.parse(r);
                    //console.log(r);
                    //console.log(result);
                    if(result[0]['status']==200){
                        alert('SUCCESS');
                        initialize();
                    }
            },
            error:function(err){
                console.log("why");
            }
    });
}
var count =0;
function edit(id){//修改問題    
    count++;    
    var getid = document.getElementById(id);
    var getid_id = document.getElementById(id).id;
    var num = getid_id.substr(1);
    
    var titleid = document.getElementById('title'+num);
    var contentid = document.getElementById('content'+num);
    var statusid = document.getElementById('status'+num);
    var shop_accid = document.getElementById('shop_acc'+num);
    
    
    var gettitle = document.getElementById('title'+num).innerHTML;
    var getcontent = document.getElementById('content'+num).innerHTML;
    var getstatus = document.getElementById('status'+num).innerHTML;
    var getshop_acc = document.getElementById('shop_acc'+num).innerHTML;
    var getindustry = document.getElementById('industry'+num).innerHTML;
    var title=document.createElement("input");
    var id=document.createElement("input");
    id.setAttribute("type","hidden");
    id.setAttribute("value",num);
    id.setAttribute("name","id");
    var status=document.createElement("select");
    var content=document.createElement("input");
    var shop_account=document.createElement("select");
    //var industry = document.createElement("select");
    var form =document.createElement("div");
    getid.parentNode.appendChild(form);
    title.setAttribute("name","newtitle");
    title.setAttribute("value",gettitle);
    status.setAttribute("name","newstatus");
    content.setAttribute("name","newcontent");
    content.setAttribute("value",getcontent);
    shop_account.setAttribute("name","newshop_account");
    shop_account.setAttribute("id","newshop_account"+num);
    shop_account.setAttribute("value",getshop_acc);
    
    while(titleid.hasChildNodes()){
        titleid.removeChild(titleid.firstChild);
    }
    while(contentid.hasChildNodes()){
        contentid.removeChild(contentid.firstChild);
    }
    while(statusid.hasChildNodes()){
        statusid.removeChild(statusid.firstChild);
    }
    while(shop_accid.hasChildNodes()){
        shop_accid.removeChild(shop_accid.firstChild);
    }
    
    titleid.appendChild(title);
    contentid.appendChild(content);
    shop_accid.appendChild(shop_account);
    statusid.appendChild(status);
    form.appendChild(id);
    //industry.setAttribute("id","newindustry");
    //form.appendChild(industry);
    getid.parentNode.removeChild(getid);
    var sopt0 = document.createElement("option");
    sopt0.text=(0);
    sopt0.value=(0);
    status.options.add(sopt0);
    var sopt1 = document.createElement("option");
    sopt1.text=(1);
    sopt1.value=(1);
    status.options.add(sopt1);
    if(getstatus=='0'){
        sopt0.setAttribute("selected","true");
    }else if(getstatus=='1'){
        sopt1.setAttribute("selected","true");
    }
    //document.getElementById("newshop_account").value=getshop_acc;
    //console.log(getshop_acc);
    $.ajax({
            type: 'GET',
            url:'../model/user/shop/controller.php?act=listShop',
            // contentType:"application/json"
            async:false,
            success:function(r){
                    var result=eval(r);
                    for(var i=1; i<result.length; i++){
                        $("#newshop_account"+num).append($("<option></option>").attr("value", result[i]['account']).text(result[i]['account']));
                    }
                    $('#newshop_account'+num).val(getshop_acc);
            },
            error:function(err){
            }
    });
}

$(document).ready(function(){
    $("#uploadImage").change(function(){
      readImage( this );
    });
    function readImage(input) {
      if ( input.files && input.files[0] ) {
        var FR= new FileReader();
        FR.onload = function(e) {
          // e.target.result = base64 format picture
          $('#img').attr( "src", e.target.result );
          // console.log(e.target.result);
          img = e.target.result;
        };
        FR.readAsDataURL( input.files[0] );
      }
    }
});
