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

	if(!isset($_SESSION["username"])) {
		echo "Access denied";
		die();
	}

	$color = test_input($_POST["color"]);

	// Create connection
	$conn = new mysqli($mysql["servername"], $mysql["username"], $mysql["password"], $mysql["dbname"]);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection with the database failed :-(");
	} 

	$sql = "update users set color='" . $color . "' where username='" . $_SESSION["username"] . "';";

	$result = $conn->query($sql);
	if ($result) {
		$_SESSION["color"] = $color;
		echo "Success";
	} else {
	    echo "Something went wrong";
	}

	$conn->close();
}

login();
?>