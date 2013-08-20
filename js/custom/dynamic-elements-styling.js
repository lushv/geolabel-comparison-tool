//************************  Set up height of the sliders div depending on the window size  *****************************
$(document).ready(function() {
	var height = $(window).height() - 290;
	$("#facets-sliders").height(height);
	
	var mapHeight = $(window).height() - 230;
	$("#map").height(mapHeight);

	var mapWidth = $(window).width() - 475;
	$("#map").width(mapWidth);
});

$(window).resize(function() {
	var height = $(window).height() - 290;
	$("#facets-sliders").height(height);
	
	var mapHeight = $(window).height() - 230;
	$("#map").height(mapHeight);

	var mapWidth = $(window).width() - 475;
	$("#map").width(mapWidth);
});

//************************  Set up jQuery elements  *****************************
$(function() {
	$(".numeric").numeric();
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

//************************  Location radio buttons  *****************************
$(function() {
	$("#location-radio").change(function() {
		if($('#location-radio').is(':checked')){
			$('#location-name-select').prop('disabled', false);
			
			$('#select-area-south').prop('disabled', true);
			$('#select-area-west').prop('disabled', true);
			$('#select-area-east').prop('disabled', true);
			$('#select-area-north').prop('disabled', true);
			$('#clear-select-area-input').prop('disabled', true);
		}
	})
});
$(function() {
	$("#area-selection-radio").change(function() {
		if($('#area-selection-radio').is(':checked')){
			$('#location-name-select').prop('disabled', true);
			
			$('#select-area-south').prop('disabled', false);
			$('#select-area-west').prop('disabled', false);
			$('#select-area-east').prop('disabled', false);
			$('#select-area-north').prop('disabled', false);
			$('#clear-select-area-input').prop('disabled', false);
		}
	})
});

//************************  Area Input clear button  *****************************
$(function() {
	$("#clear-select-area-input").click(function() {
		$('#select-area-south').prop('value', '');
		$('#select-area-west').prop('value', '');
		$('#select-area-east').prop('value', '');
		$('#select-area-north').prop('value', '');
	})
});


//************************  Date clear buttons  *****************************
$(function() {
	$("#clear-start-date-input").click(function() {
		if($("input#start-date").val() != ""){
			$("input#start-date").prop('value', '');
			$('#clear-start-date-input').prop('disabled', true);
		}
	})
});
$(function() {
	$("#clear-end-date-input").click(function() {
		if($("input#end-date").val() != ""){
			$("input#end-date").prop('value', '');
			$('#clear-end-date-input').prop('disabled', true);
		}
	})
});
$(function() {
	$("#start-date").change(function() {
		if($("input#start-date").val() != ""){
			$('#clear-start-date-input').prop('disabled', false);
		}
		else if($("input#start-date").val() == ""){
			$('#clear-start-date-input').prop('disabled', true);
		}
	})
});
$(function() {
	$("#end-date").change(function() {
		if($("input#end-date").val() != ""){
			$('#clear-end-date-input').prop('disabled', false);
		}
		else if($("input#end-date").val() == ""){
			$('#clear-end-date-input').prop('disabled', true);
		}
	})
});


















