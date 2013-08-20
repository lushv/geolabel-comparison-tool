$(function() {
  $("#search-btn").click(function() {
	// validate and process form here
	var keyword = $("input#keyword-autocomplete").val();
	var startDate = $("input#start-date").val();
	var endDate = $("input#end-date").val();
	var accessConstraints = $("select#access-constraints").val();
	var useConstraints = $("select#use-constraints").val();
	
    var dataString = 'keyword='+ keyword + '&startDate=' + startDate + '&endDate=' + endDate + '&accessConstraints=' + accessConstraints + '&useConstraints=' + useConstraints;	
	
	if($('#location-radio').is(':checked')){
		var countryCode = $("#location-name-select").val();
		
		dataString += '&countryCode=' + countryCode;
	}
	
	if($('#area-selection-radio').is(':checked')){
		var latitudeNorth = $("input#select-area-north").val();
		var latitudeSouth = $("input#select-area-south").val();
		var longitudeWest = $("input#select-area-west").val();
		var longitudeEast = $("input#select-area-east").val();
		
		dataString += '&latitudeNorth=' + latitudeNorth + '&latitudeSouth=' + latitudeSouth + '&longitudeWest=' + longitudeWest + '&longitudeEast=' + longitudeEast;
	}


    //alert (dataString);return false;
    $.ajax({
		  type: "POST",
		  url: "php/process_search_request.php",
		  data: dataString,
		success: function(data){
			var searchStr = "";
			if(isJson(data)){
				var JSONObject = JSON.parse(data);

				// Process all JSON datasets objects and build GEO label representations
				for (var i = 1; i < JSONObject.dataset.length; i++) {
					//searchStr += "Dataset ID: " + JSONObject.dataset[i].datasetIdentifier;
					var producerProfileAvailability = JSONObject.dataset[i].facets.producerProfile.availability;
					
					var paper = new Raphael(document.getElementById('tab-pane-search-results'), 250, 250);
					var c;
					var d;
					var r;

					if(producerProfileAvailability == 1){
						paper.setStart();
						c = paper.path("M152.178,97.822l59.796-59.795 C187.958,14.008,156.478,2,125,2l0,84.563C134.837,86.563,144.674,90.316,152.178,97.822z");
						c.attr({fill: "#f00"});
						d = paper.path("M154.14,31.925 c2.306-0.358,5.972,1.384,5.972,1.384c-7.198,7.265-17.221,16.66-21.993,21.108c-1.67-0.165-3.921-0.971-3.979-2.51 c-0.066-1.755,2.612-3.657,4.608-5.616c4.082-4.008,6.06-6.125,10.018-10.091C150.775,34.184,152.558,32.167,154.14,31.925z");
						var st = paper.setFinish();
						paper.setStart();
						r = paper.path("M163.437,124.843H248 c0-33.965-13.768-64.716-36.026-86.974l-59.795,59.794C159.135,104.619,163.437,114.229,163.437,124.843z");
						var st2 = paper.setFinish();

					}
					
					var st = paper.set();
					st.push(
					);
					st.transform("s0.5...");
					
					
					
					
					
					
				}
				//$("#search-results").html(searchStr);
			}
			else{
				$("#search-results").html("ERROR");
			}
			
			
			// switch tabs when the button is clicked
			$("#map-tab").removeClass("active");
			$("#serach-results-tab").addClass("active");
			$('.tab-content #tab-pane-map').hide();
			$('.tab-content #tab-pane-search-results').show();
		},
		error:function(){
			alert("failure");
			$("#search-results").html('There is error while submit');
		}
    });
    return false;
  });
});

// Function for JSON validation
function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

// Function to make tabs active and display the content when tabs are clicked
$(function() {
  $("#map-tab").click(function() {
	// make the clicked tab active
	$("#serach-results-tab").removeClass("active");
	$("#map-tab").addClass("active");
	$('.tab-content #tab-pane-search-results').hide();
	$('.tab-content #tab-pane-map').show();
  });
  
  $("#serach-results-tab").click(function() {
	// make the clicked tab active
	$("#map-tab").removeClass("active");
	$("#serach-results-tab").addClass("active");
	$('.tab-content #tab-pane-map').hide();
	$('.tab-content #tab-pane-search-results').show();	
  });
});
/*
window.onload = function() {  
    var paper = new Raphael(document.getElementById('tab-pane-search-results'), 500, 500);
	
  jQuery.ajax({
    type: "GET",
    url: "img/coloredtoucan.svg",
    dataType: "xml",
    success: function(svgXML) {
      var newSet = paper.importSVG(svgXML);
    }
  });
}
*/