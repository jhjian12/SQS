<!-- <?php
// require("adminchecklogin.php");
?> -->
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html" ; charset="utf-8">
    <title></title>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script type="text/javascript" src="../javascript/company_shoplist.js"></script>
</head>
<body id = "body">
<form id="shopdata">
<div id ="shop"></div>
</form>
<button onclick="updateshop()">確定修改</button>
<form id="newshop">
    店名 : 
    <input type="text" name="shopcname" id="shopcname"/></br>
    電話 : 
    <input type="text" name="phone" id="phone"/></br>
    地址 : 
    <input type="text" name="address" id="address"/></br>
    email:
    <input type="email" name="email" id="email"/></br>
    帳號 :
    <input type="text" name="account" id="account"/></br>
    密碼 :
    <input type="password" name="pwd" id="pwd"/></br>
    產業 :
    <select name="industry" id="industry">
        <option value="咖啡店">咖啡店</option>
    </select> </br>
    <button type="submit" name="submit">新增</button>
</form>
</body>
</html>