<?php
	session_start();
if (! isset($_SESSION["user"]))
        $_SESSION["user"] = "";
//echo $_SESSION["user"];
if ( $_SESSION["user"] < " ") {
        require("company_login.html");
        exit(0);
}else{
	header("Location:company_frontpage.php");
}
?>