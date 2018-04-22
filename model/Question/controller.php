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


require("Question.php");
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
        case "addQuestion":
                $item = @$data[1]['item'];
                $dimension = @$data[1]['dimension'];
                $level = @$data[1]['level'];
                if(isset($item)&&isset($dimension)&&isset($level)){
                        $status=addQuestion($item,$dimension,$level);
                        echo makeReturnMessage($status);
                }
                else{
                        echo makeErrorReturnMessage();
                }
                break;
        case "showQuestionList":
                if (getQuestionList()) {
                        $table=getQuestionList();
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        $table=['status' => 400];
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "getQuestionListfromlevel":
                $level = @$data[1]['level'];
                if ($table=getQuestionListfromlevel($level)) {
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        $table=['status' => 400];
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "delQuestion":
                $table=array();
                for($i=1; $i<count($data); $i++){
                        $qid = $data[$i]["qid"];
                        if(!delQuestion($qid)){
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
        case "updateQuestion":
                $table=array();
                for($i=1; $i<count($data); $i++){
                        $qid = $data[$i]['qid'];
                        $newitem = $data[$i]['newitem'];
                        $newdimension =$data[$i]['newdimension'];
                        $newlevel =$data[$i]['newlevel'];
                        if(!updateQuestion($qid,$newitem,$newdimension,$newlevel)){
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
        case "getQuestionByOther":
                $dimension = @$data[1]['dimension'];
                $level = @$data[1]['level'];
                if (getQuestionByOther($dimension,$level)) {
                        $table=getQuestionByOther($dimension,$level);
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        $table=['status' => 400];
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        default:
}
?>
