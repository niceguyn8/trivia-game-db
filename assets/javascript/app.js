// Have a button that listens for a click that starts the game
$('#startButton').on('click',function(){
  $('#startButton').remove();
  gameStart.displayQuestion();
});

// see if the answer is correct
$(document).on('click','.answer-button', function(event){
  gameStart.clicked(event);
})

$(document).on('click','#reset-button', function(event) {
  gameStart.reset();
})

// WHEN GAME STARTS:
// Display 1 question from array of questions
// Display Answer options (specific to that selected question) from array
// Create array of questions
var questionsArray = [{
  question: "Who has the 'Eye of the Tiger'",
  options: ["Arnold", "Stallone", "Bruce Lee", "Bruce Willy"],
  answer: "Stallone",
}];

// }, {
//   question: "Who is the best at karate chops and kicks to the face?",
//   options: ["Arnold", "Slallone", "Bruce Lee", "Bruce Willi"],
//   answer: "Bruce Lee",
// }, {
//   question: "Who's butt-kicking skills are only matched by their teaching skills?",
//   options: ["Kurt Russell", "Arnold", "Jean Claude Van Damme", "Bruce Willy"],
//   answer: "Arnold",
// }, {
//   question: "Who's pities the fool and/or fools?",
//   options: ["Sly", "Mr. T", "Robocop", "Kurt Russell"],
//   answer: "Mr. T",
// }, {
//   question: "This one is objectively one of the best at doing at splits.",
//   options: ["Kurt Russell", "Arnold", "Jean Claude Van Damme", "Stallone",],
//   answer: "Jean Claude Van Damme",
// }, {
//   question: "Yippee-Ki-Yay!",
//   options: ["Arnold", "Bruce Willy", "Chuck Norris", "Stallone",],
//   answer: "Bruce Willy",
// }, {
// question: "This guy is in 'Big Trouble'.",
// options: ["Kurt Russell", "Bruce Lee", "Stallone", "Jean Claude Van Damme",],
// answer: "Kurt Russell",
// }, {
// question: "Known for vacationing in Beverly Hills.",
// options: ["Eddie Murphy", "Stallone", "Bruce Willy", "Arnold", "Mr. T"],
// answer: "Eddie Murphy",
// }, {
// question: "Superman goes to bed wearing pajamas with which of these tough dudes on them?",
// options: ["Bruce Lee", "Stallone", "Bruce Willy", "Arnold", "Chuck Norris"],
// answer: "Chuck Norris",
// }];
// Variable to store gifs
var gifArray = ['stallone','lee', 'arnold', 'mr-t', 'jcvd', 'die-hard', 'kurt', 'eddie', 'chuck'];

// WHEN GAME STARTS:
var gameStart = {
  questionSelected: 0,
  timeLeft: 10,
  correctAnswer: 0,
  wrongAnswer: 0,

  // WHEN GAME STARTS:
  // Display 1 question from array of questions
  displayQuestion: function(){
    time = setInterval(gameStart.timer,1000);
    $('#display').html("<h3>Hurry Up!:</h3>");
    $('#display').append("<h2 id='timer'>10</h2>");
    $('#display').append('<h2>'+questionsArray[gameStart.questionSelected].question+'</h2>');
    // Display Answer options (specific to the selected question) from array
    for (var i = 0; i < questionsArray[gameStart.questionSelected].options.length;i++){
      $('#display').append('<button class="answer-button" id="button- '
      +i+ '" data-name= "'+questionsArray
      [gameStart.questionSelected].options[i]+'">'+questionsArray
      [gameStart.questionSelected].options[i]+'</button>');
    }

  },
  // Begin count down using timer
  timer: function(){
    gameStart.timeLeft--;
    $("#timer").html(gameStart.timeLeft);
    if(gameStart.timeLeft<=0){
      console.log("TIME UP");
      gameStart.timeOut();
    }
  },
  nextQuestion: function() {
    gameStart.timeLeft = 10,
    $('#timer').html(gameStart.timer);
    gameStart.questionSelected++;
    gameStart.displayQuestion();
    $('#gif').empty();
  },

  // when count down reaches 0 the user looses
  timeOut: function(){
    clearInterval(time);
    $('#display').html('<h2>Time is up!</h2>')
    $('#display').append('<h3>You should have guessed: '
      +questionsArray[gameStart.questionSelected].answer+'</h3>');
    if(gameStart.questionSelected==questionsArray.length-1){
      setTimeout(gameStart.results, 5000);
    } else {
      setTimeout(gameStart.nextQuestion, 5000);
    }
      gameStart.wrongAnswer++;
    $('#gif').html('<img src = "assets/images/'+ gifArray[gameStart.questionSelected] +'.gif" width = "400px">');
  },
  results: function(){
    clearInterval(time);
    $('#gif').empty();
    $('#display').html("<h2>Party's Over</h2>")
    $('#display').append("<h3>Correct: "+gameStart.correctAnswer+"</h3>");
    $('#display').append("<h3>Incorrect: "+gameStart.wrongAnswer+"</h3>");
    $('#display').append("<button id='reset-button'> Try Again</button>");

    // $('#display').append("<form action='leaderboard.php' method='post'>");

    $('#display').append("<input type='hidden' name='userScore' value='"+gameStart.correctAnswer+"'>");
    $('#display').append("<input type='submit' name='scoreButton' value='go to leaderboard'>");

    // $('#display').append("</form>");
  },
  clicked: function(event){
    clearInterval(time);
    if($(event.target).data("name")==questionsArray[gameStart.questionSelected].
      answer){
        gameStart.correctGuess();
    } else {
      gameStart.incorrectGuess();
    }
    // display gif after answer is clicked
    $('#gif').html('<img src = "assets/images/'+ gifArray[gameStart.questionSelected] +'.gif" width = "600px">');
  },
  correctGuess: function(){
    console.log("User guessed right");
    clearInterval(time);
    gameStart.correctAnswer++;
    $('#display').html('<h2>You got it, dude!</h2>');
    if(gameStart.questionSelected==questionsArray.length-1){
      setTimeout(gameStart.results, 5000);
    } else {
      setTimeout(gameStart.nextQuestion, 5000);
    }
  },
  incorrectGuess: function(){
    console.log("User Guessed Wrong");
    clearInterval(time);
    gameStart.wrongAnswer++;
    $('#display').html('<h2>Wrong! Booooooo!</h2>');
    $('#display').append('<h3>You should have guessed: '
      +questionsArray[gameStart.questionSelected].answer+'</h3>');
    if(gameStart.questionSelected==questionsArray.length-1){
      setTimeout(gameStart.results, 5000);
    } else {
      setTimeout(gameStart.nextQuestion, 5000);
    }
  },
  reset: function(){
    gameStart.questionSelected = 0;
    gameStart.timeLeft = 10;
    gameStart.wrongAnswer = 0;
    gameStart.correctAnswer = 0;
    gameStart.displayQuestion();
    $('#gif').empty();
  },
}
