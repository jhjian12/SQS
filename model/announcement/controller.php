<?php
 // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }


require("announcement.php");
if(!($json=file_get_contents("php://input")) && !isset($_GET["act"])) {
        exit(0);
}
//將json解開
$data=json_decode($json,true);
//如果有的話就是post傳json 沒有就是get
if(file_get_contents("php://input"))
        $act =$data[0]["act"];
else
        $act=$_GET["act"];
//wrong拿來看一口氣處理大量資料有沒有錯 >0就是有錯
$wrong=0;
function makeReturnMessage($messageCode){
    $table=array();
    array_unshift($table,array('status' => $messageCode));
    return json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
}
function makeErrorReturnMessage(){
    $table=array();
    array_unshift($table,array('status' => "402"));
    return json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
}
switch($act) {
        case "add":
                $subject = @$data[1]['subject'];
                $category = @$data[1]['category'];
                $content = @$data[1]['content'];
                $start_time = @$data[1]['start_time'];
                $end_time = @$data[1]['end_time'];
                if(isset($subject)&&isset($category)&&isset($content)){
                        $status=addAnnouncement($subject,$category,$content,$start_time,$end_time);
                        echo makeReturnMessage($status);
                }
                else{
                        echo makeErrorReturnMessage();
                }
                break;
        case "del":
                $table=array();
                for($i=1; $i<count($data); $i++){
                        $id = $data[$i]["id"];
                        if(!del($id)){
                                $wrong++;
                        }
                }
                if ($wrong==0) {
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        array_unshift($table,array('status' => 400));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "update":
                $table=array();
                for($i=1; $i<count($data); $i++){
                        $id = $data[$i]['id'];
                        $subject = $data[$i]['subject'];
                        $category =$data[$i]['category'];
                        $content =$data[$i]['content'];
                        $start_time =$data[$i]['start_time'];
                        $end_time =$data[$i]['end_time'];
                        if(!update($id,$subject,$category,$content,$start_time,$end_time)){
                                $wrong++;
                        }
                }
                if ($wrong==0) {
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        array_unshift($table,array('status' => 400));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "getData":
                $table=array();
                $category = @$data[1]['category'];
                if (getData($category)) {
                        $table=getData($category);
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        array_unshift($table,array('status' => 400));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "getContent":
                $table=array();
                $id = @$data[1]['id'];
                if ($table=getContent($id)) {
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        array_unshift($table,array('status' => 400));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        default:
}
?>
