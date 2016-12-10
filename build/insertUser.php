<?php

	$username = $_POST['createuser'];
	$password = $_POST['createpw'];
	$password = sha1($password);

	$con = new mysqli("classroom.cs.unc.edu", "svhirsch", "tsxm33eDncapNJWR", "svhirschdb");
  if ($con->connect_errno > 0){
    die("Couldn't connect: " . $con->connect_error);
  }
	if(!$con->query("INSERT INTO users ('name', 'pass') VALUES ('$username', '$password')")){
    echo "Could not insert user: (" . $con->connect_errno . ") " . $con->connect_error;
  }

	mysqli_close();
?>
