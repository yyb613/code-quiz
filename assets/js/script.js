

var time = document.querySelector("#time");
var secs = 0;
time.textContent = secs;

var startbtn = document.querySelector("#startbtn");
var header = document.querySelector("header");

var score = 100;

function displayFinished() { // display finished message
    var h1El = document.createElement("h1");
    h1El.textContent = "All done!";
    document.body.appendChild(h1El);

    var h2El = document.createElement("h2");
    h2El.textContent = "Your final score is " + score + '.';
    document.body.appendChild(h2El);

    var initials = document.createElement("h2");
   // initials.textContent = "Enter initials: " + [INPUT BOX] + [SUBMIT];
}

startbtn.addEventListener("click", function() {
    header.style.visibility = "hidden";

    secs = 1;

    var timerInterval = setInterval(function () {
        time.textContent = secs;
        secs--;

        if (secs < 0) { // display finished message
            clearInterval(timerInterval);
            displayFinished();
            // All done!
            // Your final scocre is ___.
            // Enter initials: ______________ [Submit]
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