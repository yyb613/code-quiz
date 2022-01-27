function loadScores() {
    var allScores = JSON.parse(localStorage.getItem("Scores")) || [];
    if (allScores.length != 0) {
        for (var i = 0; i < allScores.length; i++) {
            var newP = document.createElement("p");
            newP.textContent = allScores[i].initials + ' - ' + allScores[i].score;
            highscores.appendChild(newP);
        }
    }
}

loadScores();