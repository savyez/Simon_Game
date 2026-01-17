// alert("Welcome to Simon Game! Click OK to start.");

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

$(".btn").click(function() {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);

});


function nextSequence() {

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}


function playSound(color) {
    var audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();
}