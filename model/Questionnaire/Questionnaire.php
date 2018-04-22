<?php
require("../../dbconnect.php");
// 店家有的問項
function showQuestionList($shop) {
        global $conn;
        $shop=mysqli_real_escape_string($conn,$shop);
        $sql = "select question from shop where account='$shop';";
        $result = mysqli_query($conn,$sql);
        $rs = mysqli_fetch_assoc($result);
        $questionstr = $rs['question'];
        $strarr = explode(",",$questionstr);
        // print_r($strarr);
        $sql = "select * from Question where";
        $sql = $sql." qid = ".$strarr[0];
        for($i=1; $i<count($strarr); $i++){
                $sql = $sql." or qid = ".$strarr[$i];
        }
        // echo $sql;
        // // echo json_encode(mysqli_fetch_assoc(mysqli_query($conn,$sql)), JSON_UNESCAPED_UNICODE);
        // // echo "<br>";
        $result = mysqli_query($conn,$sql);
        $table = array();
        // 將搜尋到的資料一筆一筆放進陣列再轉json
        // echo count($result);
        // print_r($result->num_rows);
        if($result){
                while($rs = mysqli_fetch_assoc($result)){
                        array_push($table,$rs);
                }
        }
        return $table;
        // return json_encode($table, JSON_FORCE_OBJECT);
}
function getQuestionListByCompany($company) {
        global $conn;
        $company=mysqli_real_escape_string($conn,$company);
        $sql = "select question from company where account='$company';";
        $result = mysqli_query($conn,$sql);
        $rs = mysqli_fetch_assoc($result);
        $questionstr = $rs['question'];
        $strarr = explode(",",$questionstr);
        // print_r($strarr);
        $sql = "select * from Question where";
        $sql = $sql." qid = ".$strarr[0];
        for($i=1; $i<count($strarr); $i++){
                $sql = $sql." or qid = ".$strarr[$i];
        }
        // $sql = "select question.qid,question.item,question.dimension from Question,company where company.account ='$company' and question.level=company.level;";
        // echo $sql;
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

function response($qcard,$responsearr){
        //echo randomDate("2000-1-1 00:00:00","2017-1-1 00:00:00");
        global $conn;
        $qcardid=mysqli_real_escape_string($conn,$qcard['qcardid']);
        $sex=mysqli_real_escape_string($conn,$qcard['sex']);
        $shopaccount=mysqli_real_escape_string($conn,$qcard['shopaccount']);
        $age=mysqli_real_escape_string($conn,$qcard['age']);
        $job=mysqli_real_escape_string($conn,$qcard['job']);
        $area=mysqli_real_escape_string($conn,$qcard['area']);
        $married=mysqli_real_escape_string($conn,$qcard['married']);
        $other_reply=mysqli_real_escape_string($conn,$qcard['other_reply']);
        $datafrom=mysqli_real_escape_string($conn,$qcard['datafrom']);
        $comecount=mysqli_real_escape_string($conn,$qcard['comecount']);
        $education=mysqli_real_escape_string($conn,$qcard['education']);
        $income=mysqli_real_escape_string($conn,$qcard['income']);
        $datetime=mysqli_real_escape_string($conn,$qcard['datetime']);
        $purpose=mysqli_real_escape_string($conn,$qcard['purpose']);
        $consumption=mysqli_real_escape_string($conn,$qcard['consumption']);
        // $shopaccount = "test";
        //檢查是不是正確的qcardid
        // print_r(checkQcardId($qcardid));
        if(checkQcardId($qcardid)[0]['status']==400){
                // echo 123;
                return 500;
        }
        $shopaccount = checkQcardId($qcardid)[1]['shop'];
        if ($qcardid) { //if question is not empty
                $sql = "insert into qcard (qcard_id, shopaccount, status, sex, age, job, area, married,other_reply,writetime,datafrom,comecount,education,income,purpose,consumption) values ('$qcardid', '$shopaccount',0,'$sex','$age','$job','$area','$married','$other_reply','$datetime','$datafrom','$comecount','$education','$income','$purpose','$consumption');";
                // echo $sql;
                                if(mysqli_query($conn, $sql)){
                        for($i=0; $i<count($responsearr); $i++){
                        $qid=mysqli_real_escape_string($conn,$responsearr[$i]['qid']);
                        $exp_score=mysqli_real_escape_string($conn,$responsearr[$i]['exp_score']);
                        $feel_score=mysqli_real_escape_string($conn,$responsearr[$i]['feel_score']);
                        $responsesql = "insert into reply (qid, exp_score, feel_score, qcard_id) values ('$qid', '$exp_score', '$feel_score', '$qcardid');";
                        mysqli_query($conn, $responsesql);
                        }
                        return 200;
                }
                else{
                        // echo $sql;
                        return 400;
                }
        }else{
                return 400;
        }
}
//select month(writetime),job,count(area)
//from qcard group by month(writetime),job
//ORDER BY month(writetime),job ASC

//select job,count(area) from qcard group by job ORDER BY job ASC
function makepeopleTable($result,$type){
        $bigtable =array();
        $table =array();
        $data =array();
        $table["data"] =array();
        $rs = mysqli_fetch_assoc($result);
        $tmp = $rs["date"];
        $data["型態"]=$rs["$type"];
        $data["count"]=$rs["count"];
        array_push($table["data"],$data);
        $table["date"]=$tmp;
        while($rs = mysqli_fetch_assoc($result)){
                if($tmp!=$rs["date"]){
                        // array_push($bigtable,$table);
                        // $table["date"]=$rs["$date"];
                        // print_r($table);
                        array_push($bigtable,$table);
                        $table["data"]=array();
                        $tmp=$rs["date"];
                        $table["date"]=$tmp;
                }
                $data["型態"]=$rs["$type"];
                $data["count"]=$rs["count"];
                array_push($table["data"],$data);
        }
        array_push($bigtable,$table);
        return $bigtable;
}
function getPeopleNumberbyShop($shop,$year,$month,$type){
        global $conn;
        $table =array();
        $shop=mysqli_real_escape_string($conn,$shop);
        $year=mysqli_real_escape_string($conn,$year);
        $month=mysqli_real_escape_string($conn,$month);
        $type=mysqli_real_escape_string($conn,$type);
        if(empty($year)&&empty($month)){
                $sql = "select $type as '型態',count($type) as count from qcard where shopaccount = '$shop' group by $type;";
                $result = mysqli_query($conn, $sql);
                $table["data"]=array();
                while($rs = mysqli_fetch_assoc($result)){
                        array_push($table["data"],$rs);
                }
                $table["date"]="all";
                $bigtable=array();
                array_push($bigtable,$table);
                return $bigtable;
        // select time.date,time.sex,IFNULL(b.count,0)
        // from (select month(writetime) as date,sex from qcard GROUP by
        //         month(writetime),sex) as time left join
        // (select month(writetime) as date,sex,count(sex) as count from qcard
        //         where year(writetime)=2016 and shopaccount = 'testqqq'
        //         group by sex,month(writetime) ORDER BY month(writetime),sex ASC)
        // as b on time.date = b.date and time.sex =b.sex ORDER by time.date,time.sex asc

        }else if(!empty($year)&&empty($month)){
                $sql = "select time.date,time.$type,IFNULL(b.count,0) as count from (select month(writetime) as date,$type from qcard where year(writetime)=$year and shopaccount = '$shop' GROUP by month(writetime),$type) as time left join (select month(writetime) as date,$type,count($type) as count from qcard where year(writetime)=$year and shopaccount = '$shop' group by $type,month(writetime) ORDER BY month(writetime),$type ASC) as b on time.date = b.date and time.$type =b.$type ORDER by time.date,time.$type asc;";
        }else if(!empty($year)&&!empty($month)){
                $sql = "select time.date,time.$type,IFNULL(b.count,0) as count from (select day(writetime) as date,$type from qcard where year(writetime)=$year and month(writetime)=$month and shopaccount = '$shop' GROUP by day(writetime),$type) as time left join (select day(writetime) as date,$type,count($type) as count from qcard where year(writetime)=$year and month(writetime)=$month and shopaccount = '$shop' group by $type,day(writetime) ORDER BY day(writetime),$type ASC) as b on time.date = b.date and time.$type =b.$type ORDER by time.date,time.$type asc;";
        }else if(empty($year)&&!empty($month)){
                $sql = "select time.date,time.$type,IFNULL(b.count,0) as count from (select year(writetime) as date,$type from qcard where month(writetime)=$month and shopaccount = '$shop' GROUP by year(writetime),$type) as time left join (select year(writetime) as date,$type,count($type) as count from qcard where month(writetime)=$month and shopaccount = '$shop' group by $type,year(writetime) ORDER BY year(writetime),$type ASC) as b on time.date = b.date and time.$type =b.$type ORDER by time.date,time.$type asc;";
        }
        // echo $sql;
        $result = mysqli_query($conn, $sql);
        $table = makepeopleTable($result,$type);
        return $table;
}
//將getPeopleInfobyShop撈到的資料作成前端可顯示的格式
function makeChartTable($result,$type,$secondType){
        $bigtable =array();
        $table =array();
        $table["data"] =array();
        $rs = mysqli_fetch_assoc($result);
                $tmp = $rs["$type"];
                $datatitle = $rs["$secondType"];
                $datacount = $rs["counts"];
                $datatable["型態"]=$datatitle;
                $datatable["數值"]=$datacount;
                $table["title"]=$rs["$type"];
                array_push($table["data"], $datatable);
                while($rs = mysqli_fetch_assoc($result)){
                        if($tmp!=$rs["$type"]){
                                // $table["data"]=$datatable;
                                array_push($bigtable,$table);
                                // print_r($table);
                                $table["title"]=$rs["$type"];
                                // print_r($bigtable);
                                // print_r ($datatable);
                                $table["data"]=array();
                        }
                                // array_push($table,$rs["$type"]);
                        $tmp = $rs["$type"];
                        $datatitle = $rs["$secondType"];
                        $datacount = $rs["counts"];
                        $datatable["型態"]=$datatitle;
                        $datatable["數值"]=$datacount;
                        array_push($table["data"], $datatable);
                        $datatable = array();
                        // array_push($table["data"],$datatable);
                        // print_r($rs);
                        // $table=array();
                        // $table["data"] =array();
                }
        // array_push($table["data"], $datatable);
        // $table["data"]=$datatable;
        array_push($bigtable,$table);
        // print_r($bigtable);
        return $bigtable;
        // echo json_encode($bigtable, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
}
//依據相關資料做sql 使用makeChartTable作格式
function getPeopleInfobyShop($shop,$year,$month,$type,$secondType){
        global $conn;
        $shop=mysqli_real_escape_string($conn,$shop);
        $year=mysqli_real_escape_string($conn,$year);
        $month=mysqli_real_escape_string($conn,$month);
        $type=mysqli_real_escape_string($conn,$type);
        $secondType=mysqli_real_escape_string($conn,$secondType);
        if(empty($year)&&empty($month)){
                $sql = "SELECT $type,$secondType,count($type) as 'counts' FROM qcard where shopaccount = '$shop' group by $type,$secondType;";
        }else if(!empty($year)&&empty($month)){
                $sql = "SELECT $type,$secondType,count($type) as 'counts' FROM qcard where shopaccount = '$shop' and year(writetime) = '$year' group by $type,$secondType;";
        }else if(!empty($year)&&!empty($month)){
                $sql = "SELECT $type,$secondType,count($type) as 'counts' FROM qcard where shopaccount = '$shop' and year(writetime) = '$year' and month(writetime) = '$month' group by $type,$secondType;";
        }else if(empty($year)&&!empty($month)){
                $sql = "SELECT $type,$secondType,count($type) as 'counts' FROM qcard where shopaccount = '$shop' and month(writetime) = '$month' group by $type,$secondType;";
        }
        $result = mysqli_query($conn, $sql);
        $table = makeChartTable($result,$type,$secondType);
        return $table;
}
function getAllShopByCompany($company){
        global $conn;
        $table = array();
        $company = mysqli_escape_string($conn,$company);
        $sql = "select account,shopcname from shop where caccount = '$company'";
        $result = mysqli_query($conn,$sql);
        while($rs = mysqli_fetch_assoc($result)){
                array_push($table, $rs);
        }
        return $table;
}
//SELECT datafrom,job,count(datafrom) as 'counts' FROM qcard,shop where shop.caccount = 'test2'
//and qcard.shopaccount = shop.account group by datafrom,job; 找公司版
function getPeopleInfobyCompany($company,$year,$month,$type,$secondType){
        global $conn;
        $table = array();
        $bigtable = array();
        $company=mysqli_real_escape_string($conn,$company);
        $year=mysqli_real_escape_string($conn,$year);
        $month=mysqli_real_escape_string($conn,$month);
        $type=mysqli_real_escape_string($conn,$type);
        $secondType=mysqli_real_escape_string($conn,$secondType);
        $allShop = getAllShopByCompany($company);
        for($i=0; $i<count($allShop); $i++){
                $shopName = $allShop[$i]['account'];
                $shopcName = $allShop[$i]['shopcname'];
                $table['shop']=$shopcName;
                $table['shopdata']=getPeopleInfobyShop($shopName,$year,$month,$type,$secondType);
                array_push($bigtable, $table);
                $table = array();
                // print_r(getPeopleInfobyShop($shopName,$year,$month,$type,$secondType));
        }
        // $result = mysqli_query($conn, $sql);
        // $table = makeChartTable($result,$type,$secondType);
        return $bigtable;
}
function getAverageScore($shop,$year,$month,$question,$scoretype){
        global $conn;
        $table=array();
        $shop=mysqli_real_escape_string($conn,$shop);
        $year=mysqli_real_escape_string($conn,$year);
        $month=mysqli_real_escape_string($conn,$month);
        $question=mysqli_real_escape_string($conn,$question);
        $scoretype=mysqli_real_escape_string($conn,$scoretype);
        //select month(writetime),avg(exp_score) from question,reply,qcard,shop
        //where question.qid = reply.qid and qcard.shopaccount=shop.account and reply.qcard_id=qcard.qcard_id
        // and question.item="哈哈哈哈" GROUP by month(writetime)
        if(empty($year)&&empty($month)){
                $sql = "SELECT avg($scoretype) as 'score' from question,reply,qcard,shop where question.qid
                = reply.qid and qcard.shopaccount = shop.account and reply.qcard_id=qcard.qcard_id
                and question.item = '$question' and qcard.shopaccount = '$shop';";
                $result = mysqli_query($conn, $sql);
                $rs = mysqli_fetch_assoc($result);
                $rs["time"]="all";
                array_push($table,$rs);
                return $table;
        }else if(!empty($year)&&empty($month)){
                $sql = "SELECT month(writetime) as 'date',avg($scoretype) as'score'from question,reply,qcard,shop where question.qid
                = reply.qid and qcard.shopaccount = shop.account and reply.qcard_id=qcard.qcard_id
                and question.item = '$question' and year(writetime) = $year and qcard.shopaccount = '$shop' GROUP by month(writetime);";
        }else if(!empty($year)&&!empty($month)){
                $sql = "SELECT day(writetime) as 'date',avg($scoretype) as'score'from question,reply,qcard,shop where question.qid
                = reply.qid and qcard.shopaccount = shop.account and reply.qcard_id=qcard.qcard_id
                and question.item = '$question' and year(writetime) = $year and month(writetime) = $month and qcard.shopaccount = '$shop' GROUP by day(writetime);";
        }else if(empty($year)&&!empty($month)){
                $sql = "SELECT year(writetime) as 'date',avg($scoretype) as'score'from question,reply,qcard,shop where question.qid
                = reply.qid and qcard.shopaccount = shop.account and reply.qcard_id=qcard.qcard_id
                and question.item = '$question' and month(writetime) = $month and qcard.shopaccount = '$shop' GROUP by year(writetime);";
        }
        $result = mysqli_query($conn, $sql);
        while($rs = mysqli_fetch_assoc($result)){
                array_push($table,$rs);
        }
        return $table;
}
function getAllType($title){
        global $conn;
        $table=array();
        $title = mysqli_real_escape_string($conn,$title);
        $sql = "select $title from qcard group by $title";
        $result = mysqli_query($conn,$sql);
        while($rs = mysqli_fetch_assoc($result)){
                if($rs[$title]!=null)
                           array_push($table,$rs);
        }
        return $table;
}
// select job,weekday(writetime),count(job) from qcard where weekday(writetime) =6 GROUP by job,weekday(writetime)
function getEverySomeDayData($year,$day,$type,$typeValue,$shop){
        global $conn;
        $table=array();
        $data=array();
        $year = mysqli_real_escape_string($conn,$year);
        $day = mysqli_real_escape_string($conn,$day);
        $type = mysqli_real_escape_string($conn,$type);
        $typeValue = mysqli_real_escape_string($conn,$typeValue);
        // 抓本年第一個星期day日期
        $weekarr = array();
        $weekarr[0]="Sunday";
        $weekarr[1]="Monday";
        $weekarr[2]="Tuesday";
        $weekarr[3]="Wednesday";
        $weekarr[4]="Thursday";
        $weekarr[5]="Friday";
        $weekarr[6]="Saturday";
        $strtime = $year.'-01-01';
        $endtime = $year.'-12-31';
        if(date("w",strtotime($strtime))!=$day)
                $strtime = date('Y-m-d',strtotime($strtime."next ".$weekarr[$day]));
        // echo $strtime;
        $table = array();
        // $sql = "select $type,weekday(writetime),count($type) from qcard where weekday(writetime) = $day and $type = '$typeValue' GROUP by $type,weekday(writetime)";
        $sql = "SET @days =  TIMESTAMPDIFF(DAY,'$strtime','$endtime');SET @d = -7;select a.day as '日期',IFNULL(b.num, 0) as '數量' FROM (SELECT @d:=@d+7,ADDDATE('$strtime',@d) as day FROM tmp WHERE @d+7<@days) as a left join (Select writetime,count('$type') as 'num' From QCARD Where date_format(writetime,'%w')='$day' and $type='$typeValue' and shopaccount = '$shop'GROUP by WRITEtime,$type) as b on a.day = b.writetime;";
        // echo $sql;
        // $sql = "select * from qcard;";
       
        /***********
          ref. 
          1. https://stackoverflow.com/questions/11106719/php-multiple-mysql-commands-in-one-mysql-query-query
          2. http://php.net/manual/en/mysqli.multi-query.php
        */
        if(mysqli_multi_query($conn,$sql)){
                do {
                     /* store first result set */
                        if ($result = $conn->store_result()) {
                                while ($row = $result->fetch_row()) {
                                        // printf("%s ", $row[0]);
                                        $data['日期']=$row[0];
                                        // printf("%s\n", $row[1]);
                                        $data['人數']=$row[1];
                                        array_push($table,$data);
                                }
                                $result->free();
                        }
                        $conn->more_results();
                } while (@$conn->next_result());

        }
        else{
                echo "Error:" . mysqli_error();        
        }
        return $table;
        // $result = mysqli_query($conn,$sql);
        // print_r($result);
        // while($rs = mysqli_fetch_assoc($result)){
        //         print_r($rs);
        // }
        // return 1;
        
}
// function getAllType($title){
//         global $conn;
//         $table=array();
//         $title = mysqli_real_escape_string($conn,$title);
//         $sql = "select $title from qcard group by $title";
//         $result = mysqli_query($conn,$sql);
//         while($rs = mysqli_fetch_assoc($result)){
//                 if($rs[$title]!=null)
//                            array_push($table,$rs);
//         }
//         return $table;
// }
function getAllShopData($year,$type,$company){
        global $conn;
        $bigtable = array();
        $table = array();
        $data = array();
        $year = mysqli_real_escape_string($conn,$year);
        $type = mysqli_real_escape_string($conn,$type);
        $company = mysqli_real_escape_string($conn,$company);
        $shop="";
        $sql = "select shopcname,shopaccount,$type,count($type) from qcard,shop where qcard.shopaccount=shop.account and year(qcard.writetime)=$year and shop.caccount='$company' group by $type,shopaccount order by shopaccount,$type;";
        $result = mysqli_query($conn,$sql);
        while($rs = mysqli_fetch_assoc($result)){
                if($shop!=$rs['shopcname']){
                        if($shop!=""){
                                $table['shop']=$shop;
                                $table['data']=$data;
                                array_push($bigtable,$table);
                        }
                        $data=array();
                        $shop = $rs['shopcname'];
                }
                $data[$rs[$type]]=$rs['count('.$type.')'];
                // array_push($data,$rs[$type]);
        }
        // $table['data']=$data;
        $table['shop']=$shop;
        $table['data']=$data;
        array_push($bigtable,$table);
        // print_r($bigtable);
        return $bigtable;
}
// 如果要一次抓全部的 SQL = SELECT qcard.job,reply.qid,avg(reply.exp_score) 
// from reply,qcard where reply.qcard_i=qcard.qcard_id group by job,reply.qid order by reply.id

// 分題目抓 SELECT qcard.job,avg(reply.exp_score) from reply,qcard where reply.qcard_id=qcard.qcard_id and reply.qid=1 group by job,reply.qid order by reply.id
function getAverageScoreByData($qid,$type,$shop){
        global $conn;
        $table = array();
        $qid = mysqli_real_escape_string($conn,$qid);
        $type = mysqli_real_escape_string($conn,$type);
        $shop = mysqli_real_escape_string($conn,$shop);
        $sql = "SELECT qcard.$type,avg(reply.exp_score) as '期望分數',avg(reply.feel_score) as '感知分數' from reply,qcard where reply.qcard_id=qcard.qcard_id and reply.qid=$qid and qcard.shopaccount='$shop' group by $type,reply.qid order by reply.id;";
        // echo $sql;
        $result = mysqli_query($conn,$sql);
        while($rs = mysqli_fetch_assoc($result)){
                array_push($table,$rs);
        }
        return $table;
}

function getDimensionScore($company,$year,$month){
        global $conn;
        $data = array();
        $table = array();
        $bigtable = array();
        $company = mysqli_real_escape_string($conn,$company);
        $year = mysqli_real_escape_string($conn,$year);
        $month = mysqli_real_escape_string($conn,$month);
        if(empty($year)&&empty($month)){
                $sql="select shop.shopcname,question.dimension,avg(reply.exp_score) as '期望分數',avg(reply.feel_score) as '感知分數' from reply,question,qcard,shop where reply.qid = question.qid and reply.qcard_id=qcard.qcard_id and qcard.shopaccount = shop.account and shop.caccount='$company' GROUP by question.dimension,shop.account order by shop.account,question.dimension;";
        }else if(!empty($year)&&empty($month)){
                $sql="select shop.shopcname,question.dimension,avg(reply.exp_score) as '期望分數',avg(reply.feel_score) as '感知分數' from reply,question,qcard,shop where reply.qid = question.qid and reply.qcard_id=qcard.qcard_id and qcard.shopaccount = shop.account and shop.caccount='$company' and year(qcard.writetime)=$year GROUP by question.dimension,shop.account order by shop.account,question.dimension;";
        }else if(!empty($year)&&!empty($month)){
                $sql="select shop.shopcname,question.dimension,avg(reply.exp_score) as '期望分數',avg(reply.feel_score) as '感知分數' from reply,question,qcard,shop where reply.qid = question.qid and reply.qcard_id=qcard.qcard_id and qcard.shopaccount = shop.account and shop.caccount='$company' and year(qcard.writetime)=$year and month(qcard.writetime)=$month GROUP by question.dimension,shop.account order by shop.account,question.dimension;";
        }else if(empty($year)&&!empty($month)){
                $sql="select shop.shopcname,question.dimension,avg(reply.exp_score) as '期望分數',avg(reply.feel_score) as '感知分數' from reply,question,qcard,shop where reply.qid = question.qid and reply.qcard_id=qcard.qcard_id and qcard.shopaccount = shop.account and shop.caccount='$company' and month(qcard.writetime)=$month GROUP by question.dimension,shop.account order by shop.account,question.dimension;";
        }
        // echo $sql;
        $result = mysqli_query($conn,$sql);
        $rs = mysqli_fetch_assoc($result);
        $account = $rs['shopcname'];
        $tmp = array();
        $tmp['dimension']=$rs['dimension'];
        $tmp['期望分數']=$rs['期望分數'];
        $tmp['感知分數']=$rs['感知分數'];
        array_push($data,$tmp);
        while($rs = mysqli_fetch_assoc($result)){
                if($rs['shopcname']!=$account){
                        $table['shop']=$account;
                        $table['data']=$data;
                        $data = array();
                        array_push($bigtable, $table);
                        $account = $rs['shopcname'];
                }
                $tmp = array();
                $tmp['dimension']=$rs['dimension'];
                $tmp['期望分數']=$rs['期望分數'];
                $tmp['感知分數']=$rs['感知分數'];
                array_push($data,$tmp);
        }
        $table['shop']=$account;
        $table['data']=$data;
        array_push($bigtable, $table);
        // print_r($bigtable);
        return $bigtable;
}
function getDimensionScoreByShop($shop,$year,$month){
        global $conn;
        $data = array();
        $table = array();
        $shop = mysqli_real_escape_string($conn,$shop);
        $year = mysqli_real_escape_string($conn,$year);
        $month = mysqli_real_escape_string($conn,$month);
        if(empty($year)&&empty($month)){
                $sql="select question.dimension,avg(reply.exp_score) as '期望分數',avg(reply.feel_score) as '感知分數' from reply,question,qcard where reply.qid = question.qid and reply.qcard_id=qcard.qcard_id and qcard.shopaccount='$shop' GROUP by question.dimension;";
        }else if(!empty($year)&&empty($month)){
                $sql="select question.dimension,avg(reply.exp_score) as '期望分數',avg(reply.feel_score) as '感知分數' from reply,question,qcard where reply.qid = question.qid and reply.qcard_id=qcard.qcard_id and qcard.shopaccount='$shop' and year(qcard.writetime)=$year GROUP by question.dimension;";
        }else if(!empty($year)&&!empty($month)){
                $sql="select question.dimension,avg(reply.exp_score) as '期望分數',avg(reply.feel_score) as '感知分數' from reply,question,qcard where reply.qid = question.qid and reply.qcard_id=qcard.qcard_id and qcard.shopaccount='$shop' and year(qcard.writetime)=$year and month(qcard.writetime)=$month GROUP by question.dimension;";
        }else if(empty($year)&&!empty($month)){
                $sql="select question.dimension,avg(reply.exp_score) as '期望分數',avg(reply.feel_score) as '感知分數' from reply,question,qcard where reply.qid = question.qid and reply.qcard_id=qcard.qcard_id and qcard.shopaccount='$shop' and month(qcard.writetime)=$month GROUP by question.dimension;";
        }
        // echo $sql;
        $result = mysqli_query($conn,$sql);
        while($rs = mysqli_fetch_assoc($result)){
                array_push($table, $rs);
        }
        // print_r($bigtable);
        return $table;
}
// 只抓店家購面分數
// function getDimensionScore($shop){
//         global $conn;
//         $table = array();
//         $shop = mysqli_real_escape_string($conn,$shop);
//         $sql="select question.dimension,avg(reply.exp_score) as '期望分數',avg(reply.feel_score) as '感知分數' from reply,question,qcard where reply.qid = question.qid and reply.qcard_id=qcard.qcard_id and qcard.shopaccount='$shop' GROUP by question.dimension;";
//         echo $sql;
//         $result = mysqli_query($conn,$sql);
//         while($rs = mysqli_fetch_assoc($result)){
//                 array_push($table,$rs);
//         }
//         return $table;
// }
function getQuestionScoreByCompany($company,$year,$month){
        global $conn;
        $data = array();
        $table = array();
        $bigtable = array();
        $company = mysqli_real_escape_string($conn,$company);
        $year = mysqli_real_escape_string($conn,$year);
        $month = mysqli_real_escape_string($conn,$month);
        if(empty($year)&&empty($month)){
                $sql="select qcard.shopaccount as account,shop.shopcname,question.item as '問項',avg(reply.exp_score) as '期望分數',avg(reply.feel_score) as '感知分數' from reply,question,qcard,shop WHERE reply.qid=question.qid and reply.qcard_id = qcard.qcard_id and qcard.shopaccount=shop.account and shop.caccount='$company' GROUP by question.qid,qcard.shopaccount order by qcard.shopaccount,question.qid;";
        }else if(!empty($year)&&empty($month)){
                $sql="select qcard.shopaccount as account,shop.shopcname,question.item as '問項',avg(reply.exp_score) as '期望分數',avg(reply.feel_score) as '感知分數' from reply,question,qcard,shop WHERE reply.qid=question.qid and reply.qcard_id = qcard.qcard_id and qcard.shopaccount=shop.account and shop.caccount='$company' and year(qcard.writetime)=$year GROUP by question.qid,qcard.shopaccount order by qcard.shopaccount,question.qid;";
        }else if(!empty($year)&&!empty($month)){
                $sql="select qcard.shopaccount as account,shop.shopcname,question.item as '問項',avg(reply.exp_score) as '期望分數',avg(reply.feel_score) as '感知分數' from reply,question,qcard,shop WHERE reply.qid=question.qid and reply.qcard_id = qcard.qcard_id and qcard.shopaccount=shop.account and shop.caccount='$company' and year(qcard.writetime)=$year and month(qcard.writetime)=$month GROUP by question.qid,qcard.shopaccount order by qcard.shopaccount,question.qid;";
        }else if(empty($year)&&!empty($month)){
                $sql="select qcard.shopaccount as account,shop.shopcname,question.item as '問項',avg(reply.exp_score) as '期望分數',avg(reply.feel_score) as '感知分數' from reply,question,qcard,shop WHERE reply.qid=question.qid and reply.qcard_id = qcard.qcard_id and qcard.shopaccount=shop.account and shop.caccount='$company' and month(qcard.writetime)=$month GROUP by question.qid,qcard.shopaccount order by qcard.shopaccount,question.qid;";
        }
        // echo $sql;
        $result = mysqli_query($conn,$sql);
        $rs = mysqli_fetch_assoc($result);
        $account = $rs['shopcname'];
        $tmp = array();
        $tmp['問項']=$rs['問項'];
        $tmp['期望分數']=$rs['期望分數'];
        $tmp['感知分數']=$rs['感知分數'];
        array_push($data,$tmp);
        while($rs = mysqli_fetch_assoc($result)){
                if($rs['shopcname']!=$account){
                        $table['shop']=$account;
                        $table['data']=$data;
                        $data = array();
                        array_push($bigtable, $table);
                        $account = $rs['shopcname'];
                }
                $tmp = array();
                $tmp['問項']=$rs['問項'];
                $tmp['期望分數']=$rs['期望分數'];
                $tmp['感知分數']=$rs['感知分數'];
                array_push($data,$tmp);
        }
        $table['shop']=$account;
        $table['data']=$data;
        array_push($bigtable, $table);
        // print_r($bigtable);
        return $bigtable;
}
 function encrypt($string,$operation,$key='')
     {
         $key=md5($key);
         $key_length=strlen($key);
         $string=$operation=='D'?base64_decode($string):substr(md5($string.$key),0,8).$string;
         $string_length=strlen($string);
         $rndkey=$box=array();
         $result='';
         for($i=0;$i<=255;$i++)
         {
             $rndkey[$i]=ord($key[$i%$key_length]);
             $box[$i]=$i;
         }
         for($j=$i=0;$i<256;$i++)
         {
             $j=($j+$box[$i]+$rndkey[$i])%256;
             $tmp=$box[$i];
             $box[$i]=$box[$j];
             $box[$j]=$tmp;
         }
         for($a=$j=$i=0;$i<$string_length;$i++)
         {
             $a=($a+1)%256;
             $j=($j+$box[$a])%256;
             $tmp=$box[$a];
             $box[$a]=$box[$j];
             $box[$j]=$tmp;
             $result.=chr(ord($string[$i])^($box[($box[$a]+$box[$j])%256]));
         }
         if($operation=='D')
         {
             if(substr($result,0,8)==substr(md5(substr($result,8).$key),0,8))
             {
                 return substr($result,8);
             }
             else
             {
                 return'';
             }
         }
         else
         {
             return str_replace('=','',base64_encode($result));
         }
     }
function newQcardId($shop,$num){
        $table=array();
        global $conn;
        $max=0;
        $sql = "select qcardamount from shop where account = '$shop'";
        $result = mysqli_query($conn,$sql);
        $rs = mysqli_fetch_assoc($result);
        $dbamount = $rs["qcardamount"];
        $newdbmount = $dbamount+$num;
        for ($i=$dbamount; $i <$newdbmount ; $i++) {
                $qcardid = $shop.$i;
                $qcardid = encrypt($qcardid, 'E', 'a');
                echo "http://127.0.0.1/SQS_SERVER/html/questionnaire_write.html?qcardid=".$qcardid."\n";
                $tmp =array();
                array_push($tmp, $qcardid);
                array_push($table, $tmp);
        }
        $sql = "update shop set qcardamount = '$newdbmount' where account = '$shop'";
        mysqli_query($conn,$sql);
        return $table;
}
function checkQcardId($qcardid){
        $shop = encrypt($qcardid, 'D', 'a');
        global $conn;
        $table = array();
        $sql = "select account from shop";
        $result = mysqli_query($conn,$sql);
        $str1 = $shop;
        while($rs = mysqli_fetch_assoc($result)){
                $str2 = $rs['account'];
                if (false !== ($rst = strpos($str1, $str2))) {
                        array_push($table,array('status' => 200));
                        array_push($table,array('shop' => $str2));
                        return $table;
                }
        }
        array_push($table,array('status' => 400));
        return $table;
}
function QcardStatus($qcardid){
        global $conn;
        $table = array();
        $sql = "select status from qcard where qcard_id ='$qcardid'";
        $result = mysqli_query($conn,$sql);
        $rs = mysqli_fetch_assoc($result);
        array_push($table,array('status' => 200));
        array_push($table,array('status' => $rs["status"]));
        return $table;
}
//Select job,writetime,count(job) From QCARD Where date_format(writetime,'%w')=1 GROUP by WRITEtime,job
// SET @days =  TIMESTAMPDIFF(DAY,'2017-01-03','2017-12-31');
// SET @d = -7;
// select a.day as '日期',IFNULL(b.num, 0) as '數量'
// FROM
// (SELECT @d:=@d+7,ADDDATE('2017-01-03',@d) as day FROM tmp WHERE @d+7<@days) as a left join (Select writetime,count(job) as 'num' From QCARD Where date_format(writetime,'%w')=2 and job='學生' GROUP by WRITEtime,job) as b on a.day = b.writetime

function getReward($qcardid) {
        global $conn;
        $qcardid=mysqli_real_escape_string($conn,$qcardid);
        if ($qcardid) { //if item is not empty
                $sql = "update qcard set status = 1 where qcard_id = '$qcardid';";
                // echo $sql;
                if(mysqli_query($conn, $sql))
                        return 200; 
        } else {
                return 400;
        }
}
?>
