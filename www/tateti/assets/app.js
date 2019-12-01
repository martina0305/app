//FLAG --> Turn player: 1(x) || 2(o)
let turn = true;
let moves = 0;
let check;
let playerX = 0;
let playerO = 0;
var array = [ //bidimensional matrix
    ["v", "v", "v"],
    ["v", "v", "v"],
    ["v", "v", "v"],
];
myStorage = window.localStorage;
if (typeof myStorage !== 'undefined') {
    if (myStorage.getItem('Turn') === null) {

    } else {
        turn = JSON.parse(myStorage.getItem('Turn'));
        console.log("turn: " + turn);
        moves = JSON.parse(myStorage.getItem('Moves'));
        console.log("moves: " + moves);
        playerX = JSON.parse(myStorage.getItem('GamesX'));
        console.log("gamesX: " + playerX);
        playerO = JSON.parse(myStorage.getItem('GamesO'));
        console.log("gamesO: " + playerO);
        array = JSON.parse(myStorage.getItem('Board'));
        console.log("array: " + array);
        //Update visual board according to logical board from localStorage
        loadVisualBoardFromStorage(array);
        document.getElementById("gamesX").innerText = playerX;
        document.getElementById("gamesO").innerText = playerO;
    }
} else {
    // localStorage not defined
}

//FUNCTION FOR A GAME MOVE
function move(id) {
    moves += 1;
    //If the space clicked is empty
    if (array[id[0]][id[1]] === "v") {
        //Update "logical" board
        loadLogicalBoard(id);
        //Update visual board according to logical board
        loadVisualBoard(id);
        //Did the player win?
        checkWin();
        //Change turns
        changeTurn();
        //Disable the space clicked
        disableDiv(id);
    }
    myStorage.setItem('Turn', JSON.stringify(turn));
    myStorage.setItem('Moves', JSON.stringify(moves));
    myStorage.setItem('GamesX', JSON.stringify(playerX));
    myStorage.setItem('GamesO', JSON.stringify(playerO));
    myStorage.setItem('Board', JSON.stringify(array));
}

function hover(id) {
    //Add or removes a class depending on the player's turn for the space to show the color of the player to play
    if (turn === true) {
        document.getElementById(id).classList.toggle("turn2", false);
        document.getElementById(id).classList.toggle("turn1", true);
    } else {
        document.getElementById(id).classList.toggle("turn1", false);
        document.getElementById(id).classList.toggle("turn2", true);
    }
}

function disableDiv(id) {
    //Removes the onClick function from the full spaces
    var element = document.getElementById(id);
    element.onclick = null;
}

function restart() {
    //clean logical board
    array = [
        ["v", "v", "v"],
        ["v", "v", "v"],
        ["v", "v", "v"],
    ];
    initialState();
    myStorage.setItem('Board', JSON.stringify(array));
    //Go around all the positions
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            //Cleans the img
            document.getElementById(i + "" + j + "img").toggleAttribute("src");
            var div = document.getElementById(i + "" + j);
            div.className = 'turn1';
            //Puts back the onClick function
            div.onclick = function () {
                move(i + "" + j);
            }
        }

    }
    //restart moves
    moves = 0;
    document.getElementById('winDiv').className = "dissapear";
}

function loadVisualBoardFromStorage(array) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (array[i][j] === "x") {
                document.getElementById(i.toString() + j.toString() + "img").setAttribute("src", "assets/img/cross.svg");
                //Change color tu blue
                document.getElementById(i.toString() + j.toString()).classList.add("blue");
            } else {
                if (array[i][j] === "o") {
                    document.getElementById(i.toString() + j.toString() + "img").setAttribute("src", "assets/img/circle.svg");
                    //Change color to red
                    document.getElementById(i.toString() + j.toString()).classList.add("red");
                }
            }

        }

    }
}

function loadVisualBoard(id) {
    if (array[id[0]][id[1]] === "x") {
        document.getElementById(id + "img").setAttribute("src", "assets/img/cross.svg");
        //Change color tu blue
        document.getElementById(id).classList.add("blue");
    } else {
        document.getElementById(id + "img").setAttribute("src", "assets/img/circle.svg");
        //Change color to red
        document.getElementById(id).classList.add("red");
    }
}

function loadLogicalBoard(id) {
    switch (id) {
        case "00":
            if (turn === true) {
                array[0][0] = "x";
            } else {
                array[0][0] = "o";
            }
            break;
        case "01":
            if (turn === true) {
                array[0][1] = "x";
            } else {
                array[0][1] = "o";
            }
            break;
        case "02":
            if (turn === true) {
                array[0][2] = "x";
            } else {
                array[0][2] = "o";
            }
            break;
        case "10":
            if (turn === true) {
                array[1][0] = "x";
            } else {
                array[1][0] = "o";
            }
            break;
        case "11":
            if (turn === true) {
                array[1][1] = "x";
            } else {
                array[1][1] = "o";
            }
            break;
        case "12":
            if (turn === true) {
                array[1][2] = "x";
            } else {
                array[1][2] = "o";
            }
            break;
        case "20":
            if (turn === true) {
                array[2][0] = "x";
            } else {
                array[2][0] = "o";
            }
            break;
        case "21":
            if (turn === true) {
                array[2][1] = "x";
            } else {
                array[2][1] = "o";
            }
            break;
        case "22":
            if (turn === true) {
                array[2][2] = "x";
            } else {
                array[2][2] = "o";
            }
            break;
    }
}

function checkWin() {
    if (turn) {
        check = "x";
    } else {
        check = "o";
    }
    if (array[0][0] === check && array[0][1] === check && array[0][2] === check ||
        array[1][0] === check && array[1][1] === check && array[1][2] === check ||
        array[2][0] === check && array[2][1] === check && array[2][2] === check ||
        array[0][0] === check && array[1][0] === check && array[2][0] === check ||
        array[0][1] === check && array[1][1] === check && array[2][1] === check ||
        array[0][2] === check && array[1][2] === check && array[2][2] === check ||
        array[0][0] === check && array[1][1] === check && array[2][2] === check ||
        array[2][0] === check && array[1][1] === check && array[0][2] === check) {

        if (array[0][0] === check && array[0][1] === check && array[0][2]) {
            document.getElementById("00").classList.add('win');
            document.getElementById("01").classList.add('win');
            document.getElementById("02").classList.add('win');
        } else {
            if (array[1][0] === check && array[1][1] === check && array[1][2]) {
                document.getElementById("10").classList.add('win');
                document.getElementById("11").classList.add('win');
                document.getElementById("12").classList.add('win');
            } else {
                if (array[2][0] === check && array[2][1] === check && array[2][2]) {
                    document.getElementById("20").classList.add('win');
                    document.getElementById("21").classList.add('win');
                    document.getElementById("22").classList.add('win');
                } else {
                    if (array[0][0] === check && array[1][0] === check && array[2][0]) {
                        document.getElementById("00").classList.add('win');
                        document.getElementById("10").classList.add('win');
                        document.getElementById("20").classList.add('win');
                    } else {
                        if (array[0][1] === check && array[1][1] === check && array[2][1]) {
                            document.getElementById("01").classList.add('win');
                            document.getElementById("11").classList.add('win');
                            document.getElementById("21").classList.add('win');
                        } else {
                            if (array[0][2] === check && array[1][2] === check && array[2][2]) {
                                document.getElementById("02").classList.add('win');
                                document.getElementById("12").classList.add('win');
                                document.getElementById("22").classList.add('win');
                            } else {
                                if (array[0][0] === check && array[1][1] === check && array[2][2]) {
                                    document.getElementById("00").classList.add('win');
                                    document.getElementById("11").classList.add('win');
                                    document.getElementById("22").classList.add('win');
                                } else {
                                    if (array[2][0] === check && array[1][1] === check && array[0][2]) {
                                        document.getElementById("20").classList.add('win');
                                        document.getElementById("11").classList.add('win');
                                        document.getElementById("02").classList.add('win');
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        //WIN
        if (check === "x") {
            playerX++;
            document.getElementById("gamesX").innerText = playerX;
        } else {
            playerO++;
            document.getElementById("gamesO").innerText = playerO;
        }
        win(check); //Shows message
    } else if (moves === 9) { //Tie
        document.getElementById('winDiv').innerHTML = '<h1>¡Empate!</h1><p>Felicitaciones X y O. Estuvo muy parejo. ¿Van por el desempate?</p><span onclick="restart()">Empezar nueva partida</span>';
        document.getElementById('winDiv').className = "appear";
        blockButtons();
    }
}

function win(check) {
    if (check == "x" || check == "o") {
        document.getElementById('winDiv').innerHTML = '<h1>¡Ganó el jugador ' + check.toUpperCase() + '!</h1><span onclick="restart()">Empezar nueva partida</span>';
        document.getElementById('winDiv').className = "appear";
        blockButtons();
    }
}

function changeTurn() {
    turn = !turn;
}

function totalRestart() {
    moves = 0;
    playerX = 0;
    playerO = 0;

    document.getElementById("gamesX").innerText = playerX;
    document.getElementById("gamesO").innerText = playerO;
    myStorage.clear();
    restart();
}

function blockButtons(){
        document.getElementById('restart').style.pointerEvents = 'none';
        document.getElementById('totalRestart').style.pointerEvents = 'none';
}

function initialState(){
    document.getElementById('restart').style.pointerEvents = 'auto';
    document.getElementById('totalRestart').style.pointerEvents = 'auto';
}