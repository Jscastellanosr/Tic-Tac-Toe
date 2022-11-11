/*array inside game module*/
let gameModule = (function(){
    let board = new Array(9);
    const getBoard = () => {
        return board;
    }
    const modBoard = (index, value) => {
        board[index] = value;
    }
    const clearBoard = () => {
        board = new Array(9);
    }


    return{getBoard, modBoard, clearBoard}
})();


let boardflow = (function(){
    const gameSelection = document.querySelector('.gameSelection');
    const selectionScreen = document.querySelector('#selectionScreen');
    const pvp = document.querySelector('.pvp');
    const pvAI = document.querySelector('.pvAI')
    const iconsP1 = document.querySelectorAll('.player1 .pkmnTAB .icon');
    const iconsP2 = document.querySelectorAll('.player2 .pkmnTAB .icon');
    const selectP1 = document.querySelector('.player1 button');
    const selectP2 = document.querySelector('.player2 button');
    const edit1 = document.querySelector('.player1s button');
    const edit2 = document.querySelector('.player2s button');
    const start = document.querySelector('#start');
    const board = document.querySelector('.gameBoard');
    const rounds = document.querySelector('#rounds');
    const score = document.querySelector('.score');
    const p2Label = document.querySelector('.labelP2')
    const computerName = document.querySelector('.computerName')
    let P1Name = document.querySelector('#name1');
    let P2Name = document.querySelector('#name2');

    let gameVSAI; 
    let P1Ready = false;
    let P2Ready = false;
    let P1;
    let P2;

    
    
    pvp.addEventListener('click', ()=>{
        gameSelection.classList.toggle('inactive')
        selectionScreen.classList.toggle('inactive')
        gameVSAI = false;

    })

    pvAI.addEventListener('click', ()=>{
        gameSelection.classList.toggle('inactive')
        selectionScreen.classList.toggle('inactive')
        gameVSAI = true;

        if (gameVSAI == true) {
            P2Name.classList.toggle('inactive');
            p2Label.classList.toggle('inactive');
            computerName.classList.toggle('inactive');
        };

    })



    iconsP1.forEach(icon =>{
        icon.dataset.checked = false;
        icon.addEventListener('click', ()=> {
            iconsP1.forEach(icon => icon.dataset.checked = false);
            icon.dataset.checked = true;

        })
    })
    iconsP2.forEach(icon =>{
        icon.dataset.checked = false;
        icon.addEventListener('click', ()=> {
            iconsP2.forEach(icon => icon.dataset.checked = false);
            icon.dataset.checked = true;

        })
    })


    selectP1.addEventListener('click', ()=> {
        let pkmnP1=null;

        if(!P1Name.value) {
            P1Name.classList.add('emptyField')
            return;
        }

        iconsP1.forEach(icon => {
            if(icon.dataset.checked == 'true') {
                pkmnP1 = icon.getElementsByTagName('img')[0];
            }
        })

        if(!pkmnP1) {
            return;
        }

        P1 = createPlayer(P1Name.value, 1, pkmnP1.alt ,pkmnP1.src)
        console.log(P1.getPName())
        console.log(P1.getPNumber())
        console.log(P1.getPURL())
        togglePKMNScreen('.player1', '.player1s', pkmnP1, '.P1Selected')
        P1Ready = true;

    })
    selectP2.addEventListener('click', ()=> {
        let pkmnP2;


        if (gameVSAI == false) {
            if(!P2Name.value) {
                P2Name.classList.add('emptyField')
                return;
            }
        }
        

        iconsP2.forEach(icon => {
            if(icon.dataset.checked == 'true') {
                pkmnP2 = icon.getElementsByTagName('img')[0];
            }
        })

        if(!pkmnP2) {
            return;
        }

        gameVSAI == false? P2 = createPlayer(P2Name.value, 1, pkmnP2.alt, pkmnP2.src) : P2 = createPlayer('Computer', 1, pkmnP2.alt, pkmnP2.src)

        
        console.log(P2.getPName())
        console.log(P2.getPNumber())
        console.log(P2.getPURL())

        togglePKMNScreen('.player2', '.player2s', pkmnP2, '.P2Selected')
        P2Ready = true;
    });


    edit1.addEventListener('click', () => {
        togglePKMNScreen('.player1', '.player1s', undefined, '.P1Selected');
        P1Ready = false;
    })

    edit2.addEventListener('click', () => {
        togglePKMNScreen('.player2', '.player2s', undefined, '.P2Selected');
        P2Ready = false;
    })

    start.addEventListener('click', () => {


        if (!P1Ready || !P2Ready || !rounds.value) {
            console.log('not ready');
            return;
        }

        score.classList.toggle('inactive')
        selectionScreen.classList.toggle('inactive');
        board.classList.toggle('inactive');
        displayControllerMod.getGameData(P1, P2, rounds.value, gameVSAI);
        console.log('READYYY')
        console.log(P1, P2)
    })



    const togglePKMNScreen = (player, playerS, pkmn, selected) => {
        document.querySelector(`${player}`).classList.toggle('inactive')
        document.querySelector(`${playerS}`).classList.toggle('inactive')

        if(pkmn) document.querySelector(`${selected}`).src = `files/png/pixel/${pkmn.alt}.png`;
        
    };

    const getP1 = () => {return P1;}
    const getP2 = () => {return P2;}

    return{getP1, getP2}


})()


/* Display Control Module*/
let displayControllerMod = (function(){


    const victoryPopUp = document.querySelector('#popUp')
    const victoryWindow = document.querySelector('.victoryWindow')
    const victoryText = document.querySelector('.victoryText')
    const finalScore = document.querySelector('.finalScore')
    const menuButton = document.querySelector('.mainMenu')
    let player1;
    let player2;
    let rounds;
    let round = 0;
    let turn = 0;
    const finalTurn = 9;
    let roundwinner;
    let AI = false;
    


    let gridBoxes = document.querySelectorAll('.gameBoard div');
    let gridIndex = 0;
    let playerTurn = 1;
    gridBoxes.forEach(node => {
        node.dataset.checked = false;
        node.index = gridIndex;
        gridIndex++;
        
        node.addEventListener('click', ()=>{

            

            let symbol;
            let poke;
            

            playerTurn == 1? symbol = player1.getPURL(): symbol = player2.getPURL();
            playerTurn == 1? poke = player1.getpkmn(): poke = player2.getpkmn();
            console.log(node.index)
            

            /*if(gameModule.getBoard()[node.index] == null)*/
            if(node.getAttribute('data-checked') == 'false') {
                turn = turn+1;
                
                
                let mark = document.createElement('img');
                mark.src = symbol;
                node.appendChild(mark);
                gameModule.modBoard(node.index, poke);

                node.dataset.checked = true;

                if (checkGame(gameModule.getBoard())) {return}    
                playerTurn == 1? playerTurn = 2: playerTurn = 1;
                if (turn == finalTurn)roundOver(undefined, true);

                if(playerTurn == 2 && AI == true) {
                    turn = turn+1;
                    
                    console.log('computers turn');


                    /*
                    symbol = player2.getPURL();
                    poke = player2.getpkmn();
                    let available = []
                    for(i = 0; i <= 8 ; i++) {
                        if(tempBoard[i] == null) available.push(i)
                    }     
                    
                    let computerMove = available[Math.round(Math.random()*(available.length - 1))]

                    let compMark = document.createElement('img');
                    compMark.src = symbol;
                    gridBoxes[computerMove].appendChild(compMark);
                    gameModule.modBoard(computerMove, poke);
                    gridBoxes[computerMove].dataset.checked = true;
                    if (checkGame()) {return};*/

                    

                    bestMove(gameModule.getBoard());

                    if (checkGame(gameModule.getBoard())) {return}   

                    playerTurn = 1;
                }


                
                function bestMove (currentBoard) {

                    console.log(currentBoard)
                    console.log(player1.getpkmn())
                    console.log(player2.getpkmn())


                    let bestScore = -Infinity;
                    let bestBox;

                    for(i = 0; i <= 8; i++){
                        console.log("i: " + i)
                        if(currentBoard[i] == null) {
                            currentBoard[i] = player2.getpkmn();
                            let score =  minmax(currentBoard, 1, turn, 0);
                            if(checkGame(currentBoard, true)){
                                bestScore = score;
                                bestBox = i;
                                break;
                            }
                            currentBoard[i] = null;  
                            if(score > bestScore) {
                                bestScore = score;
                                bestBox = i;
                            }                         
                        }
                    }

                    if (turn == 6) console.log("best score: " + bestScore + "." + "bestbox: " + bestBox)
                    
                    

                    let compMark = document.createElement('img');
                    compMark.src = player2.getPURL();
                    gridBoxes[bestBox].appendChild(compMark);
                    gameModule.modBoard(bestBox, player2.getpkmn());
                    gridBoxes[bestBox].dataset.checked = true;
                    console.log(gameModule.getBoard())

                    

                }
                function minmax(tempBoard, pTurn, boardTurn, depth){

                    


                    if (checkGame(tempBoard, true) && pTurn == 1){
                        
                        return 10;
                    }else if(checkGame(tempBoard, true) && pTurn == 2){
                        
                        return -10;
                    }else if(boardTurn == finalTurn){
                        
                        return 0;
                    }

                    if(pTurn == 1){
                        let bestScore;
                        for(let i=0; i<9; i++){
                            if(tempBoard[i] == null){
                                tempBoard[i] = player1.getpkmn();
                                let score = minmax(tempBoard, 2, boardTurn + 1, depth + 1)
                                
                                tempBoard[i] = null;

                                if (bestScore == null) {
                                    bestScore = score;
                                }else if (bestScore > score){
                                    bestScore = score;
                                }
                                
                            }
                        }
                        return bestScore;
                    }else if(pTurn == 2){
                        
                        let bestScore;
                        for(let i=0; i<9; i++){
                            if(tempBoard[i] == null){
                                tempBoard[i] = player2.getpkmn();
                                let score = minmax(tempBoard, 1, boardTurn + 1, depth + 1)
                                tempBoard[i] = null;

                                if (bestScore == null) {
                                    bestScore = score;
                                }else if (bestScore < score){
                                    bestScore = score;
                                }
                            }
                        }
                        
                        return bestScore;
                    }


                }

                



            }
        });

            
        
    });
    
    const checkGame = (board, test) => {

        
        for (j=0;j<=8;j++){
            if (board[j] != null && 
                ((board[j] == board[j+3] && board[j]== board[j+6])||
                ((j == 0 || j == 3 || j == 6) && board[j] == board[j+1] && board[j]== board[j+2]))){
                playerTurn == 1? roundwinner = player1.getPName(): roundwinner = player2.getPName()
                if(test == undefined)roundOver(roundwinner, false);
                return true;
            }
        }
        if(((board[0] != null && board[0] == board[4] && board[0] == board[8])||
            (board[2] != null && board[2] == board[4] && board[2] == board[6]))){
            playerTurn == 1? roundwinner = player1.getPName(): roundwinner = player2.getPName()
            if(test == undefined)roundOver(roundwinner, false);
            return true;
        }
    }

    
    function roundOver (winner, tie) {

        let winnerMSG = ""; 
        turn = 0;
        round = round + 1;

        if(!tie){
            


            if (winner == player1.getPName()) player1.scoreUp();
            if (winner == player2.getPName()) player2.scoreUp();


            console.log('p1: ' + player1.getPScore());
            console.log('p2: ' + player2.getPScore());

            winnerMSG = `${winner} wins the round`;

        }else {
            winnerMSG = 'its a fucken tieeee';
        }

        playerTurn = 1;

        if (round < rounds) {
            showVWindow(winnerMSG, undefined, false);
            setTimeout(() => {
                gameModule.clearBoard();
                renderArray();
            }, 1000);
        }else {

            let victoryMSG;
            if(player1.getPScore()<player2.getPScore()){
                victoryMSG = `Game Over. ${player2.getPName()} wins!!`;
            }else if(player1.getPScore()>player2.getPScore()) {
                victoryMSG = `Game Over. ${player1.getPName()} wins!!`;
            }else{
                victoryMSG = `Game Over. It's a tie!`;
            };

            
            showVWindow(winnerMSG, victoryMSG, true);
            console.log('game is over')
            round = 0;
        }

    }

    let renderArray = () => {
        for(let i=0;i<=8; i++) {
            gridBoxes[i].innerHTML = ""
            gridBoxes[i].dataset.checked = false;
        }
    }

    const getGameData = (P1, P2, Rounds, gameVSAI) => {
        player1 = P1;
        player2 = P2;
        rounds = Rounds;
        AI = gameVSAI;
    }

    const showVWindow = (victoryTXT, gameOverTXT, gameOver) => {

        victoryText.textContent = victoryTXT;

        if(!gameOver){

            victoryPopUp.classList.toggle('active')
            victoryWindow.classList.toggle('active')

            setTimeout(function(){
                victoryPopUp.classList.toggle('active')
                victoryWindow.classList.toggle('active')
            },1000)
            
        }else{

            victoryPopUp.classList.toggle('active')
            victoryWindow.classList.toggle('active')

            setTimeout(function(){
                
                victoryWindow.classList.toggle('active')
            },1000)

            setTimeout(function(){
                victoryText.textContent = gameOverTXT;
                victoryWindow.classList.toggle('active')
                finalScore.classList.toggle('inactive')
                menuButton.classList.toggle('inactive')
                finalScore.textContent = `${player1.getPScore()} - ${player2.getPScore()}`
            },1400)

            
        }

        

    }



    return {getGameData}
})();



/*player Factory Function*/
let createPlayer = function(name, number, pkmn, url) {
    let score = 0;
    const scoreUp = () => {score = score+1}
    const getPName = () => {return name};
    const getPNumber = () => {return number};
    const getpkmn = () => {return pkmn};
    const getPURL = () => {return url};
    const getPScore = () => { return score} 

    return{getPName, getPNumber, getPURL, getpkmn, getPScore, scoreUp}
}









