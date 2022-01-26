// initialize variables
var time = document.querySelector('#time');
var intro = document.querySelector('#intro');
var startbtn = document.querySelector('#startbtn');
var finalMessage = document.querySelector('#final-message');
var score = 100;
var secs = 0;

// display seconds in timer
time.textContent = secs;

// Questions Array
var arrQuestions = [
    {
        question: "Commonly used data types DO NOT include:",
        options: ["strings", "booleans", "alerts", "numbers"],
        correctAns: "alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        options: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        correctAns: "parenthesis"
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correctAns: "all of the above"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        options: ["commas", "curly brackets", "quotes", "parenthesis"],
        correctAns: "quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["JavaScript", "terminal / bash", "for loops", "console log"],
        correctAns: "console log"
    }
];

// Game Over message
function displayFinished() {
    finalMessage.style.display = "block";
}

// if "Start Quiz" is pressed
startbtn.addEventListener("click", function() {
    intro.style.display = "none"; // hide intro

    secs = 1; // set starting time

    var timerInterval = setInterval(function () { // COUNTDOWN
        time.textContent = secs; // display seconds
        secs--;                  // decrement by 1

        if (secs < 0) {
            clearInterval(timerInterval); // stop timer
            displayFinished(); // display finished message
        }
    }, 1000);
});




/*
    var questionIndex = 0;
    var numCorrect = 0;
    var numIncorrect = 0;
*/