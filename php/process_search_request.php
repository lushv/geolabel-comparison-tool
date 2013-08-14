<?php
$keyword = $_POST['keyword'];
$locationName= $_POST['locationName'];
$startDate= $_POST['startDate'];
$endDate= $_POST['endDate'];
$accessConstraints= $_POST['accessConstraints'];
$useConstraints= $_POST['useConstraints'];



echo '{
    "dataset": [
			{"datasetIdentifier":"5262159C-D358-11D5-88C8-000102DCCF41",
			"facets":
				{"producerProfile":{"availability":1,"organisationName":"Beh\u00f6rde f\u00fcr Wirtschaft, Verkehr und Innovation, Amt f\u00fcr Verkehr und Stra\u00dfenwesen"},
				"produerComments":{"availability":0,"supplementalInformation":null,"supplementalInformationType":""},
				"lineage":{"availability":1,"processStepCount":0},
				"standardsComplaince":{"availability":1,"standardName":"ISO 19115","standardVersion":"1.0"},
				"qualityInformation":{"availability":1,"scopeLevel":"dataset"},
				"userFeedback":{"availability":1,"feedbacksCount":7,"ratingsCount":7,"feedbacksAverageRating":3.2857142857143},
				"expertReview":{"availability":1,"expertReviewsCount":5,"expertRatingsCount":5,"expertAverageRating":2.6},
				"citations":{"availability":0,"citationsCount":0}}
			}
	]
	}';

/*
http://codular.com/php-mysqli

$hostname = "localhost"; 
$user = "comparison_user";
$password = "manhattan";
$database = "geolabel_comparison_tool_db"

$db = new mysqli($hostname, $user, $password, $database);
if($db->connect_errno > 0){
    die('Unable to connect to database [' . $db->connect_error . ']');
}

$sql = <<<SQL
    SELECT *
    FROM `users`
    WHERE `live` = 1 
SQL;

if(!$result = $db->query($sql)){
    die('There was an error running the query [' . $db->error . ']');
}


*/
?>