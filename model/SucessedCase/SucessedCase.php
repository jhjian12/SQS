<?php
require("../../dbconnect.php");
function base64_to_jpeg($base64_string, $output_dir,$name) {
        if(!is_dir($output_dir))
                mkdir($output_dir);
        $name = mb_convert_encoding($name,'BIG5','auto');
        $src = $output_dir."/$name";
        // open the output file for writing
        $ifp = fopen( $src, 'wb' );
        // split the string on commas
        // $data[ 0 ] == "data:image/png;base64"
        // $data[ 1 ] == <actual base64 string>
        $data = explode( ',', $base64_string );
        // we could add validation here with ensuring count( $data ) > 1
        fwrite( $ifp, base64_decode( $data[1] ) );
        // clean up the file resource
        fclose( $ifp );
        return $output_dir;
}
//新增案例
function addCase($title, $status, $content, $shop_account,$img,$imgname) {
        global $conn;
        $title=mysqli_real_escape_string($conn,$title);
        $status=mysqli_real_escape_string($conn,$status);
        $content=mysqli_real_escape_string($conn,$content);
        $shop_account=mysqli_real_escape_string($conn,$shop_account);
        $img=mysqli_real_escape_string($conn,$img);
        $imgname=mysqli_real_escape_string($conn,$imgname);
        $src="../../uploadImage/$shop_account";
        if ($title) { //if title is not empty
                //設定圖檔名字
                base64_to_jpeg($img,$src,$imgname);
                $src = "uploadImage/$shop_account/$imgname";
                //新增case
                $sql = "insert into sucesscase (title, status, content, shop_account) values ('$title', '$status','$content','$shop_account');";
                if(mysqli_query($conn, $sql)){
						$sql ="select id from sucesscase where title = '$title' and shop_account = '$shop_account'";
						echo $sql;
						$rs = mysqli_query($conn,$sql);
						$rs = mysqli_fetch_assoc($rs);
						$id = $rs["id"];
                        //存圖檔路徑進資料庫
						$sql = "insert into picture (src, sucessid) values ('$src','$id');";
						mysqli_query($conn, $sql);
						return 200;
				}
                else{
                        return 400;
                }
        }else{
                return 400;
        }
}
function getData() {
        global $conn;
        $sql = "select sucesscase.*,shop.industry from sucesscase , shop where sucesscase.shop_account=shop.account order by add_time asc;";
        $result = mysqli_query($conn,$sql);
        $table = array();
        while($rs = mysqli_fetch_assoc($result)){
                $shopaccount= $rs['shop_account'];
				$id= $rs["id"];
                $sql = "select src from picture where sucessid = '$id'";
                $srcrs = mysqli_query($conn,$sql);
                $srcrs = mysqli_fetch_assoc($srcrs);
                $src = $srcrs["src"];
                // echo $sql;
                $rs["src"]=$src;
                array_push($table,$rs);
                // print_r($rs);
        }
        return $table;
}
function del($id) {
        global $conn;
        $id=mysqli_real_escape_string($conn,$id);
        $sql = "delete from sucesscase where id='$id'";
        return mysqli_query($conn,$sql);
}
function update($id, $title ,$status, $content, $shop_account) {
        global $conn;
        $id=mysqli_real_escape_string($conn,$id);
        $title=mysqli_real_escape_string($conn,$title);
        $status=mysqli_real_escape_string($conn,$status);
        $content=mysqli_real_escape_string($conn,$content);
        $shop_account=mysqli_real_escape_string($conn,$shop_account);
        if ($id) { //if item is not empty
                $sql = "update sucesscase set title = '$title' , status = '$status' , content = '$content' , shop_account = '$shop_account' where id = '$id';";
                return mysqli_query($conn, $sql);
        } else {
                return false;
        }
}
?>
