var main=function(){
	"use strict";

	var studyTodos=[];
	var $element;
	var filteringMode = 0;

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
		this.prioritized = prioritized;
		this.done = done;
	}

	var njstupid = function(index, todo){
		this.index = index;
		this.todo = todo;
	}
	
	window.removeTodo = function(index){

		studyTodos.splice(index,1);
		var obj = new njstupid(index,undefined);
		
		$.post('remove', obj);		
		printTodos(filteringMode);
		
	}


	window.crossText = function(index, index2){

		var todoList = document.getElementById("todoList");
		$(todoList.childNodes[index]).css("text-decoration","line-through");

		if(index2 != undefined) {
			studyTodos[index2].done = 'yes';
			var obj= new njstupid(index2, studyTodos[index2]);
			$.post('update', obj);	

		}
		else{
			studyTodos[index].done = 'yes';
			var obj= new njstupid(index, studyTodos[index]);
			$.post('update', obj);	
		}




	}

	window.makeRed = function(index, index2){

		var todoList = document.getElementById("todoList");
		$(todoList.childNodes[index]).css("color","red");
		if(index2 != undefined) {
			studyTodos[index2].prioritized = 'yes';
			var obj= new njstupid(index2, studyTodos[index2]);
			$.post('update', obj);	

		}
		else{
			studyTodos[index].prioritized = 'yes';
			var obj= new njstupid(index, studyTodos[index]);
			$.post('update', obj);	
		}

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

	function printAllTodos(){
		var today = getCurrentTime(); 
		for(var temp in studyTodos){
			var overdue;
			if(isLater(today, studyTodos[temp].date)){
				overdue = "OVERDUE! | ";
			}
			else overdue = "";
			var $new_todo = $("<p>").text(overdue + studyTodos[temp].text+" | Due date: " + studyTodos[temp].date);
			var $new_button1 = document.createElement("button");
			$new_button1.innerHTML = "Remove";
			$new_todo.append($new_button1);
			$new_button1.setAttribute("onclick","removeTodo("+temp+")");
			var $new_button2 = document.createElement("button");
			$new_button2.innerHTML = "Prioritize";
			$new_todo.append($new_button2);
			$new_button2.setAttribute("onclick","makeRed("+temp+")");
			var $checkBox = document.createElement("input");
			$new_todo.append($checkBox);
			$checkBox.setAttribute("type","checkBox");
			$checkBox.setAttribute("onclick", "crossText("+temp+")");
			$new_todo.hide();
			$("#todoList").append($new_todo);
			$new_todo.fadeIn(0);

			if(studyTodos[temp].prioritized == 'yes'){
				var todoList = document.getElementById("todoList");
				$(todoList.childNodes[temp]).css("color","red");
			}
			if(studyTodos[temp].done == 'yes'){
				var todoList = document.getElementById("todoList");
				$(todoList.childNodes[temp]).css("text-decoration","line-through");
			}

		}
		$("#addTodo input").val("");
	}

	function printTodayTodos(){
		var today = getCurrentTime();
		var temp2=0;
		for(var temp in studyTodos){

			if(isEqual(studyTodos[temp].date, today)){
				var $new_todo = $("<p>").text(studyTodos[temp].text+" | Due date: " + studyTodos[temp].date);
				var $new_button1 = document.createElement("button");
				$new_button1.innerHTML = "Remove";
				$new_todo.append($new_button1);
				$new_button1.setAttribute("onclick","removeTodo("+temp+")");
				var $new_button2 = document.createElement("button");
				$new_button2.innerHTML = "Prioritize";
				$new_todo.append($new_button2);
				$new_button2.setAttribute("onclick","makeRed("+temp2+","+temp+")");
				var $checkBox = document.createElement("input");
				$new_todo.append($checkBox);
				$checkBox.setAttribute("type","checkBox");
				$checkBox.setAttribute("onclick", "crossText("+temp2+","+temp+")");
				$new_todo.hide();
				$("#todoList").append($new_todo);
				$new_todo.fadeIn(0);

				if(studyTodos[temp].prioritized == 'yes'){
					var todoList = document.getElementById("todoList");
					$(todoList.childNodes[temp2]).css("color","red");
				}
				if(studyTodos[temp].done == 'yes'){
					var todoList = document.getElementById("todoList");
					$(todoList.childNodes[temp2]).css("text-decoration","line-through");
				}
				temp2++;
			}
		}
		$("#addTodo input").val("");
	}

	function print7Todos(){
		var currentTime = new Date();
		var month = currentTime.getMonth() + 1;
		var day = currentTime.getDate();
		var year = currentTime.getFullYear();
		var today = year + "-" + month + "-" + day;
		currentTime.setDate(currentTime.getDate() + 8);
		var overOneWeek = currentTime.getFullYear()+'-'+ (currentTime.getMonth()+1) +'-'+currentTime.getDate();

		var temp2=0;
		for(var temp in studyTodos){
			if(isLater(studyTodos[temp].date,today) && isLater(overOneWeek, studyTodos[temp].date)){
				var $new_todo = $("<p>").text(studyTodos[temp].text+" | Due date: " + studyTodos[temp].date);
				var $new_button1 = document.createElement("button");
				$new_button1.innerHTML = "Remove";
				$new_todo.append($new_button1);
				$new_button1.setAttribute("onclick","removeTodo("+temp+")");
				var $new_button2 = document.createElement("button");
				$new_button2.innerHTML = "Prioritize";
				$new_todo.append($new_button2);
				$new_button2.setAttribute("onclick","makeRed("+temp2+","+temp+")");
				var $checkBox = document.createElement("input");
				$new_todo.append($checkBox);
				$checkBox.setAttribute("type","checkBox");
				$checkBox.setAttribute("onclick", "crossText("+temp2+","+temp+")");
				$new_todo.hide();
				$("#todoList").append($new_todo);

				$new_todo.fadeIn(0);
				if(studyTodos[temp].prioritized == 'yes'){
					var todoList = document.getElementById("todoList");
					$(todoList.childNodes[temp2]).css("color","red");
				}
				if(studyTodos[temp].done == 'yes'){
					var todoList = document.getElementById("todoList");
					$(todoList.childNodes[temp2]).css("text-decoration","line-through");
				}
				temp2++;
			}
		}
		$("#addTodo input").val("");

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