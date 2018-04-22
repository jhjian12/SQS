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
require("Questionnaire.php");
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
//測試用 隨機日期
function randomDate($begintime, $endtime="") {
    $begin = strtotime($begintime);
    $end = $endtime == "" ? mktime() : strtotime($endtime);
    $timestamp = rand($begin, $end);
    return date("Y-m-d H:i:s", $timestamp);
}
switch($act) {
        case "showQuestionList":
                $shop = $data[1]['shop'];
                if ($table=showQuestionList($shop)) {
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        array_unshift($table,array('status' => 400));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "showQuestionListByCompany":
                $company = $data[1]['company'];
                if ($table=getQuestionListByCompany($company)) {
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        array_unshift($table,array('status' => 400));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "response":
                $qcard = $data[1];
                $responsearr = array();
                for($i=2; $i<count($data); $i++){
                        $responsearr[$i-2] = $data[$i];
                }
                //設定寫入時間
                date_default_timezone_set('Asia/Taipei');
                $datetime= date("Y/m/d H:i:s");
                $qcard["datetime"]=$datetime;
                // print_r($qcard);
                // $sex =array();
                // $job =array();
                // $area =array();
                // $marr =array();
                // $datafrom =array();
                // $education =array();
                // $income =array();
                // array_push($sex,"男");
                // array_push($sex,"女");
                // array_push($job,"學生");
                // array_push($job,"工人");
                // array_push($job,"教師");
                // array_push($job,"農夫");
                // array_push($job,"老闆");
                // array_push($area,"台北");
                // array_push($area,"台中");
                // array_push($area,"台南");
                // array_push($area,"高雄");
                // array_push($marr,"已婚");
                // array_push($marr,"未婚");
                // array_push($datafrom,"網路資訊");
                // array_push($datafrom,"口耳相傳");
                // array_push($datafrom,"朋友介紹");
                // array_push($datafrom,"路過");
                // array_push($education,"國小");
                // array_push($education,"國中");
                // array_push($education,"高中");
                // array_push($education,"大學");
                // array_push($income,"1200000");
                // array_push($income,"600000");
                // array_push($income,"750000");
                // array_push($income,"300000");
                // for($i=0; $i<100; $i++){
                //     $responsearr=array();
                //     $datetime= randomDate("2015-1-1 00:00:00","2017-7-5 00:00:00");
                //     $qcard["datetime"]=$datetime;
                //     $qcard["qcardid"]=$i;
                //     $qcard["sex"]=$sex[rand(0,1)];
                //     $qcard["age"]=rand(20,30);
                //     $qcard["job"]=$job[rand(0,4)];
                //     $qcard["area"]=$area[rand(0,3)];
                //     $qcard["married"]=$marr[rand(0,1)];
                //     $qcard["count"]=rand(0,3);
                //     $qcard["datafrom"]=$datafrom[rand(0,3)];
                //     $qcard["education"]=$education[rand(0,3)];
                //     $qcard["income"]=$income[rand(0,3)];
                //     // print_r($qcard);
                //     for($j=1; $j<=3; $j++){
                //         $arr = array();
                //         $arr["qid"]=$j;
                //         $arr["feel_score"]=rand(1,5);;
                //         $arr["exp_score"]=rand(1,5);
                //         array_push($responsearr,$arr);
                //     }
                //     response($qcard,$responsearr);
                // }
                if ($status=response($qcard,$responsearr)) {
                        echo makeReturnMessage($status);
                } else {
                        $table=['status' => 400];
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "responsetest":
                $qcard = $data[1];
                $responsearr = array();
                for($i=2; $i<count($data); $i++){
                        $responsearr[$i-2] = $data[$i];
                }
                //設定寫入時間
                date_default_timezone_set('Asia/Taipei');
                $datetime= date("Y/m/d H:i:s");
                $qcard["datetime"]=$datetime;
                // print_r($qcard)a
                $sex =array();
                $job =array();
                $area =array();
                $marr =array();
                $datafrom =array();
                $education =array();
                $income =array();
                array_push($sex,"男");
                array_push($sex,"女");
                array_push($job,"學生");
                array_push($job,"工人");
                array_push($job,"教師");
                array_push($job,"農夫");
                array_push($job,"老闆");
                array_push($area,"台北");
                array_push($area,"台中");
                array_push($area,"台南");
                array_push($area,"高雄");
                array_push($marr,"已婚");
                array_push($marr,"未婚");
                array_push($datafrom,"網路資訊");
                array_push($datafrom,"口耳相傳");
                array_push($datafrom,"朋友介紹");
                array_push($datafrom,"路過");
                array_push($education,"國小");
                array_push($education,"國中");
                array_push($education,"高中");
                array_push($education,"大學");
                array_push($income,"1200000");
                array_push($income,"600000");
                array_push($income,"750000");
                array_push($income,"300000");
                for($i=5300; $i<5400; $i++){
                    $responsearr=array();
                    $datetime= randomDate("2017-1-1 00:00:00","2017-4-31 00:00:00");
                    $qcard["datetime"]=$datetime;
                    $qcard["qcardid"]=$i;
                    $qcard["sex"]=$sex[rand(0,1)];
                    $qcard["age"]=rand(20,30);
                    $qcard["job"]=$job[rand(0,4)];
                    $qcard["area"]=$area[rand(0,3)];
                    $qcard["married"]=$marr[rand(0,1)];
                    $qcard["count"]=rand(0,3);
                    $qcard["datafrom"]=$datafrom[rand(0,3)];
                    $qcard["education"]=$education[rand(0,3)];
                    $qcard["income"]=$income[rand(0,3)];
                    // print_r($qcard);
                    for($j=23; $j<=25; $j++){
                        $arr = array();
                        $arr["qid"]=$j;
                        $arr["feel_score"]=rand(4,5);;
                        $arr["exp_score"]=rand(1,2);
                        array_push($responsearr,$arr);
                    }
                    for($j=28; $j<=29; $j++){
                        $arr = array();
                        $arr["qid"]=$j;
                        $arr["feel_score"]=rand(4,5);;
                        $arr["exp_score"]=rand(1,2);
                        array_push($responsearr,$arr);
                    }
                    for($j=32; $j<=36; $j++){
                        $arr = array();
                        $arr["qid"]=$j;
                        $arr["feel_score"]=rand(4,5);;
                        $arr["exp_score"]=rand(1,2);
                        array_push($responsearr,$arr);
                    }
                    // print_r($qcard);
                    echo(response($qcard,$responsearr));
                }
                /*if ($status=response($qcard,$responsearr)) {
                        echo makeReturnMessage($status);
                } else {
                        $table=['status' => 400];
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }*/
                break;
        case "getPeopleNumberbyShop":
                $shop = $data[1]["shop"];
                $year = $data[1]["year"];
                $month = $data[1]["month"];
                $type = $data[1]["type"];
                if (1) {
                        $table = array();
                        array_unshift($table,array('status' => 200));
                        array_push($table,getPeopleNumberbyShop($shop,$year,$month,$type));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        array_unshift($table,array('status' => 400));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "getPeopleInfobyShop":
                $shop = $data[1]["shop"];
                $year = $data[1]["year"];
                $month = $data[1]["month"];
                $type = $data[1]["type"];
                $secondType = $data[1]["secondType"];
                if ($table=getPeopleInfobyShop($shop,$year,$month,$type,$secondType)) {
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        array_unshift($table,array('status' => 400));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "getPeopleInfobyCompany":
                $Company = $data[1]["Company"];
                $year = $data[1]["year"];
                $month = $data[1]["month"];
                $type = $data[1]["type"];
                $secondType = $data[1]["secondType"];
                if ($table=getPeopleInfobyCompany($Company,$year,$month,$type,$secondType)) {
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        array_unshift($table,array('status' => 400));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "getAverageScore":
                $shop = $data[1]["shop"];
                $year = $data[1]["year"];
                $month = $data[1]["month"];
                $question = $data[1]["question"];
                $scoretype = $data[1]["scoretype"];
                if ($table=getAverageScore($shop,$year,$month,$question,$scoretype)) {
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        array_unshift($table,array('status' => 400));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "getAllType":
                $title = $data[1]["title"];
                if ($table=getAllType($title)) {
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        array_unshift($table,array('status' => 400));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "getEverySomeDayData":
                $year = $data[1]["year"];
                $day = $data[1]["day"];
                $type = $data[1]["type"];
                $typeValue = $data[1]["typeValue"];
                $shop = $data[1]["shop"];
                if ($table=getEverySomeDayData($year,$day,$type,$typeValue,$shop)) {
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        array_unshift($table,array('status' => 400));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "getAllShopData":
                $year = $data[1]["year"];
                $type = $data[1]["type"];
                $company = $data[1]["company"];
                if ($table=getAllShopData($year,$type,$company)) {
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        array_unshift($table,array('status' => 400));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "getAverageScoreByData":
                $type = $data[1]["type"];
                $qid = $data[1]["qid"];
                $shop = $data[1]["shop"];
                if ($table=getAverageScoreByData($qid,$type,$shop)) {
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        array_unshift($table,array('status' => 400));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "getDimensionScore":
                $company = $data[1]["company"];
                $year = $data[1]["year"];
                $month = $data[1]["month"];
                if ($table=getDimensionScore($company,$year,$month)) {
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        array_unshift($table,array('status' => 400));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "getDimensionScoreByShop":
                $shop = $data[1]["shop"];
                $year = $data[1]["year"];
                $month = $data[1]["month"];
                if ($table=getDimensionScoreByShop($shop,$year,$month)) {
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        array_unshift($table,array('status' => 400));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "getQuestionScoreByCompany":
                $company = $data[1]["company"];
                $year = $data[1]["year"];
                $month = $data[1]["month"];
                if ($table=getQuestionScoreByCompany($company,$year,$month)) {
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        array_unshift($table,array('status' => 400));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "newQcardId":
                $shop = $data[1]["shop"];
                $num = $data[1]["num"];
                if ($table=newQcardId($shop,$num)) {
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        array_unshift($table,array('status' => 400));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "checkQcardId":
                $qcardid = $data[1]["qcardid"];
                if ($table=checkQcardId($qcardid)) {
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "QcardStatus":
                $qcardid = $data[1]["qcardid"];
                if ($table=QcardStatus($qcardid)) {
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "getReward":
                $qcardid = $data[1]['qcardid'];
                $status=getReward($qcardid);
                echo(makeReturnMessage($status));
                break;
        default:
}
?>
