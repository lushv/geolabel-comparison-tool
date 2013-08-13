<?php
echo '{
    "dataset": [
				{"datasetIdentifier":"5262159C-D358-11D5-88C8-000102DCCF41"},
				{"datasetIdentifier":"5262159C-D358-11D5-88C8-000102DCCF41"}
				]
	}';

/*
$username = "comparison_user";
$password = "manhattan";
$hostname = "localhost"; 

//connection to the database
$dbhandle = mysql_connect($hostname, $username, $password)
  or die("Unable to connect to MySQL");

//select a database to work with
$selected = mysql_select_db("geolabel_comparison_tool_db",$dbhandle)
  or die("Could not select geolabel_comparison_tool_db");
  
//execute the SQL query and return records
$result = mysql_query("SELECT id, model, year FROM cars");
//fetch tha data from the database
while ($row = mysql_fetch_array($result)) {
   echo "ID:".$row{'id'}." Name:".$row{'model'}."
   ".$row{'year'}."<br>";
}

//close the connection
mysql_close($dbhandle);
*/
?>