// initialize variables
var time = document.querySelector('#time');
var intro = document.querySelector('#intro');
var startbtn = document.querySelector('#startbtn');
var quiz = document.querySelector('#quiz');
var finalMessage = document.querySelector('#final-message');
var highscores = document.querySelector('#highscores');
var score = 0; // initial score
var secs = 0; // time before game starts
var i = 0; // question index
var numCorrect = 0; // number of correct q's

// display 0 seconds in timer
time.textContent = secs;

// Questions Array
var arrQuestions = [
    {
        question: "Commonly used data types DO NOT include:",
        options: ["1. strings", "2. alerts", "3. booleans", "4. numbers"],
        correctAns: "2. alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        options: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        correctAns: "3. parenthesis"
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        options: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAns: "4. all of the above"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        options: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        correctAns: "3. quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["1. console log", "2. terminal / bash", "3. for loops", "4. JavaScript"],
        correctAns: "1. console log"
    }
];

// if "Start Quiz" is pressed
startbtn.addEventListener("click", function () {
    intro.style.display = "none"; // hide intro

    secs = 75; // set starting time

    var timerInterval = setInterval(function () { // COUNTDOWN
        time.textContent = secs; // display seconds
        secs--;                  // decrement by 1

        if (secs < 0 || i > 4) { // if (time is up || all q's answered)
            clearInterval(timerInterval); // stop timer
            quiz.innerHTML = ''; // hide quiz
            displayFinished(); // display finished message
        }
    }, 1000);

    displayQuiz(); // display quiz

    function displayQuiz() {
        // show question
        var question = document.createElement("h2"); // initialize question variable
        question.textContent = arrQuestions[i].question; // inject question
        quiz.appendChild(question); // append question

        // populate options
        for (var j = 0; j < 4; j++) {
            var optionbtn = document.createElement("button"); // create button
            optionbtn.textContent = arrQuestions[i].options[j]; // inject option into button
            optionbtn.style.display = "block"; // display block
            optionbtn.className = "option"; // add class 'option'
            quiz.appendChild(optionbtn); // append button
        }
    }
    
    quiz.addEventListener("click", function (event) {
        var correctAns = arrQuestions[i].correctAns; // correct answer variable
        var selectedOption = event.target.textContent;   // selected option variable
        if (event.target.matches(".option")) {           // if an 'option button' is selected
            if (selectedOption === correctAns) {         // if matches correct answer
                var hrEl = document.createElement("hr"); // create horizontal rule
                var h5El = document.createElement("h5"); // create h5 element
                h5El.textContent = "Correct!";           // inject 'Correct!'
                question.style.display = "none";         // hide current question                
                numCorrect++;   // increment correct count
                i++;          // increment question index
                quiz.innerHTML = '';
                displayQuiz() // display next question
                quiz.appendChild(hrEl); // append horizontal rule
                quiz.appendChild(h5El); // append h5 element
                setTimeout(function () {
                    hrEl.remove();
                    h5El.remove();
                }, 1250);
            } else {          // if wrong answer
                var hrEl = document.createElement("hr"); // create horizontal rule
                var h5El = document.createElement("h5"); // create h5 element
                h5El.textContent = "Wrong!";             // inject 'Wrong!'
                question.style.display = "none";         // hide current question                
                secs -= 10;   // reduce time by 10secs
                i++;          // increment question index
                quiz.innerHTML = '';
                displayQuiz() // display next question
                quiz.appendChild(hrEl); // append horizontal rule
                quiz.appendChild(h5El); // append h5 element
                setTimeout(function () {
                    hrEl.remove();
                    h5El.remove();
                }, 1250);
            }
        }
    });

});

// Calculate score
function calculateScore() {
    score += (numCorrect * 20);
    return score;
}

// GAME OVER
function displayFinished() {
    finalMessage.style.display = "block"; // display game over message 
    newScore = calculateScore();          // calculate score
    document.querySelector('#score').textContent = newScore; // display score
}

// Submit Initials
document.querySelector("#submit").addEventListener("click", function() {
    var submitted_initials = document.querySelector("#initials").value; // grab submitted initials
    
    // Send score/initials to local storage
    var allScores = JSON.parse(localStorage.getItem("Scores")) || [];   // pull scores from local storage
    allScores.unshift({initials: submitted_initials, score: newScore});    // push newest score to array
    localStorage.setItem("Scores", JSON.stringify(allScores));          // push updated array to local storage
})