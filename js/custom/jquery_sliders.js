/*
* Make the GEO label interactive by changing the value of a slider when its facet is clicked.
* Additionally, when a new facet is clicked, the slider's container will scroll to the relevant slider.
*/
$(function() {

	var $lastClickedFacet = [];

	$("#geo_label").on('click', function (event) {

		if($("#geo_label").attr('is_filter') == "true"){
			// get the group object that the target is a child of
			var $targetFacet = $(event.target).closest("g"),
				id = $targetFacet.attr('id');

			// get the slider for this facet
			var $slider = $(".facet-slider[data-svg-group='" + id + "']");

			if ($slider.length !== 0) {

				// compare the DOM objects to see if the same group was clicked on
				if ($targetFacet[0] !== $lastClickedFacet[0]) {

					var $container = $("#facets-sliders"),
						$sliderDiv = $slider.parent();

					// scroll to the new slider
					$container.animate({
						scrollTop: ($container.scrollTop() + ($sliderDiv.position().top - $container.position().top) - parseInt($sliderDiv.css('padding-bottom'), 10))
					}, "fast");
				}

				var min = $slider.slider("option", "min"),
					max = $slider.slider("option", "max"),
					step = $slider.slider("option", "step"),
					currentValue = $slider.slider("value");

				// adjust the slider's value
				$slider.slider("value", ((currentValue < max) ? (currentValue + step) : min));
			}

			// keep track of the facet that was clicked on last
			$lastClickedFacet = $targetFacet;
		}
	});
});

// ***************************************   PRODUCER PROFILE   ****************************************** //
$(function() {
// Varaible to keep the current value of the sliders
	$("#producer-slider").slider({
		range: "min",
		value:0,
		min: 0,
		max: 2,
		step: 1,
		disabled: true,
		change: function( event, ui ) {
			// producer_profile group to append to
			var producer_profile = document.getElementById("producer_profile");
			if(ui.value == "0"){
				$slidersVal[0] = 0;
				document.getElementById("producer-facet-img").src = "img/facets/not_available/producer_not_available.png";
				getProducerProfileNotAvailable(producer_profile);
			}
			else if(ui.value == "1"){
				$slidersVal[0] = 1;
				document.getElementById("producer-facet-img").src = "img/facets/higher_level/producer_higher_level.png";
				getProducerProfileHigherLevel(producer_profile, "SVGID_1_");
			}
			else if(ui.value == "2"){
				$slidersVal[0] = 2;
				document.getElementById("producer-facet-img").src = "img/facets/available/producer_available.png";
				getProducerProfileAvailable(producer_profile);
			}
			// Check if producer name filtering has been applied and if so, reset the filtering
			if(datasetSource != ""){
				resetProducer();
			}
			// Hide or show labels depending on the current state of all the sliders
			setLabelsVisibility();
		}
	});
});

// ***************************************   PRODUCER COMMENTS   ****************************************** //
$(function() {
	$("#comments-slider").slider({
		range: "min",
		value:0,
		min: 0,
		max: 2,
		step: 1,
		disabled: true,
		change: function( event, ui ) {
			// producer_comments group to append to
			var producer_comments = document.getElementById("producer_comments");	
			if(ui.value == "0"){
				$slidersVal[1] = 0;
				document.getElementById("comments-facet-img").src = "img/facets/not_available/comments_not_available.png";
				getProducerCommentsNotAvailable(producer_comments);
			}
			else if(ui.value == "1"){
				$slidersVal[1] = 1;
				document.getElementById("comments-facet-img").src = "img/facets/higher_level/comments_higher_level.png";
				getProducerCommentsHigherLevel(producer_comments, "SVGID_2_");
			}
			else if(ui.value == "2"){
				$slidersVal[1] = 2;
				document.getElementById("comments-facet-img").src = "img/facets/available/comments_available.png";
				getProducerCommentsAvailable(producer_comments);
			}
			// Check if producer comments filtering has been applied and if so, reset the filtering
			if(commentType != ""){
				resetComments();
			}
			// Hide or show labels depending on the current state of all the sliders
			setLabelsVisibility();
		}
	});
});

// ***************************************   LINEAGE INFORMATION   ****************************************** //
$(function() {
	$("#lineage-slider").slider({
		range: "min",
		value:0,
		min: 0,
		max: 2,
		step: 1,
		disabled: true,
		change: function( event, ui ) {
			// lineage group to append to
			var lineage = document.getElementById("lineage");
			if(ui.value == "0"){
				$slidersVal[2] = 0;
				document.getElementById("lineage-facet-img").src = "img/facets/not_available/lineage_not_available.png";
				getLineageNotAvailable(lineage);
			}
			else if(ui.value == "1"){
				$slidersVal[2] = 1;
				document.getElementById("lineage-facet-img").src = "img/facets/higher_level/lineage_higher_level.png";
				getLineageHigherLevel(lineage, "SVGID_3_");
			}
			else if(ui.value == "2"){
				$slidersVal[2] = 2;
				document.getElementById("lineage-facet-img").src = "img/facets/available/lineage_available.png";
				getLineageAvailable(lineage);
			}
			// Check if lineage filtering has been applied and if so, reset the filtering
			if(processStepsMaxNum != ""){
				resetLineage();
			}
			// Hide or show labels depending on the current state of all the sliders
			setLabelsVisibility();
		}
	});
});

// ***************************************   STANDARDS COMPLIANCE   ****************************************** //
$(function() {
	$("#compliance-slider").slider({
		range: "min",
		value:0,
		min: 0,
		max: 2,
		step: 1,
		disabled: true,
		change: function( event, ui ) {
			// standards_compliance group to append to
			var standards_compliance = document.getElementById("standards_compliance");
			if(ui.value == "0"){
				$slidersVal[3] = 0;
				document.getElementById("compliance-facet-img").src = "img/facets/not_available/compliance_not_available.png";
				getStandardsComplianceNotAvailable(standards_compliance);
			}
			else if(ui.value == "1"){
				$slidersVal[3] = 1;
				document.getElementById("compliance-facet-img").src = "img/facets/higher_level/compliance_higher_level.png";
				getStandardsComplianceHigherLevel(standards_compliance, "SVGID_4_");
			}
			else if(ui.value == "2"){
				$slidersVal[3] = 2;
				document.getElementById("compliance-facet-img").src = "img/facets/available/compliance_available.png";
				getStandardsComplianceAvailable(standards_compliance);
			}
			// Check if producer comments filtering has been applied and if so, reset the filtering
			if(standardName != ""){
				resetStandards();
			}
			// Hide or show labels depending on the current state of all the sliders
			setLabelsVisibility();
		}
	});
});

// ***************************************  QUALITY INFORMATION   ****************************************** //
$(function() {
	$("#quality-slider").slider({
		range: "min",
		value:0,
		min: 0,
		max: 2,
		step: 1,
		disabled: true,
		change: function( event, ui ) {
			// quality_information group to append to
			var quality_information = document.getElementById("quality_information");
			if(ui.value == "0"){
				$slidersVal[4] = 0;
				document.getElementById("quality-facet-img").src = "img/facets/not_available/quality_not_available.png";
				getQualityInformationNotAvailable(quality_information);
			}
			else if(ui.value == "1"){
				$slidersVal[4] = 1;
				document.getElementById("quality-facet-img").src = "img/facets/higher_level/quality_higher_level.png";
				getQualityInformationHigherLevel(quality_information, "SVGID_5_");
			}
			else if(ui.value == "2"){
				$slidersVal[4] = 2;
				document.getElementById("quality-facet-img").src = "img/facets/available/quality_available.png";
				getQualityInformationAvailable(quality_information);
			}
			// Check if quality filtering has been applied and if so, reset the filtering
			if(scopeLevel != ""){
				resetQuality();
			}
			// Hide or show labels depending on the current state of all the sliders
			setLabelsVisibility();
		}
	});
});

// ***************************************   USER FEEDBACK   ****************************************** //
$(function() {
	$("#feedback-slider").slider({
		range: "min",
		value:0,
		min: 0,
		max: 2,
		step: 1,
		disabled: true,
		change: function( event, ui ) {
			// user_feedback group to append to
			var user_feedback = document.getElementById("user_feedback");
			if(ui.value == "0"){
				$slidersVal[5] = 0;
				document.getElementById("feedback-facet-img").src = "img/facets/not_available/feedback_not_available.png";
				getUserFeedbackNotAvailable(user_feedback);
			}
			else if(ui.value == "1"){
				$slidersVal[5] = 1;
				document.getElementById("feedback-facet-img").src = "img/facets/higher_level/feedback_higher_level.png";
				getUserFeedbackHigherLevel(user_feedback, "SVGID_6_");
			}
			else if(ui.value == "2"){
				$slidersVal[5] = 2;
				document.getElementById("feedback-facet-img").src = "img/facets/available/feedback_available.png";
				getUserFeedbackAvailable(user_feedback);
			}
			// Check if user feedback filtering has been applied and if so, reset the filtering
			if(averageRatingMin != "" || averageRatingMin != 0 || feedbackNumberMin != "" || feedbackNumberMin != 0){
				resetFeedback();
			}
			// Hide or show labels depending on the current state of all the sliders
			setLabelsVisibility();
		}
	});
});

// ***************************************   EXPERT REVIEW   ****************************************** //
$(function() {
	$("#review-slider").slider({
		range: "min",
		value:0,
		min: 0,
		max: 2,
		step: 1,
		disabled: true,
		change: function( event, ui ) {
			// expert_review group to append to
			var expert_review = document.getElementById("expert_review");
			if(ui.value == "0"){
				$slidersVal[6] = 0;
				document.getElementById("review-facet-img").src = "img/facets/not_available/review_not_available.png";
				getExpertReviewNotAvailable(expert_review);
			}
			else if(ui.value == "1"){
				$slidersVal[6] = 1;
				document.getElementById("review-facet-img").src = "img/facets/higher_level/review_higher_level.png";
				getExpertReviewHigherLevel(expert_review, "SVGID_7_");
			}
			else if(ui.value == "2"){
				$slidersVal[6] = 2;
				document.getElementById("review-facet-img").src = "img/facets/available/review_available.png";
				getExpertReviewAvailable(expert_review);
			}
			// Check if user feedback filtering has been applied and if so, reset the filtering
			if(averageReviewRatingMin != "" || averageReviewRatingMin != 0 || reviewsNumberMin != "" || reviewsNumberMin != 0){
				resetReviews();
			}
			// Hide or show labels depending on the current state of all the sliders
			setLabelsVisibility();
		}
	});
});

// ***************************************   CITATIONS INFORMATION   ****************************************** //
$(function() {
	$("#citations-slider").slider({
		range: "min",
		value:0,
		min: 0,
		max: 2,
		step: 1,
		disabled: true,
		change: function( event, ui ) {
			// citations_information group to append to
			var citations_information = document.getElementById("citations_information");
			if(ui.value == "0"){
				$slidersVal[7] = 0;
				document.getElementById("citations-facet-img").src = "img/facets/not_available/citations_not_available.png";
				getCitationsInformationNotAvailable(citations_information);
			}
			else if(ui.value == "1"){
				$slidersVal[7] = 1;
				document.getElementById("citations-facet-img").src = "img/facets/higher_level/citations_higher_level.png";
				getCitationsInformationHigherLevel(citations_information, "SVGID_8_");
			}
			else if(ui.value == "2"){
				$slidersVal[7] = 2;
				document.getElementById("citations-facet-img").src = "img/facets/available/citations_available.png";
				getCitationsInformationAvailable(citations_information);
			}
			// Check if user feedback filtering has been applied and if so, reset the filtering
			if(citationsNumberMin != "" || citationsNumberMin != 0){
				resetCitations();
			}
			// Hide or show labels depending on the current state of all the sliders
			setLabelsVisibility();
		}
	});
});

// ************************************   Helper Functions   ***********************************

// Varaible to keep the current value of the sliders
var $slidersVal = [0, 0, 0, 0, 0, 0, 0, 0];

function setLabelsVisibility(){
	// Iterate through all GEO labels
	var count = $("#zoom_pan_results_svg").children().length;
	for (var i = 0; i < count; i++) {				
		var totalMatch = getMatch($slidersVal[0], $("#producer_profile_" + i).attr("availability")) +
					getMatch($slidersVal[1], $("#producer_comments_" + i).attr("availability")) +
					getMatch($slidersVal[2], $("#lineage_" + i).attr("availability")) +
					getMatch($slidersVal[3], $("#standards_compliance_" + i).attr("availability")) +
					getMatch($slidersVal[4], $("#quality_information_" + i).attr("availability")) +
					getMatch($slidersVal[5], $("#user_feedback_" + i).attr("availability")) +
					getMatch($slidersVal[6], $("#expert_review_" + i).attr("availability")) +
					getMatch($slidersVal[7], $("#citations_" + i).attr("availability"));
		if(totalMatch < 8){
			$("#geolabel_" + i).hide();
		}
		else{
			$("#geolabel_" + i).show();
		}
	}
}

// Returns 1 if availability matches, or 0 otherwise
function getMatch(sliderVal, facetVal){
	if(sliderVal == 0){
		return 1;
	}
	else if(sliderVal == 1){
		if(facetVal == 1 || facetVal == 2){
			return 1;
		}
		else{
			return 0;
		}
	}
	else if(sliderVal == 2){
		if(facetVal == 1){
			return 1;
		}
		else{
			return 0;
		}
	}
}