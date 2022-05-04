let letter;
let lifes = 6;
const wordToGuess = [];

function addWordLetters() {
  document.getElementById("lifes").innerHTML = lifes;
  let word = document.getElementById("enteredWord").value;
  let wordLength = word.length;
  if (wordLength >= 6) {
    for (let i = 0; i < wordLength; ++i) {
      let wordLetters = document.createElement("li");
      wordLetters.id = 'lettersPlace';
      wordToGuess[i] = word[i];
      wordLetters.innerHTML = "<li class='hidenLetter' id='"+ letter +"'>  __  </li>";
      document.body.appendChild(wordLetters);
    }
  } else {
    alert("Please enter a word at least 6 letters long.")
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
    if (check == true) {
      alert("Litera se gaseste in cuvant");
    } else {
      alert("Litera nu se gaseste in cuvant");
      document.getElementById("incorectGuess").appendChild(document.createTextNode(pressedKey + " "));
      document.getElementById("lifes").innerHTML = --lifes;
    }
  }
}

