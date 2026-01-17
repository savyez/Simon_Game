// alert("Welcome to Simon Game! Click OK to start.");

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;


// Start the game on keypress
$("#level-title").text("Press A Key to Start");
$(document).on("keydown", function() {
    nextSequence();
});


// Handle button clicks
$(".btn").click(function() {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log("userClickedPattern: " + userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);

});


// Generate the next sequence
function nextSequence() {

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log("gamePattern: " + gamePattern);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    animatePress(randomChosenColor);

    $("#level-title").text("Level " + level);
    level++;
}


// Play sound for a given color
function playSound(color) {
    var audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}



// Check the user's answer
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

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
        console.log("wrong");
        var wrongAudio = new Audio("./sounds/wrong.mp3");
        wrongAudio.play();
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
