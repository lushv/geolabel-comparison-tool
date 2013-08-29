var datasetSource = "";
var commentType = "";
var processStepsMaxNum = "";
var standardName = "";
var scopeLevel = "";
var averageRatingMin = 0;
var feedbackNumberMin = 0;
var averageReviewRatingMin = 0;
var reviewsNumberMin = 0;
var citationsNumberMin = 0;

var filterScale = 0.02;
var filterTransformX = 3;
var filterTransformY = 3;

// Helper function to resize the facet
function upScaleLabel(i){
	var currentSize = $("#size_group_" + i).attr("size_scale");
	var currentX = $("#size_group_" + i).attr("translate_x");
	var currentY = $("#size_group_" + i).attr("translate_y");
	
	var newSize = parseFloat(currentSize) + filterScale;
	var newX = parseFloat(currentX) - filterTransformX;
	var newY = parseFloat(currentY) - filterTransformY;
	var newTransform = "translate(" + newX + " " + newY + ") scale(" + newSize + ")";
	
	$("#size_group_" + i).attr("transform", newTransform);
	$("#size_group_" + i).attr("size_scale", newSize);
	$("#size_group_" + i).attr("translate_x", newX);
	$("#size_group_" + i).attr("translate_y", newY);
}

function downScaleLabel(i){
	var currentSize = $("#size_group_" + i).attr("size_scale");
	var currentX = $("#size_group_" + i).attr("translate_x");
	var currentY = $("#size_group_" + i).attr("translate_y");
	
	var newSize = parseFloat(currentSize) - filterScale;
	var newX = parseFloat(currentX) + filterTransformX;
	var newY = parseFloat(currentY) + filterTransformY;
	var newTransform = "translate(" + newX + " " + newY + ") scale(" + newSize + ")";
	
	$("#size_group_" + i).attr("transform", newTransform);
	$("#size_group_" + i).attr("size_scale", newSize);
	$("#size_group_" + i).attr("translate_x", newX);
	$("#size_group_" + i).attr("translate_y", newY);
}

$(function() {
  $("#filter-producer-btn").click(function() {
	datasetSource = $("#dataset-source-autocomplete").val();
	if(datasetSource != ""){
		// Iterate through all GEO labels
		var count = $("#results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#producer_profile_" + i).attr("availability");
			var producerName = $("#producer_profile_" + i).attr("producer_profile_name");
			if(availability != 0 && producerName.toLowerCase().indexOf(datasetSource.toLowerCase()) != -1){
				// increase the size of the label
				upScaleLabel(i);
			}
		}
		$("#filter-producer-btn").prop('disabled', true);
		$("#reset-producer-btn").prop('disabled', false);
	}
  })
});

$(function() {
  $("#reset-producer-btn").click(function() {
	if(datasetSource != ""){
		// Iterate through all GEO labels
		var count = $("#results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#producer_profile_" + i).attr("availability");
			var producerName = $("#producer_profile_" + i).attr("producer_profile_name");
			if(availability != 0 && producerName.toLowerCase().indexOf(datasetSource.toLowerCase()) != -1){
				// decrease the size of the label
				downScaleLabel(i);
			}
		}
		datasetSource = "";
		$("#filter-producer-btn").prop('disabled', false);
		$("#reset-producer-btn").prop('disabled', true);
	}
  })
});

$(function() {
  $("#filter-comments-btn").click(function() {
	commentType = $("#comments_type_select").val();
	if(commentType != ""){
		// Iterate through all GEO labels
		var count = $("#results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#producer_comments_" + i).attr("availability");
			var supplementalInfo = $("#producer_comments_" + i).attr("supplemental_information");
			var knownProblems = $("#producer_comments_" + i).attr("known_problems");

			switch(commentType){
				case "supplemental_information":
					if(availability != 0 && supplementalInfo != ""){
						upScaleLabel(i);
					}
					break;
				case "known_problem":
					if(availability != 0 && knownProblems != ""){
						upScaleLabel(i);
					}
					break;
				case "both":
					if(availability != 0 && supplementalInfo != "" && knownProblems != ""){
						upScaleLabel(i);
					}
					break;
				default:
					break;
			}
		}
		$("#filter-comments-btn").prop('disabled', true);
		$("#reset-comments-btn").prop('disabled', false);
	}
  })
});

$(function() {
  $("#reset-comments-btn").click(function() {
	if(commentType != ""){
		// Iterate through all GEO labels
		var count = $("#results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#producer_comments_" + i).attr("availability");
			var supplementalInfo = $("#producer_comments_" + i).attr("supplemental_information");
			var knownProblems = $("#producer_comments_" + i).attr("known_problems");

			switch(commentType){
				case "supplemental_information":
					if(availability != 0 && supplementalInfo != ""){
						downScaleLabel(i);
					}
					break;
				case "known_problem":
					if(availability != 0 && knownProblems != ""){
						downScaleLabel(i);
					}
					break;
				case "both":
					if(availability != 0 && supplementalInfo != "" && knownProblems != ""){
						downScaleLabel(i);
					}
					break;
				default:
					break;
			}
		}
		commentType = "";
		$("#filter-comments-btn").prop('disabled', false);
		$("#reset-comments-btn").prop('disabled', true);
	}
  })
});

$(function() {
  $("#filter-lineage-btn").click(function() {
	processStepsMaxNum = $("#process-steps-input").val();
	if(processStepsMaxNum != ""){
		processStepsMaxNum = parseInt(processStepsMaxNum, 10);
		// Iterate through all GEO labels
		var count = $("#results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#lineage_" + i).attr("availability");
			var processSteps = parseInt($("#lineage_" + i).attr("process_step_count"), 10);
			if(availability != 0 && processStepsMaxNum >= processSteps){
				// increase the size of the label
				upScaleLabel(i);
			}
		}
		$("#filter-lineage-btn").prop('disabled', true);
		$("#reset-lineage-btn").prop('disabled', false);
	}
  })
});

$(function() {
  $("#reset-lineage-btn").click(function() {
	if(processStepsMaxNum != ""){
		processStepsMaxNum = parseInt(processStepsMaxNum, 10);
		// Iterate through all GEO labels
		var count = $("#results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#lineage_" + i).attr("availability");
			var processSteps = parseInt($("#lineage_" + i).attr("process_step_count"), 10);
			if(availability != 0 && processStepsMaxNum >= processSteps){
				// increase the size of the label
				downScaleLabel(i);
			}
		}
		processStepsMaxNum = "";
		$("#filter-lineage-btn").prop('disabled', false);
		$("#reset-lineage-btn").prop('disabled', true);
	}
  })
});

$(function() {
  $("#filter-standards-btn").click(function() {
	standardName = $("#standard-name-autocomplete").val();
	if(standardName != ""){
		// Iterate through all GEO labels
		var count = $("#results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#standards_compliance_" + i).attr("availability");
			var standardNameAttr = $("#standards_compliance_" + i).attr("standard_name");
			if(availability != 0 && standardNameAttr.toLowerCase().indexOf(standardName.toLowerCase()) != -1){
				// increase the size of the label
				upScaleLabel(i);
			}
		}
		$("#filter-standards-btn").prop('disabled', true);
		$("#reset-standards-btn").prop('disabled', false);
	}
  })
});

$(function() {
  $("#reset-standards-btn").click(function() {
	if(standardName != ""){
		// Iterate through all GEO labels
		var count = $("#results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#standards_compliance_" + i).attr("availability");
			var standardNameAttr = $("#standards_compliance_" + i).attr("standard_name");
			if(availability != 0 && standardNameAttr.toLowerCase().indexOf(standardName.toLowerCase()) != -1){
				// increase the size of the label
				downScaleLabel(i);
			}
		}
		standardName = "";
		$("#filter-standards-btn").prop('disabled', false);
		$("#reset-standards-btn").prop('disabled', true);
	}
  })
});

$(function() {
  $("#filter-quality-btn").click(function() {
	scopeLevel = $("#scope-level-select").val();
	if(scopeLevel != ""){
		// Iterate through all GEO labels
		var count = $("#results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#quality_information_" + i).attr("availability");
			var scopeLevelAttr = $("#quality_information_" + i).attr("scope_level");
			if(availability != 0 && scopeLevel == scopeLevelAttr){
				upScaleLabel(i);
			}
		}
		$("#filter-quality-btn").prop('disabled', true);
		$("#reset-quality-btn").prop('disabled', false);
	}
  })
});

$(function() {
  $("#reset-quality-btn").click(function() {
	if(scopeLevel != ""){
		// Iterate through all GEO labels
		var count = $("#results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#quality_information_" + i).attr("availability");
			var scopeLevelAttr = $("#quality_information_" + i).attr("scope_level");
			if(availability != 0 && scopeLevel == scopeLevelAttr){
				downScaleLabel(i);
			}
		}
		$("#filter-quality-btn").prop('disabled', false);
		$("#reset-quality-btn").prop('disabled', true);
	}
  })
});

$(function() {
  $("#filter-feedback-btn").click(function() {
	averageRatingMin = $("#feedback-star > input[name='score']").val();
	feedbackNumberMin = $("#minimum-feedbacks").val();
	if(!(averageRatingMin == "" && feedbackNumberMin == "")){
		// Iterate through all GEO labels
		var count = $("#results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#user_feedback_" + i).attr("availability");
			var averageRating = $("#user_feedback_" + i).attr("feedbacks_average_rating");
			var feedbackNumber = $("#user_feedback_" + i).attr("feedbacks_count");
			
			if(availability != 0 && averageRatingMin <= averageRating && feedbackNumberMin <= feedbackNumber){
				upScaleLabel(i);
			}
		}
		$("#filter-feedback-btn").prop('disabled', true);
		$("#reset-feedback-btn").prop('disabled', false);
	}
  })
});

$(function() {
  $("#reset-feedback-btn").click(function() {
	if(!(averageRatingMin == "" && feedbackNumberMin == "")){
		// Iterate through all GEO labels
		var count = $("#results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#user_feedback_" + i).attr("availability");
			var averageRating = $("#user_feedback_" + i).attr("feedbacks_average_rating");
			var feedbackNumber = $("#user_feedback_" + i).attr("feedbacks_count");
			
			if(availability != 0 && averageRatingMin <= averageRating && feedbackNumberMin <= feedbackNumber){
				downScaleLabel(i);
			}
		}
		averageRatingMin = "";
		feedbackNumberMin = "";
		$("#filter-feedback-btn").prop('disabled', false);
		$("#reset-feedback-btn").prop('disabled', true);
	}
  })
});

$(function() {
  $("#filter-expert-btn").click(function() {
	averageReviewRatingMin = $("#reviews-star > input[name='score']").val();
	reviewsNumberMin = $("#minimum-reviews").val();
	if(!(averageReviewRatingMin == "" && reviewsNumberMin == "")){
		// Iterate through all GEO labels
		var count = $("#results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#expert_review_" + i).attr("availability");
			var averageRating = $("#expert_review_" + i).attr("expert_average_rating");
			var reviewsNumber = $("#expert_review_" + i).attr("expert_reviews_count");
			
			if(availability != 0 && averageReviewRatingMin <= averageRating && reviewsNumberMin <= reviewsNumber){
				upScaleLabel(i);
			}
		}
		$("#filter-expert-btn").prop('disabled', true);
		$("#reset-expert-btn").prop('disabled', false);
	}
  })
});

$(function() {
  $("#reset-expert-btn").click(function() {
	if(!(averageReviewRatingMin == "" && reviewsNumberMin == "")){
		// Iterate through all GEO labels
		var count = $("#results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#expert_review_" + i).attr("availability");
			var averageRating = $("#expert_review_" + i).attr("expert_average_rating");
			var reviewsNumber = $("#expert_review_" + i).attr("expert_reviews_count");
			
			if(availability != 0 && averageReviewRatingMin <= averageRating && reviewsNumberMin <= reviewsNumber){
				downScaleLabel(i);
			}
		}
		averageReviewRatingMin = "";
		reviewsNumberMin = "";
		$("#filter-expert-btn").prop('disabled', false);
		$("#reset-expert-btn").prop('disabled', true);
	}
  })
});

$(function() {
  $("#filter-citations-btn").click(function() {
	citationsNumberMin = $("#minimum-citations").val();
	if(citationsNumberMin != ""){
		// Iterate through all GEO labels
		var count = $("#results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#citations_" + i).attr("availability");
			var citationsNum = $("#citations_" + i).attr("citations_count");
			if(availability != 0 && citationsNumberMin <= citationsNum){
				// increase the size of the label
				upScaleLabel(i);
			}
		}
		$("#filter-citations-btn").prop('disabled', true);
		$("#reset-citations-btn").prop('disabled', false);
	}
  })
});

$(function() {
  $("#reset-citations-btn").click(function() {
	if(citationsNumberMin != ""){
		// Iterate through all GEO labels
		var count = $("#results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var availability = $("#citations_" + i).attr("availability");
			var citationsNum = $("#citations_" + i).attr("citations_count");
			if(availability != 0 && citationsNumberMin <= citationsNum){
				// increase the size of the label
				downScaleLabel(i);
			}
		}
		citationsNumberMin = "";
		$("#filter-citations-btn").prop('disabled', false);
		$("#reset-citations-btn").prop('disabled', true);
	}
  })
});