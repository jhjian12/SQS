<?php
require("../../dbconnect.php");
//新增公告
function addAnnouncement($subject, $category, $content, $start_time, $end_time) {
        global $conn;
        $subject=mysqli_real_escape_string($conn,$subject);
        $category=mysqli_real_escape_string($conn,$category);
        $content=mysqli_real_escape_string($conn,$content);
        $start_time=mysqli_real_escape_string($conn,$start_time);
        $end_time=mysqli_real_escape_string($conn,$end_time);
        if ($subject) { //if subject is not empty
                $sql = "insert into notice (subject, category, content, start_time, end_time) values ('$subject', '$category','$content','$start_time','$end_time');";
                if(mysqli_query($conn, $sql))
                        return 200;
        }else{
                return 400;
        }
}
function getData($category) {
        global $conn;
        $sql = "select * from notice WHERE category LIKE '%$category' order by end_time desc;";
        $result = mysqli_query($conn,$sql);
        $table = array();
        while($rs = mysqli_fetch_assoc($result)){
                array_push($table,$rs);
        }
        return $table;
}
function getContent($id) {
        global $conn;
        $sql = "select * from notice WHERE id = '$id';";
        $result = mysqli_query($conn,$sql);
        $table = array();
        while($rs = mysqli_fetch_assoc($result)){
                array_push($table,$rs);
        }
        return $table;
}
function del($id) {
        global $conn;
        $id=mysqli_real_escape_string($conn,$id);
        $sql = "delete from notice where id='$id'";
        return mysqli_query($conn,$sql);
}
function update($id,$subject,$category,$content,$start_time,$end_time) {
        global $conn;
        $id=mysqli_real_escape_string($conn,$id);
        $subject=mysqli_real_escape_string($conn,$subject);
        $category=mysqli_real_escape_string($conn,$category);
        $content=mysqli_real_escape_string($conn,$content);
        $start_time=mysqli_real_escape_string($conn,$start_time);
        $end_time=mysqli_real_escape_string($conn,$end_time);
        if ($id) { //if item is not empty
                $sql = "update notice set subject = '$subject' , category = '$category' , content = '$content', start_time = '$start_time', end_time = '$end_time' where id = '$id';";
                return mysqli_query($conn, $sql);
        } else {
                return false;
        }
}
?>
