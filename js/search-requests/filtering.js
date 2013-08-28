var datasetSource = "";
var commentType = "";
var processStepsMaxNum = 0;
var standardName = "";
var scopeLevel = "";
var averageRatingMin = 0;
var feedbackNumberMin = 0;
var averageReviewRatingMin = 0;
var reviewsNumberMin = 0;
var citationsNumberMin = 0;

var filterScale = 0.02;
var filterTransformX = 3;
var filterTransformY = 3;

$(function() {
  $("#filter-producer-btn").click(function() {
	datasetSource = $("#dataset-source-autocomplete").val();
	if(!datasetSource == ""){
		// Iterate through all GEO labels
		var count = $("#results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var producerName = $("#producer_profile_" + i).attr("producer_profile_name");
			if(datasetSource.toLowerCase().indexOf(producerName.toLowerCase()) != -1){
				var currentSize = $("#size_group_" + i).attr("size_scale");
				var currentX = $("#size_group_" + i).attr("translate_x");
				var currentY = $("#size_group_" + i).attr("translate_y");
				
				var newSize = parseFloat(currentSize) + filterScale;
				var newX = parseFloat(currentX) - filterTransformX;
				var newY = parseFloat(currentY) - filterTransformY;
				var newTransform = "translate(" + newX + " " + newY + ") scale(" + newSize + ")";
				
				$("#size_group_" + i).attr("transform", newTransform);
				$("#size_group_" + i).attr("size_scale", newSize);
				$("#size_group_" + i).attr("translate_x", newX);
				$("#size_group_" + i).attr("translate_y", newY);
				
				// solve the moving
				// identify which filtering already been applied
				// possibly disable the filter button unless they reset the filter
				
				// not to forget to add info to each query constraint
			}
		}
		$("#filter-producer-btn").prop('disabled', true);
		$("#reset-producer-btn").prop('disabled', false);
	}
  })
});

$(function() {
  $("#reset-producer-btn").click(function() {
	if(!datasetSource == ""){
		// Iterate through all GEO labels
		var count = $("#results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var producerName = $("#producer_profile_" + i).attr("producer_profile_name");
			if(datasetSource.toLowerCase().indexOf(producerName.toLowerCase()) != -1){
				var currentSize = $("#size_group_" + i).attr("size_scale");
				var currentX = $("#size_group_" + i).attr("translate_x");
				var currentY = $("#size_group_" + i).attr("translate_y");
				
				var newSize = parseFloat(currentSize) - filterScale;
				var newX = parseFloat(currentX) + filterTransformX;
				var newY = parseFloat(currentY) + filterTransformY;
				var newTransform = "translate(" + newX + " " + newY + ") scale(" + newSize + ")";
				
				$("#size_group_" + i).attr("transform", newTransform);
				$("#size_group_" + i).attr("size_scale", newSize);
				$("#size_group_" + i).attr("translate_x", newX);
				$("#size_group_" + i).attr("translate_y", newY);
				
				// solve the moving
				// identify which filtering already been applied
				// possibly disable the filter button unless they reset the filter
				
				// not to forget to add info to each query constraint
			}
		}
		$("#filter-producer-btn").prop('disabled', false);
		$("#reset-producer-btn").prop('disabled', true);
	}
  })
});

$(function() {
  $("#filter-comments-btn").click(function() {
  
  })
});

$(function() {
  $("#filter-comments-btn").click(function() {
  
  })
});

$(function() {
  $("#filter-lineage-btn").click(function() {
  
  })
});

$(function() {
  $("#reset-lineage-btn").click(function() {
  
  })
});

$(function() {
  $("#filter-standards-btn").click(function() {
  
  })
});

$(function() {
  $("#reset-standards-btn").click(function() {
  
  })
});

$(function() {
  $("#filter-quality-btn").click(function() {
  
  })
});

$(function() {
  $("#reset-quality-btn").click(function() {
  
  })
});

$(function() {
  $("#filter-feedback-btn").click(function() {
  
  })
});

$(function() {
  $("#reset-feedback-btn").click(function() {
  
  })
});

$(function() {
  $("#filter-expert-btn").click(function() {
  
  })
});

$(function() {
  $("#reset-expert-btn").click(function() {
  
  })
});

$(function() {
  $("#filter-citations-btn").click(function() {
  
  })
});

$(function() {
  $("#reset-citations-btn").click(function() {
  
  })
});