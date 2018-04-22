<?php
require("../../dbconnect.php");
function contactUs($message,$email) {
        global $conn;
        $message=mysqli_real_escape_string($conn,$message);
        $email=mysqli_real_escape_string($conn,$email);
        $sql = "insert into faq (question, email,type) values ('$message','$email','other');";
        if(mysqli_query($conn, $sql))
                return 200;
        else
                return 400;
}
function levelup($level,$account,$email,$bank) {
        global $conn;
        $level=mysqli_real_escape_string($conn,$level);
        $account=mysqli_real_escape_string($conn,$account);
        $email=mysqli_real_escape_string($conn,$email);
        $bank=mysqli_real_escape_string($conn,$bank);
        $sql = "insert into levelrequest (level, account,email,bank) values ('$level','$account','$email','$bank');";
        if(mysqli_query($conn, $sql))
                return 200;
        else
                return 400;
}
?>
