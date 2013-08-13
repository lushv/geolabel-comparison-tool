// ***************************************   PRODUCER PROFILE   ****************************************** //
 $(function() {
	$("#producer-slider").slider({
		range: "min",
		value:0,
		min: 0,
		max: 2,
		step: 1,
		slide: function( event, ui ) {
			// get the SVG element node
			var svg = document.getElementById("geo_label");
		
			if(ui.value == "0"){
				document.getElementById("producer-facet-img").src = "img/facets/not_available/producer_not_available.png";
				getProducerProfileNotAvailable(svg);
			}
			else if(ui.value == "1"){
				document.getElementById("producer-facet-img").src = "img/facets/higher_level/producer_higher_level.png";
				getProducerProfileHigherLevel(svg);
			}
			else if(ui.value == "2"){
				document.getElementById("producer-facet-img").src = "img/facets/available/producer_available.png";
				getProducerProfileAvailable(svg);
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
		slide: function( event, ui ) {
			// get the SVG element node
			var svg = document.getElementById("geo_label");
			
			if(ui.value == "0"){
				document.getElementById("comments-facet-img").src = "img/facets/not_available/comments_not_available.png";
				getProducerCommentsNotAvailable(svg);
			}
			else if(ui.value == "1"){
				document.getElementById("comments-facet-img").src = "img/facets/higher_level/comments_higher_level.png";
				getProducerCommentsHigherLevel(svg);
			}
			else if(ui.value == "2"){
				document.getElementById("comments-facet-img").src = "img/facets/available/comments_available.png";
				getProducerCommentsAvailable(svg);
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
		slide: function( event, ui ) {
			var svg = document.getElementById("geo_label");

			if(ui.value == "0"){
				document.getElementById("lineage-facet-img").src = "img/facets/not_available/lineage_not_available.png";
				getLineageNotAvailable(svg);
			}
			else if(ui.value == "1"){
				document.getElementById("lineage-facet-img").src = "img/facets/higher_level/lineage_higher_level.png";
				getLineageHigherLevel(svg);
			}
			else if(ui.value == "2"){
				document.getElementById("lineage-facet-img").src = "img/facets/available/lineage_available.png";
				getLineageAvailable(svg);
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
		slide: function( event, ui ) {
			var svg = document.getElementById("geo_label");

			if(ui.value == "0"){
				document.getElementById("compliance-facet-img").src = "img/facets/not_available/compliance_not_available.png";
				getStandardsComplianceNotAvailable(svg);
			}
			else if(ui.value == "1"){
				document.getElementById("compliance-facet-img").src = "img/facets/higher_level/compliance_higher_level.png";
				getStandardsComplianceHigherLevel(svg);
			}
			else if(ui.value == "2"){
				document.getElementById("compliance-facet-img").src = "img/facets/available/compliance_available.png";
				getStandardsComplianceAvailable(svg);
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
		slide: function( event, ui ) {
			var svg = document.getElementById("geo_label");

			if(ui.value == "0"){
				document.getElementById("quality-facet-img").src = "img/facets/not_available/quality_not_available.png";
				getQualityInformationNotAvailable(svg);
			}
			else if(ui.value == "1"){
				document.getElementById("quality-facet-img").src = "img/facets/higher_level/quality_higher_level.png";
				getQualityInformationHigherLevel(svg);
			}
			else if(ui.value == "2"){
				document.getElementById("quality-facet-img").src = "img/facets/available/quality_available.png";
				getQualityInformationAvailable(svg);
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
		slide: function( event, ui ) {
			var svg = document.getElementById("geo_label");

			if(ui.value == "0"){
				document.getElementById("feedback-facet-img").src = "img/facets/not_available/feedback_not_available.png";
				getUserFeedbackNotAvailable(svg);
			}
			else if(ui.value == "1"){
				document.getElementById("feedback-facet-img").src = "img/facets/higher_level/feedback_higher_level.png";
				getUserFeedbackHigherLevel(svg);
			}
			else if(ui.value == "2"){
				document.getElementById("feedback-facet-img").src = "img/facets/available/feedback_available.png";
				getUserFeedbackAvailable(svg);
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
		slide: function( event, ui ) {
			var svg = document.getElementById("geo_label");

			if(ui.value == "0"){
				document.getElementById("review-facet-img").src = "img/facets/not_available/review_not_available.png";
				getExpertReviewNotAvailable(svg);
			}
			else if(ui.value == "1"){
				document.getElementById("review-facet-img").src = "img/facets/higher_level/review_higher_level.png";
				getExpertReviewHigherLevel(svg);
			}
			else if(ui.value == "2"){
				document.getElementById("review-facet-img").src = "img/facets/available/review_available.png";
				getExpertReviewAvailable(svg);
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
		slide: function( event, ui ) {
			var svg = document.getElementById("geo_label");

			if(ui.value == "0"){
				document.getElementById("citations-facet-img").src = "img/facets/not_available/citations_not_available.png";
				getCitationsInformationNotAvailable(svg);
			}
			else if(ui.value == "1"){
				document.getElementById("citations-facet-img").src = "img/facets/higher_level/citations_higher_level.png";
				getCitationsInformationHigherLevel(svg);
			}
			else if(ui.value == "2"){
				document.getElementById("citations-facet-img").src = "img/facets/available/citations_available.png";
				getCitationsInformationAvailable(svg);
			}
		}
	});
});