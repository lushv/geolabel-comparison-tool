<?php
// --------------------- Get data from POST varaible ---------------------------
$datasetID = $_POST['datasetID'];

// XPath expressions for dataset IDs:
$fileIdentifierXPath = '//*[local-name()=\'fileIdentifier\']/*[local-name()=\'CharacterString\']';
$title = '//*[local-name()=\'title\']/*[local-name()=\'CharacterString\']';
$abstract = '//*[local-name()=\'abstract\']/*[local-name()=\'CharacterString\']';
$date = '//*[local-name()=\'CI_Date\']/*[local-name()=\'date\']/*[local-name()=\'Date\']';
$keywords = '//*[local-name()=\'descriptiveKeywords\']/*[local-name()=\'MD_Keywords\']/*[local-name()=\'keyword\']/*[local-name()=\'CharacterString\']';
$producerProfileXpath = 
						'//*[local-name()=\'contact\']/*[local-name()=\'CI_ResponsibleParty\'] | 
						//*[local-name()=\'ptcontac\']/*[local-name()=\'cntinfo\'] | 
						//*[local-name()=\'pointOfContact\']/*[local-name()=\'CI_ResponsibleParty\']';


// Get location of the metadata XML file
$metadataURL = 'metadata_records/' . $datasetID . '.xml';
// Load metadata XML file
$metadataXML = new DOMDocument();
$metadataXML->load($metadataURL);
$jsonResponceString = '{"dataset": ';

$summaryArray = getDatasetSummary($metadataXML, $fileIdentifierXPath, $title, $abstract, $date, $keywords, $producerProfileXpath);

$json = json_encode($summaryArray);
if(!empty($json)){
	$jsonResponceString .=  $json;
}
$jsonResponceString .= ' }';
echo $jsonResponceString;



/* Function getSummary
 * Generates an array populated with summary of the information available for a given dataset
 * 
 * @param $xml DomDocument an XML document to process
 * @return array an array populated with hover-over text for each GEO label facet,
 * or null if $xml is empty
 */
function getDatasetSummary($xml, $fileIdentifierXPath, $title, $abstract, $date, $keywords, $producerProfileXpath){
	if(empty($xml)){
		return null;
	}
	$summaryArray = array(  
						'fileIdentifier' => getFirstNode($xml, $fileIdentifierXPath),
						'title' => getFirstNode($xml, $title),
						'abstract' => getFirstNode($xml, $abstract),
						'date' => getFirstNode($xml, $date),
						'keywords' => getFirstNode($xml, $keywords),
						'producer' => getFirstNode($xml, $producerProfileXpath)
						);
							
	return $summaryArray;
}

/* Function getXMLFileIdentifier
 * Returns file identifier stored in the <fileIdentifier> tag of a given XML document
 * 
 * @param $xml DomDocument an XML document to process
 * @return String file identifier of a given XML document
 */
function getXMLFileIdentifier($xml){
	$id = null;
	if(empty($xml)){
		return $id;
	}
	$xpath = new DOMXpath($xml);
	$nodes = $xpath->query(fileIdentifierXPath);
	if ($nodes->length > 0){		
		if(preg_replace('/\s+/', '', $nodes->item(0)->nodeValue) != ""){
			$id = $nodes->item(0)->nodeValue;
		}
	}
	return trim($id);
}

/* Function getFirstNode
 * Locates and returns specified first node in an XML document.
 *
 * @param DOMDocument $xml XML document to iterate through
 * @param String $path String XPath expression that specifies the nodes to locate
 * @return String text of of first located non-empty node.
 */
function getFirstNode($xml, $path){
	$firstNode = null;
	if(empty($xml)){
		return $firstNode;
	}
	$xpath = new DOMXpath($xml);
	$nodes = $xpath->query($path);
	if ($nodes->length > 0) {
		foreach ($nodes as $node){
			// Check if node is not empty
			if(preg_replace('/\s+/', '', $node->nodeValue) != ""){
				$firstNode = $node->nodeValue;
				return trim($firstNode);
				break;
			}
		}
	}
	return $firstNode;
}
?>