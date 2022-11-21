/*array inside game module*/
let gameModule = (function(){
    let board = new Array(9);
    const getBoard = () => {
        return board;
    };
    const modBoard = (index, value) => {
        board[index] = value;
    };
    const clearBoard = () => {
        board = new Array(9);
    };
    return{getBoard, modBoard, clearBoard}
})();


let boardflow = (function(){
    const gameSelection = document.querySelector('.gameSelection');
    const selectionScreen = document.querySelector('#selectionScreen');
    const pvp = document.querySelector('.pvp button');
    const pvAI = document.querySelector('.pvAI button')
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
    const difficulty = document.querySelector('#difficulty')
    const error = document.querySelector('.missingInfo')
    let P1Name = document.querySelector('#name1');
    let P2Name = document.querySelector('#name2');
    

    let level;
    let gameVSAI; 
    let P1Ready = false;
    let P2Ready = false;
    let P1;
    let P2;


    pvp.addEventListener('mousedown', ()=> {
        pvp.classList.add('clicked');
    });    
    pvp.addEventListener('click', ()=>{
        setTimeout(() => {
            gameSelection.classList.toggle('inactive');
            selectionScreen.classList.toggle('inactive');
            gameVSAI = false;
        }, 50);
    })
    pvAI.addEventListener('mousedown', ()=> {
        pvAI.classList.add('clicked');
    });
    
    pvAI.addEventListener('click', ()=>{
        setTimeout(() => {
            gameSelection.classList.toggle('inactive')
            selectionScreen.classList.toggle('inactive')
            gameVSAI = true;
        }, 50);
        
        P2Name.classList.toggle('inactive');
        p2Label.classList.toggle('inactive');
        computerName.classList.toggle('inactive');   
    })

    window.addEventListener('mouseup', ()=> {
        pvp.classList.remove('clicked');
        pvAI.classList.remove('clicked');
    }); 


    iconsP1.forEach(icon =>{
        icon.dataset.checked = false;
        icon.addEventListener('click', ()=> {
            iconsP1.forEach(icon => {
                icon.dataset.checked = false;
                icon.classList.remove('selectedP1')
            });
            icon.dataset.checked = true;
            icon.classList.add('selectedP1')
        })
    })
    iconsP2.forEach(icon =>{
        icon.dataset.checked = false;
        icon.addEventListener('click', ()=> {
            iconsP2.forEach(icon => {
                icon.dataset.checked = false
                icon.classList.remove('selectedP2')
            });
            icon.dataset.checked = true;
            icon.classList.add('selectedP2')
        })
    })


    P1Name.addEventListener('click', ()=> {
        P1Name.classList.remove('emptyField')
    })
    P2Name.addEventListener('click', ()=> {
        P2Name.classList.remove('emptyField')
    })

    difficulty.addEventListener('click', ()=> {
        if(difficulty.value == 'easy') difficulty.setAttribute('style', 'background: rgb(0, 255, 195)')
        if(difficulty.value == 'medium') difficulty.setAttribute('style', 'background: rgb(255, 221, 0)')
        if(difficulty.value == 'hard') difficulty.setAttribute('style', 'background: rgb(255, 17, 0)')
    })

    selectP1.addEventListener('click', ()=> {
        let pkmnP1=null;

        if(!P1Name.value|| checkForErrors(1)) {
            P1Name.classList.add('emptyField')
            return;
        }

        iconsP1.forEach(icon => {
            if(icon.dataset.checked == 'true') {
                pkmnP1 = icon.getElementsByTagName('img')[0];
            }
        })

        if(!pkmnP1) {
            checkForErrors(4)
            return;
        }

        
        if(gameVSAI) {
            if(checkForErrors(2)) return;
        }

        P1 = createPlayer(P1Name.value, 1, pkmnP1.alt ,pkmnP1.src)

        togglePKMNScreen('.player1', '.player1s', pkmnP1, '.P1Selected')
        P1Ready = true;

    })


    selectP2.addEventListener('click', ()=> {
        let pkmnP2;

        if (gameVSAI == false) {
            if(!P2Name.value || checkForErrors(1)) {
                P2Name.classList.add('emptyField')
                return;
            }
        } else {
            level = difficulty.value;
        }
        

        iconsP2.forEach(icon => {
            if(icon.dataset.checked == 'true') {
                pkmnP2 = icon.getElementsByTagName('img')[0];
            }
        })

        if(!pkmnP2) {
            checkForErrors(4)
            return;
        }

        gameVSAI == false? P2 = createPlayer(P2Name.value, 1, pkmnP2.alt, pkmnP2.src) : P2 = createPlayer('Computer', 1, pkmnP2.alt, pkmnP2.src)


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

        if (checkForErrors(3)) {return};


        score.classList.toggle('inactive')
        selectionScreen.classList.toggle('inactive');
        board.classList.toggle('inactive');

        playersOBJ[0] = P1;
        playersOBJ[1] = P2;

        displayControllerMod.getGameData(rounds.value, gameVSAI, level);
        console.log('READYYY')
        console.log(P1, P2)
    })

    function checkForErrors(type) {

        if(type == 1) {
            if(((P1Ready) && P1.getPName() == P2Name.value) || ((P2Ready) && P2.getPName() == P1Name.value) ){
                error.classList.remove('inactive')
                error.textContent = `Both players can't have the same name`
                setTimeout(() => {
                    error.classList.add('inactive')
                }, 1200);
                return true;
                
            };
        }else if(type == 2) {
            if(P1Name.value.toLowerCase() == 'computer') {
                error.classList.remove('inactive')
                error.textContent = `You can't be the computer!`
                setTimeout(() => {
                    error.classList.add('inactive')
                }, 1200);
                return true;
            }

        }else if(type == 3){
            if (!P1Ready || !P2Ready || !rounds.value) {
                error.classList.remove('inactive')
                if (!P1Ready) {
                    error.textContent = 'Player 1 is not ready'
                }else if(!P2Ready){
                    error.textContent = 'Player 2 is not ready'
                }else if(!rounds.value){
                    error.textContent = 'Select rounds'
                }
                
                setTimeout(() => {
                    error.classList.add('inactive')
                }, 1200);
                console.log('not ready');
                return true;
            };
        }else if(type == 4){
            error.classList.remove('inactive')
            error.textContent = `Select a Pokemon`
            setTimeout(() => {
                error.classList.add('inactive')
            }, 1200);
        }
    }

    const togglePKMNScreen = (player, playerS, pkmn, selected) => {
        document.querySelector(`${player}`).classList.toggle('inactive')
        document.querySelector(`${playerS}`).classList.toggle('inactive')

        if(pkmn) document.querySelector(`${selected}`).src = `files/png/pixel/${pkmn.alt}.png`;
        
    };


})()


/* Display Control Module*/
let displayControllerMod = (function(){


    const victoryPopUp = document.querySelector('#popUp');
    const victoryWindow = document.querySelector('.victoryWindow');
    const victoryText = document.querySelector('.victoryText');
    const finalScore = document.querySelector('.finalScore');
    const menuButton = document.querySelector('.mainMenu');
    const boardRounds = document.querySelector('.boardRounds')
    const P1Points = document.querySelector('.P1Points');
    const P2Points = document.querySelector('.P2Points');

    let difficulty;
    let rounds;
    let round = 0;
    let turn = 0;
    const finalTurn = 9;
    let roundwinner;
    let AI = false;
    let AImedium = 2;
    let animating = false;
    


    let gridBoxes = document.querySelectorAll('.gameBoard div');
    let gridIndex = 0;
    let playerTurn = 1;
    gridBoxes.forEach(node => {
        node.dataset.checked = false;
        node.index = gridIndex;
        gridIndex++;
        
        node.addEventListener('click', ()=>{

            if (animating == true) return;

            let symbol;
            let poke;
            

            playerTurn == 1? symbol = playersOBJ[0].getPURL(): symbol = playersOBJ[1].getPURL();
            playerTurn == 1? poke = playersOBJ[0].getpkmn(): poke = playersOBJ[1].getpkmn();
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
                    animating = true;
                    setTimeout(() => {
                        if(difficulty == 'hard') {
                            hardAI ();                        
                        }else if(difficulty == 'medium'){
                            if (AImedium == 1){
                                hardAI (); 
                                AImedium = 2;
                            }else if(AImedium == 2){
                                easyAI ();
                                AImedium = 1;
                            }             

                        }else if(difficulty == 'easy') {
                            easyAI ();
                        }
                        animating = false;
                    }, 500);
                }

                function easyAI () {
                    console.log('ezAI')
                    poke = playersOBJ[1].getpkmn();
                    let available = []
                    for(i = 0; i <= 8 ; i++) {
                        if(gameModule.getBoard()[i] == null) available.push(i)
                    }        
                    let computerMove = available[Math.round(Math.random()*(available.length - 1))]
                    let compMark = document.createElement('img');
                    compMark.src = playersOBJ[1].getPURL();;
                    gridBoxes[computerMove].appendChild(compMark);
                    gameModule.modBoard(computerMove, playersOBJ[1].getpkmn());
                    gridBoxes[computerMove].dataset.checked = true;                   
                    if (checkGame(gameModule.getBoard())) {return}
                    playerTurn = 1;
                }

                function hardAI () {
                    console.log('hardAI')
                    console.log(gameModule.getBoard())
                    bestMove(gameModule.getBoard());
                    if (checkGame(gameModule.getBoard())) {return}   
                    playerTurn = 1;
                }


                
                function bestMove (currentBoard) {



                    let bestScore = -Infinity;
                    let bestBox;

                    for(i = 0; i <= 8; i++){
                        if(currentBoard[i] == null) {
                            currentBoard[i] = playersOBJ[1].getpkmn();
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
                    
                    let compMark = document.createElement('img');
                    compMark.src = playersOBJ[1].getPURL();
                    gridBoxes[bestBox].appendChild(compMark);
                    gameModule.modBoard(bestBox, playersOBJ[1].getpkmn());
                    gridBoxes[bestBox].dataset.checked = true;
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
                        let bestScore = Infinity;
                        for(let i=0; i<9; i++){
                            if(tempBoard[i] == null){
                                tempBoard[i] = playersOBJ[0].getpkmn();
                                let score = minmax(tempBoard, 2, boardTurn + 1, depth + 1)
                                
                                tempBoard[i] = null;

                                if (bestScore > score) bestScore = score;
                                
                            }
                        }
                        return bestScore;
                    }else if(pTurn == 2){
                        
                        let bestScore = -Infinity;
                        for(let i=0; i<9; i++){
                            if(tempBoard[i] == null){
                                tempBoard[i] = playersOBJ[1].getpkmn();
                                let score = minmax(tempBoard, 1, boardTurn + 1, depth + 1)
                                tempBoard[i] = null;

                                if (bestScore < score) bestScore = score;
                            }
                        }
                        return bestScore;
                    };
                };
            };
        });       
    });
    
    const checkGame = (board, test) => {

        
        for (j=0;j<=8;j++){
            if (board[j] != null){

                if ((board[j] == board[j+3] && board[j]== board[j+6])) {
                    if(!test)colorWinner(j, j+3, j+6)
                    if (defineWinner(test)) return true;
                    
                } else if((j == 0 || j == 3 || j == 6) && board[j] == board[j+1] && board[j]== board[j+2]){
                    if(!test)colorWinner(j, j+1, j+2)
                    if (defineWinner(test)) return true;    
                }   
            }
        }
        if(board[0] != null && board[0] == board[4] && board[0] == board[8]){
            if(!test)colorWinner(0, 4, 8)
            if (defineWinner(test)) return true;
            

        }else if(board[2] != null && board[2] == board[4] && board[2] == board[6]){
            if(!test)colorWinner(2, 4, 6)
            if (defineWinner(test)) return true;
            
        }

    }
    

    function defineWinner (test) {
        playerTurn == 1? roundwinner = playersOBJ[0].getPName(): roundwinner = playersOBJ[1].getPName()
        if(test == undefined)roundOver(roundwinner, false);
        return true;
    }

    function colorWinner (...indexes) {
        if(playerTurn == 1){
            for(index in indexes) {
                gridBoxes[indexes[index]].classList.add('victory1')
            };
        }else if (playerTurn == 2){
            for(index in indexes) {
                gridBoxes[indexes[index]].classList.add('victory2')
            };
        }
        
    };


    function roundOver (winner, tie) {

        let winnerMSG = ""; 
        turn = 0;
        
        round = round + 1;
        boardRounds.textContent = `Round :${round}`

        if(!tie){
            


            if (winner == playersOBJ[0].getPName()) {
                playersOBJ[0].scoreUp();
                P1Points.textContent = playersOBJ[0].getPScore();
            }
            if (winner == playersOBJ[1].getPName()) {
                playersOBJ[1].scoreUp();
                P2Points.textContent = playersOBJ[1].getPScore();
            }

            console.log('p1: ' + playersOBJ[0].getPScore());
            console.log('p2: ' + playersOBJ[1].getPScore());

            winnerMSG = `${winner} wins the round`;

        }else {
            winnerMSG = 'its a tie!';
        }

        playerTurn = 1;

        if (round < rounds) {
            showVWindow(winnerMSG, undefined, false);
            setTimeout(() => {
                gameModule.clearBoard();
                clearGrid();
            }, 1000);
        }else {

            let victoryMSG;
            if(playersOBJ[0].getPScore()<playersOBJ[1].getPScore()){
                victoryMSG = `Game Over. ${playersOBJ[1].getPName()} wins!!`;
            }else if(playersOBJ[0].getPScore()>playersOBJ[1].getPScore()) {
                victoryMSG = `Game Over. ${playersOBJ[0].getPName()} wins!!`;
            }else{
                victoryMSG = `Game Over. It's a tie!`;
            };

            
            showVWindow(winnerMSG, victoryMSG, true);
            console.log('game is over')
            round = 0;
        }

    }

    let clearGrid = () => {
        for(let i=0;i<=8; i++) {
            gridBoxes[i].innerHTML = ""
            gridBoxes[i].dataset.checked = false;
            gridBoxes[i].classList.remove('victory1') 
            gridBoxes[i].classList.remove('victory2')              
        }
    }

    const getGameData = (Rounds, gameVSAI, AILevel) => {
        rounds = Rounds;
        AI = gameVSAI;
        if(AILevel) difficulty = AILevel;
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
                finalScore.textContent = `${playersOBJ[0].getPScore()} - ${playersOBJ[1].getPScore()}`
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


let playersOBJ = new Array(2)




