<?php
$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'sqs';
$table=['status' => 500,'message' =>'伺服器錯誤'];
json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
$conn = mysqli_connect($host, $user, $pass, $db) or die(json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT)); //跟MyMSQL連線並登入
mysqli_query($conn,"SET NAMES utf8"); //選擇編碼
?>
