<?php
session_start();
if (! isset($_SESSION["company"]))
        $_SESSION["company"] = "";
if (! isset($_SESSION["shop"]))
        $_SESSION["shop"] = "";
//echo $_SESSION["user"];
if ( $_SESSION["company"] < " "&&$_SESSION["shop"] < " ") {
		// echo "乾";
		header("Location: user_login.php");
        exit(0);
}
?>