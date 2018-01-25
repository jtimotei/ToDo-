var slideMenuShown = false;

$("#MenuIcon").on("click", function(){
	$element= $("#menu");

	if(!slideMenuShown){
		$("#shadow").fadeIn(200);
		$element.fadeIn(0, function() {
			$element.animate({"right": "0px"},250, function() {
				slideMenuShown = true;
			});
		});		
	}
	else{
		
		$element.animate({"right":"-300px"},250, function() {
			slideMenuShown = false;
			$element.hide();
		});
		
		$("#shadow").fadeOut(200);
	}
});

$("#shadow").on("click", function(){
	$element.animate({"right": "-300px"},250, function() {
		slideMenuShown = false;
		$element.fadeOut(0);
	});
	$("#shadow").fadeOut(100);
});

$(document).on("keyup", function(event){
	if(event.keyCode == 27) $("#menuDiv").css("display","none");
});

var $element2 = document.getElementById("MenuIcon");
$($element2).mouseenter(function() {
	$element2.src = iconAddHover($element2.src);
});
$($element2).mouseleave(function() {
	$element2.src = iconRemoveHover($element2.src);
});


// Left Menu
function iconAddHover(a){
	a = a.substring(0,a.length - 4) + "Hover.png";
	return a;
}

function iconRemoveHover(a){
	a = a.substring(0,a.length - 9) + ".png";
	return a;
}


$("#colors table td").on("click", function() {
	$("div#left ul li").attr("id", $(this).attr("data-color"));
	$("header").attr("id", $(this).attr("data-color"));

	$.ajax({
		type: "POST",
		url:"color.php", 
		data:{color: $(this).attr("data-color")},
		dataType:"json"
	})
});

