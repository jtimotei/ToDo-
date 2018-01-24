var main=function(){
	"use strict";

	var studyTodos=[];
	var $element;
	var filteringMode = 0;
	var iconsLeft = document.querySelectorAll("#categories li");

	function checkTodos(todos){
		var changed = false;
		var todoList	=	document.getElementById('todoList');
		if(todos != undefined && todos.length != studyTodos.length){
			changed = true;
		}
		else {
			for(var i in todos){
				for(var j in todos[i]){
					
					if(todos[i][j] != studyTodos[i][j]){
						changed = true;
						break;
					}										
				}
			}
		}
		if(changed){
			studyTodos=[];
			for(var i=0;i<todos.length;i++) studyTodos[i]=todos[i];
			printTodos(filteringMode);
		} 
	}

	// Modes
	var makeModeActive= function(filteringMode){
		$(iconsLeft).removeClass("active");
		$(iconsLeft[filteringMode]).addClass("active");
	};

	$(iconsLeft[0]).on("click", function(){ 
		filteringMode = 0;
		makeModeActive(0);
		printTodos(filteringMode);
	});
	$(iconsLeft[1]).on("click", function(){ 
		filteringMode = 1;
		makeModeActive(1);
		printTodos(filteringMode);
	});
	$(iconsLeft[2]).on("click", function(){ 
		filteringMode = 2;
		makeModeActive(2);
		printTodos(filteringMode);
	});

	// Tabs
	var tabs = document.querySelectorAll("#tabs ul li");
	var makeTabActive= function(tabNumber){
		$(tabs).removeClass("active");
		$(tabs[tabNumber]).addClass("active");
	};
	$(tabs[0]).on("click", function () {
		makeTabActive(0);
	});
	$(tabs[1]).on("click", function () {
		makeTabActive(1);;
	});
	$(tabs[2]).on("click", function () {
		makeTabActive(2);
	});

	

	// Todos
	function Todo(text, date, prioritized, done){
		this.text = text;
		this.date = date;
	}

	
	window.removeTodo = function(index){

		studyTodos.splice(index,1);
		
		//$.post('remove', obj);		
		printTodos(filteringMode);
		
	}


	// Printing Todos and filtering

	// checks if str1 is later than str2
	function isLater(str1, str2){
		var a = new Date(str1);
		var b = new Date(str2);

		if(a.getYear() == b.getYear()) {
			if(a.getMonth() == b.getMonth()) return a.getDate() > b.getDate();
			else return a.getMonth() > b.getMonth();
		}
		else return a.getYear() > b.getYear();
	}

	function isEqual(str1, str2) {
		var a = new Date(str1);
		var b = new Date(str2);

		return (a.getYear() == b.getYear() && a.getMonth() == b.getMonth() && a.getDate() == b.getDate()); 
	}

	function getCurrentTime() {
		var currentTime = new Date();
		var month = currentTime.getMonth() + 1;
		var day = currentTime.getDate();
		var year = currentTime.getFullYear();
		var today = year + "-" + month + "-" + day;
		return today;
	}

	function createTodoDiv(overdue, text, date, index) {
		var $outer_div = $("<div>");
		var $new_todo = $("<div>").text(overdue + text+" | Due date: " + date);
		var $remove = $("<img src='Resources/cross.png' id='cross'>");
		$outer_div.append($new_todo);
		$outer_div.append($remove);
		$remove.on("click", function() {
			removeTodo(index);
		})
		$outer_div.hide();
		$("#todoList").append($outer_div);
		$outer_div.fadeIn(0);
	}

	function printAllTodos(){
		var today = getCurrentTime();

		var anyPlans = false;
		for(var temp in studyTodos){
			anyPlans = true;
			var overdue;
			if(isLater(today, studyTodos[temp].date)){
				overdue = "OVERDUE! | ";
			}
			else overdue = "";
			createTodoDiv(overdue, studyTodos[temp].text, studyTodos[temp].date, temp);

		}
		$("#addTodo input").val("");

		if(anyPlans) $("#subtitle").text("You plan on: ");
		else $("#subtitle").text("You don't have any saved plans.")
	}

	function printTodayTodos(){
		var today = getCurrentTime();
		var anyPlans = false;
		for(var temp in studyTodos){

			if(isEqual(studyTodos[temp].date, today)){
				anyPlans = true;
				createTodoDiv("", studyTodos[temp].text, studyTodos[temp].date);
			}
		}
		$("#addTodo input").val("");

		if(anyPlans) $("#subtitle").text("Your plans for today are:");
		else $("#subtitle").text("You don't have any plans for today.")
	}

	function print7Todos(){
		var currentTime = new Date();
		currentTime.setDate(currentTime.getDate() + 8);
		var overOneWeek = currentTime.getFullYear()+'-'+ (currentTime.getMonth()+1) +'-'+currentTime.getDate();
		
		var anyPlans = false;
		for(var temp in studyTodos){
			if(isLater(studyTodos[temp].date,getCurrentTime()) && isLater(overOneWeek, studyTodos[temp].date)){
				anyPlans = true;
				createTodoDiv("", studyTodos[temp].text, studyTodos[temp].date);
			}
		}
		$("#addTodo input").val("");

		if(anyPlans) $("#subtitle").text("Your plans for the next 7 days are:");
		else $("#subtitle").text("You don't have any plans for the next 7 days.")
	}

	function printTodos(filteringMode){
		document.getElementById("todoList").innerHTML ="";
		if(filteringMode == 0) printAllTodos();
		else if(filteringMode == 1) printTodayTodos();
		else print7Todos();
	}


	$("#addTodo button").on("click", function(event) {
		updateTodos();
	});


	$("#addTodo input").on("keypress", function(event) {
		if(event.keyCode==13){
			updateTodos();
		}
	})

	function updateTodos() {
		var temp = new Todo(document.querySelector("#addTodo input:nth-child(1)").value, document.querySelector("#addTodo input:nth-child(2)").value.toString());

		if(temp.text!=="" && temp.date!==""){ 
			//push it to array
			studyTodos.push(temp);
			$.post('addtodos', temp);
			printTodos(filteringMode);			
		}
	}
}


$(document).ready(main);