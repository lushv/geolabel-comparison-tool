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
				var scale = 0.2;
				var x = 30;
				var y = 30;
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
					var knownProblems = "";
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
					labelSVG.setAttributeNS(null, "id", "geolabel_" + i);
					// Set a group element to group all GEO label facets
					var transformGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
					transformGroup.setAttributeNS(null, "id", "size_group_" + i);
					transformGroup.setAttributeNS(null, "class", "size_group");
					transformGroup.setAttributeNS(null, "transform", "translate(" + x + " " + y + ") scale(" + scale + ") ");
					transformGroup.setAttributeNS(null, "size_scale", scale);
					transformGroup.setAttributeNS(null, "translate_x", x);
					transformGroup.setAttributeNS(null, "translate_y", y);
					//transformGroup.setAttributeNS(null, "scale", scale);
					//transformGroup.setAttributeNS(null, "translate", x + " " + y);
					
					// Create branding
					var brandingGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
					brandingGroup.setAttributeNS(null, "id", "branding_group_" + i);
					brandingGroup.setAttributeNS(null, "title", "Dataset ID: " + datasetID);
					getBranding(brandingGroup);
					
					// Create producer profile facet
					var producerProfileGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
					producerProfileGroup.setAttributeNS(null, "id", "producer_profile_" + i);
					producerProfileGroup.setAttributeNS(null, "producer_profile_name", organisationName);
					// Check producer profile availability and generate appropriate facet
					if(producerProfileAvailability == 0){
						getProducerProfileNotAvailable(producerProfileGroup);
						producerProfileGroup.setAttributeNS(null, "availability", 0);
					}
					else if(producerProfileAvailability == 1){
						getProducerProfileAvailable(producerProfileGroup);
						producerProfileGroup.setAttributeNS(null, "availability", 1);
					}
					else if(producerProfileAvailability == 2){
						getProducerProfileHigherLevel(producerProfileGroup);
						producerProfileGroup.setAttributeNS(null, "availability", 2);
					}

					// Create producer comments facet
					var producerCommentsGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
					producerCommentsGroup.setAttributeNS(null, "id", "producer_comments_" + i);
					producerCommentsGroup.setAttributeNS(null, "supplemental_information", supplementalInformation);
					producerCommentsGroup.setAttributeNS(null, "known_problems", knownProblems);
					// Check producer profile availability and generate appropriate facet
					if(producerCommentsAvailability == 0){
						getProducerCommentsNotAvailable(producerCommentsGroup);
						producerCommentsGroup.setAttributeNS(null, "availability", 0);
					}
					else if(producerCommentsAvailability == 1){
						getProducerCommentsAvailable(producerCommentsGroup);
						producerCommentsGroup.setAttributeNS(null, "availability", 1);
					}
					else if(producerCommentsAvailability == 2){
						getProducerCommentsHigherLevel(producerCommentsGroup);
						producerCommentsGroup.setAttributeNS(null, "availability", 2);
					}
					
					// Create lineage facet
					var lineageGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
					lineageGroup.setAttributeNS(null, "id", "lineage_" + i);
					lineageGroup.setAttributeNS(null, "process_step_count", processStepCount);
					// Check producer profile availability and generate appropriate facet
					if(lineageAvailability == 0){
						getLineageNotAvailable(lineageGroup);
						lineageGroup.setAttributeNS(null, "availability", 0);
					}
					else if(lineageAvailability == 1){
						getLineageAvailable(lineageGroup);
						lineageGroup.setAttributeNS(null, "availability", 1);
					}
					else if(lineageAvailability == 2){
						getLineageHigherLevel(lineageGroup);
						lineageGroup.setAttributeNS(null, "availability", 2);
					}
					
					// Create standards compliance facet
					var standardsComplianceGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
					standardsComplianceGroup.setAttributeNS(null, "id", "standards_compliance_" + i);
					standardsComplianceGroup.setAttributeNS(null, "standard_name", standardName);
					// Check producer profile availability and generate appropriate facet
					if(standardsComplianceAvailability == 0){
						getStandardsComplianceNotAvailable(standardsComplianceGroup);
						standardsComplianceGroup.setAttributeNS(null, "availability", 0);
					}
					else if(standardsComplianceAvailability == 1){
						getStandardsComplianceAvailable(standardsComplianceGroup);
						standardsComplianceGroup.setAttributeNS(null, "availability", 1);
					}
					else if(standardsComplianceAvailability == 2){
						getStandardsComplianceHigherLevel(standardsComplianceGroup);
						standardsComplianceGroup.setAttributeNS(null, "availability", 2);
					}
					
					// Create quality information facet
					var qualityInformationGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
					qualityInformationGroup.setAttributeNS(null, "id", "quality_information_" + i);
					qualityInformationGroup.setAttributeNS(null, "scope_level", scopeLevel);
					// Check producer profile availability and generate appropriate facet
					if(qualityInformationAvailability == 0){
						getQualityInformationNotAvailable(qualityInformationGroup);
						qualityInformationGroup.setAttributeNS(null, "availability", 0);
					}
					else if(qualityInformationAvailability == 1){
						getQualityInformationAvailable(qualityInformationGroup);
						qualityInformationGroup.setAttributeNS(null, "availability", 1);
					}
					else if(qualityInformationAvailability == 2){
						getQualityInformationHigherLevel(qualityInformationGroup);
						qualityInformationGroup.setAttributeNS(null, "availability", 2);
					}
					
					// Create user feedback facet
					var userFeedbackGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
					userFeedbackGroup.setAttributeNS(null, "id", "user_feedback_" + i);
					userFeedbackGroup.setAttributeNS(null, "feedbacks_count", feedbacksCount);
					userFeedbackGroup.setAttributeNS(null, "ratings_count", ratingsCount);
					userFeedbackGroup.setAttributeNS(null, "feedbacks_average_rating", feedbacksAverageRating);
					// Check producer profile availability and generate appropriate facet
					if(userFeedbackAvailability == 0){
						getUserFeedbackNotAvailable(userFeedbackGroup);
						userFeedbackGroup.setAttributeNS(null, "availability", 0);
					}
					else if(userFeedbackAvailability == 1){
						getUserFeedbackAvailable(userFeedbackGroup);
						userFeedbackGroup.setAttributeNS(null, "availability", 1);
					}
					else if(userFeedbackAvailability == 2){
						getUserFeedbackHigherLevel(userFeedbackGroup);
						userFeedbackGroup.setAttributeNS(null, "availability", 2);
					}
					
					// Create expert review facet
					var expertReviewGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
					expertReviewGroup.setAttributeNS(null, "id", "expert_review_" + i);
					expertReviewGroup.setAttributeNS(null, "expert_reviews_count", expertReviewsCount);
					expertReviewGroup.setAttributeNS(null, "expert_ratings_count", expertRatingsCount);
					expertReviewGroup.setAttributeNS(null, "expert_average_rating", expertAverageRating);
					// Check producer profile availability and generate appropriate facet
					if(expertReviewAvailability == 0){
						getExpertReviewNotAvailable(expertReviewGroup);
						expertReviewGroup.setAttributeNS(null, "availability", 0);
					}
					else if(expertReviewAvailability == 1){
						getExpertReviewAvailable(expertReviewGroup);
						expertReviewGroup.setAttributeNS(null, "availability", 1);
					}
					else if(expertReviewAvailability == 2){
						getExpertReviewHigherLevel(expertReviewGroup);
						expertReviewGroup.setAttributeNS(null, "availability", 2);
					}
					
					// Create citations facet
					var citationsGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
					citationsGroup.setAttributeNS(null, "id", "citations_" + i);
					citationsGroup.setAttributeNS(null, "citations_count", citationsCount);
					// Check producer profile availability and generate appropriate facet
					if(citationsAvailability == 0){
						getCitationsInformationNotAvailable(citationsGroup);
						citationsGroup.setAttributeNS(null, "availability", 0);
					}
					else if(citationsAvailability == 1){
						getCitationsInformationAvailable(citationsGroup);
						citationsGroup.setAttributeNS(null, "availability", 1);
					}
					else if(citationsAvailability == 2){
						getCitationsInformationHigherLevel(citationsGroup);
						citationsGroup.setAttributeNS(null, "availability", 2);
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
					
					x += 100;
					if(i == 9){
						y += 100;
						x = 30;
					}
					
				}
				//$("#search-results").html(searchStr);
			}
			else{
				window.alert("An error occurred.");
			}
			
			// switch tabs when the button is clicked
			$("#map-tab").removeClass("active");
			$("#serach-results-tab").addClass("active");
			$('.tab-content #tab-pane-map').hide();
			$('.tab-content #tab-pane-search-results').show();
			
			// switch tabs when the button is clicked
			$("#query-constraints-tab").removeClass("active");
			$("#geo-label-filtering-tab").addClass("active");
			$('.tab-content #tab-pane-query-constraints').hide();
			$('.tab-content #tab-pane-geo-label-filtering').show();
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