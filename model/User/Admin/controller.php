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


require("admin.php");
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
switch($act) {
        case "addAdmin":
                $table=array();
                $account = $data[1]['account'];
                $pwd = $data[1]['pwd'];
                $status = addAdmin($account,$pwd);
                echo(makeReturnMessage($status));
                break;
        case "login":
                $table=array();
                $account = $data[1]['account'];
                $pwd = $data[1]['pwd'];
                $status=login($account,$pwd);
                array_unshift($table,array('status' => $status));
                echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                break;
        default:
}
?>
