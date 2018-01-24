<?php
session_start();

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

function login() {
	require "credentials.php";
	$user = test_input($_POST["username"]);
	$pass = test_input($_POST["password"]);

	// Create connection
	$conn = new mysqli($mysql["servername"], $mysql["username"], $mysql["password"], $mysql["dbname"]);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection with the database failed :-(");
	} 

	$sql = "select * from users where username='" . $user . "';";

	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
		$row = $result->fetch_assoc();
		if($pass === $row["password"]) {
	    	$_SESSION["username"] = $user;
	    	$_SESSION["name"] = $row["name"];
	    	$_SESSION["color"] = "bluec";
			echo "Success";
		}
		else {
			echo "Wrong username or password";
		}
	} else {
	    echo "Wrong username or password";
	}

	$conn->close();
}

login();
?>