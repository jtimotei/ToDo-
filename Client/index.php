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
	<title>ToDo++</title>
	<link rel="stylesheet" type="text/css" href="CSS/index.css">
	<link href="https://fonts.googleapis.com/css?family=Passion+One|Fredoka+One|Ubuntu" rel="stylesheet">
	<link rel="icon" href="Resources/favicon.ico" type="image/x-icon" />
</head>
<script> 

</script>
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
		<p><span id="AnimT">T</span><span id="AnimO1">o</span><span id="AnimD">D</span><span id="AnimO2">o</span><span id="AnimPlus1">+</span><span id="AnimPlus2">+</span><span class="cursor">&#x25AE</span></p>
		<p id="moto">Keep your stuff organized even as a computer scientist.</p>
		<div id="enroll">Join now!</div>
	</div>
</main>
<footer>
	&#169; 2018 jtimotei
</footer>
<script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>	
<script src="JavaScript/index.js"></script>
</body>
</html>
