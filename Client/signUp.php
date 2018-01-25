<?php
session_start();

if(isset($_SESSION["username"])) {
	header("Location: http://localhost/ToDo-/Client/todoapp.php");
	die();
}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Sign Up</title>
	<link rel="stylesheet" type="text/css" href="CSS/index.css">
	<link rel="stylesheet" type="text/css" href="CSS/signUp.css">
	<link href="https://fonts.googleapis.com/css?family=Passion+One|Fredoka+One|Ubuntu" rel="stylesheet">
	<link rel="icon" href="Resources/favicon.ico" type="image/x-icon" />
</head>
<body>
<header>
	 <img id="logo" src="Resources/logo.png">
	<div><a href="faq.html"> FAQ </a></div>
	<div id="showLogIn"><a> Log in </a></div>
</header>
<main>
	<img src="Resources/triangle.png" id="triangle">
	<div id="logInWindow">
		<div><input type="username" name="username" placeholder="Your username" required /></div>
		<div><input type="password" name="password" placeholder="Your password" required /></div>
		<div id="errorMessage"></div>
		<div id="login">Log in</div>
	</div>
	<div id="content">
	<h2>Create an account </h2><br>
	<table>
		<tr> <td>Username: </td><td><input type="text" name="username" placeholder="doe.john" required> </td></tr> 
		<tr> <td>Name: </td><td><input type="text" name="name" placeholder="John Doe" required></td></tr>
		<tr> <td>Password: </td><td><input type="password" name="password" placeholder="********" required></td></tr>
	</table>
	<div id="errorMessage2"></div>
	<div id="signUp">Sign up</dir>
	</div>
</main>


<footer>
	&#169; 2018 jtimotei
</footer>
<script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>	
<script type="text/javascript" src="JavaScript/index.js"></script>
<script type="text/javascript" src="JavaScript/signUp.js"></script>
</body>
</html>