$(document).ready(function(){
    $.ajax({
        url:'../model/sucessedcase/controller.php?act=getData',
        // contentType:"application/json",
        type: 'GET',
        async:false,
        success: function(result) {
            var obj = eval (result);
            console.log(obj[1]);
            var div = document.getElementById('qq');
            if(obj[0]['status']==200){
                for(var i=1;i<obj.length;i++){
                    var row = document.createElement('div');
                    row.setAttribute("class","row");
                    var table=document.createElement('table');
                    // table.setAttribute("border","3");
                    div.appendChild(table);
                    div.setAttribute("class","well");
                    var worddiv = document.createElement('div');
                    var newtr1=document.createElement('tr');
                    newtr1.setAttribute("style","text-align:center");
                    worddiv.setAttribute("class","col-sm-6 alert alert-info");
                    newtr1.setAttribute("width","auto");
                    newtr1.setAttribute("class","alert alert-warning");
                    newtr1.innerHTML=obj[i]['shop_account'];
                    row.appendChild(worddiv);
                    table.appendChild(row);


                    var newtr2=document.createElement('tr');
                    newtr2.setAttribute("style","text-align:center");
                    newtr2.setAttribute("width","auto");
                    newtr2.innerHTML=obj[i]['content'];
                    // table.appendChild(newtr2);
                    worddiv.appendChild(newtr1);
                    worddiv.appendChild(newtr2);


                    var newtr=document.createElement('div');
                    newtr.setAttribute("style","text-align:center");
                    newtr.setAttribute("class","col-sm-6");
                    // newtr.setAttribute("width","auto");
                    // newtr.setAttribute("height","auto");
                    var img = document.createElement("img");
                    img.setAttribute("src","../"+obj[i]['src']);
                    img.setAttribute("width","400px");
                    img.setAttribute("class","img-thumbnail");
                    newtr.appendChild(img);
                    // newtr.innerHTML=obj[i]['picture'];
                    row.appendChild(newtr);

                }
            }
            console.log(obj);
            //console.log(1);
            //console.log(obj);
            //console.log(obj)
            /*for (var i = 0; i < obj.length; i++) {
            $("#main").append(obj[i].item+" "+obj[i].dimension+" "+obj[i].level+"<br>");
            };*/
        },
        error: function(err) {
            console.log('shit!');
            console.log(err);
        }
    });

});
