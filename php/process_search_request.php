<?php
// Include GEO label classes
require_once("geolabel_classes/XMLProcessor.php");

// --------------------- Get data from POST varaible ---------------------------
$keyword = $_POST['keyword'];
$startDate = $_POST['startDate'];
$endDate = $_POST['endDate'];
$accessConstraints = $_POST['accessConstraints'];
$useConstraints = $_POST['useConstraints'];
// variables to store geographic coordinates
$north = "";
$south = "";
$west = "";
$east = "";

if(isset($_POST['countryCode'])){
	$countryCode = $_POST['countryCode'];
	
	// If county was set to any then all the geo coordinates will be empty
	if(!empty($countryCode)){
		// Load XML file with countries details
		$xml = new DOMDocument();
		$xml->load('data/countryInfo.xml');
		
		$northXPath = '//country[countryCode=\''.$countryCode.'\']/north';
		$southXPath = '//country[countryCode=\''.$countryCode.'\']/south';
		$westXPath = '//country[countryCode=\''.$countryCode.'\']/west';
		$eastXPath = '//country[countryCode=\''.$countryCode.'\']/east';
		
		$north = getXMLNode($xml, $northXPath);
		$south = getXMLNode($xml, $southXPath);
		$west = getXMLNode($xml, $westXPath);
		$east = getXMLNode($xml, $eastXPath);
	}
}
else{
	if(isset($_POST['latitudeNorth'])){
		$north = $_POST['latitudeNorth'];
	}
	if(isset($_POST['latitudeSouth'])){
		$south = $_POST['latitudeSouth'];
	}
	if(isset($_POST['longitudeWest'])){
		$west = $_POST['longitudeWest'];
	}
	if(isset($_POST['longitudeEast'])){
		$east = $_POST['longitudeEast'];
	}
}

// --------------------- Make a query to database ---------------------------
$hostname = "localhost"; 
$user = "comparison_user";
$password = "manhattan";
$database = "geolabel_comparison_tool_db";

$db = new mysqli($hostname, $user, $password, $database);
if($db->connect_errno > 0){
    die('Unable to connect to database [' . $db->connect_error . ']');
}

// SQL query
$sql = "SELECT dataset_id FROM query_constraints 
		WHERE keywords LIKE '%$keyword%'  
		AND access_constraints LIKE '%$accessConstraints%'
		AND use_constraints LIKE '%$useConstraints%'";	
// Add dates to query if not empty
if(!empty($startDate)){
	$sql .= " AND start_date <= DATE('$startDate')";
}
if(!empty($endDate)){
	$sql .= " AND end_date >= DATE('$endDate')";
}
// Add geographic coordinates to query if not empty
if(!empty($north)){
	$sql .= " AND latitude_north >= $north";
}
if(!empty($south)){
	$sql .= " AND latitude_south <= $south";
}
if(!empty($west)){
	$sql .= " AND longitude_west <= $west";
}
if(!empty($east)){
	$sql .= " AND longitude_east >= $east";
}
// Make a query to database
if(!$result = $db->query($sql)){
    die('There was an error running the query [' . $db->error . ']');
}

// --------------------- Process SQL query result ---------------------------
$rowCount = $result->num_rows;
$commaCount = 1;
$jsonResponceString = '{"dataset": [';

while($row = $result->fetch_assoc()){
	// Get location of the metadata XML file
	$metadataURL = 'metadata_records/' . $row['dataset_id'] . '.xml';
	// Load metadata XML file
	$metadataXML = new DOMDocument();
	$metadataXML->load($metadataURL);
	
	$xmlProcessor = new xmlProcessor();
	$json = $xmlProcessor->getJsonDatasetSummary($metadataXML, null);
	
	if(!empty($json)){
		$jsonResponceString .=  $json;
		if($rowCount > $commaCount){
			// If not the last row in the query result, then add a comma after the returned JSON object
			$jsonResponceString .=  ', ';
		}
		$commaCount ++;
	}
}
$jsonResponceString .= ' ]}';

echo $jsonResponceString;



function getXMLNode($xml, $nodeXPath){
	$xpath = new DOMXpath($xml);
	$result = array();
	$nodes = $xpath->query($nodeXPath);
	$nodeValue = "";
	if ($nodes->length > 0) {
		foreach ($nodes as $node){
			$nodeValue = $node->nodeValue;
		}
	}
	return $nodeValue;
}

/*
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
*/
?>