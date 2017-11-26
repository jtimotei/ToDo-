// Menu

var iconsLeft = document.querySelectorAll("#categories li");
var slideMenuShown = false;

$("#MenuIcon").on("click", function(){
	$element= $("#menu");

	if(!slideMenuShown){
		$("#shadow").fadeIn(200);
		$element.animate({"right": "0%"},250, function() {
			slideMenuShown = true;
		});
		
	}
	else{
		$element.animate({"right": "-25%"},250, function() {
			slideMenuShown = false;
		});
		$("#shadow").fadeOut(200);
	}
});

$("#shadow").on("click", function(){
	$element.animate({"right": "-25%"},250, function() {
		slideMenuShown = false;
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


/*

$(iconsLeft[0]).mouseenter(function() {
	iconsLeft[0].childNodes[1].src = iconAddHover(iconsLeft[0].childNodes[1].src);
});
$(iconsLeft[0]).mouseleave(function() {
	iconsLeft[0].childNodes[1].src = iconRemoveHover(iconsLeft[0].childNodes[1].src);
});
$(iconsLeft[1]).mouseenter(function() {
	iconsLeft[1].childNodes[1].src = iconAddHover(iconsLeft[1].childNodes[1].src);
});
$(iconsLeft[1]).mouseleave(function() {
	iconsLeft[1].childNodes[1].src = iconRemoveHover(iconsLeft[1].childNodes[1].src);
});
$(iconsLeft[2]).mouseenter(function() {
	iconsLeft[2].childNodes[1].src = iconAddHover(iconsLeft[2].childNodes[1].src);
});
$(iconsLeft[2]).mouseleave(function() {
	iconsLeft[2].childNodes[1].src = iconRemoveHover(iconsLeft[2].childNodes[1].src);
});
*/