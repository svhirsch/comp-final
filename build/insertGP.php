<?php
// Fetching Values From URL
$genre = $_POST['genre'];
$price = $_POST['price'];

$connection = mysql_connect("classroom.cs.unc.edu", "svhirsch", "tsxm33eDncapNJWR"); // Establishing Connection with Server..
$db = mysql_select_db("svhirschdb", $connection); // Selecting Database
if (isset($_POST['genre'])) {
$query = mysql_query("insert into pictures(genre, price, filename) values ('$genre', '$price', '$filename')"); //Insert Query
echo "Form Submitted succesfully";
}
mysql_close($connection); // Connection Closed
?>