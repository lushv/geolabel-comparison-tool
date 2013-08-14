$(function() {
  $("#search-btn").click(function() {
	// validate and process form here
	var keyword = $("input#keyword-autocomplete").val();
	var locationName = $("input#location-name-autocomplete").val();
	
	var latitudeMin = $("input#select-area-latitude-min").val();
	var latitudeMax = $("input#select-area-latitude-max").val();
	var longitudeMin = $("input#select-area-longitude-min").val();
	var longitudeMax = $("input#select-area-longitude-min").val();

	var startDate = $("input#start-date").val();
	var endDate = $("input#start-date").val();
 	
	var accessConstraints = $("input#access-constraints").val();
	var useConstraints = $("input#use-constraints").val();
	
	
    var dataString = 'keyword='+ keyword + '&locationName=' + locationName + '&startDate=' + startDate + '&endDate=' + endDate + '&accessConstraints=' + accessConstraints + '&useConstraints=' + useConstraints;
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