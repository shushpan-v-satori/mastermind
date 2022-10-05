const codemakerChoices = ["blue","green", "red", "pink", "lightblue", "yellow"];

//make random sequence for the game code out of the array of availble options
export const codemaker = (codemakerChoices) => {
    const gameCode = [];
    let randomIndex;
    let codemakerChoice;
    for (let i = 0; i < 4; i++) {
        randomIndex = Math.floor(Math.random()*codemakerChoices.length);
        codemakerChoice = codemakerChoices[randomIndex];
        codemakerChoices.splice(randomIndex,1);
        gameCode.push(codemakerChoice);
        console.log(gameCode);
    };
    return gameCode;
};

export const verifyGuess = (rowOfGuesses) => {
    console.log("ze function");
}