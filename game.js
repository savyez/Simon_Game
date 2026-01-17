// alert("Welcome to Simon Game! Click OK to start.");

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;


// Start the game on keypress
$("#level-title").text("Press Any Key to Start");
$(document).on("keydown", function() {
    nextSequence();
});


// Handle button clicks
$(".btn").click(function() {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

});


// Generate the next sequence
function nextSequence() {

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);

    level++;
    $("#level-title").text("Level " + level);
}


// Play sound for a given color
function playSound(color) {

    var audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();
    
}


// Animate button press
function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}


// Check the user's answer
function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) 
            {
            setTimeout(function() {
                nextSequence();
                userClickedPattern = [];
            }, 1000);    
        } 
        else 
            {
            // Do nothing, wait for next user input
        }

    } 
    else 
        {
        var wrongAudio = new Audio("./sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
            }, 200);
        startOver();
    }

}


// Reset the game
function startOver() {

    $("#level-title").text("Game Over!");
    $("#game-over").text("Press Any Key to Restart");
    level = 0;
    gamePattern = [];
    userClickedPattern = [];

}
