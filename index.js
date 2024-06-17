var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var start = false;

// game start
$(document).on("keydown", function () {
  if (!start) {
    $("h1").text("Level " + level);
    start = true;
    nextSequence();
  }
});

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  randomIndex = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomIndex];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

$(".btn").on("click", function () {
  var userChosenColor = $(this).attr("id");
  animatePress(userChosenColor);
  playSound(userChosenColor);
  if (start) {
    userPattern.push(userChosenColor);
    checkAnswer(userPattern.length - 1);
  }
});

function checkAnswer(currentLevel) {
  if (
    currentLevel < gamePattern.length &&
    userPattern[currentLevel] === gamePattern[currentLevel]
  ) {
    if (currentLevel === gamePattern.length - 1) {
      userPattern = [];
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("GAME OVER, Press any key to restart");
    startOver();
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 300);
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userPattern = [];
  start = false;
}

function playSound(color) {
  var audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}
