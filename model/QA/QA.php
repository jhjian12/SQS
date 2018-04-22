<?php
require("../../dbconnect.php");
function getData($type,$status) {
        global $conn;
        $empty="";
        if($status=="process")
                $sql = "select * from faq where type = '$type' and reply = '$empty' order by addq_time asc;";
        else if($status=="completed")
                $sql = "select * from faq where type = '$type' and reply != '$empty' order by addq_time asc;";
        else if($status=="all"){
                $sql = "select * from faq where type = '$type' order by addq_time asc;";
        }
        $result = mysqli_query($conn,$sql);
        $table = array();
        while($rs = mysqli_fetch_assoc($result)){
                array_push($table,$rs);
        }
        return $table;
}
function add($question, $reply) {
        global $conn;
        $question=mysqli_real_escape_string($conn,$question);
        $reply=mysqli_real_escape_string($conn,$reply);
        if ($question) { //if question is not empty
                $sql = "insert into faq (question, reply, type) values ('$question', '$reply','admin');";
                if(mysqli_query($conn, $sql))
                        return 200;
                else{
                        return 400;
                }
        }else{
                return 400;
        }
}
function reply($id,$reply) {
        global $conn;
        $id=mysqli_real_escape_string($conn,$id);
        $reply=mysqli_real_escape_string($conn,$reply);
        if ($id) { //if item is not empty
                $sql = "update faq set reply = '$reply' where id = '$id';";
                return mysqli_query($conn, $sql);
        } else {
                return false;
        }
}
function update($id,$question,$reply) {
        global $conn;
        $id=mysqli_real_escape_string($conn,$id);
        $question=mysqli_real_escape_string($conn,$question);
        $reply=mysqli_real_escape_string($conn,$reply);
        if ($id) { //if item is not empty
                $sql = "update faq set reply = '$reply',question = '$question' where id = '$id';";
                return mysqli_query($conn, $sql);
        } else {
                return false;
        }
}
function delete($id) {
        global $conn;
        $id=mysqli_real_escape_string($conn,$id);
        if ($id) { //if item is not empty
                $sql = "delete from faq where id = '$id';";
                return mysqli_query($conn, $sql);
        } else {
                return false;
        }
}
?>
