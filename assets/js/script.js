var arrQuestions = [
    {
        question: "what is 2+2?",
        options: ["1", "2", "3", "4"],
        correctAns: "4"
    }
];

var startbtn = document.querySelector("#startbtn");
var header = document.querySelector("header");

startbtn.addEventListener("click", function() {
    header.style.visibility = "hidden";
});

