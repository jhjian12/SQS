$(document).ready(function(){
        $(function(){
                _clickTab = "user_system_concept.html" // 找到連結a中的href標籤值
                if("-1"==_clickTab.search("http://")){ //不是http://執行以下
                        $.get(_clickTab,function(data){
                        $("#iframe").html(data);
                        });
                        return false;
                }
        })
});
