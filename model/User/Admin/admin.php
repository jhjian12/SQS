<?php
session_start();
require("../../../dbconnect.php");
// 抓問題清單
function addAdmin($account,$pwd) {
        global $conn;
        $account=mysqli_real_escape_string($conn,$account);
        $pwd=mysqli_real_escape_string($conn,$pwd);
        $pwd = password_hash($pwd, PASSWORD_DEFAULT);
        $sql = "select account from admin;";
        $result = mysqli_query($conn,$sql);
        while($rs = mysqli_fetch_assoc($result)){
                if($rs['account']==$account){
                        return 401;
                }
        }
        $sql = "insert into admin (account, pwd) values ('$account','$pwd');";
        if(mysqli_query($conn, $sql))
                return 200;
}
function login($account, $pwd){
        global $conn;
        $sql = "select pwd from admin where account='$account';";
        $result = mysqli_query($conn,$sql);
        $rs = mysqli_fetch_assoc($result);
        if($rs==0)
                //找不到帳號
                return 401;
        $dbpwd = $rs["pwd"];
        if(password_verify($pwd, $dbpwd)){
                $_SESSION["admin"]=$account;
                return 200;
        }
        else
                return 400;
}
?>
