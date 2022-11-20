const resultsBtn = document.querySelector(".results__btn");
const resultsScore = document.querySelector(".results__score");
resultsBtn.addEventListener(
  "click",
  () => (window.location.href = "../game/index.html")
);

const data = localStorage.getItem("score");
resultsScore.innerHTML = data;
// console.log("score", data);
