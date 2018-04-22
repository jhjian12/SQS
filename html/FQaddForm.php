<?php
require("adminchecklogin.php");
?>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html" ; charset="utf-8">
    <title></title>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script type="text/javascript" src="../javascript/FQadd.js"></script>
</head>
<body>
<button id="showadd">新增常見QA</button>
<form id="addFQ">
    <table>
    Question: <input type="text" name="question" id="question"/></br>
    reply: <tr><td><textarea name="reply" id="reply" cols=40 rows=10></textarea></td></tr> </br>
    </table>
    <button id="go">submit</button>
</form>
<form id="questiondata" name="questiondata">
<table>
        <thead><tr><td></td><td>編號</td><td>問題</td><td>回應</td><td>最後修改日期</td><td></td></tr></thead>
        <tbody id="tbody"></tbody>
</table>
<button onclick="update(this)" type="button">確認送出</button>
<button id="deletebtn" onclick="deleteFQ()">刪除</button>
</form>
</body>
</html>
