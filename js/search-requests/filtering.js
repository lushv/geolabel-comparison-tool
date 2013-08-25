$(function() {
  $("#filter-producer-btn").click(function() {
	var datasetSource = $("#dataset-source-autocomplete").val();
	if(!datasetSource == ""){
		// Iterate through all GEO labels
		var count = $("#results_svg").children().length;
		for (var i = 0; i < count; i++) {
			var producerName = $("#producer_profile_" + i).attr("producer_profile_name");
			if(datasetSource.toLowerCase().indexOf(producerName.toLowerCase()) != -1){
				var currentSize = $("#size_group_" + i).attr("size_scale");
				
				var newSize = parseFloat(currentSize) + 0.02;
				var newTransform = $("#size_group_" + i).attr("transform");
				newTransform = newTransform.replace("scale(" + currentSize + ")", "scale(" + newSize + ")");
				
				$("#size_group_" + i).attr("transform", newTransform);
				$("#size_group_" + i).attr("size_scale", newSize);
				
				// solve the moving
				// identify which filtering already been applied
				// possibly disable the filter button unless they reset the filter
				
				// not to forget to add info to each query constraint
			}
		}
	}
  })
});

$(function() {
  $("#reset-producer-btn").click(function() {
  
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