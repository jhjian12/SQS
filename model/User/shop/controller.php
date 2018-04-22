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


require("Shop.php");
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
        case "addShop":
                $shopcname = $data[1]['shopcname'];
                $account = $data[1]['account'];
                $pwd = $data[1]['pwd'];
                $status = $data[1]['status'];
                $industry = $data[1]['industry'];
                $phone = $data[1]['phone'];
                $email = $data[1]['email'];
                $address = $data[1]['address'];
                $caccount = $data[1]['caccount'];

                $status=addShop($shopcname,$phone,$email,$account,$pwd,$industry,$status,$caccount,$address);
                echo(makeReturnMessage($status));
                break;
        case "updatepwd":
                $account = $data[1]['account'];
                $pwd = $data[1]['pwd'];
                $status=updatepwd($account,$pwd);
                echo(makeReturnMessage($status));
                break;
        case "listShop":
                if (getShopList()) {
                        $table=getShopList();
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        $table=['status' => 400];
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "listShopByCompany":
                $account = $data[1]['account'];
                if ($table=getShopByCompany($account)) {
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        array_unshift($table,array('status' => 400));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "delShop":
                $table=array();
                for($i=1; $i<count($data); $i++){
                        $account = $data[$i]["account"];
                        if(!delShop($account)){
                                $wrong++;
                        }
                }
                if ($wrong==0) {
                        array_unshift($table,array('status' => 200));
                } else {
                        array_unshift($table,array('status' => 400));
                }
                echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                break;
        case "updateShop":
                $table=array();
                for($i=1; $i<count($data); $i++){
                        $account = $data[$i]['account'];
                        $shopcname = $data[$i]['shopcname'];
                        $phone =$data[$i]['phone'];
                        $email =$data[$i]['email'];
                        $address =$data[$i]['address'];
                        if(!updateShop($account,$shopcname,$phone,$email,$address)){
                                $wrong++;
                        }
                }
                if ($wrong==0) {
                        array_unshift($table,array('status' => 200));
                } else {
                        array_unshift($table,array('status' => 400));
                }
                echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                break;
        //店家修改自己資料
        case "update":
                $table=array();
                $account = $data[1]['account'];
                $shopcname = $data[1]['shopcname'];
                $phone =$data[1]['phone'];
                $email =$data[1]['email'];
                $address =$data[1]['address'];
                if (update($account,$shopcname,$phone,$email,$address)) {
                        array_unshift($table,array('status' => 200));
                } else {
                        array_unshift($table,array('status' => 400));
                }
                echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                break;
        case "login":
                $table=array();
                $account = $data[1]['account'];
                $pwd = $data[1]['pwd'];
                $status=login($account,$pwd);
                echo makeReturnMessage($status);
                break;
        case "showShopInfo":
                $account = $data[1]['account'];
                $table=getShopInfo($account);
                array_unshift($table,array('status' => 200));
                echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                break;
        case "changeStatus":
                $account = $data[1]['account'];
                $status=changeStatus($account);
                echo(makeReturnMessage($status));
                break;
        case "getuser":
                echo getuser();
                break;
        
        default:
}
?>
