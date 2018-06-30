<?
session_start();

if (isset($_POST["signInBtn"])) {
  $_SESSION["userName"]=$_POST["signIn"];
}

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
    <div class="jumbotron">
      <div class="container">
          <h1>80's Action Guys Trivia Game</h1>
        </div>
      </div>

    <div class="container">
      <div id="content">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <h2> Game's on <? echo $_SESSION["userName"];?>  </h2>
            <button id="startButton">Start the Friggin Game!!!!</button>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <form class="" action="leaderboard.php" method="post">
              <div id="display"></div>
            </form>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div id="gif"></div>
          </div>
        </div>
      </div>
    </div>

    <script type="text/javascript" src="./assets/javascript/app.js"></script>
  </body>
</html>
