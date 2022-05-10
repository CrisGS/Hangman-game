let guessedLetters = 0;
let lifes = 6;
const wordToGuess = [];
const triedLetters = [];



function addWordLetters() {
  let word = document.getElementById("enteredWord").value;
  let wordLength = word.length;
  let onlyLetters = /^[A-Za-z]+$/;
  if (onlyLetters.test(document.getElementById("enteredWord").value)) {
    if (wordLength >= 4) {
      document.getElementById("lifes").innerHTML = lifes;
      let line = "__";
      for (let i = 1; i < wordLength - 1; ++i) {
        wordToGuess[i] = line;
      }
      wordToGuess[0] = word[0];
      wordToGuess[wordLength - 1] = word[wordLength - 1];
      document.getElementById("lettersPlace").innerHTML = wordToGuess.join(' ');
    } else {
      alert("Please enter a word consisting of 6 or more letters.");
      location.reload();
    }
  } else {
    alert("The word entered must contain only letters!");
    location.reload();
  }
  document.getElementById("subButton").disabled = true;
}


function pressedLetter(event) {
  let pressedKey = event.key;
  let submitBtn = document.getElementById("subButton").disabled;
  let input = document.getElementById("enteredWord").value;
  let check = input.includes(pressedKey);
  if (event.keyCode >= 65 && event.keyCode <= 90 && submitBtn == 1) {
    document.getElementById("allTriedLetters").appendChild(document.createTextNode(pressedKey + " "));
    if (triedLetters.includes(pressedKey)) {
      alert("You have already clicked on this letter. Try another one!");
    } else {
      triedLetters.push(pressedKey);
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
      }
    }
    let div = document.getElementById("displayResult");
    let letterToGuess = input.length - 2;
    if (lifes == 0) {
      document.getElementById("playZone").remove();
      document.getElementById("guessingPlace").remove();
      document.getElementById("displayResult").innerHTML = "GAME OVER!";
      div.style.color = "red";
      let resetBtn = "<button id='resetBtn' onclick='resetGame()'>Play again!</button>";
      document.getElementById("resetButton").innerHTML = resetBtn;
    }
		if (guessedLetters === letterToGuess) {
      document.getElementById("playZone").remove();
      document.getElementById("guessingPlace").remove();
      document.getElementById("displayResult").innerHTML = "GAME WON!";
      div.style.color = "green";
      let resetBtn = "<button id='resetBtn' onclick='resetGame()'>Play again!</button>";
      document.getElementById("resetButton").innerHTML = resetBtn;
    }
  }
}

function resetGame() {
  location.reload();
}
