/*!
 * List of available data sources for autocomplete
 *
 */
$(function() {
	var availableSources = [
	"NASA", "ESA"];
	$( "#dataset-source-autocomplete" ).autocomplete({
	source: availableSources
	});
});