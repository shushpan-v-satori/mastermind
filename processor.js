//make random sequence for the game code out of the array of availble options
export let gameCode = [];

export const codemaker = (codemakerChoices) => {
    
    let randomIndex;
    let codemakerChoice;
    for (let i = 0; i < 4; i++) {
        randomIndex = Math.floor(Math.random()*codemakerChoices.length);
        codemakerChoice = codemakerChoices[randomIndex];
        codemakerChoices.splice(randomIndex,1);
        gameCode.push(codemakerChoice);
    };
    console.log(gameCode + "--gamecode");
    return gameCode;
};

export const codePegArray =[];

export const verifyGuess = (rowOfGuesses , gameCode) => {
    
    for (let i = 0; i < gameCode.length ; i++) {
        if (rowOfGuesses[i] == gameCode [i] ) {
            codePegArray.push("black");
        }
        else if (rowOfGuesses[i] != gameCode [i] && rowOfGuesses.includes(gameCode[i])) {
            codePegArray.push("white");
        }
        else {
            console.log("no match");
        };
        
    };
    console.log(codePegArray + "----code peg array");
    return codePegArray;
}
