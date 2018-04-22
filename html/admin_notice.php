<?php
require("adminchecklogin.php");
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>發布公告</title>
<script type="text/javascript" src="http://code.jquery.com/jquery-1.4.4.min.js"></script>
<script type="text/javascript" src="../javascript/admin_notice.js"></script>
</head>
<body>
<select id="listcategory" onchange="initialize()">
	<option value="">全部公告</option>
	<option value="system">系統公告</option>
	<option value="learn">小知識系列</option>
	<option value="other">其他</option>
</select>
</br>
<form id='noticeform' name='noticeform'>
<div id="listnotice">

</div>
</form>

<button id="update_notice" onclick="update_notice()">更新</button>
<button id="delete_notice" onclick="delete_notice()">刪除</button>
<h1>發布公告</h1>
<form id="announcement" name="announcement">
<h3>開始發布時間:</h3><input type="datetime-local" id="release_start" value="2000-01-01T00:00"></br>
<h3>結束發布時間:</h3><input type="datetime-local" id="release_end" value="2000-01-01T00:00"></br>
<h3>主旨:</h3><input type="text" id="subject"></br>
<h3>公告分類:</h3><select id="category">
	<option value="system">系統公告</option>
	<option value="learn">小知識系列</option>
	<option value="other">其他</option>
</select></br>
<h3>內容:</h3><textarea id="content" cols="50" rows="5"></textarea></br>
</form>
<button onclick="upload()">發布公告</button>
</body>
</html>
