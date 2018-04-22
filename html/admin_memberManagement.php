<?php
require("adminchecklogin.php");
?>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html" ; charset="utf-8">
    <title></title>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script type="text/javascript" src="../javascript/admin_memberManagement.js"></script>
</head>
<body>
<h1>所有公司列表</h1>
        <form id="form" name="form">
                                    <input name="cname" placeholder="公司名稱">
                                    <input name="account" placeholder="帳號">
                                    <input name="pwd" placeholder="密碼" type="password">
                                    <input id="email" name="email" type='email' placeholder="email">
                                    <input name="industry" placeholder="產業別">
                                    <input id="phone" name="phone" type='tel' placeholder="電話" maxlength="10" minlength="10" >
                                    <select name="status"><option value="0">啟用</option><option value="1">停用</option></select>
                                    <input name="level" placeholder="等級" style="width:50px">
									<button id="add" type="button">新增</button>
		</form>
		<form id="companydata">
			<table id ="shop">
					<thead id="thead"><tr><td></td><td>公司名稱</td><td>帳號</td><td>EMAIL</td><td>產業別</td><td>電話</td><td>狀態</td><td>等級</td></tr>

					</thead>
					<tbody id="tbody">
					</tbody>
			</table>
		</form>
		<button onclick="edit()">確定修改</button>
		<button id="delete" onclick="deleteCompany(this)">刪除</button>
</body>
</html>
