import { verifyGuess, codePegArray } from "./processor.js";
import { codemaker, gameCode } from "./processor.js";

//DOM elements
const codemakerCodeDom = document.querySelectorAll(".answer");
console.log(codemakerCodeDom);

const codemakerQuestionmark = document.querySelectorAll(".answer__p");
console.log(codemakerQuestionmark);

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

const pegsDom = document.querySelectorAll(".peg");

const gameEndMessageDom = document.querySelector(".game__end");

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
let rowID = 12;
let guessId;
let rowOfGuesses = [];
let isAWinner = false;
let eraseId;

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
  });
};

//const disableErase button
const disableEraseButton = () => {
    console.log('enter disable erase');
    eraseGuesses.disabled = true;
    eraseGuesses.classList.remove("guess__erase--hover", "guess__erase--click");
    console.log("disabled erase");
}


const enableEraseButton = () => {
    console.log('enter enable erase');
    eraseGuesses.disabled = false;
    eraseGuesses.classList.add("guess__erase--hover", "guess__erase--click");
    console.log("enabled erase");
}

//Erase last availble guess

// eraseGuesses.addEventListener("click", (event) =>{
//     event.preventDefault();
// });


// populating the row of guesses
choices.forEach((choice) => {
  //on choice click the color is recognized, populates a row of guesses
  choice.addEventListener("click", (event) => {
    event.preventDefault();
    console.log('entered guess processing')
    enableEraseButton();
    console.log(k + "---------K as requested by ");
    colorValue = choice.value;
    if (rowID > 0) {
      //populates guesses till the last row
      if (k > 1 && k <= 4) {
        guessId = rowID * 4 - k;
        eraseId=k;
        k--;
        guesses[guessId].classList.add(colorValue);
        rowOfGuesses.push(colorValue);
        console.log(
          guessId + " " + rowID + " " + k + ' '+ eraseId +"---------myguesses k>1<4"
        ); 
      } else if (k == 1) {
        eraseId=k;
        guessId = rowID * 4 - k;
        confirmGuessesDom[rowID - 1].disabled = false;
        confirmGuessesDom[rowID - 1].classList.add(
          "guess__confirm--enabled",
          "guess__confirm--hover",
          "guess__confirm--click"
        );
        confirmGuessesDom[rowID - 1].classList.remove(
          "guess__confirm--disabled"
        );
        guesses[guessId].classList.add(colorValue);
        rowOfGuesses.push(colorValue);
        disableChoices(choices);
        console.log(
          guessId + " " + rowID + " " + k + ' '+ eraseId+ "---------myguesses k==1"
        ); 
      } else {
        console.log("error");
        return;
      }
    }
  });
});

// erase guess
eraseGuesses.addEventListener("click", (event) => {
  event.preventDefault();
  console.log('enter erase function');
  console.log(k + " " + eraseId);
  console.log(guesses[guessId]);
  guesses[guessId].classList.remove(
    "blue",
    "green",
    "red",
    "pink",
    "lightblue",
    "yellow"
  );
  rowOfGuesses.pop();
  console.log(rowOfGuesses);
  k  = eraseId;
  eraseId++;
  guessId = rowID * 4 - eraseId;
 if (eraseId>=5) {
    disableEraseButton();
 }
 else enableEraseButton();
  console.log(guessId + " " +k + " " + eraseId + "---from erase");
  enableChoices(choices);
  confirmGuessesDom.forEach((confirmation) => {
    confirmation.disabled = true;
    confirmation.classList.add("guess__confirm--disabled");
    confirmation.classList.remove(
      "guess__confirm--enabled",
      "guess__confirm--hover",
      "guess__confirm--click"
    );
  });
//   return k, guessId;
});

//Click to confirm the guess

confirmGuessesDom.forEach((confirmation) => {
  //confirms a guess
  confirmation.addEventListener("click", (event) => {
    event.preventDefault();
    k = 4;
    rowID--; //becomes 0 for the first row, means that all rows are popualted with guesses
    confirmation.disabled = true;
    confirmation.classList.add("guess__confirm--disabled");
    confirmation.classList.remove(
      "guess__confirm--enabled",
      "guess__confirm--hover",
      "guess__confirm--click"
    );
    disableEraseButton();
    if (rowID > 0) {
      //all rows but last
      const codePegsArrayValue = verifyGuess(rowOfGuesses, gameCode); //verify the results
      showCodePegs(pegsDom, rowID, codePegsArrayValue); // display black and white pegs
      allPegsAreBlack(codePegsArrayValue); //check if won
      if (isAWinner == true) {
        // won
        showAnswers(rowOfGuesses);
        displayWinningMessage();
        //click on start a new game
        const startGameButton = document.querySelector(".new__game");
        startGameButton.addEventListener("click", (event) => {
          event.preventDefault();
          codeReset();
        });
        //click on OK
        const okButton = document.querySelector(".game__end__dismiss");
        okButton.addEventListener("click", (event) => {
          event.preventDefault();
          hideWinningMessage();
        });
        return;
      }
      enableChoices(choices);
      rowOfGuesses = [];
    } else if (rowID == 0) {
      //last row
      const codePegsArrayValue = verifyGuess(rowOfGuesses, gameCode); //verify the results
      showCodePegs(pegsDom, rowID, codePegsArrayValue); // display black and white pegs
      allPegsAreBlack(codePegsArrayValue); //check if won
      if (isAWinner == true) {
        // won
        showAnswers(rowOfGuesses);
        displayWinningMessage();
        //click on start a new game
        const startGameButton = document.querySelector(".new__game");
        startGameButton.addEventListener("click", (event) => {
          event.preventDefault();
          codeReset();
        });
        //click on OK
        const okButton = document.querySelector(".game__end__dismiss");
        okButton.addEventListener("click", (event) => {
          event.preventDefault();
          hideWinningMessage();
        });
      } else {
        showAnswers(rowOfGuesses);
        displayLosingMessage();
        //click on start a new game
        const startGameButton = document.querySelector(".new__game");
        startGameButton.addEventListener("click", (event) => {
          event.preventDefault();
          codeReset();
        });
        //click on OK
        const okButton = document.querySelector(".game__end__dismiss");
        okButton.addEventListener("click", (event) => {
          event.preventDefault();
          hideLosingMessage();
        });
        disableChoices(choices);
      }
    } else {
      //lost
      showAnswers(rowOfGuesses);
      displayLosingMessage();
      //click on start a new game
      const startGameButton = document.querySelector(".new__game");
      startGameButton.addEventListener("click", (event) => {
        event.preventDefault();
        codeReset();
      });
      //click on OK
      const okButton = document.querySelector(".game__end__dismiss");
      okButton.addEventListener("click", (event) => {
        event.preventDefault();
        hideLosingMessage();
      });
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

// check that all code pegs are black
const allPegsAreBlack = (codePegArray) => {
  if (codePegArray.length < 4) {
    isAWinner = false;
  } else {
    isAWinner = codePegArray.every((peg) => {
      if (peg == "black") {
        return true;
      }
    });
  }
  return isAWinner;
};

//winning message on display
const displayWinningMessage = () => {
  gameEndMessageDom.innerHTML = `
        <div class="game__end__message">
            <h1>You have cracked the code!</h1>
            <p>Congratulations!!!</p>
            <button class="game__end__button game__end__dismiss game__end__button--hover game__end__button--click">Ok</button>
            <button class="game__end__button new__game game__end__button--hover game__end__button--click">Start new game</button>
        </div>
    `;
  resetButton.disabled = true;
  resetButton.classList.remove("code__reset--hover", "code__reset--click");
};

// remove winning message
const hideWinningMessage = () => {
  gameEndMessageDom.innerHTML = "";
  resetButton.disabled = false;
  resetButton.classList.add("code__reset--hover", "code__reset--click");
};

//losing message on display
const displayLosingMessage = () => {
  gameEndMessageDom.innerHTML = `
          <div class="game__end__message">
              <h1>Better luck next time!</h1>
              <p>You can do it</p>
              <button class="game__end__button game__end__dismiss game__end__button--hover game__end__button--click">Ok</button>
              <button class="game__end__button new__game game__end__button--hover game__end__button--click">Start new game</button>
          </div>
      `;
  resetButton.disabled = true;
  resetButton.classList.remove("code__reset--hover", "code__reset--click");
};

// remove winning message
const hideLosingMessage = () => {
  gameEndMessageDom.innerHTML = "";
  resetButton.disabled = false;
  resetButton.classList.add("code__reset--hover", "code__reset--click");
};

//show answers
const showAnswers = (rowOfGuesses) => {
  for (let i = 0; i < codemakerCodeDom.length; i++) {
    codemakerCodeDom[i].classList.add(rowOfGuesses[i]);
    codemakerQuestionmark[i].innerHTML = "";
  }
};

//clicking reset button (top of the screen)
resetButton.addEventListener("click", (event) => {
  event.preventDefault();
  codeReset();
});

//game reset
const codeReset = () => {
  colorValue = "";
  k = 4;
  rowID = 12;
  guessId = 0;
  rowOfGuesses = [];
  isAWinner = false;
  eraseId = 0;
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
  codemakerCodeDom.forEach((answer) => {
    answer.classList.remove(
      "blue",
      "green",
      "red",
      "pink",
      "lightblue",
      "yellow"
    );
  });
  codemakerQuestionmark.forEach((answer) => {
    answer.innerHTML = "?";
  });
  hideWinningMessage();
  codemaker(codemakerChoices);
  enableChoices(choices);
  disableEraseButton();
};
