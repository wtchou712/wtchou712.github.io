$(document).ready(function() {
	
	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();


	
	$('#calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,basicWeek,basicDay'
		},
		defaultView: 'agendaWeek',
		editable: true, //or true
		//hiddenDays: [2, 4],
		weekends: false,
		events: [
			{
				title: 'All Day Event',
				start: new Date(y, m, 1)
			},
			{
				title: 'Long Event',
				start: new Date(y, m, d-5),
				end: new Date(y, m, d-2)
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: new Date(y, m, d-3, 16, 0),
				allDay: false
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: new Date(y, m, d+4, 16, 0),
				allDay: false
			},
			{
				title: 'Meeting',
				start: new Date(y, m, d, 10, 30),
				allDay: false
			},
			{
				title: 'Lunch',
				start: new Date(y, m, d, 12, 0),
				end: new Date(y, m, d, 14, 0),
				allDay: false
			},
			{
				title: 'Birthday Party',
				start: new Date(y, m, d+1, 19, 0),
				end: new Date(y, m, d+1, 22, 30),
				allDay: false
			},
			{
				title: 'Click for Google',
				start: new Date(y, m, 28),
				end: new Date(y, m, 29),
				url: 'http://google.com/'
			}
		],
		
		eventClick: function(calEvent, jsEvent, view)
		{
			removeClickedEvent(calEvent.id);
		}

		
	});

	function removeClickedEvent(eventID)
	{
		$('#calendar').fullCalendar(
			'removeEvents',
			eventID
			);
	}

	function createEvents() {
		var eventArray = 
		[
			{
				id:211,
				title:'EECS 211',
				start: new Date(y,m,d-1,8,0),
				end: new Date(y,m,d-1,9,0),
				allDay:false
			},
			{
				id: 213, 
				title:'EECS 213',
				start: new Date(y,m,d-1,13,0),
				end: new Date(y,m,d-1,14,0),
				allDay:false
			}

		]
		return eventArray; 
	}

	var eventArray = createEvents();
	$('#addButton').click(function() {
		$('#calendar').fullCalendar(
			'addEventSource',
			eventArray
			//EECSevent
		);
		//alert("test test test");
	});
	$('#removeButton').click(function() {
	/*	$('#calendar').fullCalendar(
			'removeEventSource',
			eventArray
		); */
		//alert("test test test");
		removeClickedEvent(213);
		
	});
	//************************* BEGIN CODE FOR ADD/REMOVE TABLE*********
	//eventArray is our tester array with events
	/*
	for (var i = 0; i < eventArray.length; i++)
	{
		var table = document.getElementById("addTable");
		var	row = table.insertRow(i+3);
		var cell1 = row.insertCell(0); 
		//cell1.innerHTML = eventArray[i].title; 
		cell1.innerHTML = eventArray[i].title;
	}*/
	function displayCourses(newJSON) {
			var html = "";
			for (var i=0;i<20;i+=1) {
				html += "<input type='checkbox'>" + newJSON[i].title + "<br>";
			}
			$('#resultarea').append(html);
			$('#calendar').fullCalendar('addEventSource', newJSON);
	};


		
});





















