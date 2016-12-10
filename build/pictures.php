<?php
  $con = new mysqli("classroom.cs.unc.edu", "svhirsch", "tsxm33eDncapNJWR", "svhirschdb");
  if ($con->connect_error){
    die("main.php failed to connect to MySQL: (" . $con->connect_errno . ") " . $con->connect_error);
  }
  // query to get all pic data
  $everything = $con->query("select filename, genre, price, userid from pictures");

  if ($everything) {
    $data = array();
    // while we haven't reached the last row
    while ($next_row=$everything->fetch_assoc()) {
        $data[] = $next_row;
        //echo "filename: " . $row["filename"]. " -genre: " . $row["firstname"]. "-price: " . $row["price"]. " ";
    }
    $json = json_encode($data);
    echo($json);
  }
?>
