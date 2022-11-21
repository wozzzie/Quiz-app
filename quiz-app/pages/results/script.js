const resultsBtn = document.querySelector(".results__btn");
const resultsScore = document.querySelector(".results__score");

resultsBtn.disable = false;

const score = localStorage.getItem("score");

resultsScore.innerHTML = score;

if (resultsScore.innerHTML === '30') {
  resultsBtn.innerHTML = "GAME OVER";
  resultsBtn.disable = true;
} else {
  resultsBtn.innerHTML = "Play again";
  resultsBtn.addEventListener("click", () => {
    window.location.href = "../game/index.html";
  });
}


