const resultsBtn = document.querySelector(".results__btn");
const resultsScore = document.querySelector(".results__score");
resultsBtn.addEventListener(
  "click",
  () => (window.location.href = "../game/index.html")
);

const score = localStorage.getItem("score");
resultsScore.innerHTML = score;
