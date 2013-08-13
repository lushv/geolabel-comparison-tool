/*!
 * List of location for autocomplete
 *
 */
$(function() {
	var availableStandards = [
	"ISO", "ISO 19115", "FGDC", "Dublin Core"];
	$( "#standard-name-autocomplete" ).autocomplete({
	source: availableStandards
	});
});