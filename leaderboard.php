<?
session_start();
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Triva Game</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"crossorigin="anonymous">
    <link rel="stylesheet" href="assets/css/style.css">
    <link href="https://fonts.googleapis.com/css?family=Black+Ops+One" rel="stylesheet">
  </head>

  <body>
  	<h1>Leaderboard</h1>

  <?

$servername = "192.168.64.2";
$username = "niceguyn8";
$password = "wdAxhoHCTibmtZkm";
$dbname = "TriviaScore";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_POST["scoreButton"])) {
  
  $userName = $_SESSION["userName"];
  $score = $_POST["userScore"]; 

	$sql = "INSERT INTO Leaderboard (userName, score)
	VALUES ('$userName', $score)";

	if ($conn->query($sql) === TRUE) {
	    echo "New record created successfully";
	} else {
	    echo "Error: " . $sql . "<br>" . $conn->error;
	}
}

$sql = "SELECT * FROM Leaderboard order by score desc limit 20"; 
$result = $conn->query($sql);

if ($result->num_rows > 0) {
	echo "<table>";
	echo "<tr>
			<th>Player</th>
			<th>Score</th>
		  </tr>";
    // output data of each row
    while($row = $result->fetch_assoc()) {
        
    	echo "<tr>";
        echo "<td>" . $row["userName"]. "</td><td>" . $row["score"]. "</td>";
        echo "</tr>";

    }

    echo "</table>";

} else {
    echo "0 results";
}

$conn->close();



?>

 </body>
</html>
