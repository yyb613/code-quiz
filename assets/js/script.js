// initialize variables
var time = document.querySelector('#time');
var intro = document.querySelector('#intro');
var startbtn = document.querySelector('#startbtn');
var quiz = document.querySelector('#quiz');
var finalMessage = document.querySelector('#final-message');
var highscores = document.querySelector('#highscores');
var score = 100; // initial score
var secs = 0; // time before game starts
var i = 0; // question index
var numWrong = 0; // number of incorrect q's

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

        if (secs < 0 || i > 4) {
            clearInterval(timerInterval); // stop timer
            displayFinished(); // display finished message
        }
    }, 1000);

    displayQuiz(); // display quiz

    function displayQuiz() {
        // Game Over after last question
        // if (i > 4) {
        //     displayFinished();            // game over message
        //     clearInterval(timerInterval); // stop timer
        //     return;                       //  exit function
        // }

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
    
    quiz.addEventListener("click", function (event) {
        var correctAns = arrQuestions[i].correctAns; // correct answer variable
        var selectedOption = event.target.textContent;   // selected option variable
        console.log(correctAns, selectedOption)
        if (event.target.matches(".option")) {           // if an 'option button' is selected
            if (selectedOption === correctAns) {         // if matches correct answer
                var hrEl = document.createElement("hr"); // create horizontal rule
                var h5El = document.createElement("h5"); // create h5 element
                h5El.textContent = "Correct!";           // inject 'Correct!'
                question.style.display = "none";         // hide current question                
                var optionsArr = document.querySelectorAll('.option'); // make options array
                for (var j = 0; j < optionsArr.length; j++) {
                    optionsArr[j].style.display = "none";              // hide options
                }
                i++;          // increment question index
                quiz.innerHTML = '';
                displayQuiz() // display next question
                quiz.appendChild(hrEl); // append horizontal rule
                quiz.appendChild(h5El); // append h5 element
            } else {          // if wrong answer
                var hrEl = document.createElement("hr"); // create horizontal rule
                var h5El = document.createElement("h5"); // create h5 element
                h5El.textContent = "Wrong!";             // inject 'Wrong!'
                question.style.display = "none";         // hide current question                
                var optionsArr = document.querySelectorAll('.option'); // make options array
                for (var j = 0; j < optionsArr.length; j++) {
                    optionsArr[j].style.display = "none";              // hide options
                }
                numWrong++;   // increment wrong count
                secs -= 10;   // reduce time by 10secs
                i++;          // increment question index
                quiz.innerHTML = '';
                displayQuiz() // display next question
                quiz.appendChild(hrEl); // append horizontal rule
                quiz.appendChild(h5El); // append h5 element
            }
        }
    });

});

// Calculate score
function calculateScore() {
    score -= (numWrong * 20);
    return score;
}

// GAME OVER
function displayFinished() {
    finalMessage.style.display = "block"; // display game over message 
    newScore = calculateScore();          // calculate score
    document.querySelector('#score').textContent = newScore; // display score

    // HIGHSCORES
    var scorePair = {
        initials: 'RB',/////// HOW DO I RETRIEVE THE INITIALS? ////////
        score: newScore
    };

    // Pull highscores from local storage
    var allPairs = JSON.parse(localStorage.getItem("Scores")) || []; 

    // Push newest score to array
    allPairs.push(scorePair);

    // Set highscore in local storage
    localStorage.setItem("Scores", allPairs);

    // Append highscore to highscores list
    for (var i = 0; i < allPairs.length; i++) {

        highscores.appendChild(allPairs[i].initials + ' — ' + allPairs[i].score);      ////// NOT WORKING ///////
    }
}

document.querySelector("#submit").addEventListener("click", function(e) {
    // e.preventDefault()
    // var value = newScore;

    var submitted_initials = document.querySelector("#initials").value;

    var allScores = JSON.parse(localStorage.getItem("Scores")) || [];

    allScores.push({score: newScore, initials: submitted_initials});

    localStorage.setItem("Scores", JSON.stringify(allScores));
})