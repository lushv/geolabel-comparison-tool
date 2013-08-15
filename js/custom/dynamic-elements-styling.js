//************************  Set up height of the sliders div depending on the window size  *****************************
$(document).ready(function() {
	var height = $(window).height() - 290;
	$("#facets-sliders").height(height);
});

$(window).resize(function() {
	var height = $(window).height() - 290;
	$("#facets-sliders").height(height);
});

//************************  Location radio buttons  *****************************
$(function() {
	$("#location-radio").change(function() {
		if($('#location-radio').is(':checked')){
			$('#location-name-autocomplete').prop('disabled', false);
			
			$('#select-area-latitude-min').prop('disabled', true);
			$('#select-area-longitude-min').prop('disabled', true);
			$('#select-area-longitude-max').prop('disabled', true);
			$('#select-area-latitude-max').prop('disabled', true);
			$('#clear-select-area-input').prop('disabled', true);
		}
	})
});

$(function() {
	$("#area-selection-radio").change(function() {
		if($('#area-selection-radio').is(':checked')){
			$('#location-name-autocomplete').prop('disabled', true);
			
			$('#select-area-latitude-min').prop('disabled', false);
			$('#select-area-longitude-min').prop('disabled', false);
			$('#select-area-longitude-max').prop('disabled', false);
			$('#select-area-latitude-max').prop('disabled', false);
			$('#clear-select-area-input').prop('disabled', false);
		}
	})
});

$(function() {
	$("#clear-select-area-input").click(function() {
		$('#select-area-latitude-min').prop('value', '');
		$('#select-area-longitude-min').prop('value', '');
		$('#select-area-longitude-max').prop('value', '');
		$('#select-area-latitude-max').prop('value', '');
	})
});

//************************  Set up jQuery elements  *****************************
$(function() {
	$( "#start-date" ).datepicker({
		changeMonth: true,
		changeYear: true,
		dateFormat: 'yy-mm-dd'
	});
	$( "#end-date" ).datepicker({
		changeMonth: true,
		changeYear: true,
		dateFormat: 'yy-mm-dd'
	});
	$( "#producer-accordion" ).accordion({
		heightStyle: "content",
		collapsible: true,
		active: false
	});
	$( "#comments-accordion" ).accordion({
		heightStyle: "content",
		collapsible: true,
		active: false,
	});
	$( "#lineage-accordion" ).accordion({
		heightStyle: "content",
		collapsible: true,
		active: false,
	});
	$( "#compliance-accordion" ).accordion({
		heightStyle: "content",
		collapsible: true,
		active: false,
	});
	$( "#quality-accordion" ).accordion({
		heightStyle: "content",
		collapsible: true,
		active: false,
	});
	$( "#feedback-accordion" ).accordion({
		heightStyle: "content",
		collapsible: true,
		active: false,
	});
	$( "#review-accordion" ).accordion({
		heightStyle: "content",
		collapsible: true,
		active: false,
	});
	$( "#citations-accordion" ).accordion({
		heightStyle: "content",
		collapsible: true,
		active: false,
	});
	$('#feedback-star').raty({
		half: true,
		starHalf: '/comparison_tool/img/star_rating/star-half-big.png',
		starOff: '/comparison_tool/img/star_rating/star-off-big.png',
		starOn : '/comparison_tool/img/star_rating/star-on-big.png',
		hints: ['1 star', '2 stars', '3 stars', '4 stars', '5 stars'],
		cancel: true,
		cancelHint: 'Clear rating filtering',
		cancelPlace: 'right',
		cancelOff: '/comparison_tool/img/star_rating/cancel-off-big.png',
		cancelOn : '/comparison_tool/img/star_rating/cancel-on-big.png',		
		size: 16,
		width: 150,			
	});
	$('#reviews-star').raty({
		half: true,
		starHalf: '/comparison_tool/img/star_rating/star-half-big.png',
		starOff: '/comparison_tool/img/star_rating/star-off-big.png',
		starOn : '/comparison_tool/img/star_rating/star-on-big.png',
		hints: ['1 star', '2 stars', '3 stars', '4 stars', '5 stars'],
		cancel: true,
		cancelHint: 'Clear rating filtering',
		cancelPlace: 'right',
		cancelOff: '/comparison_tool/img/star_rating/cancel-off-big.png',
		cancelOn : '/comparison_tool/img/star_rating/cancel-on-big.png',		
		size: 16,
		width: 150,			
	});
});