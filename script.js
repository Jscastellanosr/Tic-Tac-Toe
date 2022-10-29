/*array inside game module*/
let gameModule = (function(){
    let board = [,,,,,,,,];
    const getBoard = () => {
        return board;
    }
    const modBoard = (index, value) => {
        board[index] = value;
    }
    return{getBoard, modBoard}
})();


let boardflow = (function(){
    const gameSelection = document.querySelector('.gameSelection');
    const selectionScreen = document.querySelector('#selectionScreen');
    const pvp = document.querySelector('.pvp');
    const iconsP1 = document.querySelectorAll('.player1 .pkmnTAB .icon');
    const iconsP2 = document.querySelectorAll('.player2 .pkmnTAB .icon');
    const selectP1 = document.querySelector('.player1 button');
    const selectP2 = document.querySelector('.player2 button');
    const edit1 = document.querySelector('.player1s button');
    const edit2 = document.querySelector('.player2s button');
    const start = document.querySelector('#start');
    const board = document.querySelector('.gameBoard')
    let P1Name = document.querySelector('#name1');
    let P2Name = document.querySelector('#name2');
    let P1Ready = false;
    let P2Ready = false;
    let P1;
    let P2;

    
    
    pvp.addEventListener('click', ()=>{
        gameSelection.classList.toggle('inactive')
        selectionScreen.classList.toggle('inactive')
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

        P1 = createPlayer(P1Name.value, 1, pkmnP1.src)
        console.log(P1.getPName())
        console.log(P1.getPNumber())
        console.log(P1.getPURL())
        togglePKMNScreen('.player1', '.player1s', pkmnP1, '.P1Selected')
        P1Ready = true;

    })
    selectP2.addEventListener('click', ()=> {
        let pkmnP2;

        if(!P2Name.value) {
            P2Name.classList.add('emptyField')
            return;
        }

        iconsP2.forEach(icon => {
            if(icon.dataset.checked == 'true') {
                pkmnP2 = icon.getElementsByTagName('img')[0];
            }
        })
        P2 = createPlayer(P2Name.value, 1, pkmnP2.src)
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

        if (!P1Ready || !P2Ready) {
            console.log('not ready');
            return;
        }

        selectionScreen.classList.toggle('inactive');
        board.classList.toggle('inactive');
        displayControllerMod.getPlayers(P1, P2);
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

    let player1;
    let player2;

    let players = []


    let gridBoxes = document.querySelectorAll('.gameBoard div');
    let gridIndex = 0;
    let player = 1;
    gridBoxes.forEach(node => {
        node.dataset.checked = false;
        node.index = gridIndex;
        console.log(node.index)
        gridIndex++;
        
        node.addEventListener('click', ()=>{
            
            let symbol = players[player - 1].symbol;
            

            if(node.getAttribute('data-checked') == 'false') {
                node.textContent = symbol;
                gameModule.modBoard(node.index, symbol);
                node.dataset.checked = true;

                const tempBoard = gameModule.getBoard()

                console.log(gameModule.getBoard()[1])


                for (i=0;i<8;i++){
                    if (gameModule.getBoard()[i] != null && 
                        ((gameModule.getBoard()[i] == gameModule.getBoard()[i+3] && gameModule.getBoard()[i]== gameModule.getBoard()[i+6])||
                        ((i == 0 || i == 3 || i == 6) && gameModule.getBoard()[i] == gameModule.getBoard()[i+1] && gameModule.getBoard()[i]== gameModule.getBoard()[i+2]))){
                        console.log('aasd')
                        gameOver();
                    }
                }
                if(((gameModule.getBoard()[0] != null && gameModule.getBoard()[0] == gameModule.getBoard()[4] && gameModule.getBoard()[0] == gameModule.getBoard()[8])||
                    (gameModule.getBoard()[2] != null && gameModule.getBoard()[2] == gameModule.getBoard()[4] && gameModule.getBoard()[2] == gameModule.getBoard()[6]))){
                    gameOver();
                }


                player == 1? player = 2: player = 1;

            }
            });
        
    })
    function gameOver () {
        alert(`Game Over. Player ${player} wins!`)
        console.log('Game Over')
    }
    let renderArray = () => {
        for(let i=0;i<=8; i++) {
            gridBoxes[i].textContent = gameModule.getBoard()[i];
        }
    }



    const getPlayers = (P1, P2) => {
        player1 = P1;
        player2 = P2;

    }



    return {renderArray, getPlayers}
})();



/*player Factory Function*/
let createPlayer = function(name, number, url) {
    let getPName = () => {return name}
    let getPNumber = () => {return number}
    let getPURL = () => {return url}

    return{getPName, getPNumber, getPURL}
}









