<?php
	require("userchecklogin.php");
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>總公司基本資料</title>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript" src="../javascript/shop_basedata.js"></script>
<link rel="stylesheet" type="text/css" href="../css/button.css">
<link rel="stylesheet" type="text/css" href="../css/table.css">
<style type="text/css">
.image{
    text-align:center;
}
img{
    margin:50px;
}
</style>
<body>
<!--
<form id="choose_cp">
總公司帳號:
<input name="account" type="text" value=""/>
<br/>
<button type="submit" name="submit">進入</button>
</form>
 -->
<button id="editmode">修改個人資料</button>
<button id="back">返回</button>
<button id='edit'>送出</button>
<form id="userdata">
        <table class="table table-bordered">
                <thead id="thead">
                <tr><td>帳號</td><td>公司名稱</td><td>電話</td><td>email</td><td>產業</td><td>地址</td><td>等級</td></tr>
                </thead>
                <tbody id="tbody"></tbody>
        </table>
</form>
<br /><br />
<div class="image">
<a href="shop.php" id="analy"><img src="../img/analy.png" width="250" title="數據分析"></a>
<a href="shop_changelevel.php" id="upgrade"><img src="../img/upgrade.png" width="250" title="升級方案"></a>
<a href="pickquestion.php" id="pickup"><img src="../img/pickup.png"  width="250"  title="題庫挑選"></a>
</div>
</body>
</html>
