<?php
	require("userchecklogin.php");
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>升級需求</title>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="../javascript/pickquestion.js"></script>
<style type="text/css">
</style>
</head>
<body>
        <h1 id="description"></h1>
        <form id="form">
        <table>
                <thead id="thead">
                        <td>編號</td>
                        <td>問題</td>
                </thead>
                <tbody id="tbodybasic"><tr><td>基礎題庫</td></tr></tbody>
                <tbody id="tbodyadvanced"><tr><td>進階題庫</td></tr></tbody>
        </table>
        <button id="submit" type="submit">送出</button>
        </form>
<br/>
</body>
<!-- <link rel="stylesheet" type="text/css" href="../css/table.css"> -->
</html>
