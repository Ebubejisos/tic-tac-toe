let gameTiles = document.querySelectorAll('.gameTiles');
let restartBtn = document.getElementById('restartBtn');
let gameText = document.getElementById('playerTurn');
const playerNameInput = document.getElementById('players');
let textColor = document.getElementById('textColor');
let player = "X";
let running = false;

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
let markings = ["","","","","","","","","",];

function initialize(){
    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;
    if(player1 === "" || player2 === ""){
        window.alert("Please input player names to play the game")
        return;
    }
    playerNameInput.style.display = 'none';
    running = true;
    textColor.setAttribute("class","textRed");
    textColor.innerText = `${player1}'s`;
    gameText.textContent = "turn";
    gameTiles.forEach((tile) => {
        tile.addEventListener('click',btnClicked)
    })
    restartBtn.addEventListener('click', restartGame);
    return player1,player2;
}

function btnClicked(){
    const tileIndex = this.getAttribute("classIndex");
    if(markings[tileIndex] != "" || running != true){
        return;
    }
    updateTile(this,tileIndex);// "this" represents the element i.e line 48 happens to the element
    checkWinner();
}

function updateTile(tile, index){
        markings[index] = player;
        if(player == "O"){
            tile.classList.add('textYellow')
        }
        else{
            tile.classList.add('textRed');
        }
        tile.innerText = player;
}

function changePlayer(){
    player = (player == "X") ? "O" : "X";
    if(player == "O"){
        yellowText();//DOM text styling
    }
    else{
        redText();//DOM text styling
    }
}

// DOM TEXT STYLING
let domClassY;
let domClassR;
function redText(){
    const player1 = document.getElementById('player1').value;
    domClassR = "textYellow";
    textColor.classList.replace('textYellow','textRed');
    textColor.innerText = `${player1}'s`;
    gameText.textContent = "turn";
}

function yellowText(){
    const player2 = document.getElementById('player2').value;
    domClassY = "textRed";
    textColor.classList.replace('textRed', 'textYellow');
    textColor.innerText = `${player2}'s`;
    gameText.textContent = "turn";
}

function checkWinner(){
    let gameWon = false;
    for(let x=0;x<winConditions.length;x++){
        const condition = winConditions[x];
        const tileA = markings[condition[0]];
        const tileB = markings[condition[1]];
        const tileC = markings[condition[2]];
        if(tileA == "" || tileB == "" || tileC == ""){
            continue;
        }
        if(tileA == tileB && tileB == tileC){
            gameWon = true
            break;
        }
    }
    if(gameWon == true){
        currentPlayer = (player == "X") ? document.getElementById('player1').value : document.getElementById('player2').value;
        textColor.innerText = `${currentPlayer}`;
        gameText.textContent = "wins the game";
        running = false;
    }
    else if(!markings.includes("")){
        textColor.innerHTML = "";
        gameText.innerHTML = "It's a tie"
    }
    else{
        changePlayer()

    }
}

function restartGame(){
    markings = ["","","","","","","","","",];
    gameTiles.forEach((tile) => {
        tile.innerText = "";
        tile.classList.remove('textYellow','textRed');
    }
);
    player = "X";
    initialize();
}