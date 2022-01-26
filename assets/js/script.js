
// initialize variables
var time = document.querySelector('#time');
var intro = document.querySelector('#intro');
var startbtn = document.querySelector('#startbtn');
var finalMessage = document.querySelector('#final-message');
var score = 100;
var secs = 0;

// display seconds in timer
time.textContent = secs;

// game over message
function displayFinished() {
    finalMessage.style.display = "block";
}

// if "Start Quiz" is pressed
startbtn.addEventListener("click", function() {
    intro.style.display = "none";

    secs = 1;

    var timerInterval = setInterval(function () {
        time.textContent = secs;
        secs--;

        if (secs < 0) { // display finished message
            clearInterval(timerInterval);
            displayFinished();
        }
    }, 1000);
});



var arrQuestions = [
    {
        question: "what is 2+2?",
        options: ["1", "2", "3", "4"],
        correctAns: "4"
    }
];


/*
    var questionIndex = 0;
    var numCorrect = 0;
    var numIncorrect = 0;
*/



    // var h1El = document.createElement("h1");
    // h1El.textContent = "All done!";
    // document.body.appendChild(h1El);

    // var h2El = document.createElement("h2");
    // h2El.textContent = "Your final score is " + score + '.';
    // document.body.appendChild(h2El);

    // var initials = document.createElement("h2");
   // initials.textContent = "Enter initials: " + [INPUT BOX] + [SUBMIT];