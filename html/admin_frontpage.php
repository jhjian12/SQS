<?php
require("adminchecklogin.php");
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>SQS</title>
<link rel="stylesheet" href="http://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
<link rel="stylesheet" href="../css/admin_frontpage_opendoc.css">
<script src="http://code.jquery.com/jquery-3.2.1.js"></script>
<script src="../javascript/opendoc.js"></script>

</head>
<h1>服務品質檢核管理者系統</h1>
<!-- <h3><a href="">管理者登入</a></h3> -->
<body>
<table class="mmuser">
<col class="sa" />
<col class="sb" />
<tr><td id="sidebar">
<ul class="list-side">
<li><a href="admin_question.php" >問題管理</a></li>
<li><a href="admin_memberManagement.php" >會員管理</a></li>
<li><a href="admin_success_case.php" >成功案例管理</a></li>
<li><a href="admin_notice.php" >公告管理</a></li>
<li><a href="reply_QA.php" >問題回應</a></li>
<li><a href="FQaddForm.php" >常見QA管理</a></li>
</ul>
<ul>
<li><a href="logout.php" >登出</a></li>
</ul>
</td>
<td id="cmmin">
<div id="iframe">
<!--jquery 插入html 位址-->
</div>
</td></tr></table>
</body>
</html>
