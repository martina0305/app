//Armado de tabla y matrix
var table =[];
var countries=[];
var positions=[]; //propiedades de position: row: i, col: j, country: XXX
var num = parseInt(document.getElementById("difficulty").value);
var totalFlags=18;
var positionFlag;
var cont=0;

//Jugabilidad
var playerOnePoints=0;
var playerTwoPoints=0;
var turn=0;
var pair=0;
var second=0;
var first=0;
var firstCountry="";
var secondCountry="";
var pairsFound=0;
var pairsAmount=0;
var canClick = true;

function loadGame(){

    //Reinicio todos los valores
    chosenNumbers = [];
    countries=[];
    positions=[];
    cont=0;
    pairsFound=0;

    //Vuelvo a pedir el valor de num (tamaño de la tabla: 4, 5 o 6)
    var num = parseInt(document.getElementById("difficulty").value);

    //Calculo la cantidad de pares que voy a tener
    pairsAmount=(num*num)/2

    //Creo un array con números de 0 a 17(total de banderas)
    for(var p=0; p<totalFlags; p++){
        chosenNumbers.push(p);
    }

    //Llamo a las funciones que generan la matriz y la tabla
    generateMatrix(num);
    createTable(num);
}

function generateMatrix(num){

    //Vacío la tabla
    table=[];

    //Creo la matriz
    for(var i=0; i<num; i++){
        table.push([]);

        for(var j=0; j<num; j++){
            table[i].push(0);
            positions.push({row:i,col:j,flag:""});
            //Lleno el array positions con objetos que tienen los valores de columna, fila y bandera.
            //Flag asigna un valor vacío que luego vamos a llenar con el código de la bandera "XXX".
        }
    }

    //llenamos el espacio vacío
    //llamo a una función que llena el array countries[] *LEER QUÉ HACE createRandomFlags*
    createRandomFlags(num);
    for(var n=0; n<num*num; n++){
        positions[n].flag = countries[n];//Asignamos en la posición [n] de positions (el array que le faltaba el valor flag) el valor de flag que obtuvimos en la otra función
    }
    shuffle(positions); //bien, hasta acá el array estaba ordenado. Ahora simplemente pasamos el array a esa función y ya se desordena. TERMINAMOS LA MATRIZ.
}

function createRandomFlags(num){
    
    //este for se repite a corde a la cantidad de PARES que necesitmos. Es decir, que será LA MITAD del total de las fichas en la tabla
    for(var k=0; k<Math.floor(num*num)/2; k++){
        var ran = random(); // Copiamos el valor que nos devuelve random() en la variable ran. *LEER QUÉ HACE random()* 
        var selectedCountry = cards[ran].country; //Creamos una variable que se llama selectedCountry y pedimos el valor "country" del objeto cards[en la posición del número ran]
        countries.push(selectedCountry); //Copiamos el valor obtenido del objeto en el array selectedCountry 2 VECES.
        countries.push(selectedCountry); //¿Por qué 2 veces? porque necesitamos asignarle este valor a DOS fichas para formar el par. Y ahora sí podemos llenar el espacio vacío de "flag".
    }
}

//Random() desordena chosenNumbers[] y devuelve el último número; Luego lo elimina con .pop(). O sea, random() nos devuelve 1 SÓLO NÚMERO cada vez que lo llamamos.
//chosenNumbers[] es el array con los numeros de 0 a 17
function random(){
    shuffle(chosenNumbers);
    var last = chosenNumbers.pop();
    return last;
}

function createTable(num){
    $("#table").empty(); //vacío el tablero

    for(var i=0; i<num; i++){
        //creo la cantidad de "divs filas" que necesito y con la función generateCol() le anexo los "divs columnas"
        $("#table").append("<div>"+generateCol(i, num)+"</div>");
    }
}

function generateCol(row, num){
    var col="";
    //los divs columnas que voy a crear tienen: sus id's sacados del numero de los for (i)(j); llaman a la función onclick "swap" que pasa como parámetro su ID; y dentro de cada div hay un tag img con la bandera que necesitamos (que pedimos del objeto "flags", el otro archivo .js). Y LISTO, YA ESTÁ LA TABLA.
    for(var j=0; j<num; j++){
        var actualFlag = positions[cont].flag;
        col+="<div class='flip-card' onclick='swap("+(row+1)+(j+1)+",\""+actualFlag+"\")'><div id='"+(row+1)+(j+1)+"' class='flip-card-inner'><div class='flip-card-front'><img width='70' src='"+flags[actualFlag]+"'></img></div><div class='flip-card-back'></div></div></div>";
        cont++;
    }
    return col;
}

//JUGABILIDAD
function swap(a, b){
    if(canClick && a!=first){ 

        if(pair==0){
            first=a;
            firstCountry=b;
            $("#"+first).removeClass("rotateBack");
            $("#"+first).addClass("rotate");
            pair ++;
        }
        else if(pair==1){
            second=a;
            secondCountry=b;
            $("#"+second).removeClass("rotateBack");
            $("#"+second).addClass("rotate");
            pair=0;

            //si no son par..
            if(firstCountry!==secondCountry){
                canClick = false;
                setTimeout(swapBack, 1000);

                //cambio el turno del jugador
                if(turn==0){
                    turn=1;
                    $("#pointsPl2").addClass("glow");
                    $("#pointsPl1").removeClass("glow");
                }
                else{
                    turn=0;
                    $("#pointsPl1").addClass("glow");
                    $("#pointsPl2").removeClass("glow");
                }
            }
            //si son par..
            else{
                //deshabilito el onclick
                $("#"+first).parent().addClass("disable");
                $("#"+second).parent().addClass("disable");

                //si el turno es del jugador 1...
                if(turn==0){
                    playerOnePoints=playerOnePoints+5;
                    $("#player1Points").empty();
                    $("#player1Points").append(playerOnePoints);
                }
                //si el turno es del jugador 2...
                else{
                    playerTwoPoints=playerTwoPoints+5;
                    $("#player2Points").empty();
                    $("#player2Points").append(playerTwoPoints);
                }
                pairsFound++;

                if(pairsFound==pairsAmount){
                    //Ganó el jugador 1
                    if(playerOnePoints>playerTwoPoints){
                        setTimeout(winSwap, 1000);
                        $("#table").append("<div id='announce'><p>¡Ganó el jugador 1!</p><button onclick='loadGame()'>Jugar de nuevo</button></div>");
                    }
                    //Ganó el jugador 2
                    else if(playerOnePoints<playerTwoPoints){
                        setTimeout(winSwap, 1000);
                        $("#table").append("<div id='announce'><p>¡Ganó el jugador 2!</p><button onclick='loadGame()'>Jugar de nuevo</button></div>");
                    }
                    //Empate!
                    else{
                        setTimeout(winSwap, 1000);
                        $("#table").append("<div id='announce'><p>¡Empate!</p><button onclick='loadGame()'>Jugar de nuevo</button></div>");
                    }     
                }
            }
        }
    }
}

//Si no son par esta función los vuelve a girar y les devuelve la función de onclick.
function swapBack(){
    $("#"+first).removeClass("rotate").addClass("rotateBack");
    $("#"+second).removeClass("rotate").addClass("rotateBack");
    canClick = true;
}

//giro de las fichas al ganar
function winSwap(){
    $(".flip-card-inner").removeClass("rotate");
    $(".flip-card-inner").addClass("rotateWin");
}

//Esta función es para cambiar los motivos y la vamos a usar al final
function changeMotive(){
    var motive = parseInt(document.getElementById("motive").value);
    $("td").attr("", "blue");
}

 //Funcion para mezclar. (Nos la pasó Fabián de internet)
var shuffle = function (array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
    return array;
}