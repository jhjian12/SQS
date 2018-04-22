$(document).ready(function(){
  $("#logout").click(function(){
    $.ajax({
            url:'../model/user/shop/controller.php?act=getuser',
            type: 'GET',
            async:false,
            success:function(r){
                $("#logout").attr("style","display:none");
            },
            error:function(err){
                console.log(err);
            }
    });
  })
  $.ajax({
          url:'../model/user/shop/controller.php?act=getuser',
          type: 'GET',
          async:false,
          success:function(r){
              console.log(r);
              if(r){
                $("#logout").attr("style","display:block");
              }
          },
          error:function(err){
              console.log(err);
          }
  });
  $.ajax({
          url:'../model/user/company/controller.php?act=getuser',
          type: 'GET',
          async:false,
          success:function(r){
              console.log(r);
              if(r){
                $("#logout").attr("style","display:block");
              }
          },
          error:function(err){
              console.log(err);
          }
  });
$(function(){
        $('.nav li[class!="dropdown"]').click(function() {
                        // 找出 li 中的超連結 href(#id)
                var $this = $(this),
                _clickTab = $this.find('a').attr('href'); // 找到連結a中的href標籤值
                if("-1"==_clickTab.search("http://")){ //不是http://執行以下
                        $.get(_clickTab,function(data){
                        $("#iframe").html(data);
                        });
                        return false;
                }
        });
        $('.list-side li').click(function() {
                        // 找出 li 中的超連結 href(#id)
                var $this = $(this),
                _clickTab = $this.find('a').attr('href'); // 找到連結a中的href標籤值
                if("-1"==_clickTab.search("http://")){ //不是http://執行以下
                        $.get(_clickTab,function(data){
                        $("#iframe").html(data);
                        });
                        return false;
                }
        });
})
        $("li.list-member").hover(function(){
                $("ul.list-memberchild >li ").show("fast");
        },
        function(){
                $("ul.list-memberchild >li ").hide("fast");
        })
});
function getCookie(cookieName) {
  var name = cookieName + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
  }
  return "";
}
