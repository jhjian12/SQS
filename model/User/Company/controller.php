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


require("Company.php");
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
        //新增公司
        case "addCompany":
                $cname = $data[1]['cname'];
                $account = $data[1]['account'];
                $pwd = $data[1]['pwd'];
                $status = $data[1]['status'];
                $industry = $data[1]['industry'];
                $phone = $data[1]['phone'];
                $email = $data[1]['email'];
                $level = $data[1]['level'];
                $status =addCompany($cname,$phone,$email,$account,$pwd,$level,$industry,$status);
                echo makeReturnMessage($status);
                break;
        //列出所有公司
        case "listCompany":
                if (getCompanyList()) {
                        $table=getCompanyList();
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        $table=['status' => 400];
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        //刪除公司
        case "delCompany":
                $table=array();
                for($i=1; $i<count($data); $i++){
                        $account = $data[$i]["account"];
                        if(!delCompany($account)){
                                $wrong++;
                        }
                }
                if ($wrong==0) {
                        echo makeReturnMessage(200);
                } else {
                        echo makeReturnMessage(400);
                }
                break;
        //修改公司基本資料
        case "updateCompany":
                $table=array();
                for($i=1; $i<count($data); $i++){
                        $account = $data[$i]['account'];
                        $newcname = $data[$i]['newcname'];
                        $newphone =$data[$i]['newphone'];
                        $newemail =$data[$i]['newemail'];
                        if(!updateCompany($account,$newcname,$newphone,$newemail)){
                                $wrong++;
                        }
                }
                if ($wrong==0) {
                        echo makeReturnMessage(200);
                } else {
                        echo makeReturnMessage(400);
                }
                break;
        case "updateCompanyByAdmin":
                $table=array();
                for($i=1; $i<count($data); $i++){
                        $account = $data[$i]['account'];
                        $newcname = $data[$i]['newcname'];
                        $newphone =$data[$i]['newphone'];
                        $newemail =$data[$i]['newemail'];
                        $newindustry =$data[$i]['newindustry'];
                        $newlevel =$data[$i]['newlevel'];
                        if(!updateCompanyByAdmin($account,$newcname,$newphone,$newemail,$newindustry,$newlevel)){
                                $wrong++;
                        }
                }
                if ($wrong==0) {
                        echo makeReturnMessage(200);
                } else {
                        echo makeReturnMessage(400);
                }
                break;
        //公司登入
        case "login":
                $table=array();
                $account = $data[1]['account'];
                $pwd = $data[1]['pwd'];
                $status=login($account,$pwd);
                array_unshift($table,array('status' => $status));
                echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                break;
        //列出單一公司資料
        case "showCompanyInfo":
                $account = $data[1]['account'];
                $table=getCompanyInfo($account);
                if(count($table)!=0)
                        array_unshift($table,array('status' => 200));
                else{
                        array_unshift($table,array('status' => 400));
                }
                echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                break;
        case "changeStatus":
                $account = $data[1]['account'];
                $status=changeStatus($account);
                echo(makeReturnMessage($status));
                break;
        case "levelChange":
                $table=array();
                $account = $data[1]['account'];
                $level =$data[1]['level'];
                $status=levelChange($account,$level);
                echo makeReturnMessage($status);
                break;
        case "getuser":
                echo getuser();
                break;
        case "selectQuestion":
                $table=array();
                $selected = $data[1]['selected'];
                $account = $data[1]['account'];
                if (selectQuestion($selected,$account)) {
                        array_unshift($table,array('status' => 200));
                } else {
                        array_unshift($table,array('status' => 400));
                }
                echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                break;
        case "updatepwd":
                $account = $data[1]['account'];
                $pwd = $data[1]['pwd'];
                $status=updatepwd($account,$pwd);
                echo(makeReturnMessage($status));
                break;
        default:
}
?>
