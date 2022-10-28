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


/* Display Control Module*/
let displayControllerMod = (function(){
    const gameSelection = document.querySelector('.gameSelection')
    const selectionScreen = document.querySelector('#selectionScreen');
    const pvp = document.querySelector('.pvp');
    const iconsP1 = document.querySelectorAll('.player1 .pkmnTAB .icon')
    const iconsP2 = document.querySelectorAll('.player2 .pkmnTAB .icon')
    const selectP1 = document.querySelector('.player1 button')
    const selectP2 = document.querySelector('.player2 button')
    let pkmnP1;
    let pkmnP2;

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

        iconsP1.forEach(icon => {
            if(icon.dataset.checked == 'true') {
                pkmnP1 = icon.getElementsByTagName('img')[0];
            }
        })
        console.log(pkmnP1)
    })
    selectP2.addEventListener('click', ()=> {
        iconsP2.forEach(icon => {
            if(icon.dataset.checked == 'true') {
                pkmnP2 = icon.getElementsByTagName('img')[0];
            }
        })
        console.log(pkmnP2)
    })
    




    let gridBoxes = document.querySelectorAll('.gameBoard div');
    gridIndex = 0;
    let player = 1;
    gridBoxes.forEach(node => {
        node.dataset.checked = false;
        node.index = gridIndex;
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
    return {renderArray}
})();



/*player Factory Function*/
let createPlayer = function(name, number, symbol) {
    let getPName = () => {name;
    console.log(`player ${number} name is ${name}`)}
    return{getPName, name, number, symbol}
}





let players = []

let dude1 = createPlayer('John', 1, "x");
let dude2 = createPlayer('jake', 2, "O");

players.push(dude1)
players.push(dude2)

console.log(dude1.getPName());

