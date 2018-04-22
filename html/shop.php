<?php
    require("userchecklogin.php");
    if($_SESSION["company"]>" ")
        header("Location:company.html");
?>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html"; charset="utf-8">
    <title>shop圖表</title>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script type="text/javascript" src="../javascript/shopchart.js"></script>
    <link rel="stylesheet" type="text/css" href="../css/button.css">
</head>
<body>
<table class="mmuser">
<col class="sa" />
<tr>
    <td id="sidebar">
        <ul class="list-group">
            <li>
                <button id="draw2_button" style="width:250px;"><img src="../img/spider-chart.png" ><br/>五構面期望與感知平均分數分布<a href="#" id="link2" data-toggle="tooltip" 
                title="此圖表將會為您呈現:全部題目分成五大方向，分別為有形性、回應性、確實性、關懷性與可靠性，下列為蒞臨貴店消費的所有顧客，給予貴店的期望與感知之平均分數，提供您貴店可能需要改善的方向。
                有形性(Tangibles):係指實際的設備、人員的儀表能與所提供的服務相互配合。
                回應性(Responsiveness):係指願意協助顧客且迅速提供服務之意願。
                確實性(Assurance):係指員工的知識、禮貌與能力是值得信賴的。
                關懷性(Empathy):係指公司關心並注意每一位顧客的需要，提供顧客個人化關心之能力。
                可靠性(Reliability):係指能正確地與精確地執行允諾顧客的服務之能力。
                若還有相關疑問，請至'聯絡我們'填寫您的疑問，SQS小組將盡速為您解答，謝謝您的賜教。" 
                style='display:none;'> <img src="../img/question.png" ></a></button>
            </li>
            <li>
                <button id="draw6_button" style="width:250px;"><img src="../img/pie.png" ><br/>分店來客人數比例<a href="#" id="link6" data-toggle="tooltip" 
                title="此圖表將會為您呈現:
                一段時間內，貴店的所有來客數量。也可以點選圖中某一客群區塊，進入詳看該客群的組成，例如:在整個期間，顯示貴店的所有來客數量及性別客群的比例與人數，點選圖中'男'區塊，可以詳看'男'分類中各個職業的比例與數量。
                若還有相關疑問，請至'聯絡我們'填寫您的疑問，SQS小組將盡速為您解答，謝謝您的賜教。" 
                style='display:none;'> <img src="../img/question.png" ></a></button>
            </li>
            <li>
                <button id="draw4_button" style="width:250px;"><img src="../img/line.png" ><br/>當月每天問項期望與感知平均分數<a href="#" id="link4" data-toggle="tooltip" 
                title="此圖表將會為您呈現:
                一段時間內，貴店的所有顧客針對某一問項給予的期望分數與感知之平均分數。
                若還有相關疑問，請至'聯絡我們'填寫您的疑問，SQS小組將盡速為您解答，謝謝您的賜教。" 
                style='display:none;'> <img src="../img/question.png" ></a></button>
            </li>
            <li>
                <button id="draw5_button" style="width:250px;"><img src="../img/bar.png" ><br/>來店人數(依基本資料分類)<a href="#" id="link5" data-toggle="tooltip" 
                title="此圖表將會為您呈現:
                某一年中，某一客群來店消費的數量，例如:2015年中，各性別族群來店消費人數，也可以點選'男'區塊，詳看男生族群在各個月份的光顧數量。
                若還有相關疑問，請至'聯絡我們'填寫您的疑問，SQS小組將盡速為您解答，謝謝您的賜教。" 
                style='display:none;'> <img src="../img/question.png" ></a></button>
            </li>
            <li>
                <button id="draw1_button" style="width:250px;"><img src="../img/bar.png" ><br/>問項的期望&感知分數<a href="#" id="link1" data-toggle="tooltip" 
                title="此圖表將會為您呈現:
                各個客群針對某一問項的期望與感知平均分數，例如:各地區的消費族群針對此問項的期望與感知之平均分數。
                若還有相關疑問，請至'聯絡我們'填寫您的疑問，SQS小組將盡速為您解答，謝謝您的賜教。" 
                style='display:none;'> <img src="../img/question.png" ></a></button>
            </li>
            <li>
                <button id="draw3_button" style="width:250px;"><img src="../img/bar.png" ><br/>某年某星期幾的來店人數<a href="#" id="link3" data-toggle="tooltip" 
                title="此圖表將會為您呈現:
                各個星期某個時段的消費人數比較，例如:2015年中的每個星期一，職業分類中的學生族群來店消費數量。
                若還有相關疑問，請至'聯絡我們'填寫您的疑問，SQS小組將盡速為您解答，謝謝您的賜教。" 
                style='display:none;'> <img src="../img/question.png" ></a></button>
            </li>
        </ul>
    </td>
    <td id="cmmin">
        <div id="chart">
            <h2 id='test'></h2>
            <div id="draw4" style='display:none;'>
            <!--基本圖一-某年某月某問項，當月每天問項期望與實際平均分數-折線圖-->
            <form name="form4">
                <select id="year4" name="year" onchange="data_draw4()"></select>
                <select id="month4" name="month" onchange="data_draw4()"></select>
                <select  id="question4" name="question" onchange="data_draw4()"></select>
            </form>
            <br/><br/>
            <div id="container4"></div>
            </div>
            <div id="draw5" style='display:none;'>
            <!--基本圖二-某年各月來店人數(依基本資料分類)-直條圖-->
            <form id = "form5" name = "form5">
                <select id="select5" name="select5" onchange="choose5()">
                    <option id="-1" value="">歷史資料(年)</option>
                    <option id="2015" name="2015" value="2015">2015年</option>
                </select>
                <select id="basic5" name="sel5" onchange="choose5()">
                    <option value="sex">性別</option>
                    <option value="job">職業</option>
                    <option value="age">年齡</option>
                    <option value="area">居住地</option>
                    <option value="married">婚姻狀態</option>
                    <option value="income">年收入狀況</option>
                    <option value="comecount">平均消費次數</option>
                    <option value="datafrom">獲取餐廳資訊來源</option>
                </select>
            </form>
            <br/><br/>
            <div id="container5" style="min-width: 300px; height: 400px; margin: 0 auto"></div>
            </div>
            <div id="draw6" style='display:none;'>
            <!--基本圖三-某年某月，分店來客人數比例(依兩種基本資料分類)-圓餅圖-->
            <form id="form6" name="form6">
                <select id="select_year6" name="select_year" onchange="show6()">
                <option id="year0" name="year" value="">歷史資料(年)</option>
                </select>
                <select id="select_month6" name="select_month" onchange="show6()">
                    <option id="month_0" name="month" value="">歷史資料(月)</option>
                    <option id="month_1" name="month" value="1">1月</option>
                    <option id="month_2" name="month" value="2">2月</option>
                    <option id="month_3" name="month" value="3">3月</option>
                    <option id="month_4" name="month" value="4">4月</option>
                    <option id="month_5" name="month" value="5">5月</option>
                    <option id="month_6" name="month" value="6">6月</option>
                    <option id="month_7" name="month" value="7">7月</option>
                    <option id="month_8" name="month" value="8">8月</option>
                    <option id="month_9" name="month" value="9">9月</option>
                    <option id="month_10" name="month" value="10">10月</option>
                    <option id="month_11" name="month" value="11">11月</option>
                    <option id="month_12" name="month" value="12">12月</option>
                </select>
                <select id="select_type" name="select_type" onchange="show6()">
                    <option id="select_1" name="select" value="sex" selected>性別</option>
                    <option id="select_2" name="select" value="job">職業</option>
                    <option id="select_3" name="select" value="age">年齡</option>
                    <option id="select_4" name="select" value="area">居住地</option>
                    <option id="select_5" name="select" value="married">婚姻狀態</option>
                    <option id="select_6" name="select" value="income">年收入狀況</option>
                    <option id="select_7" name="select" value="comecount">平均消費次數</option>
                    <option id="select_8" name="select" value="datafrom">獲取餐廳資訊來源</option>
                </select>
                <select id="select_secondtype" name="select_secondtype" onchange="show6()">
                    <option id="select_1" name="select_second" value="sex">性別</option>
                    <option id="select_2" name="select_second" value="job" selected>職業</option>
                    <option id="select_3" name="select_second" value="age">年齡</option>
                    <option id="select_4" name="select_second" value="area">居住地</option>
                    <option id="select_5" name="select_second" value="married">婚姻狀態</option>
                    <option id="select_6" name="select_second" value="income">年收入狀況</option>
                    <option id="select_7" name="select_second" value="comecount">平均消費次數</option>
                    <option id="select_8" name="select_second" value="datafrom">獲取餐廳資訊來源</option>
                </select>
            </form>
            <br/><br/>
            <div id="container6" ></div>
            </div>
            <div id="draw1" style='display:none;'>
            <!--圖一-某問項的期望&感知分數(依基本資料分類)-直條圖-->
            <form id = "form" name = "form">
                <select id="select2" name="select2" onchange="testsel()">
                </select>
                <select id="select" name="select" onchange="testsel()">
                    <option value="area" >地區</option>
                    <option value="sex" id="1">性別</option>
                    <option value="job" id="2">職業</option>
                    <option value="married" id="3">婚姻</option>
                    <option value="income" id="4">年收入</option>
                    <option value="education" id="5">學歷</option>
                </select>
            </form>
            <br/><br/>
            <div id="container1"></div>
            <!--<div id="container1" style="min-width: 400px; max-width: 600px; height: 400px; margin: 0 auto"></div>-->
            </div>
            <div id="draw2" style='display:none;'>
            <!--圖二-五構面平均分數分布(某年某月)-雷達圖-->
            <form id="form2" name="form2">
                <select id="select_year2" name="select_year" onchange="show2()">
                    <option id="year0" name="year" value="">歷史資料(年)</option>
                    <option id="year2015" name="year" value="2015" selected>2015年</option>
                </select>
                <select id="select_month2" name="select_month" onchange="show2()">
                    <option id="month_0" name="month" value="">歷史資料(月)</option>
                    <option id="month_1" name="month" value="1" selected>1月</option>
                    <option id="month_2" name="month" value="2">2月</option>
                    <option id="month_3" name="month" value="3">3月</option>
                    <option id="month_4" name="month" value="4">4月</option>
                    <option id="month_5" name="month" value="5">5月</option>
                    <option id="month_6" name="month" value="6">6月</option>
                    <option id="month_7" name="month" value="7">7月</option>
                    <option id="month_8" name="month" value="8">8月</option>
                    <option id="month_9" name="month" value="9">9月</option>
                    <option id="month_10" name="month" value="10">10月</option>
                    <option id="month_11" name="month" value="11">11月</option>
                    <option id="month_12" name="month" value="12">12月</option>
                </select>
            </form>
            <br/><br/>
            <div id="container2"></div>
            </div>
            <div id="draw3" style='display:none;'>
            <!--圖三-某年某星期幾的來店人數(依基本資料分類)-直條圖-->
            <form id = "form3" name = "form3">
                <select id="year" name="year" onchange="makechart()"></select>
                <select id="day" name="day" onchange="makechart()">
                        <option value='1'>星期一</option>
                        <option value='2'>星期二</option>
                        <option value='3'>星期三</option>
                        <option value='4'>星期四</option>
                        <option value='5'>星期五</option>
                        <option value='6'>星期六</option>
                        <option value='7'>星期天</option>
                </select>
                <select id="type" name="type" onchange="makechart()">
                        <option value='job'>職業</option>
                        <option value='sex'>性別</option>
                        <option value='age'>年齡</option>
                        <option value='area'>地區</option>
                        <option value='married'>婚姻</option>
                        <option value='datafrom'>資料來源</option>
                        <option value='comecount'>來店次數</option>
                        <option value='income'>年收入</option>
                </select>
                <select id="typeValue" name="typeValue" onchange="makechart()"></select>
            </form>
            <br/><br/>
            <div id="container3"></div>
            </div>
        </div>
    </td>
</tr>
</table>
</body>