$(function() {
  $("#search-btn").click(function() {
	// First of all clear all the previous results and GEO label filtering
	document.getElementById("zoom_pan_results_svg").innerHTML = '';
	resetFilters();
	
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
	
	$("#loader_1").width($(window).width() - 500);
	$("#loader_1").show();
	
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


	// Make a post request
    $.ajax({
		  type: "POST",
		  url: "php/process_search_request.php",
		  data: dataString,
			success: function(data){
				if(isJson(data)){
				
					var JSONObject = JSON.parse(data);
					
					var windowHeight = $(window).height(),
					windowWidth = $(window).width(),
					searchAreaHeight = windowHeight - (windowHeight * 0.2 + 130),
					serachAreaWidth = windowWidth - 500;
					
					var resultsParentSVG = document.getElementById("results_svg");
					var resultsGroup = document.getElementById("zoom_pan_results_svg");
					
					// Set size of the search results SVG
					resultsParentSVG.setAttributeNS(null, "height", searchAreaHeight + "px");
					resultsParentSVG.setAttributeNS(null, "width", serachAreaWidth + "px");					
					
					//1) get screen height and width
					//2) available area = height * width 
					//3) area per label = available area / number of datasets
					//4) label scale = area per label / (250 * 250)
					
					var availableArea = searchAreaHeight * serachAreaWidth;
					var areaPerLabel = parseInt(availableArea / JSONObject.dataset.length, 10);
					var scale = parseFloat(areaPerLabel / 47000).toFixed(2);
					var xOffset = parseInt((250 * scale) + 35, 10);
					var yOffset = xOffset;
					var maxLabelsPerRow = parseInt(serachAreaWidth / xOffset, 10);
					
					// Margin from left side of results svg
					var xMargin = 30;
					// Initial x value, also a value to hold current GEO label position
					var x = 30;
					// Initail y value
					var y = 30;
					// Number of labels placed on the current row
					var currentLabelsOnRow = 0;
					
					//var scale = 0.2,
					//xOffset = 100,
					//yOffset = 100,
					//maxLabelsPerRow = 9;
							
					// Process all JSON datasets objects and build GEO label representations
					for (var i = 0; i < JSONObject.dataset.length; i++) {
						// Check current labels vertical position to make sure that the labels do not overlap with the zoom-pan control
						if(y < 90){
							// Increase the value of x until horisoanl label position does not overlap the zoom-pan control
							// Increase number of labels that could be placed on a horisontal row
							var zoomPanWidht = 90;
							while (zoomPanWidht > x) {
								x += xOffset;
								currentLabelsOnRow += 1;
							}
						}
						
						var datasetID = JSONObject.dataset[i].datasetIdentifier;
						var parentID = JSONObject.dataset[i].parentIdentifier;
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
						var knownProblems = JSONObject.dataset[i].facets.produerComments.knownProblems;
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
						
						
						// Set GEO label svg
						var labelSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
						labelSVG.setAttributeNS(null, "id", "geolabel_" + i);
						labelSVG.setAttributeNS(null, "class", "dataset_geolabel");
						labelSVG.setAttributeNS(null, "dataset_id", datasetID);
						labelSVG.setAttributeNS(null, "parent_id", parentID);
						labelSVG.setAttributeNS(null, "title", "Dataset ID: " + datasetID);
						
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
							getProducerProfileHigherLevel(producerProfileGroup, "producer_linear_gradient_" + i);
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
							getProducerCommentsHigherLevel(producerCommentsGroup, "comments_linear_gradient_" + i);
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
							getLineageHigherLevel(lineageGroup, "lineage_linear_gradient_" + i);
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
							getStandardsComplianceHigherLevel(standardsComplianceGroup, "linear_gradient_" + i);
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
							getQualityInformationHigherLevel(qualityInformationGroup, "quality_linear_gradient_" + i);
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
							getUserFeedbackHigherLevel(userFeedbackGroup, "feedbacks_linear_gradient_" + i);
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
							getExpertReviewHigherLevel(expertReviewGroup, "reviews_linear_gradient_" + i);
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
							getCitationsInformationHigherLevel(citationsGroup, "citations_linear_gradient_" + i);
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
						// remove spinner
						$("#loader_1").hide();
						// show results
						resultsGroup.appendChild(labelSVG);
						
						// Increase x postion and number of added labels
						x += xOffset;
						currentLabelsOnRow += 1;
						if(currentLabelsOnRow == maxLabelsPerRow){
							y += yOffset;
							x = xMargin;
							currentLabelsOnRow = 0;
						}
						
					}
				}
				else{
					$("#search-results").html("An error occurred.");
				}
				
				// ********************************************************************************************************
				//										DATASET DETAILS FUNCTION
				//									Attach on click event to all GEO labels
				// ********************************************************************************************************
				$(function() {
					var $selectedLabelID = null;
					$(".dataset_geolabel").click(function(event) {
						
						// Reset all information
						if($selectedLabelID != null){
							$("#select_glow_group_" + $selectedLabelID).remove();
						}
						
						$("#dataset-details-id").html(" <br> ");
						$("#dataset-details-title").html(" <br> ");
						$("#dataset-details-keywords").html(" <br> ");
						$("#dataset-details-date").html(" <br> ");
						$("#dataset-details-organisation").html(" <br> ");
						$("#dataset-details-abstract").html(" <br> ");
						$("#dataset-details-purpose").html(" <br> ");
						
						// Get ID of the GEO label that was clicked
						var targetLabel = $(event.target).closest("svg");
						var $targetDatasetID = targetLabel.attr('dataset_id');
						var $targetParentID = targetLabel.attr('parent_id');
						//stores ID of the label curently selected
						$selectedLabelID = targetLabel.attr('id').replace("geolabel_", "");
						
						// Highlight the selected label by adding a 'glow' effect
						var selectGlowGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
						selectGlowGroup.setAttributeNS(null, "id", "select_glow_group_" + $selectedLabelID);
						getSelectGlow(selectGlowGroup);
						
						if($("#highlight_glow_group_" + $selectedLabelID).length){
							$("#highlight_glow_group_" + $selectedLabelID).after(selectGlowGroup);
						}
						else{
							$("#size_group_" + $selectedLabelID).prepend(selectGlowGroup);
						}
						
						var detailsDataString = 'datasetID='+ $targetDatasetID;
						// Make a post request
						$.ajax({
							type: "POST",
							url: "php/process_details_request.php",
							data: detailsDataString,
							success: function(data){
								if(isJson(data)){
									var JSONObject = JSON.parse(data);
									
									if(JSONObject.dataset.title != "" && JSONObject.dataset.title != null){
										$("#dataset-details-title").html(JSONObject.dataset.title);
									}
									if(JSONObject.dataset.fileIdentifier != "" && JSONObject.dataset.fileIdentifier != null){
										$("#dataset-details-id").html(JSONObject.dataset.fileIdentifier);
									}
									if(JSONObject.dataset.keywords != "" && JSONObject.dataset.keywords != null){
										$("#dataset-details-keywords").html(JSONObject.dataset.keywords);
									}
									if(JSONObject.dataset.date != "" && JSONObject.dataset.date != null){
										$("#dataset-details-date").html(JSONObject.dataset.date);
									}
									if(JSONObject.dataset.producer != "" && JSONObject.dataset.producer){
										$("#dataset-details-organisation").html(JSONObject.dataset.producer);
									}
									if(JSONObject.dataset.abstract != "" && JSONObject.dataset.abstract != null){
										$("#dataset-details-abstract").html(JSONObject.dataset.abstract);
									}
									if(JSONObject.dataset.purpose != "" && JSONObject.dataset.purpose != null){
										$("#dataset-details-purpose").html(JSONObject.dataset.purpose);
									}
								}
								
								// ***********************************************************************************************
								//									DETAILED GEO LABEL
								//								Display a detailed GEO label
								// ***********************************************************************************************
								var div = $("<div></div>");
								var detailedLabel = cloneLabel($("#geolabel_" + $selectedLabelID), "detailed_");
								
								// Add metadata button
								var metadataURL = "http://localhost/geolabel-comparison-tool/php/metadata_records/" + $targetDatasetID + ".xml";
								var metadataButton = $("<a id='metadata-anchor' href='" + metadataURL + "' target='_blank'><button id='metadata-button' class='btn btn-success' type='button'><i class='icon-eye-open icon-white'></i>&nbsp;&nbsp;&nbsp;View Metadata</button></a>");
								div.append(detailedLabel);
								div.append(metadataButton);
								
								$("#detailed-geolabel").html(div);
							},
							error:function(){
								$("#dataset-details").html('An error occured.');
							},
						}); // -- End of Ajax request to get dataset details
					}) // -- End of on label click function
				}); // -- End of $(function() { ... });

				$(function() {
					$(".dataset_geolabel").mousedown(function(event) {
						if(event.which == 3){
							var targetLabel = $(event.target).closest("svg");
							$clickedLabelID = targetLabel.attr('id').replace("geolabel_", "");
						}
					})
				});
				
				// Enable all the filters
				enableFilters();
				$("#search-results-count").html("Search Results: Displaying a total of " + JSONObject.dataset.length + " datasets.");

			},
			error:function(){
				$("#search-results").html('An error occured.');
			}
		});
		return false;
	});
});

var $clickedLabelID = null;
$(function() {
	$("#highlight").click(function(event) {
		if($clickedLabelID != null && !($("#highlight_glow_group_" + $clickedLabelID).length)){
			// Highlight the selected label by adding a 'glow' effect
			var highlightGlowGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
			highlightGlowGroup.setAttributeNS(null, "id", "highlight_glow_group_" + $clickedLabelID);
			getHighlightGlow(highlightGlowGroup);
			
			if($("#select_glow_group_" + $clickedLabelID).length){
				$("#select_glow_group_" + $clickedLabelID).after(highlightGlowGroup);
			}
			else{
				$("#size_group_" + $clickedLabelID).prepend(highlightGlowGroup);
			}
			
			// Add highlighted dataset into Highlighted Dataset tab
			
			var highlightedDiv = getHighlightedLabelDetails($clickedLabelID);
			$("#highlighted-datasets").append(highlightedDiv);
			
			$clickedLabelID = null;
		}
	})
});

$(function() {
	$("#undo-highlight").click(function(event) {
		if($clickedLabelID != null){
			// Remove the highlight from the selected label
			$("#highlight_glow_group_" + $clickedLabelID).remove();
			$("#highlighted_item_" + $clickedLabelID).remove();
			
			$clickedLabelID = null;
		}
	})
});

function getFacetAnchorElement(svgNS, xlinkNS, drilldownBaseURL, xmlDocumentURL, xslBaseURL, xslFileName, parentSelector){
	var a = document.createElementNS(svgNS, "a");
	a.setAttributeNS(xlinkNS,"xlink:show","new");
	a.setAttributeNS(xlinkNS,"style","target-new: tab;");
	a.setAttributeNS(xlinkNS,"xlink:href", drilldownBaseURL + xmlDocumentURL + xslBaseURL + xslFileName);
	$(a).append(parentSelector.children());
	parentSelector.append(a);
}

function getBrandingAnchorElement(svgNS, xlinkNS, url, parentSelector){
	var a = document.createElementNS(svgNS, "a");
	a.setAttributeNS(xlinkNS,"xlink:show","new");
	a.setAttributeNS(xlinkNS,"style","target-new: tab;");
	a.setAttributeNS(xlinkNS,"xlink:href", url);
	$(a).append(parentSelector.children());
	parentSelector.append(a);
}

// Function for JSON validation
function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function getHighlightedLabelDetails(highlightedID){

	$highlightedLabelID = $("#geolabel_" + highlightedID).attr('dataset_id');
	$highlightedParentID = $("#geolabel_" + highlightedID).attr('parent_id');
	
	// create a new tab element
	var parentDiv = $('<div/>', {id: 'highlighted_item_' + highlightedID, class: 'highlighted-item'});
	var label = $('<div class="highlighted-dataset-label">Dataset ID: ' + $highlightedLabelID + '</div>');
	var detailsDiv = $('<div class="highlighted-dataset-details"></div>');
	var button = $('<div class="remove-highlighted-div"><button id="remove-highlighted-' + highlightedID + '" class="btn btn-danger remove-highlighted" type="button"><i class="icon-remove icon-white"></i>&nbsp;&nbsp;&nbsp;Remove from List</button></div>');
	var div = $("<div></div>");
	
	var details = $('<div id="detailed-geolabel-' + highlightedID + '" class="highlighted-geolabel"></div>' +
					'<div class="dataset-details-labels">Title:</div>' +
					'<div id="dataset-details-title-' + highlightedID + '" class="dataset-details-data"> <br> </div>' +
					
					'<div class="dataset-details-labels">Keywords:</div>' +
					'<div id="dataset-details-keywords-' + highlightedID + '" class="dataset-details-data"> <br> </div>' +
					
					'<div class="dataset-details-labels">Date:</div>' +
					'<div id="dataset-details-date-' + highlightedID + '" class="dataset-details-data"> <br> </div>' +
					
					'<div class="dataset-details-labels">Contact:</div>' +
					'<div id="dataset-details-organisation-' + highlightedID + '" class="dataset-details-data"> <br> </div>' +
					
					'<div class="dataset-details-labels">Abstract:</div>' +
					'<div id="dataset-details-abstract-' + highlightedID + '" class="dataset-details-data"> <br> </div>' +
					
					'<div class="dataset-details-labels">Purpose:</div>' +
					'<div id="dataset-details-purpose-' + highlightedID + '" class="dataset-details-data"> <br> </div><br>');
	
	var detailsDataString = 'datasetID='+ $highlightedLabelID;

	// Make a post request
	$.ajax({
		type: "POST",
		url: "php/process_details_request.php",
		data: detailsDataString,
		success: function(data){
			if(isJson(data)){
				var JSONObject = JSON.parse(data);
				
				if(JSONObject.dataset.title != "" && JSONObject.dataset.title != null){
					parentDiv.find("#dataset-details-title-" + highlightedID).html(JSONObject.dataset.title);
				}
				
				if(JSONObject.dataset.fileIdentifier != "" && JSONObject.dataset.fileIdentifier != null){
					parentDiv.find("#dataset-details-id-" + highlightedID).html(JSONObject.dataset.fileIdentifier);
				}
				if(JSONObject.dataset.keywords != "" && JSONObject.dataset.keywords != null){
					parentDiv.find("#dataset-details-keywords-" + highlightedID).html(JSONObject.dataset.keywords);
				}
				if(JSONObject.dataset.date != "" && JSONObject.dataset.date != null){
					parentDiv.find("#dataset-details-date-" + highlightedID).html(JSONObject.dataset.date);
				}
				if(JSONObject.dataset.producer != "" && JSONObject.dataset.producer){
					parentDiv.find("#dataset-details-organisation-" + highlightedID).html(JSONObject.dataset.producer);
				}
				if(JSONObject.dataset.abstract != "" && JSONObject.dataset.abstract != null){
					parentDiv.find("#dataset-details-abstract-" + highlightedID).html(JSONObject.dataset.abstract);
				}
				if(JSONObject.dataset.purpose != "" && JSONObject.dataset.purpose != null){
					parentDiv.find("#dataset-details-purpose-" + highlightedID).html(JSONObject.dataset.purpose);
				}
			}
			
			// ***********************************************************************************************
			//									highlighted GEO LABEL
			//								Display a highlighted GEO label
			// ***********************************************************************************************
			var highlightedLabel = cloneLabel($("#geolabel_" + highlightedID), "highlighted_");
			
			// Add metadata button
			var metadataURL = "http://localhost/geolabel-comparison-tool/php/metadata_records/" + $highlightedLabelID + ".xml";
			var metadataButton = $("<a id='metadata-anchor' href='" + metadataURL + "' target='_blank'><button id='metadata-button' class='btn btn-success' type='button'><i class='icon-eye-open icon-white'></i>&nbsp;&nbsp;&nbsp;View Metadata</button></a>");
			
			
			$("#remove-highlighted-" + highlightedID).click(function(event) {

				// Remove the highlight from the selected label
				$("#highlight_glow_group_" + highlightedID).remove();
				$("#highlighted_item_" + highlightedID).remove();
				
			});
			
			div.append(highlightedLabel);
			div.append(metadataButton);
			parentDiv.find("#detailed-geolabel-" + highlightedID).html(div);
			
		},
		error:function(){
		},
	}); // -- End of Ajax request to get dataset details
	detailsDiv.append(details);
	parentDiv.append(label);
	parentDiv.append(detailsDiv);
	parentDiv.append(button);

	return parentDiv;
}


/*  Function to clone a label
 *  This function clones a GEO label and changes the elements' identifiers so the elements do not clash.
 *  Returns a cloned GEO label representation.
 */
function cloneLabel(originalLabel, newIDPrefix){
	// ********************************************************************************************************************
	//												DETAILED GEO LABEL
	//											Display a detailed GEO label
	// ********************************************************************************************************************
	var detailedLabel = originalLabel.clone();
	var detailedLabelID = detailedLabel.closest("svg").attr('id').replace("geolabel_", "");
	var detailedDatasetID = detailedLabel.closest("svg").attr('dataset_id');
	var detailedParentID =  detailedLabel.closest("svg").attr('parent_id');
	
	detailedLabel.attr("id", newIDPrefix + "geolabel_" + detailedLabelID);
	detailedLabel.attr("xmlns:xlink", "http://www.w3.org/1999/xlink");
	detailedLabel.removeAttr("title");
	detailedLabel.children(":first").attr("transform","scale(0.6)");
	
	// Remove any glow effects
	detailedLabel.find("#highlight_glow_group_" + detailedLabelID).remove();
	detailedLabel.find("#select_glow_group_" + detailedLabelID).remove();
	
	// Add hover-over functionality
	var organisationName = detailedLabel.find("#producer_profile_" + detailedLabelID).attr("producer_profile_name");
	if(organisationName == "null"){
		organisationName = "not defined."
	}
	detailedLabel.find("#producer_profile_" + detailedLabelID).attr("title", "Organisation name: " + organisationName);

	var supplementalInfo = detailedLabel.find("#producer_comments_" + detailedLabelID).attr("supplemental_information");
	var knownProblems = detailedLabel.find("#producer_comments_" + detailedLabelID).attr("known_problems");
	if(supplementalInfo == "null"){
		supplementalInfo = "not defined."
	}
	if(knownProblems == "null"){
		knownProblems = "not defined."
	}
	detailedLabel.find("#producer_comments_" + detailedLabelID).attr("title", "Supplemental Information: " + supplementalInfo + " Known Problems: " + knownProblems);
	
	detailedLabel.find("#lineage_" + detailedLabelID).attr("title", "Number of process steps: " + detailedLabel.find("#lineage_" + detailedLabelID).attr("process_step_count"));
	
	var standardName = detailedLabel.find("#standards_compliance_" + detailedLabelID).attr("standard_name");
	if(standardName == "null"){
		standardName = "not defined."
	}
	detailedLabel.find("#standards_compliance_" + detailedLabelID).attr("title", "Standard name: " + standardName);
	
	var qualityScope = detailedLabel.find("#quality_information_" + detailedLabelID).attr("scope_level");
	if(qualityScope == "null"){
		qualityScope = "not defined."
	}
	detailedLabel.find("#quality_information_" + detailedLabelID).attr("title", "Quality information scope: " + qualityScope);
	
	var averageRating = detailedLabel.find("#user_feedback_" + detailedLabelID).attr("feedbacks_average_rating");
	if(averageRating == "null"){
		averageRating = "0"
	}
	detailedLabel.find("#user_feedback_" + detailedLabelID).attr("title", "Number of feedbacks: " + detailedLabel.find("#user_feedback_" + detailedLabelID).attr("feedbacks_count") + ". Average rating: " + averageRating + " (" + detailedLabel.find("#user_feedback_" + detailedLabelID).attr("ratings_count") + " rating(s)).");
	
	var averageExpertRating = detailedLabel.find("#expert_review_" + detailedLabelID).attr("expert_average_rating");
	if(averageExpertRating == "null"){
		averageExpertRating = "0"
	}
	detailedLabel.find("#expert_review_" + detailedLabelID).attr("title", "Number of reviews: " + detailedLabel.find("#expert_review_" + detailedLabelID).attr("expert_reviews_count") + ". Average rating: " + averageExpertRating + " (" + detailedLabel.find("#expert_review_" + detailedLabelID).attr("expert_ratings_count") + " rating(s)).");
	
	detailedLabel.find("#citations_" + detailedLabelID).attr("title", "Number of citations: " + detailedLabel.find("#citations_" + detailedLabelID).attr("citations_count"));
	
	
	// *******************************************************************************************************************************
	//   								Add on click functionality and modify gradien fill IDs
	// *******************************************************************************************************************************
	var xlinkNS="http://www.w3.org/1999/xlink",
	svgNS="http://www.w3.org/2000/svg";

	var drilldownBaseURL = "http://localhost/geolabel-comparison-tool/php/stylesheets/facet.php?";
	var xmlDocumentURL = "doc=" + escape("http://localhost/geolabel-comparison-tool/php/metadata_records/" + detailedDatasetID + ".xml");
	var xmlParentURL = "doc=" + escape("http://localhost/geolabel-comparison-tool/php/metadata_records/" + detailedParentID + ".xml");
	var xslBaseURL = "&xsl=" + escape("http://localhost/geolabel-comparison-tool/php/stylesheets/");
	
	getBrandingAnchorElement(svgNS, xlinkNS, "http://www.geolabel.info", detailedLabel.find("#branding_group_" + detailedLabelID));
	
	// Producer Profile
	var selectedProducerProfile = detailedLabel.find("#producer_profile_" + detailedLabelID);
	if(selectedProducerProfile.attr('availability') == 2){
		// Replace gardient fill identifiers so they do not clash
		getProducerProfileHigherLevel(selectedProducerProfile, newIDPrefix + "producer_linear_gradient_" + detailedLabelID);
		// Add drilldown
		getFacetAnchorElement(svgNS, xlinkNS, drilldownBaseURL, xmlParentURL, xslBaseURL, "GVQ_Producer_Profile.xsl", selectedProducerProfile);
	}
	else{
		getFacetAnchorElement(svgNS, xlinkNS, drilldownBaseURL, xmlDocumentURL, xslBaseURL, "GVQ_Producer_Profile.xsl", selectedProducerProfile);
	}

	// Producer Comments
	var selectedProducerComments = detailedLabel.find("#producer_comments_" + detailedLabelID);
	if(selectedProducerComments.attr('availability') == 2){
		// Replace gardient fill identifiers so they do not clash
		getProducerCommentsHigherLevel(selectedProducerComments, newIDPrefix + "comments_linear_gradient_" + detailedLabelID);
		// Add drilldown
		getFacetAnchorElement(svgNS, xlinkNS, drilldownBaseURL, xmlParentURL, xslBaseURL, "GVQ_Producer_Comments.xsl", selectedProducerComments);
	}
	else{
		getFacetAnchorElement(svgNS, xlinkNS, drilldownBaseURL, xmlDocumentURL, xslBaseURL, "GVQ_Producer_Comments.xsl", selectedProducerComments);
	}

	// Lineage
	var selectedLineage = detailedLabel.find("#lineage_" + detailedLabelID);
	if(selectedLineage.attr('availability') == 2){
		// Replace gardient fill identifiers so they do not clash
		getLineageHigherLevel(selectedLineage, newIDPrefix + "lineage_linear_gradient_" + detailedLabelID);
		// Add drilldown
		getFacetAnchorElement(svgNS, xlinkNS, drilldownBaseURL, xmlParentURL, xslBaseURL, "GVQ_Lineage.xsl", selectedLineage);
	}
	else{
		getFacetAnchorElement(svgNS, xlinkNS, drilldownBaseURL, xmlDocumentURL, xslBaseURL, "GVQ_Lineage.xsl", selectedLineage);
	}
	
	// Standards Compliance
	var selectedStandardsCompliance = detailedLabel.find("#standards_compliance_" + detailedLabelID);
	if(selectedStandardsCompliance.attr('availability') == 2){
		// Replace gardient fill identifiers so they do not clash
		getStandardsComplianceHigherLevel(selectedStandardsCompliance, newIDPrefix + "standards_linear_gradient_" + detailedLabelID);
		// Add drilldown
		getFacetAnchorElement(svgNS, xlinkNS, drilldownBaseURL, xmlParentURL, xslBaseURL, "GVQ_Standards_Compliance.xsl", selectedStandardsCompliance);
	}
	else{
		getFacetAnchorElement(svgNS, xlinkNS, drilldownBaseURL, xmlDocumentURL, xslBaseURL, "GVQ_Standards_Compliance.xsl", selectedStandardsCompliance);
	}
	
	// Quality Information
	selectedQualityInformation = detailedLabel.find("#quality_information_" + detailedLabelID);
	if(selectedQualityInformation.attr('availability') == 2){
		// Replace gardient fill identifiers so they do not clash
		getQualityInformationHigherLevel(selectedQualityInformation, newIDPrefix + "quality_linear_gradient_" + detailedLabelID);
		// Add drilldown
		getFacetAnchorElement(svgNS, xlinkNS, drilldownBaseURL, xmlParentURL, xslBaseURL, "GVQ_Quality.xsl", selectedQualityInformation);
	}
	else{
		getFacetAnchorElement(svgNS, xlinkNS, drilldownBaseURL, xmlDocumentURL, xslBaseURL, "GVQ_Quality.xsl", selectedQualityInformation);
	}

	// User Feedback
	var selectedUserFeedback = detailedLabel.find("#user_feedback_" + detailedLabelID);
	if(selectedUserFeedback.attr('availability') == 2){
		// Replace gardient fill identifiers so they do not clash
		getUserFeedbackHigherLevel(selectedUserFeedback, newIDPrefix + "feedback_linear_gradient_" + detailedLabelID);
		// Add drilldown
		getFacetAnchorElement(svgNS, xlinkNS, drilldownBaseURL, xmlParentURL, xslBaseURL, "GVQ_User_Feedback.xsl", selectedUserFeedback);
	}
	else{
		getFacetAnchorElement(svgNS, xlinkNS, drilldownBaseURL, xmlDocumentURL, xslBaseURL, "GVQ_User_Feedback.xsl", selectedUserFeedback);
	}
	
	// Expert Review
	var selectedExpertReview = detailedLabel.find("#expert_review_" + detailedLabelID);
	if(selectedExpertReview.attr('availability') == 2){
		// Replace gardient fill identifiers so they do not clash
		getExpertReviewHigherLevel(selectedExpertReview, newIDPrefix + "expert_linear_gradient_" + detailedLabelID);
		// Add drilldown
		getFacetAnchorElement(svgNS, xlinkNS, drilldownBaseURL, xmlParentURL, xslBaseURL, "GVQ_Expert_Reviews.xsl", selectedExpertReview);
	}
	else{
		getFacetAnchorElement(svgNS, xlinkNS, drilldownBaseURL, xmlDocumentURL, xslBaseURL, "GVQ_Expert_Reviews.xsl", selectedExpertReview);
	}
	
	// Citations
	var selectedCitations = detailedLabel.find("#citations_" + detailedLabelID);
	if(selectedCitations.attr('availability') == 2){
		// Replace gardient fill identifiers so they do not clash
		getCitationsInformationHigherLevel(selectedCitations, newIDPrefix + "citations_linear_gradient_" + detailedLabelID);
		// Add drilldown
		getFacetAnchorElement(svgNS, xlinkNS, drilldownBaseURL, xmlParentURL, xslBaseURL, "GVQ_Citations.xsl", selectedCitations);
	}
	else{
		getFacetAnchorElement(svgNS, xlinkNS, drilldownBaseURL, xmlDocumentURL, xslBaseURL, "GVQ_Citations.xsl", selectedCitations);
	}
	
	// ********************************************************************************************************************************
	//											Change group IDs to avoid ID conflict
	// ********************************************************************************************************************************
	detailedLabel.find("#size_group_" + detailedLabelID).attr("id", newIDPrefix + "size_group_" + detailedLabelID);
	detailedLabel.find("#branding_group_" + detailedLabelID).attr("id", newIDPrefix + "branding_group_" + detailedLabelID);

	detailedLabel.find("#producer_profile_" + detailedLabelID).attr("id", newIDPrefix + "producer_profile_" + detailedLabelID);
	detailedLabel.find("#producer_comments_" + detailedLabelID).attr("id", newIDPrefix + "producer_comments_" + detailedLabelID);
	detailedLabel.find("#lineage_" + detailedLabelID).attr("id", newIDPrefix + "lineage_" + detailedLabelID);
	detailedLabel.find("#standards_compliance_" + detailedLabelID).attr("id", newIDPrefix + "standards_compliance_" + detailedLabelID);
	detailedLabel.find("#quality_information_" + detailedLabelID).attr("id", newIDPrefix + "quality_information_" + detailedLabelID);
	detailedLabel.find("#user_feedback_" + detailedLabelID).attr("id", newIDPrefix + "user_feedback_" + detailedLabelID);
	detailedLabel.find("#expert_review_" + detailedLabelID).attr("id", newIDPrefix + "expert_review_" + detailedLabelID);
	detailedLabel.find("#citations_" + detailedLabelID).attr("id", newIDPrefix + "citations_" + detailedLabelID);
	
	return detailedLabel;
}