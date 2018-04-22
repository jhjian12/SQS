<?php
	require("userchecklogin.php");
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<link rel="stylesheet" href="http://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
<script src="http://code.jquery.com/jquery-3.2.1.js"></script>
<link rel="stylesheet" type="text/css" href="../css/button.css">
<link rel="stylesheet" type="text/css" href="../css/input.css">
<script
  src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
  integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
  crossorigin="anonymous"></script>
<title>升級方案需求寄送</title>
</head>
<script type="text/javascript" src="../javascript/shop_changelevel.js"></script>
<body>
<div class="row">

<div class="col-sm-6"><div class="panel panel-default">
  <div class="panel-heading"><h2>我想變更問卷等級</h2></div>
  <div class="panel-body"><div class="alert alert-success">
<h3>請注意:變更等級將影響現有權益</h3>
<h3>合約內容需重新再做擬定</h3>
</div>
<!-- <h4>欲將合約改為等級</h4> -->
<h3>總公司account:</h3><div class="alert alert-info" id="chosen_company" ></div>
<h3>目前等級</h3><div class="alert alert-info" id="chosen_company_level"></div>
<h3>升級方案</h3><div class="alert alert-warning"><select class="form-control" id="newcompany_level" name="newcompany_level"></select></div>
<h3>銀行帳戶末5碼:</h3><div class="alert alert-danger"><input id="bank" name="bank" type="text" min="0" max="99999" pattern="[0-9]{5}" maxlength="5" title="five numbers are required."></div>
<input type="radio" required/></input><div align="center" >資料已填妥，並確認無誤</div>
<button class="btn btn-danger" type="submit" onclick="upgrade()">確定變更</button>
<p>按下"確認變更"即發送請求，將於數天內為您處理</p>
<!-- <div id="test">5</div> -->
</div></div>
</div>


<div class="col-sm-6">
    <table border="5" style="font-size: 20px">
        <tr><td></td><td> Level 1 </td><td> Level 2 </td><td> Level 3 </td></tr>
        <tr><td>問卷的問項數量</td><td> 基礎題庫 </td><td> 基礎題庫<br /> +<br /> 進階題庫 </td><td> 基礎題庫<br /> +<br /> 進階題庫 </td></tr>
        <tr><td>進階題庫挑題權限</td><td> ✕ </td><td> ✓ </td><td> ✓ </td></tr>
        <tr><td>問題數量</td><td> 23 </td><td> 30 </td><td> 30 </td></tr>
        <tr><td>經統計整合的專業問項</td><td> ✓ </td><td> ✓ </td><td> ✓ </td></tr>
        <tr><td>QRcode卡片張數</td><td> 500 </td><td> 1500 </td><td> 3000 </td></tr>
        <tr><td>使用QRcode支援問卷回覆</td><td> ✓ </td><td> ✓ </td><td> ✓ </td></tr>
        <tr><td>自動生成圖表</td><td> ✓ </td><td> ✓ </td><td> ✓ </td></tr>
        <tr><td>圖表匯出<li>JPEG</li><li>PNG </li><li>PDF </li></td><td> ✓ </td><td> ✓ </td><td> ✓ </td></tr>
    </table>
</div>
</div>
</div>
</body>
</html>