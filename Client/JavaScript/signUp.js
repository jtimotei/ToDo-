$(document).ready(function() {
	var accountCreated = false;
	$("div#signUp").on("click", function() {
		var signUpInfo = {
			username : $("table td input[name='username']").val(),
			password : $("table td input[name='password']").val(),
			name : $("input[name='name']").val()
		}
		if(!accountCreated && signUpInfo.username.trim() != "" && signUpInfo.password.trim() != "") {

			$.ajax({
				type: "POST",
				url:"createAcc.php", 
				data:signUpInfo,
				dataType:"json",
				complete : function(xhr) {
					if(xhr.responseText == "Success") {
						$("div#errorMessage2").text("Account created!");
						accountCreated = true;
					}
					else if(xhr.responseText == "Username already taken.") {
						$("div#errorMessage2").text("Username already taken.");
					}
					else {
						$("div#errorMessage2").text("Something went wrong.");
					}
				}

			})
		}
	})
});