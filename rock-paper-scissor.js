const p1 = document.querySelector(".demo-result");
const p2 = document.querySelector(".demo-scores");
const p3 = document.querySelector(".demo-moves");

const rockbtn = document.querySelector(".rock");
rockbtn.addEventListener("click", () => {
  playGame("rock");
});
const paperbtn = document.querySelector(".paper");
paperbtn.addEventListener("click", () => {
  playGame("Paper");
});
const scissorbtn = document.querySelector(".scissor");
scissorbtn.addEventListener("click", () => {
  playGame("scissors");
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("Paper");
  } else if (event.key === "s") {
    playGame("scissors");
  }
});
let score = JSON.parse(localStorage.getItem("score"));
if (score === null) {
  score = {
    wins: 0,
    loses: 0,
    ties: 0,
  };
}
let isAutoPlay = false;
let IntervalId;

// const AutoPlay= () => {

// }
function AutoPlay() {
  if (!isAutoPlay) {
    IntervalId = setInterval(() => {
      const playerMove = computerGame();
      playGame(playerMove);
    }, 1000);
    isAutoPlay = true;
  } else {
    clearInterval(IntervalId);
    isAutoPlay = false;
  }
}
function playGame(playerMove) {
  let computerMove = computerGame();
  let result;
  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "tie";
      score.ties++;
    } else if (computerMove === "Paper") {
      result = "lose";
      score.loses++;
    } else {
      result = "win";
      score.wins++;
    }
  } else if (playerMove === "Paper") {
    if (computerMove === "Paper") {
      result = "tie";
      score.ties++;
    } else if (computerMove === "scissors") {
      result = "lose";
      score.loses++;
    } else {
      result = "win";
      score.wins++;
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "scissors") {
      result = "tie";
      score.ties++;
    } else if (computerMove === "rock") {
      result = "lose";
      score.loses++;
    } else {
      result = "win";
      score.wins++;
    }
  }
  localStorage.setItem("score", JSON.stringify(score));
  p1.innerHTML = `Result is ${result}`;
  // p3.innerHTML = `You chooses ${playerMove} and Computer chooses ${computerMove}`;
  p2.innerHTML = `Scores are wins : ${score.wins}, loses: ${score.loses}, ties : ${score.ties}.`;
  p3.innerHTML = ` <div class="same">You <img src="assets/${playerMove}-emoji.png" alt="" class="move-icon" /></div> <div class="same">and Computer
      <img src="assets/${computerMove}-emoji.png" alt="" class="move-icon" /></div>`;
  // alert(
  //   `You chooses ${playerMove} and computer chooses ${computerMove} so result is ${result} \n final scores are wins : ${score.wins}, loses: ${score.loses}, ties : ${score.ties}.`
  // );
}
function computerGame() {
  let computerMove;
  let randomNumber = Math.random();
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else {
    computerMove = "scissors";
  }
  return computerMove;
}
function resetScore(score, playerMove, computerMove, result) {
  score.wins = 0;
  score.loses = 0;
  score.ties = 0;
  p2.innerHTML = `Scores are wins:${score.wins}, loses: ${score.loses}, ties : ${score.ties}`;
  localStorage.removeItem("score");
}
