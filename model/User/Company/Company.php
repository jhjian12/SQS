<?php
session_start();
require("../../../dbconnect.php");
// 抓問題清單
function getCompanyList() {
        global $conn;
        $sql = "select cname,account,status,industry,phone,email,level from Company;";
        $result = mysqli_query($conn,$sql);
        $table = array();
        // 將搜尋到的資料一筆一筆放進陣列再轉json
        while($rs = mysqli_fetch_assoc($result)){
                array_push($table,$rs);
        }
        return $table;
}
// 新增公司
/*
        公司中文名
        電話
        電子郵件
        帳號
        密碼
        階級
        產業別
        狀態
*/
function addCompany($cname,$phone,$email,$account,$pwd,$level,$industry,$status) {
        global $conn;
        $cname=mysqli_real_escape_string($conn,$cname);
        $phone=mysqli_real_escape_string($conn,$phone);
        $email=mysqli_real_escape_string($conn,$email);
        $account=mysqli_real_escape_string($conn,$account);
        $pwd=mysqli_real_escape_string($conn,$pwd);
        $pwd = password_hash($pwd, PASSWORD_DEFAULT);
        $level=mysqli_real_escape_string($conn,$level);
        $industry=mysqli_real_escape_string($conn,$industry);
        $status=mysqli_real_escape_string($conn,$status);
        $sql = "select account from company;";
        $result = mysqli_query($conn,$sql);
        while($rs = mysqli_fetch_assoc($result)){
                if($rs['account']==$account){
                        return 401;
                }
        }
        $sql = "insert into company (cname, phone, email, account, pwd, level, industry, status) values ('$cname', '$phone','$email','$account','$pwd','$level','$industry','$status');";
        if(mysqli_query($conn, $sql))
                return 200;
}
// 修改公司資料(公司本身)
/*
        "account":"帳號",
        "newcname":"公司名",
      "newphone":"電話",
      "newemail":"OOO@XXX.com",
*/
function updateCompany($account, $newcname, $newphone,$newemail) {
        global $conn;
        $account=mysqli_real_escape_string($conn,$account);
        $newcname=mysqli_real_escape_string($conn,$newcname);
        $newphone=mysqli_real_escape_string($conn,$newphone);
        $newemail=mysqli_real_escape_string($conn,$newemail);
        if ($account) { //if item is not empty
                // $sql = "update Company set cname = '$newcname' , pwd = '$newpwd' ,status = '$newstatus',industry = '$newindustry' ,phone = '$newphone' ,email = '$newemail' ,level = '$newlevel' , where account = '$account';";
                $sql = "update Company set cname = '$newcname' ,phone = '$newphone' ,email = '$newemail'  where account = '$account';";
                return mysqli_query($conn, $sql);
        } else {
                return false;
        }
}
function updateCompanyByAdmin($account, $newcname, $newphone,$newemail,$newindustry,$newlevel) {
        global $conn;
        $account=mysqli_real_escape_string($conn,$account);
        $newcname=mysqli_real_escape_string($conn,$newcname);
        $newphone=mysqli_real_escape_string($conn,$newphone);
        $newemail=mysqli_real_escape_string($conn,$newemail);
        $newindustry=mysqli_real_escape_string($conn,$newindustry);
        $newlevel=mysqli_real_escape_string($conn,$newlevel);
        if ($account) { //if item is not empty
                $sql = "update Company set cname = '$newcname' ,phone = '$newphone' ,email = '$newemail' ,industry = '$newindustry' ,level = '$newlevel'  where account = '$account';";
                return mysqli_query($conn, $sql);
        } else {
                return false;
        }
}
function delCompany($account) {
        global $conn;
        $account=mysqli_real_escape_string($conn,$account);
        $sql = "delete from Company where account='$account'";
        return mysqli_query($conn,$sql);
}
function login($account, $pwd){
        global $conn;
        $account=mysqli_real_escape_string($conn,$account);
        $pwd=mysqli_real_escape_string($conn,$pwd);
        $sql = "select pwd from Company where account='$account';";
        $result = mysqli_query($conn,$sql);
        $rs = mysqli_fetch_assoc($result);
        if($rs==0)
                //找不到帳號
                return 401;
        $dbpwd = $rs["pwd"];
        if(password_verify($pwd, $dbpwd)){
                $_SESSION["company"]=$account;
                return 200;
        }
        else
                return 400;
}
function getCompanyInfo($account) {
        global $conn;
        $account=mysqli_real_escape_string($conn,$account);
        $sql = "select cname, phone, email, account, level, industry, status,question from Company where account = '$account';";
        $result = mysqli_query($conn,$sql);
        $table = array();
        // 將搜尋到的資料一筆一筆放進陣列再轉json
        while($rs = mysqli_fetch_assoc($result)){
                array_push($table,$rs);
        }
        return $table;
}
//公司升級
function levelChange($account,$level){
        global $conn;
        $account=mysqli_real_escape_string($conn,$account);
        $level=mysqli_real_escape_string($conn,$level);
        $sql = "select level from Company where account='$account';";
        $result = mysqli_query($conn,$sql);
        $rs = mysqli_fetch_assoc($result);
        $newlevel = $rs['level']+$level;
        $sql = "update Company set level = '$newlevel'  where account = '$account';";
        $result = mysqli_query($conn, $sql);
        $sql = "update Shop set level = '$level'  where caccount = '$account';";
        mysqli_query($conn, $sql);
        if($result)
                return 200;
        else
                return 400;
}
//啟停用公司
function changeStatus($account){
        global $conn;
        $sql = "select status from company where account = '$account'";
        $result = mysqli_query($conn,$sql);
        $rs = mysqli_fetch_assoc($result);
        if($rs['status']==0)
                $status = 1;
        else if($rs['status']==1)
                $status = 0;
        $sql = "update company set status = '$status' where account = '$account'";
        if(mysqli_query($conn,$sql))
                return 200;
        else
                return 400;
}
function getuser(){
        return $_SESSION["company"];
}
function selectQuestion($selected,$account) {
        global $conn;
        $selected=mysqli_real_escape_string($conn,$selected);
        if ($selected) { //if item is not empty
                $sql = "update Shop set question = '$selected' where caccount = '$account';";
                mysqli_query($conn, $sql);
                $sql = "update Company set question = '$selected' where account = '$account';";
                return mysqli_query($conn, $sql);
        } else {
                return false;
        }
}
function updatepwd($account,$pwd) {
        global $conn;
        $account=mysqli_real_escape_string($conn,$account);
        $pwd=mysqli_real_escape_string($conn,$pwd);
        $pwd = password_hash($pwd, PASSWORD_DEFAULT);
        if ($account) { //if item is not empty
                $sql = "update Company set pwd = '$pwd' where account = '$account';";
                if(mysqli_query($conn, $sql))
                        return 200; 
        } else {
                return 400;
        }
}
?>
