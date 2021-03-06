<?php
/**
* XMLProcessor class provides functionality for processing producer, feedback or aggregated XML documents.
* This class stores all the GEO label related XPath expressions.
*
* PHP version 5
*
* @author		Original Author Victoria Lush
* @version		1.0
*/
class XMLProcessor{
	private $gvqNameSpace = 'xmlns:gvq="http://www.geoviqua.org/QualityInformationModel/3.1"';

	// XPath expressions for dataset IDs:
	private $fileIdentifierXPath = '//*[local-name()=\'fileIdentifier\']/*[local-name()=\'CharacterString\']';

	// XPath expressions for each GEO label informational aspect - availability XPaths:						
	private $producerProfileXpath = 
						'//*[local-name()=\'contact\']/*[local-name()=\'CI_ResponsibleParty\'] | 
						//*[local-name()=\'ptcontac\']/*[local-name()=\'cntinfo\'] | 
						//*[local-name()=\'pointOfContact\']/*[local-name()=\'CI_ResponsibleParty\']';
	private $lineageXPath = 
						'//*[local-name()=\'LI_Lineage\'] | //*[local-name()=\'lineage\']';
	private $producerCommentsXPath = 
						'//*[local-name()=\'identificationInfo\']//*[local-name()=\'supplementalInformation\'] | //*[local-name()=\'dataQualityInfo\']//*[local-name()=\'GVQ_DiscoveredIssue\']/*[local-name()=\'knownProblem\']';
	private $standardsXPath = 
						'//*[local-name()=\'metadataStandardName\'] | //*[local-name()=\'metstdv\']';
	private $qualityXPath = 
						'//*[local-name()=\'dataQualityInfo\']/*[local-name()=\'GVQ_DataQuality\'] |
						//*[local-name()=\'dataQualityInfo\']';
	private $feedbackXPath = 
						'//*[local-name()=\'item\']/*[local-name()=\'user\'][*[local-name()=\'expertiseLevel\'] < 4] | 
						//*[local-name()=\'item\']/*[local-name()=\'user\'][not(*[local-name()=\'expertiseLevel\'][text()])] | 
						//*[local-name()=\'item\'][not(*[local-name()=\'user\'][node()])]';
	private $reviewXPath = 
						'//*[local-name()=\'item\']/*[local-name()=\'user\'][*[local-name()=\'expertiseLevel\'] > 3]';
	private $citationsXPath = 
						'//*[local-name()=\'LI_Lineage\']/*[local-name()=\'processStep\']//*[local-name()=\'sourceCitation\']/*[local-name()=\'CI_Citation\'] | 
						//*[local-name()=\'identificationInfo\']/*[local-name()=\'GVQ_DataIdentification\']/*[local-name()=\'referenceDoc\']/*[local-name()=\'GVQ_Publication\'] | 
						//*[local-name()=\'identificationInfo\']/*[local-name()=\'MD_DataIdentification\']/*[local-name()=\'referenceDoc\']/*[local-name()=\'GVQ_Publication\'] | 
						//*[local-name()=\'dataQualityInfo\']/*[local-name()=\'GVQ_DataQuality\']/*[local-name()=\'report\']//*[local-name()=\'referenceDoc\']/*[local-name()=\'GVQ_Publication\'] | 
						//*[local-name()=\'discoveredIssue\']/*[local-name()=\'GVQ_DiscoveredIssue\']//*[local-name()=\'referenceDoc\']/*[local-name()=\'GVQ_Publication\'] | 
						//*[local-name()=\'item\']/*[local-name()=\'citation\'] | 
						//*[local-name()=\'item\']/*[local-name()=\'usage\']//*[local-name()=\'referenceDoc\']/*[local-name()=\'GVQ_Publication\']';
	
	// Xpath expressions for each GEO label informational facet - hover-over XPaths:
	// Producer Profile:
	private $organisationNameXPath = 
						'//*[local-name()=\'contact\']/*[local-name()=\'CI_ResponsibleParty\']/*[local-name()=\'organisationName\'] | 
						//*[local-name()=\'ptcontac\']/*[local-name()=\'cntinfo\']//*[local-name()=\'cntorg\'] | 
						//*[local-name()=\'pointOfContact\']/*[local-name()=\'CI_ResponsibleParty\']/*[local-name()=\'organisationName\']';
	// Lineage Information:
	private $processStepCountXPath = 
						'//*[local-name()=\'LI_Lineage\']//*[local-name()=\'processStep\'] | //*[local-name()=\'lineage\']//*[local-name()=\'processStep\']';
	// Producer Comments:
	private $supplementalInformationXPath = 
						'//*[local-name()=\'identificationInfo\']//*[local-name()=\'supplementalInformation\']';
	private $knownProblemsXPath = 
						'//*[local-name()=\'dataQualityInfo\']//*[local-name()=\'GVQ_DiscoveredIssue\']/*[local-name()=\'knownProblem\']';
						
	// Standards Complaince:
	private $standardNameXPath = 
						'//*[local-name()=\'metadataStandardName\'] | //*[local-name()=\'metstdv\']';
	private $standardVersionXPath = 
						'//*[local-name()=\'metadataStandardVersion\']';
	// Quality Information:
	private $scopeLevelXPath  = 
						'//*[local-name()=\'dataQualityInfo\']/*[local-name()=\'GVQ_DataQuality\']/*[local-name()=\'scope\']
						//*[local-name()=\'MD_ScopeCode\']/@codeListValue | 
						//*[local-name()=\'dataQualityInfo\']//*[local-name()=\'scope\']
						//*[local-name()=\'MD_ScopeCode\']/@codeListValue';
	// User Feedback:
	private $feedbacksCountXPath = 
						'//*[local-name()=\'item\']/*[local-name()=\'user\'][*[local-name()=\'expertiseLevel\'] < 4] | 
						//*[local-name()=\'item\']/*[local-name()=\'user\'][not(*[local-name()=\'expertiseLevel\'][text()])] | 
						//*[local-name()=\'item\'][not(*[local-name()=\'user\'][node()])]';
	private $ratingsCountXPath = 
						'//*[local-name()=\'item\']/*[local-name()=\'user\'][*[local-name()=\'expertiseLevel\'] < 4]/../*[local-name()=\'rating\']/*[local-name()=\'score\'] | 
						//*[local-name()=\'item\']/*[local-name()=\'user\'][not(*[local-name()=\'expertiseLevel\'][text()])]/../*[local-name()=\'rating\']/*[local-name()=\'score\'] | 
						//*[local-name()=\'item\'][not(*[local-name()=\'user\'][node()])]/*[local-name()=\'rating\']/*[local-name()=\'score\']';
	// Expert Review:
	private $expertReviewsCountXPath = 
						'//*[local-name()=\'item\']/*[local-name()=\'user\'][*[local-name()=\'expertiseLevel\'] > 3]';
	private $expertRatingsCountXPath = 
						'//*[local-name()=\'item\']/*[local-name()=\'user\'][*[local-name()=\'expertiseLevel\'] > 3] /../*[local-name()=\'rating\']/*[local-name()=\'score\']';
	// Citations Information:
	private $citationsCountXPath = 
						'//*[local-name()=\'LI_Lineage\']/*[local-name()=\'processStep\']//*[local-name()=\'sourceCitation\']/*[local-name()=\'CI_Citation\'] | 
						//*[local-name()=\'identificationInfo\']/*[local-name()=\'GVQ_DataIdentification\']/*[local-name()=\'referenceDoc\']/*[local-name()=\'GVQ_Publication\'] | 
						//*[local-name()=\'identificationInfo\']/*[local-name()=\'MD_DataIdentification\']/*[local-name()=\'referenceDoc\']/*[local-name()=\'GVQ_Publication\'] | 
						//*[local-name()=\'dataQualityInfo\']/*[local-name()=\'GVQ_DataQuality\']/*[local-name()=\'report\']//*[local-name()=\'referenceDoc\']/*[local-name()=\'GVQ_Publication\'] | 
						//*[local-name()=\'discoveredIssue\']/*[local-name()=\'GVQ_DiscoveredIssue\']//*[local-name()=\'referenceDoc\']/*[local-name()=\'GVQ_Publication\'] | 
						//*[local-name()=\'item\']/*[local-name()=\'citation\'] | 
						//*[local-name()=\'item\']/*[local-name()=\'usage\']//*[local-name()=\'referenceDoc\']/*[local-name()=\'GVQ_Publication\']';
	
	// Drilldown URLs for each GEO label facet
	private $baseDrilldownURL = "";
	
	/* Constructor
	*/
	public function __construct(){

	}

	/* Function getAvailabilityEncodings
	 * Generates an array populated with GEO label facets' availability encodings
	 * 
	 * @param $xml DomDocument an XML document to process
	 * @return array of integers where key is a GEO label facet name and value is integer availability encoding,
	 * or null if $xml is empty
	 */
	public function getAvailabilityEncodings($xml){
		if(empty($xml)){
			return null;
		}
		$availabilityArray = array(
								'producerProfile' => $this->getAvailabilityInteger($xml, $this->producerProfileXpath),
								'lineage' => $this->getAvailabilityInteger($xml, $this->lineageXPath),
								'produerComments' => $this->getAvailabilityInteger($xml, $this->producerCommentsXPath),
								'standardsComplaince' => $this->getAvailabilityInteger($xml, $this->standardsXPath),
								'qualityInformation' => $this->getAvailabilityInteger($xml, $this->qualityXPath),
								'userFeedback' => $this->getAvailabilityInteger($xml, $this->feedbackXPath),
								'expertReview' => $this->getAvailabilityInteger($xml, $this->reviewXPath),
								'citations' => $this->getAvailabilityInteger($xml, $this->citationsXPath),
								);
								
		return $availabilityArray;
	}
	
	/* Function getHoveroverText
	 * Generates an array populated with hover-over text for each GEO label facet
	 * 
	 * @param $xml DomDocument an XML document to process
	 * @return array an array populated with hover-over text for each GEO label facet,
	 * or null if $xml is empty
	 */
	public function getHoveroverText($xml){
		if(empty($xml)){
			return null;
		}
		$producerProfileText = 'Producer Profile';
		$lineageText = 'Lineage Information';
		$produerCommentsText = 'Producer Comments';
		$standardsComplainceText = 'Standards Compliance';
		$qualityInformationText = 'Quality Information';
		$userFeedbackText = 'User Feedback';
		$expertReviewText = 'Expert Review';
		$citationsText = 'Citations Information';
		
		$organisationName =$this->getFirstNode($xml, $this->organisationNameXPath);
		if(!empty($organisationName)){
			$producerProfileText .= '. Organisation name: '.$organisationName.'.';
		}
		$lineageAvailability = $this->getAvailabilityInteger($xml, $this->lineageXPath);
		$processStepCount = $this->countElements($xml, $this->processStepCountXPath);
		if(!empty($lineageAvailability)){
			$lineageText .= '. Number of process steps: '.$processStepCount.'.';
		}
		$supplementalInformation = $this->getFirstNode($xml, $this->supplementalInformationXPath);
		if(!empty($supplementalInformation)){
			if(strlen($supplementalInformation) > 350){
				$supplementalInformation = substr($supplementalInformation, 0, 350).'...';
			}
			$produerCommentsText .= ': '.$supplementalInformation;
		}		
		$standardName = $this->getFirstNode($xml, $this->standardNameXPath);
		$standardVersion = $this->getFirstNode($xml, $this->standardVersionXPath);
		if(!empty($standardName)){
			$standardsComplainceText .= ". Standard name: $standardName";
			if(!empty($standardVersion)){
				$standardsComplainceText .= ", version $standardVersion.";
			}
			else{
				$standardsComplainceText .= ".";
			}
		}
		$qualityAvailability = $this->getAvailabilityInteger($xml, $this->qualityXPath);
		$scopeLevel = $this->getFirstNode($xml, $this->scopeLevelXPath);
		if(!empty($scopeLevel) && !empty($qualityAvailability)){
			$qualityInformationText .= ". Available at a $scopeLevel level.";
		}
		$feedbacksCount = $this->countElements($xml, $this->feedbacksCountXPath);
		if(!empty($feedbacksCount)){
			$ratingsCount = $this->countElements($xml, $this->ratingsCountXPath);
			$feedbacksAverageRating = $this->getAverageRating($xml, $this->ratingsCountXPath);
			$feedbacksAverageRating = round($feedbacksAverageRating, 2);
			$userFeedbackText .= ". Number of feedbacks $feedbacksCount. Average rating: $feedbacksAverageRating ($ratingsCount ratings).";
		}
		$expertReviewsCount = $this->countElements($xml, $this->expertReviewsCountXPath);
		if(!empty($expertReviewsCount)){
			$expertRatingsCount = $this->countElements($xml, $this->expertRatingsCountXPath);
			$expertAverageRating = $this->getAverageRating($xml, $this->expertRatingsCountXPath);
			$expertAverageRating = round($expertAverageRating, 2);
			$expertReviewText .= ". Number of reviews: $expertReviewsCount. Average rating: $expertAverageRating ($expertRatingsCount ratings).";
		}
		$citationsCount = $this->countElements($xml, $this->citationsCountXPath);
		if(!empty($citationsCount)){
			$citationsText .= ". Number of citations: $citationsCount.";
		}
					
		$hoveroverArray = array(
								'producerProfile' => $producerProfileText,
								'lineage' => $lineageText,
								'produerComments' => $produerCommentsText,
								'standardsComplaince' => $standardsComplainceText,
								'qualityInformation' => $qualityInformationText,
								'userFeedback' => $userFeedbackText,
								'expertReview' => $expertReviewText,
								'citations' => $citationsText,
								);
								
		return $hoveroverArray;
	}
	
	/* Function getLmlHoveroverText
	 * Generates an array populated with hover-over text for each GEO label facet
	 * 
	 * @param $xml DomDocument an XML document to process
	 * @return array an array populated with hover-over text for each GEO label facet,
	 * or null if $xml is empty
	 */
	public function getLmlHoveroverText($xml){
		if(empty($xml)){
			return null;
		}
		$hoveroverArray = array(
								'organisationName' => $this->getFirstNode($xml, $this->organisationNameXPath),
								'processStepCount' => $this->countElements($xml, $this->processStepCountXPath),
								'supplementalInformation' => $this->getFirstNode($xml, $this->supplementalInformationXPath),
								'standardName' => $this->getFirstNode($xml, $this->standardNameXPath),
								'standardVersion' => $this->getFirstNode($xml, $this->standardVersionXPath),
								'scopeLevel' => $this->getFirstNode($xml, $this->scopeLevelXPath),
								'feedbacksCount' => $this->countElements($xml, $this->feedbacksCountXPath),
								'ratingsCount' => $this->countElements($xml, $this->ratingsCountXPath),
								'feedbacksAverageRating' => $this->getAverageRating($xml, $this->ratingsCountXPath),
								'expertReviewsCount' => $this->countElements($xml, $this->expertReviewsCountXPath),
								'expertRatingsCount' => $this->countElements($xml, $this->expertRatingsCountXPath),
								'expertAverageRating' => $this->getAverageRating($xml, $this->expertRatingsCountXPath),
								'citationsCount' => $this->countElements($xml, $this->citationsCountXPath),
								);
								
		return $hoveroverArray;
	}
	
	/* Function getSummary
	 * Generates an array populated with summary of the information available for a given dataset
	 * 
	 * @param $xml DomDocument an XML document to process
	 * @return array an array populated with hover-over text for each GEO label facet,
	 * or null if $xml is empty
	 */
	public function getDatasetSummary($xml, $parentXML){
		if(empty($xml)){
			return null;
		}
		
		// Get producer information
		$producerAvailability = $this->getAvailabilityInteger($xml, $this->producerProfileXpath);
		$organisationName = $this->getFirstNode($xml, $this->organisationNameXPath);
		if($producerAvailability == 0){
			$parentAvailability = $this->getAvailabilityInteger($parentXML, $this->producerProfileXpath);
			
			if($parentAvailability == 1){
				$producerAvailability = 2;
				$organisationName = $this->getFirstNode($parentXML, $this->organisationNameXPath);
			}
		}
		
		// Get comments information
		$commentsAvailability = $this->getAvailabilityInteger($xml, $this->producerCommentsXPath);
		$supplementalInformation = $this->getFirstNode($xml, $this->supplementalInformationXPath);
		$knownProblems = $this->getFirstNode($xml, $this->knownProblemsXPath);
		if($commentsAvailability == 0){
			$parentAvailability = $this->getAvailabilityInteger($parentXML, $this->producerCommentsXPath);
			
			if($parentAvailability == 1){
				$commentsAvailability = 2;
				$supplementalInformation = $this->getFirstNode($parentXML, $this->supplementalInformationXPath);
				$knownProblems = $this->getFirstNode($parentXML, $this->knownProblemsXPath);
			}
		}
		
		// Get lineage information
		$lineageAvailability = $this->getAvailabilityInteger($xml, $this->lineageXPath);
		$processStepCount = $this->countElements($xml, $this->processStepCountXPath);
		if($lineageAvailability == 0){
			$parentAvailability = $this->getAvailabilityInteger($parentXML, $this->lineageXPath);
			
			if($parentAvailability == 1){
				$lineageAvailability = 2;
				$processStepCount = $this->countElements($parentXML, $this->processStepCountXPath);
			}
		}
		
		// Get standards information
		$standardsAvailability = $this->getAvailabilityInteger($xml, $this->standardsXPath);
		$standardName = $this->getFirstNode($xml, $this->standardNameXPath);
		$standardVersion = $this->getFirstNode($xml, $this->standardVersionXPath);
		if($standardsAvailability == 0){
			$parentAvailability = $this->getAvailabilityInteger($parentXML, $this->standardsXPath);
			
			if($parentAvailability == 1){
				$standardsAvailability = 2;
				$standardName = $this->getFirstNode($parentXML, $this->standardNameXPath);
				$standardVersion = $this->getFirstNode($parentXML, $this->standardVersionXPath);
			}
		}
		
		// Get quality information
		$qualityAvailability = $this->getAvailabilityInteger($xml, $this->qualityXPath);
		$scopeLevel = $this->getFirstNode($xml, $this->scopeLevelXPath);
		if($qualityAvailability == 0){
			$parentAvailability = $this->getAvailabilityInteger($parentXML, $this->qualityXPath);
			
			if($parentAvailability == 1){
				$qualityAvailability = 2;
				$scopeLevel = $this->getFirstNode($parentXML, $this->scopeLevelXPath);
			}
		}
		// check correct dataset level
		if($qualityAvailability == 0){
			$scopeLevel = null;
		}
		
		// Get feedback information
		$feedbackAvailability = $this->getAvailabilityInteger($xml, $this->feedbackXPath);
		$feedbacksCount = $this->countElements($xml, $this->feedbacksCountXPath);
		$ratingsCount = $this->countElements($xml, $this->ratingsCountXPath);
		$feedbacksAverageRating = $this->getAverageRating($xml, $this->ratingsCountXPath);
		if($feedbackAvailability == 0){
			$parentAvailability =  $this->getAvailabilityInteger($parentXML, $this->feedbackXPath);
			
			if($parentAvailability == 1){
				$feedbackAvailability = 2;
				$feedbacksCount = $this->countElements($parentXML, $this->feedbacksCountXPath);
				$ratingsCount = $this->countElements($parentXML, $this->ratingsCountXPath);
				$feedbacksAverageRating = $this->getAverageRating($parentXML, $this->ratingsCountXPath);
			}
		}

		// Get review information
		$reviewAvailability = $this->getAvailabilityInteger($xml, $this->reviewXPath);
		$expertReviewsCount = $this->countElements($xml, $this->expertReviewsCountXPath);
		$expertRatingsCount = $this->countElements($xml, $this->expertRatingsCountXPath);
		$expertAverageRating = $this->getAverageRating($xml, $this->expertRatingsCountXPath);
		if($reviewAvailability == 0){
			$parentAvailability =  $this->getAvailabilityInteger($parentXML, $this->reviewXPath);
			
			if($parentAvailability == 1){
				$reviewAvailability = 2;
				$expertReviewsCount = $this->countElements($parentXML, $this->expertReviewsCountXPath);
				$expertRatingsCount = $this->countElements($parentXML, $this->expertRatingsCountXPath);
				$expertAverageRating = $this->getAverageRating($parentXML, $this->expertRatingsCountXPath);
			}
		}
		
		// Get citations information
		$citationsAvailability = $this->getAvailabilityInteger($xml, $this->citationsXPath);
		$citationsCount = $this->countElements($xml, $this->citationsCountXPath);
		if($citationsAvailability == 0){
			$parentAvailability = $this->getAvailabilityInteger($parentXML, $this->citationsXPath);
			
			if($parentAvailability == 1){
				$citationsAvailability = 2;
				$citationsCount = $this->countElements($parentXML, $this->citationsCountXPath);
			}
		}
		
		$summaryArray = array(  
								'producerProfile' => array(
									'availability' => $producerAvailability,
									'organisationName' => $organisationName,
								),
								'produerComments' => array(
									'availability' => $commentsAvailability,
									'supplementalInformation' => $supplementalInformation,
									'knownProblems' => $knownProblems,
								),
								'lineage' => array(
									'availability' => $lineageAvailability,
									'processStepCount' => $processStepCount,
								),
								'standardsComplaince' => array(
									'availability' => $standardsAvailability,
									'standardName' => $standardName,
									'standardVersion' => $standardVersion,
								),
								'qualityInformation' => array(
									'availability' => $qualityAvailability,
									'scopeLevel' => $scopeLevel,
								),
								'userFeedback' => array(
									'availability' => $feedbackAvailability,
									'feedbacksCount' => $feedbacksCount,
									'ratingsCount' => $ratingsCount,
									'feedbacksAverageRating' => $feedbacksAverageRating,
								),
								'expertReview' => array(
									'availability' => $reviewAvailability,
									'expertReviewsCount' => $expertReviewsCount,
									'expertRatingsCount' => $expertRatingsCount,
									'expertAverageRating' => $expertAverageRating,
								),
								'citations' => array(
									'availability' => $citationsAvailability,
									'citationsCount' => $citationsCount,
								)
							);
								
		return $summaryArray;
	}

	/* Function getStaticURLs
	 * Generates an array populated with drilldown URLs for each GEO label facet
	 * 
	 * @param $producerURL String producer URL
	 * @param $feedbackURL String feedback URL
	 * @return array an array populated with drilldown URLs for each GEO label facet,
	 * or null if $xml is empty
	 */
	public function getStaticURLs($producerURL, $feedbackURL){
		$staticURLsArray = array(
								'producerProfile' => $producerURL,
								'lineage' => $producerURL,
								'produerComments' => $producerURL,
								'standardsComplaince' => $producerURL,
								'qualityInformation' => $producerURL,
								'userFeedback' => $feedbackURL,
								'expertReview' => $feedbackURL,
								'citations' => $producerURL,
								);
								
		return $staticURLsArray;
	}
	
	/* Function getDrilldownURLs
	 * Generates an array populated with drilldown URLs for each GEO label facet
	 * 
	 * @param $producerURL String producer URL
	 * @param $feedbackURL String feedback URL
	 * @return array an array populated with drilldown URLs for each GEO label facet,
	 * or null if $xml is empty
	 */
	public function getDrilldownURLs($producerURL, $feedbackURL){
		$producerURL = urlencode($producerURL);
		$feedbackURL = urlencode($feedbackURL);
		$baseURL = 'http://uncertgeo.aston.ac.uk/geolabel/stylesheets/facet.php?';
		$stylesheetBaseURL = 'http://uncertgeo.aston.ac.uk/geolabel/stylesheets/';
		
		$producerProfileURL = $baseURL . 'doc=' . $producerURL . '&xsl='.  $stylesheetBaseURL. 'GVQ_ProducerProfile.xsl';
		$lineageURL = $baseURL . 'doc=' . $producerURL . '&xsl='.  $stylesheetBaseURL. 'GVQ_Lineage.xsl';
		$produerCommentsURL = $baseURL . 'doc=' . $producerURL . '&xsl='.  $stylesheetBaseURL. 'GVQ_ProducerComments.xsl';
		$standardsComplainceURL = $baseURL . 'doc=' . $producerURL . '&xsl='.  $stylesheetBaseURL. 'GVQ_StandardsCompliance.xsl';
		$qualityInformationURL = $baseURL . 'doc=' . $producerURL . '&xsl='.  $stylesheetBaseURL. 'GVQ_Quality.xsl';
		if(!empty($feedbackURL)){
			$userFeedbackURL = $baseURL . 'doc=' . $feedbackURL . '&xsl='.  $stylesheetBaseURL. 'GVQ_UserFeedback.xsl';
			$expertReviewURL = $baseURL . 'doc=' . $feedbackURL . '&xsl='.  $stylesheetBaseURL. 'GVQ_ExpertReviews.xsl';
		}
		else{
			$userFeedbackURL = $baseURL . 'doc=' . $producerURL . '&xsl='.  $stylesheetBaseURL. 'GVQ_UserFeedback.xsl';
			$expertReviewURL = $baseURL . 'doc=' . $producerURL . '&xsl='.  $stylesheetBaseURL. 'GVQ_ExpertReviews.xsl';		
		}
		$citationsURL = $baseURL . 'doc=' . $producerURL . '&xsl='.  $stylesheetBaseURL. 'GVQ_Citations.xsl';
		
		$drilldownURLsArray = array(
								'producerProfile' => $producerProfileURL,
								'lineage' => $lineageURL,
								'produerComments' => $produerCommentsURL,
								'standardsComplaince' => $standardsComplainceURL,
								'qualityInformation' => $qualityInformationURL,
								'userFeedback' => $userFeedbackURL,
								'expertReview' => $expertReviewURL,
								'citations' => $citationsURL,
								);
								
		return $drilldownURLsArray;
	}

	/* Function getJsonAvailabilityEncodings
	 * Returns availability encoding for all 8 facets
	 * 
	 * @param $producerXML DomDocument  producer document
	 * @param $feedbackXML DomDocument feedback document
	 * @return String JSON representation of the GEO label facets
	 */
	public function getJsonAvailabilityEncodings($producerXML, $feedbackXML){
		// Join two documents
		$gvqXML = null;
		if(!empty($producerXML) && !empty($feedbackXML)){
			$gvqXML = $this->joinXMLDoms($producerXML, $feedbackXML);
		}
		elseif(!empty($producerXML)){
			$gvqXML = $producerXML;
		}
		elseif(!empty($feedbackXML)){
			$gvqXML = $feedbackXML;
		}		
		// Get availability data from the XML document into an array
		$availabilityArray = $this->getAvailabilityEncodings($gvqXML);
		$datasetID = $this->getXMLFileIdentifier($gvqXML);
		$json = json_encode(array('datasetIdentifier' => $datasetID, 'facets' => $availabilityArray));
		
		return $json;
	}
	
	/* Function getJsonDatasetSummary
	 * Returns dataset summary for 8 GEO label facets in a JSON format
	 * 
	 * @param $producerXML DomDocument  producer document
	 * @param $feedbackXML DomDocument feedback document
	 * @return String JSON representation of the GEO label facets
	 */
	public function getJsonDatasetSummary($producerXML, $feedbackXML, $parentXML){
		// Join two documents
		$gvqXML = null;
		if(!empty($producerXML) && !empty($feedbackXML)){
			$gvqXML = $this->joinXMLDoms($producerXML, $feedbackXML);
		}
		elseif(!empty($producerXML)){
			$gvqXML = $producerXML;
		}
		elseif(!empty($feedbackXML)){
			$gvqXML = $feedbackXML;
		}
		
		// Get summary of the XML documents
		$datasetID = $this->getXMLFileIdentifier($gvqXML);
		$parentID = $this->getXMLFileIdentifier($parentXML);
		$summaryArray = $this->getDatasetSummary($gvqXML, $parentXML);		

		$json = json_encode(array('datasetIdentifier' => $datasetID, 'parentIdentifier' => $parentID, 'facets' => $summaryArray));
		return $json;
	}
	
	/* Function getAvailabilityInteger
	 * Idenifies whether specified nodes 
	 * 
	 * @param $xml DomDocument an XML document to process
	 * @return integer 1 if found nodes, or 0 if no nodes located
	 */
	public function getAvailabilityInteger($xml, $path){
		$availability = 0;
		if(empty($xml)){
			return $availability;
		}
		$xpath = new DOMXpath($xml);
		$nodes = $xpath->query($path);
		
		if ($nodes->length > 0){
			foreach ($nodes as $node){
				// Check if node is not empty
				if(preg_replace('/\s+/', '', $node->nodeValue) != ""){
					$availability = 1;
					break;
				}
			}
		}
		return $availability;
	}
	
	/* Function countElements
	 * Checks if specified nodes exist and returns the number of nodes discovered.
	 *
	 * @param DOMDocument $xml XML document to iterate through
	 * @param string $path XPath expression of the nodes to locate in the XML document
	 * @return integer number of nodes discovered in the XML document.
	 */
	// Function to go through GEO label facet array and get nodes from the document. Returns array of Producer Comments.
	public function countElements($xml, $path){
		$count = 0;
		if(empty($xml)){
			return $count;
		}
		$xpath = new DOMXpath($xml);
		$result = array();
		$nodes = $xpath->query($path);
		// If found non-empty nodes, then add to the results array
		if ($nodes->length > 0) {
			foreach ($nodes as $node){
				// Check if node is not empty
				if(preg_replace('/\s+/', '', $node->nodeValue) != ""){
					$count++;
				}
			}
		}
		return $count;
	}
	
	/* Function getAverageRating
	 * Calculates average rating.
	 *
	 * @param DOMDocument $xml XML document to iterate through
	 * @param string $path XPath expression of the nodes to locate in the XML document
	 * @return average rating.
	 */
	public function getAverageRating($xml, $path){
		$average = null;
		if(empty($xml)){
			return $average;
		}
		$xpath = new DOMXpath($xml);
		$result = array();
		$nodes = $xpath->query($path);
		if ($nodes->length > 0) {
			$i = 0;
			foreach ($nodes as $node){
				// Check if node is not empty
				if(preg_replace('/\s+/', '', $node->nodeValue) != ""){
					$result[$i] = $node->nodeValue;
					$i++;
				}
			}
		}
		if(!empty($result)){
			$average = round(array_sum($result)/count($result), 1);
		}
		return $average;
	}
	
	/* Function getFirstNode
	 * Locates and returns specified first node in an XML document.
	 *
	 * @param DOMDocument $xml XML document to iterate through
	 * @param String $path String XPath expression that specifies the nodes to locate
	 * @return String text of of first located non-empty node.
	 */
	public function getFirstNode($xml, $path){
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
	
	/* Function getNodes
	 * Locates specified nodes in an XML document and returns array of all non-empty nodes that were found.
	 *
	 * @param DOMDocument $xml XML document to iterate through
	 * @param String $path String XPath expression that specifies the nodes to locate
	 * @return array of all located non-empty nodes
	 */
	public function getNodes($xml, $path){
		$result = array();
		if(empty($xml)){
			return $result;
		}
		$xpath = new DOMXpath($xml);
		$nodes = $xpath->query($path);
		if ($nodes->length > 0) {
			$i = 0;
			foreach ($nodes as $node){
				// Check if node is not empty
				if(preg_replace('/\s+/', '', $node->nodeValue) != ""){
					$result[$i] = trim($node->nodeValue);
					$i++;
				}
			}
		}
		return $result;
	}
	
	/* Function getXMLFileIdentifier
	 * Returns file identifier stored in the <fileIdentifier> tag of a given XML document
	 * 
	 * @param $xml DomDocument an XML document to process
	 * @return String file identifier of a given XML document
	 */
	public function getXMLFileIdentifier($xml){
		$id = null;
		if(empty($xml)){
			return $id;
		}
		$xpath = new DOMXpath($xml);
		$nodes = $xpath->query($this->fileIdentifierXPath);
		if ($nodes->length > 0){		
			if(preg_replace('/\s+/', '', $nodes->item(0)->nodeValue) != ""){
				$id = $nodes->item(0)->nodeValue;
			}
		}
		return trim($id);
	}

	 /* Function getXmlFromURL
	  * Checks whether a file exists in the $_FILES array and whether it is of allowed format.
	  * Stores XML in corresponding variable based on XML root node
	  *
	  * @param string $url URL location of the file to load
	  * @return DOMDocument (XML file retrieved) OR null (no file supplied or incorrect extension) 
	  */
	function getXmlFromURL($url){
		$dom = null;
		if(empty($url)){
			return null;
		}
		else{
			$xmlString = file_get_contents($url);
			if(!empty($xmlString)){
				$dom = new DOMDocument('1.0');
				if($dom->loadXML($xmlString)){
					return $dom;
				}
				return null;
			}
		}
		return null;
	}

	/* Function joinXMLDoms
	 * Generates a joined DomDocument from two XML strings.
	 * 
	 * @param DomDocument $xml_1 DomDocument XML 1
	 * @param DomDocument $xml_2 DomDocument XML 2
	 * @return DomDocument joined XML document
	 */
	public function joinXMLDoms($xml_1, $xml_2){
		$joinedXML = null;
		if(!empty($xml_1) && !empty($xml_2)){
			$joinedXML = new DOMDocument('1.0', 'UTF-8');
			$joinedXML->formatOutput = true;
			
			// Create and append root element
			$xmlRoot = $joinedXML->createElementNS($this->gvqNameSpace, 'gvq:GVQ_Metadata');
			$xmlRoot->setAttributeNS('http://www.w3.org/2000/xmlns/' ,'xmlns:xlink', 'http://www.w3.org/1999/xlink');
			$xmlRoot->setAttributeNS('http://www.w3.org/2000/xmlns/' ,'xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
			$xmlRoot = $joinedXML->appendChild($xmlRoot);
			
			// Get root elements of the temporary XMLs
			$tmpRoot1 = $joinedXML->importNode($xml_1->documentElement, true);
			$tmpRoot2 = $joinedXML->importNode($xml_2->documentElement, true);
			// Append XMLs to root of the joined XML DomDocument
			$xmlRoot->appendChild($tmpRoot1);
			$xmlRoot->appendChild($tmpRoot2);
		}
		return $joinedXML;
	}

		
	/* Function joinXMLStrings
	 * Generates a joined DomDocument from two XML strings.
	 * 
	 * @param String $xml_1 XMl string 1
	 * @param String $xml_2 XML string 2
	 * @return DomDocument joined XML document
	 */
	public function joinXMLStrings($xml_1, $xml_2){
		$joinedXML = null;
		if(!empty($xml_1) && !empty($xml_2)){
			$joinedXML = new DOMDocument('1.0', 'UTF-8');
			$joinedXML->formatOutput = true;
			
			// Create and append root element
			$xmlRoot = $joinedXML->createElementNS($this->gvqNameSpace, 'gvq:GVQ_Metadata');
			$xmlRoot->setAttributeNS('http://www.w3.org/2000/xmlns/' ,'xmlns:xlink', 'http://www.w3.org/1999/xlink');
			$xmlRoot->setAttributeNS('http://www.w3.org/2000/xmlns/' ,'xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
			$xmlRoot = $joinedXML->appendChild($xmlRoot);
			// Create temporary DomDocuments to store XML strings
			$tmpXML_1 = new DOMDocument('1.0', 'UTF-8');
			$tmpXML_2 = new DOMDocument('1.0', 'UTF-8');
			if($tmpXML_1->loadXML($xml_1) && $tmpXML_2->loadXML($xml_2)){
				// Get root elements of the temporary XMLs
				$tmpXML_1Root = $joinedXML->importNode($tmpXML_1->documentElement, true);
				$tmpXML_2Root = $joinedXML->importNode($tmpXML_2->documentElement, true);
				// Append XMLs to root of the joined XML DomDocument
				$xmlRoot->appendChild($tmpXML_1Root);
				$xmlRoot->appendChild($tmpXML_2Root);
			}
			return $joinedXML;
		}
		return $joinedXML;
	}
}
?>