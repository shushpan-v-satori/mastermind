import { verifyGuess, codePegArray } from "./processor.js";
import { codemaker, gameCode } from "./processor.js";

//DOM elements
const codemakerCodeDom = document.querySelectorAll(".answer");
console.log(codemakerCodeDom);

const gameCodeDom = document.querySelector(".game__code");
console.log(gameCodeDom);

const resetButton = document.querySelector(".code__reset");
console.log(resetButton);

const choices = document.querySelectorAll(".choice"); //6 colors available for the user
console.log(choices);

const guesses = document.querySelectorAll(".guess"); //all rows of guesses
console.log(guesses);

const confirmGuessesDom = document.querySelectorAll(".guess__confirm"); //all confirmation buttons
console.log(confirmGuessesDom);

const eraseGuesses = document.querySelector(".guess__erase"); //erase button of a single quess
console.log(eraseGuesses);

const groupOfPegs = document.querySelectorAll(".code__pegs");
console.log(groupOfPegs);

const pegsDom = document.querySelectorAll(".peg");
console.log(pegsDom);

const codemakerChoices = [
  "blue",
  "green",
  "red",
  "pink",
  "lightblue",
  "yellow",
];

// variables

let colorValue;
let k = 4;
let rowId = 12;
let guessId = 0;
let rowOfGuesses = [];

//run a codemaker on pageload
gameCodeDom.addEventListener("load", codemaker(codemakerChoices));

// disable selection of choices for a guess (when guess row is full)
const disableChoices = (choices) => {
  choices.forEach((choice) => {
    choice.disabled = true;
    choice.classList.remove(
      "choice--hover",
      "blue--click",
      "green--click",
      "red--click",
      "pink--click",
      "lightblue--click",
      "yellow--click"
    );
    eraseGuesses.disabled = true;
    eraseGuesses.classList.remove("guess__erase--hover", "guess__erase--click");
    console.log("disable choices");
  });
};

//enable selection of choices for a guess (when guess row is empty)
const enableChoices = (choices) => {
  choices.forEach((choice) => {
    choice.disabled = false;
    choice.classList.add("choice--hover");
    switch (choice.value) {
      case "blue":
        choice.classList.add("blue--click");
        break;
      case "green":
        choice.classList.add("green--click");
        break;
      case "red":
        choice.classList.add("red--click");
        break;
      case "pink":
        choice.classList.add("pink--click");
        break;
      case "lightblue":
        choice.classList.add("lightblue--click");
        break;
      case "yellow":
        choice.classList.add("yellow--click");
        break;
      default:
        alert("error with page styling");
        return;
    }
    eraseGuesses.disabled = false;
    eraseGuesses.classList.add("guess__erase--hover", "guess__erase--click");
    console.log("enable choices");
  });
};

//Erase last availble guess
eraseGuesses.addEventListener("click", (event) => {
  event.preventDefault();
  guesses[44].classList.remove("pink");
  console.log(guesses[44].classList);
});

// populating the row of guesses
choices.forEach((choice) => {
  //on choice click the color is recognized, populates a row of guesses
  choice.addEventListener("click", (event) => {
    event.preventDefault();
    colorValue = choice.value;
    if (rowId > 0) {
      if (k > 1 && k <= 4) {
        guessId = rowId * 4 - k;
        k--;
        guesses[guessId].classList.add(colorValue);
        rowOfGuesses.push(colorValue);
        console.log(rowOfGuesses + "----guesses less than 4");
      } else if (k == 1) {
        guessId = rowId * 4 - k;
        k = 4;
        rowId--;
        console.log(rowId);
        confirmGuessesDom[rowId].disabled = false;
        confirmGuessesDom[rowId].classList.add(
          "guess__confirm--enabled",
          "guess__confirm--hover",
          "guess__confirm--click"
        );
        confirmGuessesDom[rowId].classList.remove("guess__confirm--disabled");
        console.log(confirmGuessesDom[rowId].classList);
        guesses[guessId].classList.add(colorValue);
        rowOfGuesses.push(colorValue);
        console.log(rowOfGuesses + "----guesses when 4");
        disableChoices(choices);
        console.log(rowId + "--" + k + "---j and k before exiting");
        return rowId, k;
      } else {
        console.log("error");
        return;
      }
    }
  });
});

//Click to confirm the guess

confirmGuessesDom.forEach((confirmation) => {
  //confirms a guess
  confirmation.addEventListener("click", (event) => {
    event.preventDefault();
    confirmation.disabled = true;
    confirmation.classList.add("guess__confirm--disabled");
    confirmation.classList.remove(
      "guess__confirm--enabled",
      "guess__confirm--hover",
      "guess__confirm--click"
    );
    if (rowId > 0) {
      const codePegsArrayValue = verifyGuess(rowOfGuesses, gameCode); //verify the results
      showCodePegs(pegsDom, rowId, codePegsArrayValue); // display black and white pegs
      // You have won
      //   if (){
      //     youHaveWon();
      //     resetButton();
      //     return;
      //   }
      enableChoices(choices);
      rowOfGuesses = [];
      console.log(rowOfGuesses + "row of guesses when after function");
    } else {
      disableChoices(choices);
    }
  });
});

// show code pegs - white or black based on the guess validation
const showCodePegs = (pegsDom, rowId, codePegArray) => {
  let pegId = 0;
  let m = 4;
  codePegArray = codePegArray.sort();
  for (let x = 0; x < codePegArray.length; x++) {
    if (m > 1 && m <= 4) {
      pegId = (rowId + 1) * 4 - m;
      m--;
      pegsDom[pegId].classList.add(codePegArray[x]);
    } else if (m == 1) {
      pegId = (rowId + 1) * 4 - m;
      m = 4;
      pegsDom[pegId].classList.add(codePegArray[x]);
    }
  }
};

// you have won

//show answers

//clicking reset button
resetButton.addEventListener("click", (event) => {
  event.preventDefault();
  codeReset();
});

//game reset
const codeReset = () => {
  colorValue = "";
  k = 4;
  rowId = 12;
  guessId = 0;
  rowOfGuesses = [];
  guesses.forEach((guess) => {
    guess.classList.remove(
      "blue",
      "green",
      "red",
      "pink",
      "lightblue",
      "yellow"
    );
  });
  pegsDom.forEach((peg) => {
    peg.classList.remove("black", "white");
  });
  confirmGuessesDom.forEach((confirmation) => {
    confirmation.disabled = true;
    confirmation.classList.add("guess__confirm--disabled");
    confirmation.classList.remove(
      "guess__confirm--enabled",
      "guess__confirm--hover",
      "guess__confirm--click"
    );
  });
  codemaker(codemakerChoices);
  enableChoices(choices);
};
