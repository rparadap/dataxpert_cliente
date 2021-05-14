/*
Titulo:  api-edit-usuario.js
Descripción: Realiza los llamados al API de AWS

Datos del autor : 
-Alexander Villegas Valverde
-Empresa: TECHBITE

Version 1.0
Ultima modificacion : 02/03/2021

Otros cambios:
-Documentacion y limpieza
*/

var DAT = window.DAT || {}; 
var apiClient = apigClientFactory.newClient(); //  Instancia del API de AWS



/**
   * @function Edita un usario en base de datos
   * @param {JSON} params JSON con informacion del usuario
*/
DAT.editUser = function (params) {
    try {
        useToken(token, function (token) {
            apiClient.usuariosEditItemPost(null, params, {
                    headers: {
                        Authorization: token
                    }
                })
                .then(function (result) {
                    console.log("RESULT = " + JSON.stringify(result));
                    if (result.data.hasOwnProperty("errorMessage")) {
                        alert(result.data.errorMessage);
                        document.getElementById("loader-overlay-MOD").style.display = "none";
                        return;
                    }
                    if (result.status == 200) {
                        window.location.href = "lista-usuarios.html";
                    } else {
                        document.getElementById("loader-overlay-MOD").style.display = "none";
                        alert("Ocurrió un error al guardar los datos.");
                        return;
                    }
                });


        });

    } catch (e) {

        console.log("error :" + e);
        document.getElementById("loader-overlay-MOD").style.display = "none";
        alert("Ocurrió un error con la conexión.")

    }

}


/**
   * @function getUsuario Obtiene los datos de un solo usuario
   * @param params JSON con id del usuario
*/
DAT.getUsuario = function (params,callback) {
    try {
        useToken(token, function (token) {
            apiClient.usuariosGetItemPost(null, params, {
                    headers: {
                        Authorization: token
                    }
                })
                .then(function (result) {
                    
                    if (result.data.hasOwnProperty("errorMessage")) {
                        alert("Error: " + result.data.errorMessage);
                        document.getElementById("loader-overlay-MOD").style.display = "none";
                        window.location.href = "lista-infografico.html";
                        return
                        // location.reload();
                    }
                    if (result.status == 200) {
                        callback(result.data);
                    } else {
                        document.getElementById("loader-overlay-MOD").style.display = "none";
                        alert("Ocurrió un error al guardar los datos.");
                        //  document.getElementById("loader-overlay-MOD").style.display = "none";
                        return;
                    }
                });


        });

    } catch (e) {

        console.log("error :" + e);
        document.getElementById("loader-overlay-MOD").style.display = "none";
        alert("Ocurrió un error con la conexión.")

    }

}



  
/**
   * @compare Utilizando el metodo sort, ordena los elementos del array por nombre
   * @param a primer elemento
   * @param b segundo elemento
   * @return array ordenado por nombre.
*/
function compare(a, b) {

    let comparison = 0;
    if (a.nombre > b.nombre) {
        comparison = 1;
    } else if (a.nombre < b.nombre) {
        comparison = -1;
    }
    return comparison;
}

