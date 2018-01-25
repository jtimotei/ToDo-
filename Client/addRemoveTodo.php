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
	$text = test_input($_POST["text"]);
	$date = test_input($_POST["date"]);
	$op = test_input($_POST["op"]);

	// Create connection
	$conn = new mysqli($mysql["servername"], $mysql["username"], $mysql["password"], $mysql["dbname"]);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection with the database failed :-(");
	} 

	if($op == "remove") {
		$sql = "delete from todos where username='" . $user . "' AND text='" . $text ."' AND date='" . $date . "' LIMIT 1;";
	}
	else if($op == "add") {
		$sql = "insert into todos (username, text, date) values ('" . $user . "', '" . $text . "', '" . $date . "');";
	} 
	else {
		die("Something went wrong.");
	}

	$result = $conn->query($sql);
	if ($result) {
		echo "Success";
	} else {
	    echo "Something went wrong.";
	}

	$conn->close();
}

retrieveTodos();
?>