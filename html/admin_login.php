<?php
	session_start();
if (! isset($_SESSION["admin"]))
        $_SESSION["admin"] = "";
//echo $_SESSION["user"];
if ( $_SESSION["admin"] < " ") {
        require("admin_login.html");
        exit(0);
}else{
	header("Location:admin_frontpage.php");
}
?>