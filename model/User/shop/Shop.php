<?php
session_start();
require("../../../dbconnect.php");
function getShopList() {
        global $conn;
        $sql = "select shopcname, phone, email, account, level, industry, status, caccount, address from shop;";
        $result = mysqli_query($conn,$sql);
        $table = array();
        // 將搜尋到的資料一筆一筆放進陣列再轉json
        while($rs = mysqli_fetch_assoc($result)){
                array_push($table,$rs);
        }
        return $table;
}
function getShopInfo($account) {
        global $conn;
        $sql = "select shopcname, phone, email, account, level, industry, status, caccount, address, question from shop where account = '$account';";
        $result = mysqli_query($conn,$sql);
        $table = array();
        // 將搜尋到的資料一筆一筆放進陣列再轉json
        while($rs = mysqli_fetch_assoc($result)){
                array_push($table,$rs);
        }
        return $table;
}
//依據公司找尋店家資料
function getShopByCompany($account) {
        global $conn;
        $sql = "select shopcname, phone, email, account, level, industry, status, caccount, address from shop where caccount = '$account';";
        $result = mysqli_query($conn,$sql);
        $table = array();
        // 將搜尋到的資料一筆一筆放進陣列再轉json
        while($rs = mysqli_fetch_assoc($result)){
                array_push($table,$rs);
        }
        return $table;
}
// 新增店家 caccount為總公司帳號 必須要有才能新增
function addShop($shopcname,$phone,$email,$account,$pwd,$industry,$status,$caccount,$address) {
        global $conn;
        $shopcname=mysqli_real_escape_string($conn,$shopcname);
        $phone=mysqli_real_escape_string($conn,$phone);
        $email=mysqli_real_escape_string($conn,$email);
        $account=mysqli_real_escape_string($conn,$account);
        $pwd=mysqli_real_escape_string($conn,$pwd);
        $pwd = password_hash($pwd, PASSWORD_DEFAULT);
        $industry=mysqli_real_escape_string($conn,$industry);
        $status=mysqli_real_escape_string($conn,$status);
        $caccount=mysqli_real_escape_string($conn,$caccount);
        $address=mysqli_real_escape_string($conn,$address);
        $sql = "select account from shop;";
        $result = mysqli_query($conn,$sql);
        while($rs = mysqli_fetch_assoc($result)){
                if($rs['account']==$account){
                        return 401;
                }
        }
        $sql = "select level,question from company  where account = '$caccount';" ;
        $result = mysqli_query($conn,$sql);
        $rs = mysqli_fetch_assoc($result);
        $level = $rs["level"];
        $question = $rs["question"];
        // $sql = "insert into shop (caccount) values 'bb123ss';";
        $sql = "insert into shop (shopcname, phone, email, account, pwd, level, industry, status, caccount, address,question) values ('$shopcname', '$phone','$email','$account','$pwd','$level','$industry','$status','$caccount','$address','$question');";
        if(mysqli_query($conn, $sql))
                return 200;
}
function updatepwd($account,$pwd) {
        global $conn;
        $account=mysqli_real_escape_string($conn,$account);
        $pwd=mysqli_real_escape_string($conn,$pwd);
        $pwd = password_hash($pwd, PASSWORD_DEFAULT);
        if ($account) { //if item is not empty
                $sql = "update Shop set pwd = '$pwd' where account = '$account';";
                if(mysqli_query($conn, $sql))
                        return 200; 
        } else {
                return 400;
        }
}
//由公司修改店家資料
function updateShop($account,$shopcname,$phone,$email,$address) {
        global $conn;
        $account=mysqli_real_escape_string($conn,$account);
        $shopcname=mysqli_real_escape_string($conn,$shopcname);
        $phone=mysqli_real_escape_string($conn,$phone);
        $email=mysqli_real_escape_string($conn,$email);
        $address=mysqli_real_escape_string($conn,$address);
        if ($account) { //if item is not empty
                $sql = "update Shop set shopcname = '$shopcname',phone = '$phone' ,email = '$email',address = '$address' where account = '$account';";
                return mysqli_query($conn, $sql);
        } else {
                return false;
        }
}
//由店家修改店家資料
function update($account,$shopcname,$phone,$email,$address) {
        global $conn;
        $account=mysqli_real_escape_string($conn,$account);
        $shopcname=mysqli_real_escape_string($conn,$shopcname);
        $phone=mysqli_real_escape_string($conn,$phone);
        $email=mysqli_real_escape_string($conn,$email);
        $address=mysqli_real_escape_string($conn,$address);
        if ($account) { //if item is not empty
                $sql = "update Shop set shopcname = '$shopcname' ,phone = '$phone' ,email = '$email' ,address = '$address' where account = '$account';";
                return mysqli_query($conn, $sql);
        } else {
                return false;
        }
}
function delShop($account) {
        global $conn;
        $sql = "delete from Shop where account='$account'";
        return mysqli_query($conn,$sql);
}
function login($account, $pwd){
        global $conn;
        $sql = "select pwd from shop where account='$account';";
        $result = mysqli_query($conn,$sql);
        $rs = mysqli_fetch_assoc($result);
        if($rs==0)
                //找不到帳號
                return 401;
        $dbpwd = $rs["pwd"];
        if(password_verify($pwd, $dbpwd)){
                $_SESSION["shop"]=$account;
                return 200;
        }
        else
                return 400;
}
function changeStatus($account){
        global $conn;
        $sql = "select status from shop where account = '$account'";
        $result = mysqli_query($conn,$sql);
        $rs = mysqli_fetch_assoc($result);
        if($rs['status']==0)
                $status = 1;
        else if($rs['status']==1)
                $status = 0;
        $sql = "update shop set status = '$status' where account = '$account'";
        if(mysqli_query($conn,$sql))
                return 200;
        else
                return 400;
}
function getuser(){
        return $_SESSION["shop"];
}
?>
