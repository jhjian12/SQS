<?php
	require("userchecklogin.php");
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>DATE</title>
</head>
<script type="text/javascript" src="http://code.jquery.com/jquery-1.4.4.min.js"></script>
<script src="../import/highcharts.js"></script>
<script src="../import/exporting.js"></script>
<script type="text/javascript" src="../javascript/chart_time_question_to_avg.js"></script>
<script type="text/javascript" src="../javascript/baseAnalysis.js"></script>
    <script src="../import/drilldown.js"></script>
<body>
<form name="form1">
<select id="year" name="year" onchange="data_draw()"></select>
<select id="month" name="month" onchange="data_draw()"></select>
<select  id="question" name="question" onchange="data_draw()"></select>
</form>
<h1>基本摘要</h1>
<div id="container"></div>
<!-- <button onclick="data_draw()">dataDraw</button> -->
<br>
<h1>數據分析</h1>
<div id="container2" style="min-width: 300px; height: 400px; margin: 0 auto"></div>
<form id = "form" name = "form">
<select id="select" name="select" onchange="choose()"></select>
</body>
</html>