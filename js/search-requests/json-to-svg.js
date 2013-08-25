$(function() {
  $("#search-btn").click(function() {
	// First of all clear all the previous results
	document.getElementById("results_svg").innerHTML = '';
	
    //alert (dataString);return false;
    $.ajax({
		  type: "POST",
		  url: "URL OF THE GEO LABEL SERVICE PAGE",
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
				}
				
				//$("#search-results").html(searchStr);
			}
			else{
				$("#search-results").html("ERROR");
			}
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
