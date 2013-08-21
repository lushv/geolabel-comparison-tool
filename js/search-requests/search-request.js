$(function() {
  $("#search-btn").click(function() {
	// First of all clear all the previous results
	document.getElementById("results_svg").innerHTML = '';
	
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
			if(isJson(data)){
			
				var JSONObject = JSON.parse(data);
				var x = 0;
				var y = 0;
				// Process all JSON datasets objects and build GEO label representations
				for (var i = 0; i < JSONObject.dataset.length; i++) {
					var datasetID = JSONObject.dataset[i].datasetIdentifier;
					var producerProfileAvailability = JSONObject.dataset[i].facets.producerProfile.availability;
					var producerCommentsAvailability = JSONObject.dataset[i].facets.produerComments.availability;
					var lineageAvailability = JSONObject.dataset[i].facets.lineage.availability;
					var standardsComplianceAvailability = JSONObject.dataset[i].facets.standardsComplaince.availability;
					var qualityInformationAvailability = JSONObject.dataset[i].facets.qualityInformation.availability;
					var userFeedbackAvailability = JSONObject.dataset[i].facets.userFeedback.availability;
					var expertReviewAvailability = JSONObject.dataset[i].facets.expertReview.availability;
					var citationsAvailability = JSONObject.dataset[i].facets.citations.availability;
					
					var organisationName = JSONObject.dataset[i].facets.producerProfile.organisationName;
					var supplementalInformation = JSONObject.dataset[i].facets.produerComments.supplementalInformation;
					//var knownProblems = JSONObject.dataset[i].facets.produerComments.knownProblems;
					var processStepCount = JSONObject.dataset[i].facets.lineage.processStepCount;
					var standardName = JSONObject.dataset[i].facets.standardsComplaince.standardName;
					var standardVersion = JSONObject.dataset[i].facets.standardsComplaince.standardVersion;
					var scopeLevel = JSONObject.dataset[i].facets.qualityInformation.scopeLevel;
					var feedbacksCount = JSONObject.dataset[i].facets.userFeedback.feedbacksCount;
					var ratingsCount = JSONObject.dataset[i].facets.userFeedback.ratingsCount;
					var feedbacksAverageRating = JSONObject.dataset[i].facets.userFeedback.feedbacksAverageRating;
					var expertReviewsCount = JSONObject.dataset[i].facets.expertReview.expertReviewsCount;
					var expertRatingsCount = JSONObject.dataset[i].facets.expertReview.expertRatingsCount;
					var expertAverageRating = JSONObject.dataset[i].facets.expertReview.expertAverageRating;
					var citationsCount = JSONObject.dataset[i].facets.citations.citationsCount;
					
					var resultsParentSVG = document.getElementById("results_svg");
					
					// Set GEO label svg
					var labelSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
					// Set a group element to group all GEO label facets
					var transformGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
					transformGroup.setAttributeNS(null, "id", "size_group_" + i);
					transformGroup.setAttributeNS(null, "class", "size_group");
					transformGroup.setAttributeNS(null, "transform", "scale(0.5) translate(" + x + " " + y + ")");
					
					// Create branding
					var brandingGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
					brandingGroup.setAttributeNS(null, "id", "branding_group_" + i);
					brandingGroup.setAttributeNS(null, "title", "Dataset ID: " + datasetID);
					getBranding(brandingGroup);
					
					// Create producer profile facet
					var producerProfileGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
					producerProfileGroup.setAttributeNS(null, "id", "producer_profile_" + i);
					// Check producer profile availability and generate appropriate facet
					if(producerProfileAvailability == 0){
						getProducerProfileNotAvailable(producerProfileGroup);
					}
					else if(producerProfileAvailability == 1){
						getProducerProfileAvailable(producerProfileGroup);
					}
					else if(producerProfileAvailability == 2){
						getProducerProfileHigherLevel(producerProfileGroup);
					}

					// Create producer comments facet
					var producerCommentsGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
					producerCommentsGroup.setAttributeNS(null, "id", "producer_comments_" + i);
					// Check producer profile availability and generate appropriate facet
					if(producerCommentsAvailability == 0){
						getProducerCommentsNotAvailable(producerCommentsGroup);
					}
					else if(producerCommentsAvailability == 1){
						getProducerCommentsAvailable(producerCommentsGroup);
					}
					else if(producerCommentsAvailability == 2){
						getProducerCommentsHigherLevel(producerCommentsGroup);
					}
					
					// Create lineage facet
					var lineageGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
					lineageGroup.setAttributeNS(null, "id", "lineage_" + i);
					// Check producer profile availability and generate appropriate facet
					if(lineageAvailability == 0){
						getLineageNotAvailable(lineageGroup);
					}
					else if(lineageAvailability == 1){
						getLineageAvailable(lineageGroup);
					}
					else if(lineageAvailability == 2){
						getLineageHigherLevel(lineageGroup);
					}
					
					// Create standards compliance facet
					var standardsComplianceGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
					standardsComplianceGroup.setAttributeNS(null, "id", "standards_compliance_" + i);
					// Check producer profile availability and generate appropriate facet
					if(standardsComplianceAvailability == 0){
						getStandardsComplianceNotAvailable(standardsComplianceGroup);
					}
					else if(standardsComplianceAvailability == 1){
						getStandardsComplianceAvailable(standardsComplianceGroup);
					}
					else if(standardsComplianceAvailability == 2){
						getStandardsComplianceHigherLevel(standardsComplianceGroup);
					}
					
					// Create quality information facet
					var qualityInformationGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
					qualityInformationGroup.setAttributeNS(null, "id", "quality_information_" + i);
					// Check producer profile availability and generate appropriate facet
					if(qualityInformationAvailability == 0){
						getQualityInformationNotAvailable(qualityInformationGroup);
					}
					else if(qualityInformationAvailability == 1){
						getQualityInformationAvailable(qualityInformationGroup);
					}
					else if(qualityInformationAvailability == 2){
						getQualityInformationHigherLevel(qualityInformationGroup);
					}
					
					// Create user feedback facet
					var userFeedbackGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
					userFeedbackGroup.setAttributeNS(null, "id", "user_feedback_" + i);
					// Check producer profile availability and generate appropriate facet
					if(userFeedbackAvailability == 0){
						getUserFeedbackNotAvailable(userFeedbackGroup);
					}
					else if(userFeedbackAvailability == 1){
						getUserFeedbackAvailable(userFeedbackGroup);
					}
					else if(userFeedbackAvailability == 2){
						getUserFeedbackHigherLevel(userFeedbackGroup);
					}
					
					// Create expert review facet
					var expertReviewGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
					expertReviewGroup.setAttributeNS(null, "id", "expert_review_" + i);
					// Check producer profile availability and generate appropriate facet
					if(expertReviewAvailability == 0){
						getExpertReviewNotAvailable(expertReviewGroup);
					}
					else if(expertReviewAvailability == 1){
						getExpertReviewAvailable(expertReviewGroup);
					}
					else if(expertReviewAvailability == 2){
						getExpertReviewHigherLevel(expertReviewGroup);
					}
					
					// Create citations facet
					var citationsGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
					citationsGroup.setAttributeNS(null, "id", "citations_" + i);
					// Check producer profile availability and generate appropriate facet
					if(citationsAvailability == 0){
						getCitationsInformationNotAvailable(citationsGroup);
					}
					else if(citationsAvailability == 1){
						getCitationsInformationAvailable(citationsGroup);
					}
					else if(citationsAvailability == 2){
						getCitationsInformationHigherLevel(citationsGroup);
					}
					
					transformGroup.appendChild(brandingGroup);
					transformGroup.appendChild(producerProfileGroup);
					transformGroup.appendChild(producerCommentsGroup);
					transformGroup.appendChild(lineageGroup);
					transformGroup.appendChild(standardsComplianceGroup);
					transformGroup.appendChild(qualityInformationGroup);
					transformGroup.appendChild(userFeedbackGroup);
					transformGroup.appendChild(expertReviewGroup);
					transformGroup.appendChild(citationsGroup);

					labelSVG.appendChild(transformGroup);
					resultsParentSVG.appendChild(labelSVG);
					
					x += 250;
					y += 0;
					
					
					
					
					/*
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
					*/
					
					
					
					
					
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
