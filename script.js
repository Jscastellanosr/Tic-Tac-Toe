/*array inside game module*/
let gameModule = (function(){
    let board = [0, 1, 0, 1, 0, 1, 0, 1, 0];
    return{board}
})();


/* Display Control Module*/
let displayControllerMod = (function(){
    let tst =() => {console.log("display controler TEST")};
    return{tst}
})();

/*player Factory Function*/
let createPlayer = function(name, number, symbol) {
    let getPName = () => {name;
    console.log(`player ${number} name is ${name}`)}
    return{getPName, name, number, symbol}
}

let render = (function(){
    let gridBoxes = document.querySelectorAll('.gameBoard div');
    let renderArray = () => {
        for(let i=0;i<=8; i++) {
            gridBoxes[i].textContent = gameModule.board[i];
        }
    }
    return {renderArray}
})();




let button1 = document.querySelector("#butt")
button1.addEventListener('click', () => {
    gameModule.board[0] = "lmao";
    console.log(gameModule.board);
    render.renderArray();
});



render.renderArray();


let dude1 = createPlayer('John', 1, "x");
let dude2 = createPlayer('jake', 2, "x");

console.log(dude1.getPName());

