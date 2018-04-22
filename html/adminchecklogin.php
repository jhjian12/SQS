<?php
session_start();
if (! isset($_SESSION["admin"]))
        $_SESSION["admin"] = "";
//echo $_SESSION["user"];
if ( $_SESSION["admin"] < " ") {
        header("Location: admin_login.php");
        exit(0);
}
?>