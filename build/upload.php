<?php
$target_dir = "fileupload/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);
$uploadOk = 1;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["file"]["tmp_name"]);
    if($check !== false) {
        $uploadOk = 1;
    } else {
        $uploadOk = 0;
    }
}



// Check if file already exists
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}
// Check file size
if ($_FILES["file"]["size"] > 5000000) {
    
    $uploadOk = 0;
}
// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
// if everything is ok, try to upload file
} else {
    $temp = explode(".", $_FILES["file"]["name"]);
    $newfilename = round(microtime(true)) . '.' . end($temp);
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_dir . $newfilename)) {

    } else {
    }
    // Fetching Values From URL
$genre = $_POST['genre'];
$price = $_POST['price'];
$connection = mysql_connect("classroom.cs.unc.edu", "svhirsch", "tsxm33eDncapNJWR"); // Establishing Connection with Server..
$db = mysql_select_db("svhirschdb", $connection); // Selecting Database
if (isset($_POST['genre'])) {
$query = mysql_query("insert into pictures(genre, price, filename) values ('$genre', '$price', '$newfilename')"); //Insert Query
echo "Form Submitted succesfully";
}
mysql_close($connection); // Connection Closed
}
?>
