const buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userPattern = [];
let started = false;
let level = 0;

const centerCircle = document.getElementById("center-circle");

centerCircle.addEventListener("click", function () {
  if (!started) {
    centerCircle.textContent = "0";
    centerCircle.classList.remove("game-over-text");
    nextSequence();
    started = true;
  }
});

document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", function () {
    if (!started) return;
    const userChosenColor = this.id;
    userPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userPattern.length - 1);
  });
});

function nextSequence() {
  userPattern = [];
  level++;
  centerCircle.textContent = level;
  const randomColor = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomColor);
  setTimeout(() => {
    animatePress(randomColor);
    playSound(randomColor);
  }, 500);
}

function playSound(name) {
  const audio = document.getElementById("click-sound");
  audio.currentTime = 0;
  audio.play();
}

function animatePress(color) {
  const btn = document.getElementById(color);
  btn.classList.add("pressed");
  setTimeout(() => {
    btn.classList.remove("pressed");
  }, 150);
}

function checkAnswer(currentLevel) {
  if (userPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 800);
    }
  } else {
    const wrong = document.getElementById("wrong-sound");
    wrong.play();
    document.body.classList.add("game-over");
    centerCircle.textContent = "Game Over";
    centerCircle.classList.add("game-over-text");

    setTimeout(() => {
      document.body.classList.remove("game-over");
      setTimeout(() => {
        resetGame();
      }, 1000);
    }, 200);
  }
}

function resetGame() {
  level = 0;
  gamePattern = [];
  started = false;
  centerCircle.textContent = "Start";
<<<<<<< HEAD
  centerCircle.classList.remove("game-over-text");
}
=======
}
>>>>>>> 8a4f1bb27b89a53ac5d55c70cdbab201fbbb61e7
