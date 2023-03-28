const board = document.querySelector('.board');

function Player(marker) {
    const value = (marker === 'o') ? 3 : 5;
    const color = (marker === 'o') ? 'red' : 'blue';
    return {
        marker,
        value,
        color
    }
}

var Gameboard = (function() {
    const player1 = Player('o');
    const player2 = Player('x');
    currentPlayer = player1;
    gameboard = [];
    // gameboard = [['','',''],
    //              ['','',''],
    //              ['','','']
    //             ];
    const switchPlayer = function() {
        if(this.currentPlayer === this.player1) {
            this.currentPlayer = this.player2;
        }else {
            this.currentPlayer = this.player1;
        }
    };
    const resetBoard = function() {
        this.gameboard = [];
        this.currentPlayer = player1;
    }
    return {
        currentPlayer,
        gameboard,
        player1,
        player2,
        switchPlayer,
        resetBoard
    }
})();


function winnerQ(a, b, c) {
    const brd = Gameboard.gameboard;
    const val = brd[a]*brd[b]*brd[c];
    if((val === 125) || (val === 27)){
        return true;
    }
    return false;
}

function checkDraw() {
    let val = 1;
    for(let i =0;i<9;i++) {
        val *= Gameboard.gameboard[i];
    }
    if(val>0) {
        return true
    }
    return false;
}

function checkWin() {
    return winnerQ(0,1,2)  // check for 3-in-a-row horizontally
    ||  winnerQ(3,4,5) 
    ||  winnerQ(6,7,8) 
    ||  winnerQ(0,3,6)  // check for 3-in-a-row vertically
    ||  winnerQ(1,4,7) 
    ||  winnerQ(2,5,8) 
    ||  winnerQ(0,4,8)  // check for 3-in-a-row diagonally
    ||  winnerQ(6,4,2);
    
}

function reset() {
    while(board.firstChild){
        board.firstChild.remove();
    }
    Gameboard.resetBoard();
    displayBoard(Gameboard.gameboard);
    
}


function declareDraw() {
    alert("The game ends with a draw :(");
    reset();
}

function declareWin() {
   
}



function btnClick(e){
    const cell = e.target;
    var win = false;
    console.log(cell);
    console.log(Gameboard.currentPlayer);
    if(cell.innerText === '') {
        // mark the cell
        // markCell(e.target, )
        cell.innerText = Gameboard.currentPlayer.marker; 
        cell.style.fontSize = '64px'
        cell.style.color = Gameboard.currentPlayer.color;
        Gameboard.gameboard[e.target.data] = Gameboard.currentPlayer.value;
        //check for win
        if(checkWin()){
            alert(`${Gameboard.currentPlayer.marker.toUpperCase()} has won the game`);
            reset();
            return;
        }else if(checkDraw()){
            alert("The game ends with a draw :(");
            reset();
            return;
        }
        Gameboard.switchPlayer();
        console.log(Gameboard.gameboard)
        
    }
    
}

function createBtn() {
    const btn = document.createElement('button');
    // btn.innerText = '';
    btn.addEventListener('click', btnClick)
    return btn;
}

function displayBoard(boardArr) {
    
    for(let i=0; i<9; i++) {
        let btn = createBtn();
        btn.data  = i;
        boardArr[i] = 0;
        board.appendChild(btn);
    }

}


displayBoard(Gameboard.gameboard);
