//make random sequence for the game code out of the array of availble options
export let gameCode = [];

export const codemaker = (codemakerChoices) => {
    gameCode = [];
    let randomIndex = 0;
    let codemakerChoice = "";
    const codemakerChoicesCopy = [...codemakerChoices];
    for (let i = 0; i < 4; i++) {
        randomIndex = Math.floor(Math.random()*codemakerChoicesCopy.length);
        codemakerChoice = codemakerChoicesCopy[randomIndex];
        codemakerChoicesCopy.splice(randomIndex,1);
        gameCode.push(codemakerChoice);
    };
    console.log(gameCode + "--gamecode");
    return gameCode;
};

export let codePegArray =[];

export const verifyGuess = (rowOfGuesses , gameCode) => {
    codePegArray=[];   
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
