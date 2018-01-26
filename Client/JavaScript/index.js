var idsAnim = ["#AnimT", "#AnimO1", "#AnimD", "#AnimO2", "#AnimPlus1", "#AnimPlus2"];
var index=0;
var logInShown = false;
function main(){
	setTimeout(function() {
		$("span.cursor").attr("id", "paused");
		showSymbolAnim();
	}, 1000);

	$("#enroll").on("click", function() {
		location.href = "signUp.php";
	})

	$("#showLogIn").on("click", function() {
		showLogIn();
	})

	$(window).on("resize", function() {
		setPosition();
	});

	function try_login() {
		var loginInfo = {
			username : $("#logInWindow input[name='username']").val(),
			password : $("#logInWindow input[name='password']").val()
		}
		$.ajax({
			type: "POST",
			url:"login.php", 
			data:loginInfo,
			dataType:"json",
			complete : function(xhr) {
				if(xhr.responseText == "Success") {
					window.location.href = "todoapp.php";
				}
				else {
					$("div#errorMessage").text("Wrong username or password");
				}
			}

		})
	}

	$("div#login").on("click", function() {
		try_login();
	})

	$("#logInWindow input").on("keypress", function(event) {
		if(event.keyCode == 13) {
			try_login();
		}
	})
}

function showSymbolAnim() {
	if(index>=0 && index<6) {
		$(idsAnim[index]).fadeIn(10);
		index++;
		setTimeout(function() {showSymbolAnim();}, 200 - Math.random()*100);
	}
	else {
		$("span.cursor").removeAttr("id");
	}
}

function showLogIn() {
	if(!logInShown) {
		if(setPosition() != -1) $("#triangle").fadeIn(50);
		$("#logInWindow").fadeIn(50);
		logInShown = true;
	}
	else {
		$("#triangle").fadeOut(50);
		$("#logInWindow").fadeOut(50);
		logInShown = false;
	}
}



function setPosition() {
	var logInButton = document.getElementById("showLogIn");
	var triangle = document.getElementById("triangle");
	var rectLogin = logInButton.getBoundingClientRect();
	var rectTriangle = triangle.getBoundingClientRect();
	var left;
	if(rectLogin.x != undefined) left = rectLogin.x + rectLogin.width/2 - rectTriangle.width/2;
	else if(rectLogin.left != undefined) left = rectLogin.left + rectLogin.width/2 - rectTriangle.width/2;
	else return -1;
	$("#triangle").css({"left":left});
}


$(document).ready(main());