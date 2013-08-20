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
			$("#search-results").html(data);
			/*
			if(isJson(data)){
				var JSONObject = eval("(" + data + ')');

				var searchStr = "Dataset ID: " + JSONObject.dataset[0].datasetIdentifier;
				$("#search-results").html(searchStr);
			}
			*/
			
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