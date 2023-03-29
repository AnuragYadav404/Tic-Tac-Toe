const board = document.querySelector('.board');
const container = document.querySelector('.container')

var playeOneName = prompt("Enter playerOne name");
var playerTwoName = prompt("Enter playerTwo name");

// set value for o->3, x->5 ... will later help in game finsish
function Player(marker) {
    const value = (marker === 'o') ? 3 : 5;
    const color = (marker === 'o') ? 'red' : 'blue';
    const setName = function(name) {
        this.name = name;
    }
    const getName = function() {
        return this.name;
    }
    return {
        marker,
        value,
        color,
        setName,
        getName,
    }
}

var Gameboard = (function() {

    const player1 = Player('o');
    const player2 = Player('x');
    currentPlayer = player1;

    gameboard = [];
    
    const switchPlayer = function() {
        if(this.currentPlayer === this.player1) {
            this.currentPlayer = this.player2;
        }else {
            this.currentPlayer = this.player1;
        }
    };

    const resetBoard = function() {
        this.gameboard = [0,0,0,0,0,0,0,0,0];
        this.currentPlayer = player1;
    }

    const setNames = function(name1, name2) {
        player1.setName(name1);
        player2.setName(name2);
    }

    const getNames = function() {
        let playerOneName = player1.getName();
        let playerTwoName = player2.getName();
        return {playeOneName, playerTwoName};
    }

    return {
        currentPlayer,
        gameboard,
        player1,
        player2,
        switchPlayer,
        resetBoard,
        setNames,
        getNames,
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
    // remove out all the 9 buttons on board
    const buttons = document.querySelectorAll('.btns');
    buttons.forEach((btn)=>{
        btn.innerText = ''
    })
    
    Gameboard.resetBoard();
    
    container.lastChild.remove()
    board.style.cssText = 'pointer-events:auto';
}




function displayResult(winner = 'draw') {
    board.style.cssText = 'pointer-events:none';
    // const divEle = create displayDiv(); 
    const divEle = document.createElement('div');
    const title = document.createElement('h3');
    const btn = document.createElement('button');
    
    divEle.style.cssText = 'background: linear-gradient(90deg, #efd5ff 0%, #515ada 100%);width:600px;text-align:center;margin-top:32px;border-radius:20px;padding:20px;';
    title.style.cssText = 'font-size:32px'
    btn.style.cssText = 'background: linear-gradient(90deg, #fcff9e 0%, #c67700 100%);font-size:16px;padding:16px;border-radius:10px;font-weight:600;border:2px solid yellow;border-radius:20px;'
   
    btn.innerText = 'Play Again';

    divEle.appendChild(title);
    divEle.appendChild(btn);
    
    btn.addEventListener('click', reset);
    container.appendChild(divEle);
    
    if(winner == 'draw') {  
        title.innerText = `game ended in a DRAW :()`
    }else {
        title.innerText = `${winner} has won the game!! sewwwy`;   
    }
}



function btnClick(e){
    const cell = e.target;
    // console.log(cell);
    // console.log(Gameboard.currentPlayer);
    if(cell.innerText === '') {
        // mark the cell
        // markCell(e.target, )
        cell.innerText = Gameboard.currentPlayer.marker; 
        cell.style.fontSize = '64px'
        cell.style.color = Gameboard.currentPlayer.color;
        Gameboard.gameboard[e.target.data] = Gameboard.currentPlayer.value;
        //check for win
        if(checkWin()){
            let winner = Gameboard.currentPlayer.getName();
            displayResult(winner);
            return;
        }else if(checkDraw()){
            displayResult();
            return;
        }
        Gameboard.switchPlayer();
    
    }
    
}

function createBtn() {
    const btn = document.createElement('button');
    btn.addEventListener('click', btnClick)
    return btn;
}

function displayBoard(boardArr) {
    
    for(let i=0; i<9; i++) {
        let btn = createBtn();
        btn.data  = i;
        btn.className = "btns";
        boardArr[i] = 0;
        board.appendChild(btn);
    }

}

function instructionDiv(name1, name2) {
    const divEle = document.createElement('div');
    const text1 = document.createElement('h2');
    const text2 = document.createElement('h2');
    const text3 = document.createElement('h2');
    text1.innerText = `'O' is ${name1}`;
    text2.innerText = `'X' is ${name2}`;
    text3.innerText = `${name1} starts first`;
    divEle.appendChild(text1);
    divEle.appendChild(text2);
    divEle.appendChild(text3);
    divEle.className = 'head';
    container.appendChild(divEle);

}

Gameboard.setNames(playeOneName, playerTwoName);
instructionDiv(playeOneName, playerTwoName);
displayBoard(Gameboard.gameboard);
