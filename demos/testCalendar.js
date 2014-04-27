	$(document).ready(function() {

	    $('#calendar').fullCalendar({

			dayClick: function() {
		        //$('#calendar').fullCalendar('changeView', 'agendaDay');
			},	    

		    weekends: false,
		    defaultView: 'agendaWeek',
		    timeFormat: '',
		    firstHour: 9,
		    //minTime: '8:00',
		    //maxTime: '17:30',
		    slotEventOverlap: false,

			header: {
				left:   'month agendaDay agendaWeek',
				center: '',
				right:  'prev,next'
			}
		
		});

		var strJSON,
			termsJSON=[], //ADD TO MYCALENDAR*******************
			subjectJSON=[],//ADD TO MY CALENDAR*******************
			newJSON = [],
			numResults = 20,
			myTerm,
			mySubject;

		function getDate(day) {
			var day2num = { "Mo": 1, "Tu": 2, "We": 3, "Th": 4, "Fr": 5 };
			return day2num[day];
		};

		function transformJSON() {
			
			$.getJSON("http://vazzak2.ci.northwestern.edu/courses/?term=" + myTerm + "&subject=" + mySubject, "json", function(result){
				var old = result;
					len = old.length;
				$("#resultarea").append("Number of results: " + len + " Displaying: " 
				+ numResults + "<br>");
				$.each(result.slice(0,numResults), function(i, field){
					var courseTitle = field["subject"] + " " + field["catalog_num"] + ": " +field["title"],
						courseID = field["class_num"] ;
					displayCourseList( courseTitle, courseID);
					for (var i=0;i<field["meeting_days"].length;i+=2) {
						var backColor = assignColor(field["catalog_num"]);
						if(field["meeting_days"]!=null && field["start_time"]!=null)
						{
							newJSON.push(
								{
									id: field["class_num"],
									title: courseTitle,
									start: "2014-09-0" + getDate(field["meeting_days"].slice(i,i+2)) + "T" + field["start_time"] + "Z",
									end: "2014-09-0" + getDate(field["meeting_days"].slice(i,i+2)) + "T" + field["end_time"] + "Z",
									allDay: false,
									backgroundColor:backColor,
									textColor: 'black'
								}
							);
						}
					}
				});


				strJSON = JSON.stringify(newJSON, undefined, 2); 
				//$("#resultarea").append(strJSON);
				displayCourses(newJSON);
				$('#calendar').fullCalendar('refetchEvents');	
			});
		};

		function getTermsJSON() {//ADD TO MYCALENDAR****************

			$.getJSON("http://vazzak2.ci.northwestern.edu/terms/", "json", function(result){
				var old = result;
					len = old.length;
				$.each(result.slice(0,10), function(i, field){
					displayTerms(field["term_id"],field["name"]);
						termsJSON.push(
							{
								id: field["term_id"],
								name: field["name"]
							}
						);
				});
				strJSON= JSON.stringify(termsJSON, undefined, 2); 
				
			});
		};
		function getSubjectJSON() {//ADD TO MYCALENDAR*******************

			$.getJSON("http://vazzak2.ci.northwestern.edu/subjects/", "json", function(result){
				var old = result;
					len = old.length;
				$.each(result, function(i, field){
					displaySubjects(field["symbol"],field["name"]);
						subjectJSON.push(
							{
								symbol: field["symbol"],
								name: field["name"]
							}
						);
					
				});

				strJSON = JSON.stringify(subjectJSON, undefined, 2); 
			
			});
		};
		
		function assignColor(catalogNum)
		{
			//alert(catalogNum);
			var eventColor;
			var strCourse = String(catalogNum);
			var course = strCourse.substr(0,1);
			var course_number = parseInt(course);
			//alert(course_number); 

			eventColor = { 5: '#A8FF00', 4: '#E8990C', 3: '#FF0000', 2:'#FFB71D', 1: '#07A5FF'}
			return eventColor[course_number]; 
		}

		function displayCourses(newJSON) {
			$('#calendar').fullCalendar('addEventSource', newJSON);
			$("input[type=checkbox]").change(function () {
				if (this.checked) {addCourse(this.id);}
				else {removeCourse(this.id);}
			});
		};

		function displayCourseList(title, courseID) {
			var html = "<input type='checkbox' " + "id='" + courseID + "' checked='checked'>" + title + "<br>";
			$('#resultarea').append(html);
		};

		function displaySubjects(symb,name){//ADD TO MY CALENDAR*************
			var html = "<li id='" +symb+ "'><a href='#''>" + name + "</a></li>";
			$('#departmentDropdown').append(html);

		};

		function displayTerms(id,terms){//ADD TO MYCALENDAR***************
			var html = "<li id='" + id + "''><a href='#''>" + terms + "</a></li>";
			$('#termDropdown').append(html); 
		};

		function addCourse(courseID) {
			var indices = jQuery.grep(newJSON, function(obj) {return obj.id == courseID;});
			$('#calendar').fullCalendar('addEventSource', indices);
		};

		function removeCourse(courseID) {
			$('#calendar').fullCalendar('removeEvents', courseID);
		};		

		$('#termDropdown').on('click', 'li', function(){//***********************
    		myTerm = $(this).attr('id');
    		$('#term-btn-title').empty();
    		$('#term-btn-title').append(this.innerHTML);
		});

		$('#departmentDropdown').on('click', 'li', function(){//****************************
    		mySubject = $(this).attr('id');
    		$('#department-btn-title').empty();
    		$('#department-btn-title').append(this.innerHTML);
    		transformJSON();
		});


		getTermsJSON();//**********************
		getSubjectJSON();//********************
		//alert(termsJSON);
		$('#calendar').fullCalendar('gotoDate', 2014, 8, 1);

	});





