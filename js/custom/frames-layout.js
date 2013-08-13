var myLayout;

$(document).ready(function () {				
	// this layout could be created with NO OPTIONS - but showing some here just as a sample...
	// myLayout = $('body').layout(); -- syntax with No Options
	myLayout = $('div.container').layout({

	//	reference only - these options are NOT required because 'true' is the default
		closable:					true	// pane can open & close
	,	resizable:					true	// when open, pane can be resized 
	,	slidable:					true	// when closed, pane can 'slide' open over other panes - closes on mouse-out
	,	livePaneResizing:			true
	//	enable state management - saves the size of the pane if resized
	,	stateManagement__enabled:	false // automatic cookie load & save enabled by default
	,	showDebugMessages:			true // log and/or display messages from debugging & testing code

	
	,	center__paneSelector:	".outer-center"
	,	east__paneSelector:		".outer-east"
	
		// INNER-LAYOUT (child of middle-center-pane)
	,	center__childOptions: {
			center__paneSelector:	".inner-center"
		,	south__paneSelector:	".inner-south"
		,	south__size:			.2
		,	south__maxSize:			.75
		,	south__minSize:			.10
		,	spacing_open:			10  // ALL panes
		,	spacing_closed:			10  // ALL panes
		,	south__spacing_closed:	12
		}
		
		
		// OUTER-LAYOUT spacing options (size of the resize bars)
	,	spacing_open:			10  // ALL panes
	,	spacing_closed:			12  // ALL panes
	
	//	some pane-size settings
	,	east__size:					410
	,	east__minSize:				.1
	,	east__maxSize:				.75 // 50% of layout width
	});		
});