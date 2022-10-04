// import { translateToMorse } from "./processor.js";

const choices = document.querySelectorAll(".choice");
console.log(choices);

const guesses = document.querySelectorAll(".guess")
console.log(guesses);

const rowOfGuesses = document.querySelectorAll(".decoding__board__row")
console.log(rowOfGuesses);

const confirmGuesses = document.querySelectorAll(".guess__confirm")
console.log(confirmGuesses);


let colorValue;
let isChoiceConfirmed = false;
let k = 4;
let j = 12;
let i;

choices.forEach((choice) => { //on choice click the color is recognized
        choice.addEventListener("click", (event) => {
        event.preventDefault();
        colorValue = choice.value;
        if (j > 0) {
            if (k > 1 && k <=4 )  {
                i = j*4-k;
                k--;
            }
            else if (k == 1 ) {
                i = j*4-k;
                k=4;
                j--; 
            }
            else {
                console.log("error");
                return;
            };
        guesses[i].classList.add(colorValue);
        }
        else {
            choice.disabled = true;
        }
    })
});

// for (let j = 12; j > 0 ; j--) {
//     for (let i = 4; i < 0; i--) {
//         k=j*4-i;
//         guesses[k].classList.add(colorValue);
//         console.log(i + " and " + k);
//     }
//     console.log(j);
// }

confirmGuesses.forEach ((confirmation) => {
    confirmation.addEventListener("click", (event) => {
        event.preventDefault();
        isChoiceConfirmed = true;
        console.log(isChoiceConfirmed);
    });
})


