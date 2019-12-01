/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
    

var jugadorUno = {
    "name": "",
    "nickname": "",
    "score": "0",
    "photo": "",
    "scoretateti": "0",
    "scorememotest": "0",
    "scorespace": "0"
}


var jugadorDos= {
    "nametwo":"",
    "nicknametwo": "",
    "scoretwo": "0",
    "phototwo": "",
    "scoretateti": "0",
    "scorememotest": "0",
    "scorespace": "0"
}

//tener en cuenta que hay que tener un boardstate general de cada juego y otros dos de cada usuario.

function pageReady(){//deberia redirigirte a otra pagina, la del inicio.
     window.location.href="juegos.html";
}

function saveImages(){

}

function saveData(){//guardar los datos que ingresen los usuarios.
    jugadorUno.photo = document.getElementById('myImage').src;
    jugadorUno.name = document.getElementById('name').value;
    jugadorUno.nickname = document.getElementById('nickname').value;
    jugadorDos.nametwo = document.getElementById('name2').value;
    jugadorDos.nicknametwo = document.getElementById('nickname2').value;
    jugadorDos.phototwo = document.getElementById('myImage1').src;
}



function saveLocalStorage(){ //pasar los datos a cadena de texto
    localStorage.setItem("nombreUno", JSON.stringify(jugadorUno));
    localStorage.setItem("nombreDos", JSON.stringify(jugadorDos));
}

function obtainLocalStorage(){ //manipular la cadena de datos pasandola a variables
    var profileOne= JSON.parse( localStorage.getItem("jugadorUno"));
    var profileTwo= JSON.parse( localStorage.getItem("jugadorDos"));
    if(jugadorUno == null && jugadorDos == null){
        profileOne;
        profileTwo;
    }
}

function buildUsers(){

}

//camera function
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);


        //let btn = document.getElementById("photo");
        //btn.removeAttribute("disabled");
       // btn.onclick= takePicture;
    }
};

app.initialize();

//acceder a la camara
function takePicture(id){

    //let q = document.getElementById("pictureQuality").valueAsNumber;
    navigator.camera.getPicture(onSuccess, onFail, { quality: 25,
        destinationType: Camera.DestinationType.DATA_URL, correctOrientation: true,
    });

    function onSuccess(imageData) {
        var image = document.getElementById(id);
        image.src = "data:image/jpeg;base64," + imageData;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
}



