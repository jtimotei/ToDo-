<?php
session_start();

if(!isset($_SESSION["username"])) {
	header("Location: http://localhost/ToDo-/Client/index.php");
	die();
}
?>
<!DOCTYPE html>
<html>
<head>
	<title>ToDo++</title>
	<link rel="stylesheet" type="text/css" href="CSS/todoapp.css">
	<link href="https://fonts.googleapis.com/css?family=Passion+One|Fredoka+One|Ubuntu|Anton" rel="stylesheet">
	<link rel="icon" href="Resources/favicon.ico" type="image/x-icon" />
</head>
<script> 

</script>
<body>
<header id=<?php echo $_SESSION["color"]; ?>>
	<img id="logo" src="Resources/logo.png">
	<div><img id="MenuIcon" src="Resources/MenuIcon.png"></div>

</header>
<main>
	<div id="menu">
		<div id="menuContent">
			<div><img src="Resources/UserIcon.svg"><span style="font-size: 2em; margin:0px;"><?php echo $_SESSION["name"]; ?></span></div>
			<div id="colors"><p>Themes</p>
			<table><tr>
				<td data-color="bluec" style="background-color: rgb(0, 51, 102)"></td>
				<td data-color="redc" style="background-color: rgb(153, 0, 0)"></td>
				<td data-color="orangec" style="background-color: rgb(255, 102, 0)"></td>
			</tr>
			<tr>
				<td data-color="yellowc" style="background-color: rgb(230, 184, 0)"></td>
				<td data-color="greenc" style="background-color: rgb(36, 143, 36)"></td>
				<td data-color="purplec" style="background-color: rgb(71, 0, 179)"></td>
			</tr></table>
			</div>
			<div id="logOutButton">Log out</div>
		</div>
	</div>
	<div id="shadow"></div>
	<div id="left">
		<ul id="categories">
			<li id=<?php echo $_SESSION["color"]; ?> class="active"> <img class="iconsLeft"  src="Resources/inbox.png"> <div> <p> Inbox </p> </div> </li>
			<li id=<?php echo $_SESSION["color"]; ?>> <img class="iconsLeft"  src="Resources/today.png"> <div> <p> Today </p> </div> </li>
			<li id=<?php echo $_SESSION["color"]; ?>> <img class="iconsLeft" src="Resources/calendar.png"> <div> <p> Next 7 days </p> </div> </li>			
		</ul>
		<div id="copyright">&#169; 2018 jtimotei</div>
	</div>
	<div id="right">
		
		<div id="mainPageContainer">
		<div id="content">
			<h1> Hi <?php echo $_SESSION["name"]; ?></h1>
			<br>
			<h3 id="subtitle"> You don't have any saved plans. </h3>
			<div id="todoList">
			</div>

			</div>
		<div id="addTodoDiv"> <forms id="addTodo" method="get" action="/addtodo">
			<input name="text" maxlength="50" type="text" placeholder="Add another todo">
			<input name="date" type="date">
			<button>+</button>
		</forms>
		</div>
		</div>
		
	</div>
</main>

<script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>	
<script src="JavaScript/hover.js"></script>
<script src="JavaScript/todoapp.js"></script>
</body>
</html>
