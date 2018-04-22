<?php
	session_start();
if (! isset($_SESSION["company"]))
        $_SESSION["company"] = "";
if (! isset($_SESSION["shop"]))
        $_SESSION["shop"] = "";
//echo $_SESSION["user"];
if ( $_SESSION["company"] < " "&& $_SESSION["shop"] < " ") {
        require("user_login.html");
        exit(0);
}else if($_SESSION["company"] >= " "){
	//echo $_SESSION["company"];
	header("Location:company_basedata.php");
}else if($_SESSION["shop"] >= " "){
	//echo $_SESSION["company"];
	header("Location:shop_basedata.php");
}
?>