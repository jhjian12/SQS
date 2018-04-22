<?php
	require("userchecklogin.php");
?>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html" ; charset="utf-8">
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script type="text/javascript" src="../javascript/baseAnalysis.js"></script>
    <script src="../import/drilldown.js"></script>

</head>
<body>

<div id="container" style="min-width: 300px; height: 400px; margin: 0 auto"></div>
<form id = "form" name = "form">
<select id="select" name="select" onchange="choose()"></select>

</form>

</body>
</html>
