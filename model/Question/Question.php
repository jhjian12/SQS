<?php
require("../../dbconnect.php");
// 抓問題清單
function getQuestionList() {
        global $conn;
        $sql = "select qid,item,dimension,level from Question order by qid asc;";
        // echo json_encode(mysqli_fetch_assoc(mysqli_query($conn,$sql)), JSON_UNESCAPED_UNICODE);
        // echo "<br>";
        $result = mysqli_query($conn,$sql);
        $table = array();

        // 將搜尋到的資料一筆一筆放進陣列再轉json
        while($rs = mysqli_fetch_assoc($result)){
                array_push($table,$rs);
        }
        return $table;
        // return json_encode($table, JSON_FORCE_OBJECT);
}
// 依照等級抓問題清單
function getQuestionListfromlevel($level) {
        global $conn;
        $level=mysqli_real_escape_string($conn,$level);
        $sql = "select qid,item,dimension,level from Question where level = '$level' order by qid asc;";
        // echo json_encode(mysqli_fetch_assoc(mysqli_query($conn,$sql)), JSON_UNESCAPED_UNICODE);
        // echo "<br>";
        $result = mysqli_query($conn,$sql);
        $table = array();

        // 將搜尋到的資料一筆一筆放進陣列再轉json
        while($rs = mysqli_fetch_assoc($result)){
                array_push($table,$rs);
        }
        return $table;
        // return json_encode($table, JSON_FORCE_OBJECT);
}
// 新增問題
function addQuestion($item, $dimension, $level) {
        global $conn;
        $item=mysqli_real_escape_string($conn,$item);
        $dimension=mysqli_real_escape_string($conn,$dimension);
        $level=mysqli_real_escape_string($conn,$level);
        if ($item) { //if item is not empty
                $sql = "insert into Question (item, dimension, level) values ('$item', '$dimension','$level');";
                if(mysqli_query($conn, $sql))
                        return 200;
        }else{
                return 400;
        }
}
// 修改問題
function updateQuestion($qid,$newitem,$newdimension,$newlevel) {
        global $conn;
        $qid=mysqli_real_escape_string($conn,$qid);
        $newitem=mysqli_real_escape_string($conn,$newitem);
        $newdimension=mysqli_real_escape_string($conn,$newdimension);
        $newlevel=mysqli_real_escape_string($conn,$newlevel);
        if ($qid) { //if item is not empty
                $sql = "update Question set item = '$newitem' , dimension = '$newdimension' , level = '$newlevel' where qid = '$qid';";
                return mysqli_query($conn, $sql);
        } else {
                return false;
        }
}
function delQuestion($qid) {
        global $conn;
        $qid=mysqli_real_escape_string($conn,$qid);
        $sql = "delete from Question where qid='$qid'";
        return mysqli_query($conn,$sql);
}
function getQuestionByOther($dimension,$level){
        global $conn;
        $dimension=mysqli_real_escape_string($conn,$dimension);
        $level=mysqli_real_escape_string($conn,$level);
        $sql = "select * from Question where level LIKE '%$level%' and dimension LIKE '%$dimension%';";
        if ($result = mysqli_query($conn,$sql)){
                $table = array();
                // 將搜尋到的資料一筆一筆放進陣列再轉json
                while($rs = mysqli_fetch_assoc($result)){
                        array_push($table,$rs);
                }
                return $table;
        }
}
?>
