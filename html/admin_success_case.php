<?php
require("adminchecklogin.php");
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>發布成功案例</title>
</head>
<script type="text/javascript" src="http://code.jquery.com/jquery-1.4.4.min.js"></script>
<!-- <link rel="stylesheet" href="admin_success_case.css"> -->
<script type="text/javascript" src="../javascript/admin_success_case.js"></script>
<body>
<form id ="caseform">
	<div id="listcase"></div>
</form>
<button onclick="updatecase()">更新</button>
<button onclick="deletecase()">刪除</button>
<h1>發布成功案例</h1>
<form id="success_case" name="success_case">
<!-- <h3>開始發布時間:</h3><input type="datetime-local" id="release_start" value="2000-01-01T00:00"></br> -->
<h2>標題:</h2><input type="text" name="title"></br>
<h3>狀態:</h3><select name="status"></br>
	<option value="0">0(未發布)</option>
	<option value="1">1(發布中)</option>
</select></br>
<h3>內文:</h3><textarea name="content"  id="content" cols="50" rows="5"></textarea> <br>
<h3>店家帳號:</h3><select id="shop_account" name="shop_account"></select></br>
<h3>上傳圖片</h3><input accept="image/*" id="uploadImage" type="file"><img id="img" src="">
</form>
<button onclick="upload()">上傳案例</button>
</body>
</html>
