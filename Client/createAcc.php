<?php
session_start();

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

function signUp() {
	require "credentials.php";
	$user = test_input($_POST["username"]);
	$pass = test_input($_POST["password"]);
	$name = test_input($_POST["name"]);

	// Create connection
	$conn = new mysqli($mysql["servername"], $mysql["username"], $mysql["password"], $mysql["dbname"]);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection with the database failed :-(");
	} 

	$sql1 = "select * from users where username='" . $user . "';";
	$result = $conn->query($sql1);
	if(!$result || $result->num_rows>0) {
		die("Username already taken.");
	}

	$sql2 = "insert into users (username, password, name, color) values ('" . $user . "', '" . $pass . "', '" . $name . "', 'bluec');";
	$result = $conn->query($sql2);
	if ($result) {
		echo "Success";
	} else {
	    echo "Something went wrong.";
	}

	$conn->close();
}

signUp();
?>