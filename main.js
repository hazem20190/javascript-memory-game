// ELEMENTS
let startButton = document.querySelector(".start-button span");
let spanName = document.querySelector(".user span");
let boxImg = document.querySelectorAll(".box");
let mainIfo = document.querySelector(".main-info");
let wrongAttemps = document.querySelector(".wrong-attempts span");
// GLOBAL VARIABLS
let duration = 1000;
let firstCard = null;
let secondCard = null;
let wrongs = 0;

startButton.addEventListener("click", () => {
  // REMOVE BLIND
  document.querySelector(".start-button").remove();

  // INSERT USERNAME
  let user = prompt("Whats your Name?");
  if (user === null || user.trim() === "") {
    spanName.innerHTML = "Unknown";
  } else {
    spanName.innerHTML = user.trim();
  }
  shuffle();
});

// CREATE SHUFFLE ARRAY TO ORDER CARDS
function shuffle() {
  let boxes = [...Array(boxImg.length).keys()];
  let current = boxes.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    --current;

    temp = boxes[current];
    boxes[current] = boxes[random];
    boxes[random] = temp;
  }
  console.log(boxes);
  startGame(boxes);
}

function startGame(shuffleOrder) {
  boxImg.forEach((element, index) => {
    element.style.order = shuffleOrder[index];
    element.addEventListener("click", () => {
      if (firstCard === null) {
        firstCard = element;
        firstCard.classList.add("flipp");
      } else if (firstCard === element) {
        return;
      } else {
        secondCard = element;
        secondCard.classList.add("flipp");
        let firstImg = firstCard.querySelector(".back img").getAttribute("src");
        let secondImg = secondCard
          .querySelector(".back img")
          .getAttribute("src");

        if (
          firstCard.classList.contains("flipp") &&
          secondCard.classList.contains("flipp")
        ) {
          mainIfo.style.pointerEvents = "none";
        }

        setTimeout(() => {
          if (firstImg === secondImg) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
          } else {
            ++wrongs;
            wrongAttemps.innerHTML = wrongs;
          }

          firstCard.classList.remove("flipp");
          firstCard = null;
          secondCard.classList.remove("flipp");
          secondCard = null;
          mainIfo.style.pointerEvents = "";
        }, duration);
      }
    });
  });
}
