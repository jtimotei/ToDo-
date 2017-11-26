var idsAnim = ["#AnimT", "#AnimO1", "#AnimD", "#AnimO2", "#AnimPlus1", "#AnimPlus2"];
var index=0;
var logInShown = false;
function main(){
	setTimeout(function() {
		$("span.cursor").attr("id", "paused");
		showSymbolAnim();
	}, 1000);

	$("#enroll").on("click", function() {
		location.href = "sign_up.html";
	})

	$("#showLogIn").on("click", function() {
		showLogIn();
	})

	$(window).on("resize", function() {
		setPosition();
	});

	$("div#login").on("click", function() {
		location.href = "todoapp.html";
	})
}

function showSymbolAnim() {
	if(index>=0 && index<6) {
		$(idsAnim[index]).fadeIn(10);
		index++;
		setTimeout(function() {showSymbolAnim();}, 200);
	}
	else {
		$("span.cursor").removeAttr("id");
	}
}

function showLogIn() {
	if(!logInShown) {
		setPosition();
		$("#triangle").fadeIn(50);
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
	var left = rectLogin.x + rectLogin.width/2 - rectTriangle.width/2;
	$("#triangle").css({"left":left});
}


$(document).ready(main());