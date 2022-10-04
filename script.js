/*array inside game module*/
let gameModule = (function(){
    let board = [,,,,,,,,];
    return{board}
})();


/* Display Control Module*/
let displayControllerMod = (function(){
    let gridBoxes = document.querySelectorAll('.gameBoard div');
    gridIndex = 0;
    let move = 1;
    gridBoxes.forEach(node => {
        node.dataset.checked = false;
        node.index = gridIndex;
        gridIndex++;
        
        node.addEventListener('click', ()=>{
            console.log(move)
            
            let symbol = players[move - 1].symbol;

            console.log(symbol);
            

            if(node.getAttribute('data-checked') == 'false') {
                node.textContent = symbol;
                gameModule.board[node.index] = node.textContent;
                node.dataset.checked = true;


                for (i=0;i<8;i++){
                    if (gameModule.board[i] != null && 
                        ((gameModule.board[i] == gameModule.board[i+3] && gameModule.board[i]== gameModule.board[i+6])||
                        ((i == 0 || 3 || 6) && gameModule.board[i] == gameModule.board[i+1] && gameModule.board[i]== gameModule.board[i+2]))){
                        gameOver();
                    }
                }
                if(((gameModule.board[0] != null && gameModule.board[0] == gameModule.board[4] && gameModule.board[0] == gameModule.board[8])||
                    (gameModule.board[2] != null && gameModule.board[2] == gameModule.board[4] && gameModule.board[2] == gameModule.board[6]))){
                    gameOver();
                }


                move == 1? move = 2: move = 1;

            }
            });
        
    })
    function gameOver () {
        alert('Game Over')
    }
    let renderArray = () => {
        for(let i=0;i<=8; i++) {
            gridBoxes[i].textContent = gameModule.board[i];
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




let button1 = document.querySelector("#butt")
button1.onclick = () => {
    gameModule.board[0] = "lmao";
    console.log(gameModule.board);
    displayControllerMod.renderArray();
};





let players = []

let dude1 = createPlayer('John', 1, "x");
let dude2 = createPlayer('jake', 2, "O");

players.push(dude1)
players.push(dude2)

console.log(dude1.getPName());

