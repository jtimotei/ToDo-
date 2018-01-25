<?php
session_start();

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

function retrieveTodos() {
	require "credentials.php";
	$user = test_input($_SESSION["username"]);

	// Create connection
	$conn = new mysqli($mysql["servername"], $mysql["username"], $mysql["password"], $mysql["dbname"]);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection with the database failed :-(");
	} 

	$sql = "select * from todos where username='" . $user . "';";

	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
		while($r = $result->fetch_assoc()) {
			$rows[] = $r; 
		}
		echo json_encode($rows);
	} else {
	    echo "No to-dos";
	}

	$conn->close();
}

retrieveTodos();
?>