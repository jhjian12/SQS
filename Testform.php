<?php
session_start();
require("model/Question/Question.php");
$result=getQuestionList();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>無標題文件</title>
</head>
<body>
<h1>Add New Question</h1>
<form method="post" action="controller.php">
  <input type="hidden" name="act" value="addquestion">
        問題:
        <input name="item" type="text" id="item" /> <br>
        面向:
        <select name="dimension" id="dimension" />
                <option value="aa">aa</option>
                <option value="bb">bb</option>
                <option value="cc">cc</option>
                <option value="dd">dd</option>
                <option value="ee">ee</option>
        </select><br>
      題目等級:
        <select name="level" id="level" />
                <option value="free">0</option>
                <option value="paid">1</option>
        </select><br>
      <input type="submit" name="Submit" value="送出" />
        </form>
  </tr>
</table>
<h1>目前題庫</h1>
        <table>
        <?php
                if ($result) {
                        $i=1;
                        while ($rs=mysqli_fetch_assoc($result)) {
                            echo "<tr><td>" . $i++ . "</td>";
                            echo "<td>{$rs['item']}</td>";
                            echo "<td>" , $rs['dimension'], "</td>";
                            echo "<td>" . $rs['level'] . "</td></tr>";
                        }
                } else {
                        echo "<tr><td>No data found!<td></tr>";
                }
        ?>
        </table>
</body>
</html>
