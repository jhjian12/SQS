function initialize(){
    //listnotice
    var category = document.getElementById('listcategory').value;
    console.log(category);
    var result = [{"act":"getData"}];
    var data={};
    data.category = category;
    result.push(data);
    //console.log(JSON.stringify(result));
    $.ajax({
            url:'../model/announcement/controller.php?',
            type: 'POST',
            async:false,
            data :JSON.stringify(result),
            success:function(result){
            		//console.log(result);
                    $('#listnotice').html("");
                    var table = $('<table id="table" cellpadding="8"></table>');
                    var object = eval(result);
                    var th1 = $('<th></th>').text("公告日期");
                    var th2 = $('<th></th>').text("分類");
                    var th3 = $('<th></th>').text("標題");
                    var row = $('<tr></tr>').append(th1).append(th2).append(th3);
                    table.append(row);
                    for(var i = 1;i<object.length;i++){
                            var time = $('<td></td>').text(new Date(object[i].add_time).toLocaleDateString());
                            if(object[i].category=="system")
                                var td1 = $('<td></td>').text("系統公告");
                            if(object[i].category=="learn")
                                var td1 = $('<td></td>').text("小知識系列");
                            if(object[i].category=="other")
                                var td1 = $('<td></td>').text("其他");
                            var td2 = $('<td class="notice"></td>').html("<a href='notice_content.html?id="+object[i].id+"'>"+object[i].subject+"</a>");
                            row = $('<tr></tr>').append(time).append(td1).append(td2);
                            table.append(row);
                    }
                    $('#listnotice').append(table);
					$('.notice a').click(function() {
							// 找出 li 中的超連結 href(#id)
							var $this = $(this),
							_clickTab = $this.attr('href'); // 找到連結a中的href標籤值
							var notice = _clickTab.split("?")[1].split("=")[1];
							document.cookie = "notice="+notice;
							if("-1"==_clickTab.search("http://")){ //不是http://執行以下
									$.get(_clickTab,function(data){
									$("#iframe").html(data);
									});
									return false;
							}
					})

            },
            error:function(err){
                console.log(err);
            }
    });
}
$(document).ready(function(){
    initialize();
})
