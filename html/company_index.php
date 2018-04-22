<?php
session_start();
if (! isset($_SESSION["user"]))
        $_SESSION["user"] = "";
//echo $_SESSION["user"];
if ( $_SESSION["user"] < " ") {
        require("company_login.php");
        exit(0);
}else{
	require("shop_frontpage.php");
}
?>
