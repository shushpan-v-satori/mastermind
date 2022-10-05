import { verifyGuess, codePegArray } from "./processor.js";
import { codemaker , gameCode } from "./processor.js";

const codemakerCodeDom = document.querySelectorAll(".answer");
console.log(codemakerCodeDom)

const gameCodeDom = document.querySelector(".game__code");
console.log(gameCodeDom);

const codemakerChoices = ["blue","green", "red", "pink", "lightblue", "yellow"];

const choices = document.querySelectorAll(".choice"); //6 colors available for the user
console.log(choices);

const guesses = document.querySelectorAll(".guess"); //all rows of guesses
console.log(guesses);

const confirmGuessesDom = document.querySelectorAll(".guess__confirm"); //all confirmation buttons
console.log(confirmGuessesDom);

const eraseGuesses = document.querySelector(".guess__erase"); //erase button of a single quess
console.log(eraseGuesses);

const pegsDom = document.querySelectorAll(".peg")
console.log(pegsDom);

let colorValue;
// let isChoiceConfirmed = false;
let k = 4;
let j = 12;
let i;
let rowOfGuesses = [];
let gameCodeValue;


//run a codemaker on pageload
gameCodeDom.addEventListener("load", codemaker(codemakerChoices));

// gameCodeValue = ["blue","green", "red", "pink"];


// disable selection of choices for a guess (when guess row is full)
const disableChoices = (choices) => {
  choices.forEach((choice) => {
    choice.disabled = true;
    choice.classList.remove("choice--hover", "blue--click" ,"green--click", "red--click", "pink--click" , "lightblue--click", "yellow--click");
    eraseGuesses.disabled = true;
    eraseGuesses.classList.remove("guess__erase--hover" , "guess__erase--click");
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
    eraseGuesses.classList.add("guess__erase--hover" , "guess__erase--click");
    console.log("enable choices");
  });
};

//Erase last availble guess
eraseGuesses.addEventListener("click", (event) => {
  event.preventDefault();
  guesses[44].classList.remove("pink");
  console.log(guesses[44].classList);
});

choices.forEach((choice) => { //on choice click the color is recognized, populates a row of guesses
  choice.addEventListener("click", (event) => {
    event.preventDefault();
    colorValue = choice.value;
    // console.log(isChoiceConfirmed + "----choices confirmed at the top");
    if (j > 0) {
      if (k > 1 && k <= 4) {
        i = j * 4 - k;
        k--;
        guesses[i].classList.add(colorValue);
        rowOfGuesses.push(colorValue);
        console.log(rowOfGuesses + "----guesses less than 4");
      } else if (k == 1) {
        i = j * 4 - k;
        k = 4;
        j--;
        console.log(j);
        confirmGuessesDom[j].disabled = false;
        confirmGuessesDom[j].classList.add(
          "guess__confirm--enabled",
          "guess__confirm--hover",
          "guess__confirm--click"
        );
        confirmGuessesDom[j].classList.remove("guess__confirm--disabled");
        console.log(confirmGuessesDom[j].classList);
        guesses[i].classList.add(colorValue);
        rowOfGuesses.push(colorValue);
        console.log(rowOfGuesses + "----guesses when 4");
        disableChoices(choices);
        console.log(j +"--"+ k + "---j and k before exiting");
        return j , k;
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
    // isChoiceConfirmed = true;
    confirmation.disabled = true;
    confirmation.classList.add("guess__confirm--disabled");
    confirmation.classList.remove(
      "guess__confirm--enabled",
      "guess__confirm--hover",
      "guess__confirm--click"
    );
    // console.log(isChoiceConfirmed + "-------choice confirmed");
    if (j > 0) {
      verifyGuess(rowOfGuesses, gameCode); //verify the results
      enableChoices(choices);
      rowOfGuesses = [];
      console.log(rowOfGuesses + "row of guesses when after function");
      // isChoiceConfirmed = false;
    } else {
      disableChoices(choices);
    }
  });
});

//show code pegs - white or black based on the guess validation
// const showCodePegs = (codePegArray, j) => {
//     choices.forEach((choice) => {
      
      
//     });
//   };


//show answers


//game reset