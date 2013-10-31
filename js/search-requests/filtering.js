var datasetSource = "";
var commentType = "";
var processStepsMinNum = "";
var processStepsMaxNum = "";
var standardName = "";
var scopeLevel = "";
var averageRatingMin = 0;
var feedbackNumberMin = 0;
var averageReviewRatingMin = 0;
var reviewsNumberMin = 0;
var citationsNumberMin = 0;

var filterScale = 0.015;
var filterTransformX = 2;
var filterTransformY = 2;
var minimumSize = 0.005;

// Helper function to resize the facet
function upScaleLabel(i){
	var currentScale = $("#size_group_" + i).attr("size_scale");
	var currentX = $("#size_group_" + i).attr("translate_x");
	var currentY = $("#size_group_" + i).attr("translate_y");
	
	var newScale = parseFloat(currentScale) + filterScale;
	var newX = parseFloat(currentX) - filterTransformX;
	var newY = parseFloat(currentY) - filterTransformY;
	if(parseFloat(newScale).toFixed(3) > parseFloat(minimumSize).toFixed(3)){
		newTransform = "translate(" + newX + " " + newY + ") scale(" + newScale + ")";
		$("#size_group_" + i).attr("translate_x", newX);
		$("#size_group_" + i).attr("translate_y", newY);
	}
	else{
		newTransform = "translate(" + currentX + " " + currentY + ") scale(" + minimumSize + ")";
	}		
	$("#size_group_" + i).attr("transform", newTransform);
	$("#size_group_" + i).attr("size_scale", newScale);
}

function downScaleLabel(i){
	var currentScale = $("#size_group_" + i).attr("size_scale");
	var currentX = $("#size_group_" + i).attr("translate_x");
	var currentY = $("#size_group_" + i).attr("translate_y");
	
	var newScale = parseFloat(currentScale) - filterScale;
	var newX = parseFloat(currentX) + filterTransformX;
	var newY = parseFloat(currentY) + filterTransformY;
	var newTransform = "";
	
	if(parseFloat(newScale).toFixed(3) > parseFloat(minimumSize).toFixed(3)){
		newTransform = "translate(" + newX + " " + newY + ") scale(" + newScale + ")";
		$("#size_group_" + i).attr("translate_x", newX);
		$("#size_group_" + i).attr("translate_y", newY);
	}
	else{
		newTransform = "translate(" + currentX + " " + currentY + ") scale(" + minimumSize + ")";
	}	
	$("#size_group_" + i).attr("transform", newTransform);
	$("#size_group_" + i).attr("size_scale", newScale);
}

// ******************************  Functions for applying and reseting filters  ********************************

$(function() {
  $("#filter-producer-btn").click(function() {
	filterProducer();
  })
});

$(function() {
  $("#reset-producer-btn").click(function() {
	resetProducer();
  })
});

$(function() {
  $("#filter-comments-btn").click(function() {
	filterComments();
  })
});

$(function() {
  $("#reset-comments-btn").click(function() {
	resetComments();
  })
});

$(function() {
  $("#filter-lineage-btn").click(function() {
	filterLineage();
  })
});

$(function() {
  $("#reset-lineage-btn").click(function() {
	resetLineage();
  })
});

$(function() {
  $("#filter-standards-btn").click(function() {
	filterStandards();
  })
});

$(function() {
  $("#reset-standards-btn").click(function() {
	resetStandards();
  })
});

$(function() {
  $("#filter-quality-btn").click(function() {
	filterQuality();
  })
});

$(function() {
  $("#reset-quality-btn").click(function() {
	resetQuality();
  })
});

$(function() {
  $("#filter-feedback-btn").click(function() {
	filterFeedback();
  })
});

$(function() {
  $("#reset-feedback-btn").click(function() {
	resetFeedback();
  })
});

$(function() {
  $("#filter-expert-btn").click(function() {
	filterReviews();
  })
});

$(function() {
  $("#reset-expert-btn").click(function() {
	resetReviews();
  })
});

$(function() {
  $("#filter-citations-btn").click(function() {
	filterCitations();
  })
});

$(function() {
  $("#reset-citations-btn").click(function() {
	resetCitations();
  })
});


$(function() {
  $("#reset-filters-btn").click(function() {
	$("#dialog-confirm").dialog("open");
  })
});


$(function() {
	$("#dialog-confirm").dialog({
		autoOpen: false,
		resizable: false,
		height:140,
		modal: true,
		buttons: {
		"Reset all filters": function() {
			resetAllFilters();
			$(this).dialog("close");
			},
		Cancel: function() {
			$(this).dialog("close");
			}
		}
	});
});

// ******************************************* FILTER AND RESET FUNCTIONS ***********************************
function filterProducer(){
	datasetSource = $("#dataset-source-autocomplete").val();
	if(datasetSource != ""){
		// Iterate through all GEO labels
		var count = $("#zoom_pan_results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#producer_profile_" + i).attr("availability");
			var producerName = $("#producer_profile_" + i).attr("producer_profile_name");
			if(availability != 0 && producerName.toLowerCase().indexOf(datasetSource.toLowerCase()) != -1){
				// increase the size of the label
				upScaleLabel(i);
			}
			else{
				downScaleLabel(i);
			}
		}
		$("#dataset-source-autocomplete").prop('disabled', true);
		$("#filter-producer-btn").prop('disabled', true);
		$("#reset-producer-btn").prop('disabled', false);
	}
}

function resetProducer(){
	if(datasetSource != ""){
		// Iterate through all GEO labels
		var count = $("#zoom_pan_results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#producer_profile_" + i).attr("availability");
			var producerName = $("#producer_profile_" + i).attr("producer_profile_name");
			if(availability != 0 && producerName.toLowerCase().indexOf(datasetSource.toLowerCase()) != -1){
				// decrease the size of the label
				downScaleLabel(i);
			}
			else{
				upScaleLabel(i);
			}
		}
		datasetSource = "";
		$("#dataset-source-autocomplete").val('');
		$("#dataset-source-autocomplete").prop('disabled', false);
		$("#filter-producer-btn").prop('disabled', false);
		$("#reset-producer-btn").prop('disabled', true);
	}
}

function filterComments(){
	commentType = $("#comments_type_select").val();
	if(commentType != ""){
		// Iterate through all GEO labels
		var count = $("#zoom_pan_results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#producer_comments_" + i).attr("availability");
			var supplementalInfo = $("#producer_comments_" + i).attr("supplemental_information");
			var knownProblems = $("#producer_comments_" + i).attr("known_problems");
			
			// make sure that null values are treated as empty
			if(supplementalInfo == "null"){
				supplementalInfo = "";
			}
			if(knownProblems == "null"){
				knownProblems = "";
			}
			
			switch(commentType){
				case "supplemental_information":
					if(availability != 0 && supplementalInfo != ""){
						upScaleLabel(i);
					}
					else{
						downScaleLabel(i);
					}
					break;
				case "known_problem":
					if(availability != 0 && knownProblems != ""){
						upScaleLabel(i);
					}
					else{
						downScaleLabel(i);
					}
					break;
				case "both":
					if(availability != 0 && supplementalInfo != "" && knownProblems != ""){
						upScaleLabel(i);
					}
					else{
						downScaleLabel(i);
					}
					break;
				default:
					break;
			}
		}
		$("#comments_type_select").prop('disabled', true);
		$("#filter-comments-btn").prop('disabled', true);
		$("#reset-comments-btn").prop('disabled', false);
	}
}

function resetComments(){
	if(commentType != ""){
		// Iterate through all GEO labels
		var count = $("#zoom_pan_results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#producer_comments_" + i).attr("availability");
			var supplementalInfo = $("#producer_comments_" + i).attr("supplemental_information");
			var knownProblems = $("#producer_comments_" + i).attr("known_problems");

			// make sure that null values are treated as empty
			if(supplementalInfo == "null"){
				supplementalInfo = "";
			}
			if(knownProblems == "null"){
				knownProblems = "";
			}
			
			switch(commentType){
				case "supplemental_information":
					if(availability != 0 && supplementalInfo != ""){
						downScaleLabel(i);
					}
					else{
						upScaleLabel(i);
					}
					break;
				case "known_problem":
					if(availability != 0 && knownProblems != ""){
						downScaleLabel(i);
					}
					else{
						upScaleLabel(i);
					}
					break;
				case "both":
					if(availability != 0 && supplementalInfo != "" && knownProblems != ""){
						downScaleLabel(i);
					}
					else{
						upScaleLabel(i);
					}
					break;
				default:
					break;
			}
		}
		commentType = "";
		$("#comments_type_select").val('');
		$("#comments_type_select").prop('disabled', false);
		$("#filter-comments-btn").prop('disabled', false);
		$("#reset-comments-btn").prop('disabled', true);
	}
}

function filterLineage(){
	processStepsMinNum = $("#process-steps-min-input").val();
	processStepsMaxNum = $("#process-steps-input").val();
	if(processStepsMinNum != "" && processStepsMaxNum != ""){
		// Iterate through all GEO labels
		var count = $("#zoom_pan_results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#lineage_" + i).attr("availability");
			var processSteps = $("#lineage_" + i).attr("process_step_count");
			if(availability != 0 && parseInt(processStepsMinNum, 10) <= parseInt(processSteps, 10) && parseInt(processStepsMaxNum, 10) >= parseInt(processSteps, 10)){
				// increase the size of the label
				upScaleLabel(i);
			}
			else{
				downScaleLabel(i);
			}
		}
		$("#process-steps-input").prop('disabled', true);
		$("#process-steps-min-input").prop('disabled', true);
		$("#filter-lineage-btn").prop('disabled', true);
		$("#reset-lineage-btn").prop('disabled', false);
	}
	else if(processStepsMinNum == "" && processStepsMaxNum != ""){
		// Iterate through all GEO labels
		var count = $("#zoom_pan_results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#lineage_" + i).attr("availability");
			var processSteps = $("#lineage_" + i).attr("process_step_count");
			if(availability != 0 && parseInt(processStepsMaxNum, 10) >= parseInt(processSteps, 10)){
				// increase the size of the label
				upScaleLabel(i);
			}
			else{
				downScaleLabel(i);
			}
		}
		$("#process-steps-input").prop('disabled', true);
		$("#process-steps-min-input").prop('disabled', true);
		$("#filter-lineage-btn").prop('disabled', true);
		$("#reset-lineage-btn").prop('disabled', false);
	}
	else if(processStepsMinNum != "" && processStepsMaxNum == ""){
		// Iterate through all GEO labels
		var count = $("#zoom_pan_results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#lineage_" + i).attr("availability");
			var processSteps = $("#lineage_" + i).attr("process_step_count");
			if(availability != 0 && parseInt(processStepsMinNum, 10) <= parseInt(processSteps, 10)){
				// increase the size of the label
				upScaleLabel(i);
			}
			else{
				downScaleLabel(i);
			}
		}
		$("#process-steps-input").prop('disabled', true);
		$("#process-steps-min-input").prop('disabled', true);
		$("#filter-lineage-btn").prop('disabled', true);
		$("#reset-lineage-btn").prop('disabled', false);
	}
}

function resetLineage(){
	processStepsMinNum = $("#process-steps-min-input").val();
	processStepsMaxNum = $("#process-steps-input").val();
	if(processStepsMinNum != "" && processStepsMaxNum != ""){
		// Iterate through all GEO labels
		var count = $("#zoom_pan_results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#lineage_" + i).attr("availability");
			var processSteps = $("#lineage_" + i).attr("process_step_count");
			if(availability != 0 && parseInt(processStepsMinNum, 10) <= parseInt(processSteps, 10) && parseInt(processStepsMaxNum, 10) >= parseInt(processSteps, 10)){
				// increase the size of the label
				downScaleLabel(i);
			}
			else{
				upScaleLabel(i);
			}
		}
		$("#process-steps-input").val('');
		$("#process-steps-min-input").val('');
		$("#process-steps-input").prop('disabled', false);
		$("#process-steps-min-input").prop('disabled', false);
		$("#filter-lineage-btn").prop('disabled', false);
		$("#reset-lineage-btn").prop('disabled', true);
	}
	else if(processStepsMinNum == "" && processStepsMaxNum != ""){
		// Iterate through all GEO labels
		var count = $("#zoom_pan_results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#lineage_" + i).attr("availability");
			var processSteps = $("#lineage_" + i).attr("process_step_count");
			if(availability != 0 && parseInt(processStepsMaxNum, 10) >= parseInt(processSteps, 10)){
				// increase the size of the label
				downScaleLabel(i);
			}
			else{
				upScaleLabel(i);
			}
		}
		$("#process-steps-input").val('');
		$("#process-steps-min-input").val('');
		$("#process-steps-input").prop('disabled', false);
		$("#process-steps-min-input").prop('disabled', false);
		$("#filter-lineage-btn").prop('disabled', false);
		$("#reset-lineage-btn").prop('disabled', true);
	}
	else if(processStepsMinNum != "" && processStepsMaxNum == ""){
		// Iterate through all GEO labels
		var count = $("#zoom_pan_results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#lineage_" + i).attr("availability");
			var processSteps = $("#lineage_" + i).attr("process_step_count");
			if(availability != 0 && parseInt(processStepsMinNum, 10) <= parseInt(processSteps, 10)){
				// increase the size of the label
				downScaleLabel(i);
			}
			else{
				upScaleLabel(i);
			}
		}
		$("#process-steps-input").val('');
		$("#process-steps-min-input").val('');
		$("#process-steps-input").prop('disabled', false);
		$("#process-steps-min-input").prop('disabled', false);
		$("#filter-lineage-btn").prop('disabled', false);
		$("#reset-lineage-btn").prop('disabled', true);
	}
}


function filterStandards(){
	standardName = $("#standard-name-autocomplete").val();
	if(standardName != ""){
		// Iterate through all GEO labels
		var count = $("#zoom_pan_results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#standards_compliance_" + i).attr("availability");
			var standardNameAttr = $("#standards_compliance_" + i).attr("standard_name");
			if(availability != 0 && standardNameAttr.toLowerCase().indexOf(standardName.toLowerCase()) != -1){
				// increase the size of the label
				upScaleLabel(i);
			}
			else{
				downScaleLabel(i);
			}
		}
		$("#standard-name-autocomplete").prop('disabled', true);
		$("#filter-standards-btn").prop('disabled', true);
		$("#reset-standards-btn").prop('disabled', false);
	}
}

function resetStandards(){
	if(standardName != ""){
		// Iterate through all GEO labels
		var count = $("#zoom_pan_results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#standards_compliance_" + i).attr("availability");
			var standardNameAttr = $("#standards_compliance_" + i).attr("standard_name");
			if(availability != 0 && standardNameAttr.toLowerCase().indexOf(standardName.toLowerCase()) != -1){
				// increase the size of the label
				downScaleLabel(i);
			}
			else{
				upScaleLabel(i);
			}
		}
		standardName = "";
		$("#standard-name-autocomplete").val('');
		$("#standard-name-autocomplete").prop('disabled', false);
		$("#filter-standards-btn").prop('disabled', false);
		$("#reset-standards-btn").prop('disabled', true);
	}
}

function filterQuality(){
	scopeLevel = $("#scope-level-select").val();
	if(scopeLevel != ""){
		// Iterate through all GEO labels
		var count = $("#zoom_pan_results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#quality_information_" + i).attr("availability");
			var scopeLevelAttr = $("#quality_information_" + i).attr("scope_level");
			if(availability != 0 && scopeLevel == scopeLevelAttr){
				upScaleLabel(i);
			}
			else{
				downScaleLabel(i);
			}
		}
		$("#scope-level-select").prop('disabled', true);
		$("#filter-quality-btn").prop('disabled', true);
		$("#reset-quality-btn").prop('disabled', false);
	}
}

function resetQuality(){
	if(scopeLevel != ""){
		// Iterate through all GEO labels
		var count = $("#zoom_pan_results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#quality_information_" + i).attr("availability");
			var scopeLevelAttr = $("#quality_information_" + i).attr("scope_level");
			if(availability != 0 && scopeLevel == scopeLevelAttr){
				downScaleLabel(i);
			}
			else{
				upScaleLabel(i);
			}
		}
		scopeLevel = "";
		$("#scope-level-select").val('');
		$("#scope-level-select").prop('disabled', false);
		$("#filter-quality-btn").prop('disabled', false);
		$("#reset-quality-btn").prop('disabled', true);
	}
}

function filterFeedback(){
	averageRatingMin = $("#feedback-star > input[name='score']").val();
	feedbackNumberMin = $("#minimum-feedbacks").val();
	if(!(averageRatingMin == "" && feedbackNumberMin == "")){
		// Iterate through all GEO labels
		var count = $("#zoom_pan_results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#user_feedback_" + i).attr("availability");
			var averageRating = $("#user_feedback_" + i).attr("feedbacks_average_rating");
			var feedbackNumber = $("#user_feedback_" + i).attr("feedbacks_count");
			// Ensure that empty fields are treated as zeros
			if(averageRatingMin == ""){
				averageRatingMin = 0;
			}
			if(feedbackNumberMin == ""){
				feedbackNumberMin = 0;
			}
			
			if(availability != 0 && parseFloat(averageRatingMin, 10) <= parseFloat(averageRating, 10) && parseFloat(feedbackNumberMin, 10) <= parseFloat(feedbackNumber, 10)){
				upScaleLabel(i);
			}
			else{
				downScaleLabel(i);
			}
		}
		$('#feedback-star').raty('readOnly', true);
		$("#minimum-feedbacks").prop('disabled', true);
		$("#filter-feedback-btn").prop('disabled', true);
		$("#reset-feedback-btn").prop('disabled', false);
	}
}

function resetFeedback(){
	if(!(averageRatingMin == "" && feedbackNumberMin == "")){
		// Iterate through all GEO labels
		var count = $("#zoom_pan_results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#user_feedback_" + i).attr("availability");
			var averageRating = $("#user_feedback_" + i).attr("feedbacks_average_rating");
			var feedbackNumber = $("#user_feedback_" + i).attr("feedbacks_count");
			// Ensure that empty fields are treated as zeros
			if(averageRatingMin == ""){
				averageRatingMin = 0;
			}
			if(feedbackNumberMin == ""){
				feedbackNumberMin = 0;
			}
			if(availability != 0 && parseFloat(averageRatingMin, 10) <= parseFloat(averageRating, 10) && parseFloat(feedbackNumberMin, 10) <= parseFloat(feedbackNumber, 10)){
				downScaleLabel(i);
			}
			else{
				upScaleLabel(i);
			}
		}
		averageRatingMin = "";
		feedbackNumberMin = "";
		$('#feedback-star').raty('reload');
		$('#feedback-star').raty('readOnly', false);
		$("#minimum-feedbacks").val('');
		$("#minimum-feedbacks").prop('disabled', false);
		$("#filter-feedback-btn").prop('disabled', false);
		$("#reset-feedback-btn").prop('disabled', true);
	}
}

function filterReviews(){
	averageReviewRatingMin = $("#reviews-star > input[name='score']").val();
	reviewsNumberMin = $("#minimum-reviews").val();
	if(!(averageReviewRatingMin == "" && reviewsNumberMin == "")){
		// Iterate through all GEO labels
		var count = $("#zoom_pan_results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#expert_review_" + i).attr("availability");
			var averageRating = $("#expert_review_" + i).attr("expert_average_rating");
			var reviewsNumber = $("#expert_review_" + i).attr("expert_reviews_count");
			// Ensure that empty fields are treated as zeros
			if(averageReviewRatingMin == ""){
				averageReviewRatingMin = 0;
			}
			if(reviewsNumberMin == ""){
				reviewsNumberMin = 0;
			}
			if(availability != 0 && parseFloat(averageReviewRatingMin, 10) <= parseFloat(averageRating, 10) && parseFloat(reviewsNumberMin, 10) <= parseFloat(reviewsNumber, 10)){
				upScaleLabel(i);
			}
			else{
				downScaleLabel(i);
			}
		}
		$('#reviews-star').raty('readOnly', true);
		$("#minimum-reviews").prop('disabled', true);
		$("#filter-expert-btn").prop('disabled', true);
		$("#reset-expert-btn").prop('disabled', false);
	}
}

function resetReviews(){
	if(!(averageReviewRatingMin == "" && reviewsNumberMin == "")){
		// Iterate through all GEO labels
		var count = $("#zoom_pan_results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#expert_review_" + i).attr("availability");
			var averageRating = $("#expert_review_" + i).attr("expert_average_rating");
			var reviewsNumber = $("#expert_review_" + i).attr("expert_reviews_count");
			// Ensure that empty fields are treated as zeros
			if(averageReviewRatingMin == ""){
				averageReviewRatingMin = 0;
			}
			if(reviewsNumberMin == ""){
				reviewsNumberMin = 0;
			}
			if(availability != 0 && parseFloat(averageReviewRatingMin, 10) <= parseFloat(averageRating, 10) && parseFloat(reviewsNumberMin, 10) <= parseFloat(reviewsNumber, 10)){
				downScaleLabel(i);
			}
			else{
				upScaleLabel(i);
			}
		}
		averageReviewRatingMin = "";
		reviewsNumberMin = "";
		$('#reviews-star').raty('reload');
		$('#reviews-star').raty('readOnly', false);
		$("#minimum-reviews").val('');
		$("#minimum-reviews").prop('disabled', false);
		$("#filter-expert-btn").prop('disabled', false);
		$("#reset-expert-btn").prop('disabled', true);
	}
}

function filterCitations(){
	citationsNumberMin = $("#minimum-citations").val();
	if(citationsNumberMin != ""){
		// Iterate through all GEO labels
		var count = $("#zoom_pan_results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#citations_" + i).attr("availability");
			var citationsNum = $("#citations_" + i).attr("citations_count");
			if(availability != 0 && parseInt(citationsNumberMin, 10) <= parseInt(citationsNum, 10)){
				// increase the size of the label
				upScaleLabel(i);
			}
			else{
				downScaleLabel(i);
			}
		}
		$("#minimum-citations").prop('disabled', true);
		$("#filter-citations-btn").prop('disabled', true);
		$("#reset-citations-btn").prop('disabled', false);
	}
}

function resetCitations(){
	if(citationsNumberMin != ""){
		// Iterate through all GEO labels
		var count = $("#zoom_pan_results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#citations_" + i).attr("availability");
			var citationsNum = $("#citations_" + i).attr("citations_count");
			if(availability != 0 && parseInt(citationsNumberMin, 10) <= parseInt(citationsNum, 10)){
				// increase the size of the label
				downScaleLabel(i);
			}
			else{
				upScaleLabel(i);
			}
		}
		citationsNumberMin = "";
		$("#minimum-citations").val('');
		$("#minimum-citations").prop('disabled', false);
		$("#filter-citations-btn").prop('disabled', false);
		$("#reset-citations-btn").prop('disabled', true);
	}
}

function resetAllFilters(){
	// Check if producer name filtering has been applied and if so, reset the filtering
	if(datasetSource != ""){
		resetProducer();
	}
	// Check if producer comments filtering has been applied and if so, reset the filtering
	if(commentType != ""){
		resetComments();
	}
	// Check if lineage filtering has been applied and if so, reset the filtering
	if(processStepsMinNum != "" || processStepsMaxNum != ""){
		resetLineage();
	}
	// Check if producer comments filtering has been applied and if so, reset the filtering
	if(standardName != ""){
		resetStandards();
	}
	// Check if quality filtering has been applied and if so, reset the filtering
	if(scopeLevel != ""){
		resetQuality();
	}
	// Check if user feedback filtering has been applied and if so, reset the filtering
	if(averageRatingMin != "" || averageRatingMin != 0 || feedbackNumberMin != "" || feedbackNumberMin != 0){
		resetFeedback();
	}
	// Check if expert review filtering has been applied and if so, reset the filtering
	if(averageReviewRatingMin != "" || averageReviewRatingMin != 0 || reviewsNumberMin != "" || reviewsNumberMin != 0){
		resetReviews();
	}
	// Check if citations filtering has been applied and if so, reset the filtering
	if(citationsNumberMin != "" || citationsNumberMin != 0){
		resetCitations();
	}
	
	// Reset all sliders
	$("#producer-slider").slider("value", 0);
	$("#comments-slider").slider("value", 0);
	$("#lineage-slider").slider("value", 0);
	$("#compliance-slider").slider("value", 0);
	$("#quality-slider").slider("value", 0);
	$("#feedback-slider").slider("value", 0);
	$("#review-slider").slider("value", 0);
	$("#citations-slider").slider("value", 0);
}