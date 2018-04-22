<?php
require("adminchecklogin.php");
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>回應QA</title>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="../javascript/replyQA.js"></script>
</head>
<body>
        <form id="form">
        <table>
                <thead id="thead">
                        <td>編號</td>
                        <td>問題</td>
                        <td>Email</td>
                        <td>問題發送時間</td>
                        <td>回覆</td>
                </thead>
                <tbody id="tbody"></tbody>
        </table>
        </form>
        <button onclick="reply()" type="button">寄送</button>
<br/>
</body>
</html>
