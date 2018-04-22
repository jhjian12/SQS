function test(){
    var obj={};
    obj.act="getData";
    var obj2={};
    obj2.type="admin";
    obj2.status="completed";
    var arr=[];
    arr.push(obj);
    arr.push(obj2);
    return JSON.stringify(arr);
}
$(document).ready(function(){
    $.ajax({
        url:'../model/QA/controller.php',
        // contentType:"application/json",
        data:test(),
        type: 'POST',
        async:false,
        success: function(result) {
            var obj = eval (result);
            
            var div = document.getElementById('ww');
            if(obj[0]['status']==200){
                for(var i=1;i<obj.length;i++){
                    var table=document.createElement('table');
                    div.appendChild(table);
                    //table.setAttribute("style","border:2px solid");
                    //table.setAttribute("style","border:2px solid;border-radius:25px");
                    table.setAttribute("width","100%");
                    var newtr=document.createElement('tr');
                    //newtr.setAttribute("width","auto");
                    newtr.setAttribute("text-align","left");
                    newtr.innerHTML="Q:"+obj[i]['question'];                    
                    table.appendChild(newtr);
                    
                    /*var hr=document.createElement('hr');
                    hr.setAttribute("size","10");                    
                    table.appendChild(hr);*/
                                        
                    var newtr=document.createElement('tr');
                    newtr.innerHTML="A:"+obj[i]['reply'];
                    //newtr.setAttribute("style","direction:rtl");
                    newtr.setAttribute("style","background-color:#CCDDFF");
                    table.appendChild(newtr);
                    
                    var newbr=document.createElement('br');
                    div.appendChild(newbr);
                    /*var hr=document.createElement('hr');
                    hr.setAttribute("size","10");
                    //hr.setAttribute("color","#77DDFF");
                    div.appendChild(hr);*/
                }
            }
            
        },
        error: function(err) {
            console.log('shit!');
            console.log(err);
        }
    });
                    
});