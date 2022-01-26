// initialize variables
var time = document.querySelector('#time');
var intro = document.querySelector('#intro');
var startbtn = document.querySelector('#startbtn');
var quiz = document.querySelector('#quiz');
var finalMessage = document.querySelector('#final-message');
var score = 100; // initial score
var secs = 0; // time before game starts
var i = 0; // question index
var numIncorrect = 0; // number of incorrect q's

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

        if (secs < 0) {
            clearInterval(timerInterval); // stop timer
            displayFinished(); // display finished message
        }
    }, 1000);

    displayQuiz(); // display quiz

    function displayQuiz() {
        // Game Over after last question
        if (i > 4) {
            displayFinished();            // game over message
            clearInterval(timerInterval); // stop timer
            return;                       //  exit function
        }

        // show question
        question = document.createElement("h2"); // initialize global question variable
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

    var correctAns = arrQuestions[i].correctAns; // correct answer variable

    quiz.addEventListener("click", function (event) {
        var selectedOption = event.target.textContent; // selected option variable
        if (event.target.matches(".option")) {         // if an 'option button' is selected
            if (selectedOption === correctAns) {       // if matches correct answer
                question.style.display = "none";       // hide current question
                document.querySelector('.option').setAttribute("style", "display:none;"); //////// NOT WORKING ////////
                i++;            // increment question index
                                                                console.log('correct');  ////////// CONSOLE LOG ///////
                displayQuiz()   // display next question
            } else {            // if wrong answer
                numIncorrect++; // increment wrong count
                secs -= 15;     // reduce time by 15secs
                i++;            // increment question index
                                                                console.log('NOT correct'); /////// CONSOLE LOG ////////
                displayQuiz()   // display next question
            }
        }
    });

});

// Calculate score
function calculateScore() {
    score -= (numIncorrect * 20);
    return score;
}

// Game Over message
function displayFinished() {
    finalMessage.style.display = "block"; // make message visible
    document.querySelector('#score').textContent = calculateScore();
}