let guessedLetters = 0;
let lifes = 6;
const wordToGuess = [];
const allTriedLetters = [];
const triedLetters = [];
let incorrectCount = 0;
const bodyParts = document.getElementsByClassName('body-part');
let resetBtn = "<button id='resetBtn' onclick='resetGame()'>Play again!</button>";


function addWordLetters() {
  let word = document.getElementById("enteredWord").value;
  let wordLength = word.length;
  let onlyLetters = /^[A-Za-z]+$/;
  if (onlyLetters.test(document.getElementById("enteredWord").value)) {
    if (wordLength >= 5) {
      document.getElementById("lifes").innerHTML = lifes;
      let line = "__";
      for (let i = 1; i < wordLength - 1; ++i) {
        wordToGuess[i] = line;
      }
      wordToGuess[0] = word[0];
      wordToGuess[wordLength - 1] = word[wordLength - 1];
      document.getElementById("lettersPlace").innerHTML = wordToGuess.join(' ');
    } else {
      document.getElementById("lettersPlace").innerHTML = "Please enter a word consisting of 5 or more letters."
      resetBtn = "<button id='resetBtn' onclick='resetGame()'>Play again!</button>";
      document.getElementById("resetButton").innerHTML = resetBtn;
    }
  } else {
    document.getElementById("lettersPlace").innerHTML = "The word entered must contain only letters!";
    resetBtn = "<button id='resetBtn' onclick='resetGame()'>Play again!</button>";
    document.getElementById("resetButton").innerHTML = resetBtn;
  }
  document.getElementById("subButton").disabled = true;
}


function pressedLetter(event) {
  let pressedKey = event.key;
  let submitBtn = document.getElementById("subButton").disabled;
  let input = document.getElementById("enteredWord").value;
  let check = input.includes(pressedKey);
  if (event.keyCode >= 65 && event.keyCode <= 90 && submitBtn == 1) {
    if (triedLetters.includes(pressedKey) || allTriedLetters.includes(pressedKey)) {
      document.getElementById("header").innerHTML = "Already pressed before. Please, try another one!";
    } else {
      document.getElementById("allTriedLetters").appendChild(document.createTextNode(pressedKey + " "));
      document.getElementById("header").innerHTML = "Welcome to the Hangman game";
      triedLetters.push(pressedKey);
      allTriedLetters.push(pressedKey);
      if (check == true) {
        for (i = 1; i < input.length - 1; ++i) {
          if (pressedKey == input[i]) {
            ++guessedLetters;
            wordToGuess[i] = pressedKey;
            document.getElementById("lettersPlace").innerHTML = wordToGuess.join(' ');
          }
        }
      } else if (lifes > 0) {
        document.getElementById("incorectGuess").appendChild(document.createTextNode(pressedKey + " "));
        document.getElementById("lifes").innerHTML = --lifes;
        bodyParts[incorrectCount].style.display = 'block';
        ++incorrectCount;
      }
    }
    let div = document.getElementById("displayResult");
    let letterToGuess = input.length - 2;
    if (lifes == 0) {
      d3.selectAll("line").remove();
      d3.select("circle").remove();
      document.getElementById("playZone").remove();
      document.getElementById("guessingPlace").remove();
      document.getElementById("displayResult").innerHTML = "GAME OVER!";
      div.style.color = "red";
      resetBtn = "<button id='resetBtn' onclick='resetGame()'>Play again!</button>";
      document.getElementById("resetButton").innerHTML = resetBtn;
      document.getElementById("header").innerHTML = "The word was: " + document.getElementById("enteredWord").value;
    }
    if (guessedLetters === letterToGuess) {
      d3.selectAll("line").remove();
      d3.select("circle").remove();
      document.getElementById("playZone").remove();
      document.getElementById("guessingPlace").remove();
      document.getElementById("displayResult").innerHTML = "GAME WON!";
      div.style.color = "green";
      resetBtn = "<button id='resetBtn' onclick='resetGame()'>Play again!</button>";
      document.getElementById("resetButton").innerHTML = resetBtn;
    }
  }
}

function resetGame() {
  location.reload();
}
