/*
* Make the GEO label interactive by changing the value of a slider when its facet is clicked.
* Additionally, when a new facet is clicked, the slider's container will scroll to the relevant slider.
*/
$(function() {

	var $lastClickedFacet = [];

	$("#geo_label").on('click', function (event) {

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
	});
});

// ***************************************   PRODUCER PROFILE   ****************************************** //
$(function() {
	$("#producer-slider").slider({
		range: "min",
		value:0,
		min: 0,
		max: 2,
		step: 1,
		change: function( event, ui ) {
			// producer_profile group to append to
			var producer_profile = document.getElementById("producer_profile");
			if(ui.value == "0"){
				document.getElementById("producer-facet-img").src = "img/facets/not_available/producer_not_available.png";
				getProducerProfileNotAvailable(producer_profile);
			}
			else if(ui.value == "1"){
				document.getElementById("producer-facet-img").src = "img/facets/higher_level/producer_higher_level.png";
				getProducerProfileHigherLevel(producer_profile);
			}
			else if(ui.value == "2"){
				document.getElementById("producer-facet-img").src = "img/facets/available/producer_available.png";
				getProducerProfileAvailable(producer_profile);
			}
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
		change: function( event, ui ) {
			// producer_comments group to append to
			var producer_comments = document.getElementById("producer_comments");	
			if(ui.value == "0"){
				document.getElementById("comments-facet-img").src = "img/facets/not_available/comments_not_available.png";
				getProducerCommentsNotAvailable(producer_comments);
			}
			else if(ui.value == "1"){
				document.getElementById("comments-facet-img").src = "img/facets/higher_level/comments_higher_level.png";
				getProducerCommentsHigherLevel(producer_comments);
			}
			else if(ui.value == "2"){
				document.getElementById("comments-facet-img").src = "img/facets/available/comments_available.png";
				getProducerCommentsAvailable(producer_comments);
			}
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
		change: function( event, ui ) {
			// lineage group to append to
			var lineage = document.getElementById("lineage");
			if(ui.value == "0"){
				document.getElementById("lineage-facet-img").src = "img/facets/not_available/lineage_not_available.png";
				getLineageNotAvailable(lineage);
			}
			else if(ui.value == "1"){
				document.getElementById("lineage-facet-img").src = "img/facets/higher_level/lineage_higher_level.png";
				getLineageHigherLevel(lineage);
			}
			else if(ui.value == "2"){
				document.getElementById("lineage-facet-img").src = "img/facets/available/lineage_available.png";
				getLineageAvailable(lineage);
			}
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
		change: function( event, ui ) {
			// standards_compliance group to append to
			var standards_compliance = document.getElementById("standards_compliance");
			if(ui.value == "0"){
				document.getElementById("compliance-facet-img").src = "img/facets/not_available/compliance_not_available.png";
				getStandardsComplianceNotAvailable(standards_compliance);
			}
			else if(ui.value == "1"){
				document.getElementById("compliance-facet-img").src = "img/facets/higher_level/compliance_higher_level.png";
				getStandardsComplianceHigherLevel(standards_compliance);
			}
			else if(ui.value == "2"){
				document.getElementById("compliance-facet-img").src = "img/facets/available/compliance_available.png";
				getStandardsComplianceAvailable(standards_compliance);
			}
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
		change: function( event, ui ) {
			// quality_information group to append to
			var quality_information = document.getElementById("quality_information");
			if(ui.value == "0"){
				document.getElementById("quality-facet-img").src = "img/facets/not_available/quality_not_available.png";
				getQualityInformationNotAvailable(quality_information);
			}
			else if(ui.value == "1"){
				document.getElementById("quality-facet-img").src = "img/facets/higher_level/quality_higher_level.png";
				getQualityInformationHigherLevel(quality_information);
			}
			else if(ui.value == "2"){
				document.getElementById("quality-facet-img").src = "img/facets/available/quality_available.png";
				getQualityInformationAvailable(quality_information);
			}	
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
		change: function( event, ui ) {
			// user_feedback group to append to
			var user_feedback = document.getElementById("user_feedback");
			if(ui.value == "0"){
				document.getElementById("feedback-facet-img").src = "img/facets/not_available/feedback_not_available.png";
				getUserFeedbackNotAvailable(user_feedback);
			}
			else if(ui.value == "1"){
				document.getElementById("feedback-facet-img").src = "img/facets/higher_level/feedback_higher_level.png";
				getUserFeedbackHigherLevel(user_feedback);
			}
			else if(ui.value == "2"){
				document.getElementById("feedback-facet-img").src = "img/facets/available/feedback_available.png";
				getUserFeedbackAvailable(user_feedback);
			}
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
		change: function( event, ui ) {
			// expert_review group to append to
			var expert_review = document.getElementById("expert_review");
			if(ui.value == "0"){
				document.getElementById("review-facet-img").src = "img/facets/not_available/review_not_available.png";
				getExpertReviewNotAvailable(expert_review);
			}
			else if(ui.value == "1"){
				document.getElementById("review-facet-img").src = "img/facets/higher_level/review_higher_level.png";
				getExpertReviewHigherLevel(expert_review);
			}
			else if(ui.value == "2"){
				document.getElementById("review-facet-img").src = "img/facets/available/review_available.png";
				getExpertReviewAvailable(expert_review);
			}
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
		change: function( event, ui ) {
			// citations_information group to append to
			var citations_information = document.getElementById("citations_information");
			if(ui.value == "0"){
				document.getElementById("citations-facet-img").src = "img/facets/not_available/citations_not_available.png";
				getCitationsInformationNotAvailable(citations_information);
			}
			else if(ui.value == "1"){
				document.getElementById("citations-facet-img").src = "img/facets/higher_level/citations_higher_level.png";
				getCitationsInformationHigherLevel(citations_information);
			}
			else if(ui.value == "2"){
				document.getElementById("citations-facet-img").src = "img/facets/available/citations_available.png";
				getCitationsInformationAvailable(citations_information);
			}
		}
	});
});