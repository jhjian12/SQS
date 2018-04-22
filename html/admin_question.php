<?php
require("adminchecklogin.php");
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<script type="text/javascript" src="http://code.jquery.com/jquery-1.4.4.min.js"></script>
<script src="../javascript/admin_question.js"></script>
<title>SQS</title>
</head>
<body>
<h1>問題管理</h1>
<form id = "questionform">
    <div id="listq">
	</div>
</form>
    </div>
    <button onclick="update()">update</button>
    <button onclick="deleteq()">delete</button>
    <form id="addq">
    <input id="item" name="item" type="text">
    <select id="dimension" name="dimension">
        <option value="有形性">有形性</option>
        <option value="可靠性">可靠性</option>
        <option value="回應性">回應性</option>
        <option value="保障性">保障性</option>
        <option value="關懷性">關懷性</option>
    </select>
    <select id="level" name="level">
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
    </select>
    </form>
    <button onclick="addq()">加入問題</button>
</body>
</html>