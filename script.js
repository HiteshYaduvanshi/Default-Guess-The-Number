let randomNumber = Math.floor(Math.random() * 101);

const guessInput = document.getElementById("guessInput");
const guessSubmit = document.getElementById("guessSubmit");
const resultParas = document.querySelector(".resultParas");
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const chanceLeft = document.querySelector(".chanceLeft");

let guessCount = 1;
let resetButton;

function checkGuess() {
    const userGuess = Number(guessInput.value);

    if (guessCount === 1) {
        guesses.textContent = "Previous guesses: ";
    }

    guesses.textContent += userGuess + " ";

    let displayChanceLeft = 10 - guessCount;

    chanceLeft.textContent = "chance left "  + displayChanceLeft;

    if (userGuess === randomNumber) {
        lastResult.textContent = "Congratulations! You guessed it!";
        lastResult.style.backgroundColor = "green";
        lowOrHi.textContent = "";
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = "!!!GAME OVER!!!";
        setGameOver();
    } else {
        lastResult.textContent = "Wrong!";
        lastResult.style.backgroundColor = "red";
        if (userGuess < randomNumber) {
            lowOrHi.textContent = "Last guess was lower than actual number!";
        } else {
            lowOrHi.textContent = "Last guess was greater than actual number!";
        }
    }

    guessCount++;
    guessInput.value = "";
    guessInput.focus();
}

guessSubmit.addEventListener("click", checkGuess);

function setGameOver(){
    guessInput.disabled = true;
    guessSubmit.disabled = true;
    guessSubmit.style.display = "none";
    resetButton = document.createElement("button");
    resetButton.classList.add("resetBtn")
    resetButton.textContent = "start new game";
    resultParas.appendChild(resetButton);
    resetButton.addEventListener("click",resetGame);
}

function resetGame(){
    guessCount = 1;
    const resultParas = document.querySelectorAll(".resultParas p");
    for(let i=0; i<resultParas.length;i++){
        resultParas[i].textContent = "";
    }
    resetButton.style.display = "none";

    guessInput.disabled = false;
    guessSubmit.disabled = false;
    guessSubmit.style.display = "inline-block";
    guessInput.value = "";
    guessInput.focus();

    lastResult.style.backgroundColor = "white";

    randomNumber = Math.floor(Math.random() * 101);
}