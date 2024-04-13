const cells = document.querySelectorAll('.c-game-cell');
const statusArea = document.getElementById('statusArea');
const difficultySelect = document.getElementById('difficulty');
const startButtonSingle = document.querySelector(".c-game-button[onclick='startGame(true)']");
const startButtonDouble = document.querySelector(".c-game-button[onclick='startGame(false)']");

startButtonSingle.onclick = () => startGame(true);
startButtonDouble.onclick = () => startGame(false);

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill("");
let isSinglePlayer = false;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function announce(message) {
    statusArea.innerText = message;
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        announce(currentPlayer + " wygrywa!");
        gameActive = false;
        return;
    }
    if (!gameState.includes("")) {
        announce("Remis!");
        gameActive = false;
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    announce(`Gracz ${currentPlayer} wykonuje ruch`);
    if (isSinglePlayer && currentPlayer === 'O' && gameActive) {
        setTimeout(computerMove, 500);
    }
}

function computerMove() {
    let difficulty = difficultySelect.value;
    let move = -1;
    if (difficulty === 'easy') {
        move = findRandomMove();
    } else if (difficulty === 'medium') {
        move = blockOrWinMove('O') || blockOrWinMove('X') || findRandomMove();
    } else {
        move = blockOrWinMove('O') || blockOrWinMove('X') || findCenterOrRandomMove();
    }
    if (move !== -1) {
        gameState[move] = 'O';
        document.querySelector(`[data-cell-index="${move}"]`).innerText = 'O';
        checkWinner();
    }
}

function findRandomMove() {
    let available = gameState.map((cell, idx) => cell === "" ? idx : null).filter(val => val !== null);
    return available[Math.floor(Math.random() * available.length)];
}

function findCenterOrRandomMove() {
    return gameState[4] === "" ? 4 : findRandomMove();
}

function blockOrWinMove(player) {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === gameState[b] && gameState[a] === player && gameState[c] === "") {
            return c;
        } else if (gameState[a] === gameState[c] && gameState[a] === player && gameState[b] === "") {
            return b;
        } else if (gameState[b] === gameState[c] && gameState[b] === player && gameState[a] === "") {
            return a;
        }
    }
    return null;
}

function cellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    if (gameState[clickedCellIndex] !== "" || !gameActive || (isSinglePlayer && currentPlayer === 'O')) {
        return;
    }
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;
    checkWinner();
}

function startGame(singlePlayer) {
    gameActive = true;
    isSinglePlayer = singlePlayer;
    currentPlayer = 'X';
    gameState.fill("");
    cells.forEach(cell => cell.innerText = "");
    announce(`Gracz X rozpoczyna grę${isSinglePlayer ? " (Tryb jednoosobowy)" : ""}`);
    if (isSinglePlayer && currentPlayer === 'O') {
        setTimeout(computerMove, 500);
    }
}

cells.forEach(cell => cell.addEventListener('click', cellClick));
