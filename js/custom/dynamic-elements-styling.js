$(document).ready(function() {
	var height = $(window).height() - 290;
	$("#facets-sliders").height(height);
});

$(window).resize(function() {
	var height = $(window).height() - 290;
	$("#facets-sliders").height(height);
}); 