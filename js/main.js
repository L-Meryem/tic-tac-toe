// I need to pick which player goes first (Random or last player)
// Display players wins / loses
// Stop player from clicking selected cells
// player lose
//player tie
//CSS

const cells = document.querySelectorAll('.grid-cell');
cells.forEach(cell =>
    cell.addEventListener('click', () => play(cell))
);

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', clearGrid);


class Player {
    constructor(name) {
        this.name = name;
        this.win = 0;
        this.lose = 0;
        this.choices = [];
    }
    addChoice(choice) {
        this.choices.push(+choice);
    }
    clearChoises() {
        this.choices = [];
    }
    wins() {
        this.win++;
    }
    loses() {
        this.lose++;
    }
}

const xPlayer = new Player('X');
const oPlayer = new Player('O');
let currentPlayer = xPlayer;


function play(cell) {
    //disable cell
    cell.classList.add('disable');
    //Show X or O
    cell.innerText = currentPlayer.name;
    //Add choice
    currentPlayer.addChoice(+cell.id);
    //Call win()
    doIWin(currentPlayer);
    //Switch player
    currentPlayer = (currentPlayer === xPlayer) ? oPlayer : xPlayer;
    //Show who's turn is it
    document.querySelector('.turn').innerText = currentPlayer.name;
}

function doIWin(player) {
    //WinCombos is an array of winner combos
    for (const combo of winCombos) {
        let strike = 0;
        for (const cell of combo) {
            if (player.choices.includes(cell)) {
                strike++;
            }
        }
        if (strike === 3) {
            player.wins();
            document.querySelector('.winner').innerText = currentPlayer.name + ' wins!';
            console.log(player.name + ' wins!');
            setTimeout(clearGrid, 1500);
            break;
        }
    }
}

function clearGrid() {
    cells.forEach(cell => cell.innerText = '');
    xPlayer.clearChoises();
    oPlayer.clearChoises();
    document.querySelector('.turn').innerText = currentPlayer.name;
}


/* 
the grid numbering

11 | 12 | 13
21 | 22 | 23
31 | 32 | 33

*/

const winCombos = [
    //horiz
    [11, 12, 13],
    [21, 22, 23],
    [31, 32, 33],
    //verti
    [11, 21, 31],
    [12, 22, 32],
    [13, 23, 33],
    //diagonal
    [11, 22, 33],
    [31, 22, 13]
]

