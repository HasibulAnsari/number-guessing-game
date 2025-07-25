let randomNumber=parseInt(Math.random()*100+1);

const submit=document.querySelector("#subt");
const userInput=document.querySelector("#guessField");
const guessSlot=document.querySelector(".guesses");
const remaining=document.querySelector(".lastResult");
const lowOrHi=document.querySelector(".lowOrHi");
const startOver=document.querySelector(".resultParas");

const p=document.createElement("p");

let prevGuess=[];
let numGuess=1;
let playGame=true;

if(playGame)
{
    submit.addEventListener("click",(e) =>{
        e.preventDefault()
        const guess=parseInt(userInput.value);
        console.log(guess);
        validateGuess(guess);
    })
}
function validateGuess(guess){
    if(isNaN(guess)){
        alert("Please enter a valid number !");
    }
    else if(guess<1){
        alert("Please enter a number greater than 0 !");
    }
     else if(guess>100){
        alert("Please enter a number less than 100 !");
    }
    else{
        prevGuess.push(guess);
        if(numGuess === 10)
        {
            displayGuess(guess);
            displayMessage(`Game Over , random number was ${randomNumber}`);
            endGame();
        }
        else{
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess){
    if(guess===randomNumber)
    {
        displayMessage(`You guessed it right`);
        endGame();
    }
    else if(guess > randomNumber)
    {
        displayMessage(`Number is Too High`);
    }
     else if(guess < randomNumber)
    {
        displayMessage(`Number is Too low`);
    }
}

function displayGuess(guess){
    userInput.value= ``;
    guessSlot.innerHTML += `${guess}, `;
    numGuess++;
    remaining.innerHTML = `${11 - numGuess} `;
}

function displayMessage(message){
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame(){
    userInput.value==``;
    userInput.setAttribute(`disabled`, ``);  // We can't give input further 
    p.classList.add("button");
    p.innerHTML= `<h3 id="newGame">New game</h3>`;
    startOver.appendChild(p);
    playGame=false;
    newGame();
}

function newGame(){
    const newGameButton=document.querySelector("#newGame");
    newGameButton.addEventListener("click",(e)=>{
        randomNumber=parseInt(Math.random()*100+1);
        prevGuess=[];
        numGuess=1;
        guessSlot.innerHTML=``;
        remaining.innerHTML = `${10 - numGuess} `;
        userInput.removeAttribute(`disabled`);
        startOver.removeChild(p);
        lowOrHi.innerHTML='';
        playGame=true;
    })
}