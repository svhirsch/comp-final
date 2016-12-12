<?php
$filenameArray = [];

$handle = opendir(dirname(realpath(__FILE__)).'/fileupload/');
        while($file = readdir($handle)){
            if($file !== '.' && $file !== '..' && $file != '.DS_Store'){
                array_push($filenameArray, "fileupload/$file");
            }
        }
echo json_encode($filenameArray);
?>