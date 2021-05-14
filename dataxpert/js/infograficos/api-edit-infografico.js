/*
Titulo:  api-edit-infografico.js
Descripción: Realiza los llamados al API de AWS

Datos del autor : 
-Alexander Villegas Valverde
-Empresa: TECHBITE

Version 1.0
Ultima modificacion : 02/02/2021

Otros cambios:
Sin cambios nuevos
*/

var DAT = window.DAT || {};
var apiClient = apigClientFactory.newClient(); //  Instancia del API de AWS


/**
 * @function getCategorias trae todas las categorias activas en base de datos
 */
async function getCategorias() {
    let obtainedToken = await asyncUseToken(token);
    let result = await apiClient.categoriasGetAllGet(null, {}, {
        headers: {
            Authorization: obtainedToken
        }
    });
    return result.data.sort(compare);
}


/**
   * @function editInfografico Añade un infografico a la base de datos Dynamo en AWS
   * @param {JSON} params JSON con informacion del infografico
*/
DAT.editInfografico = function (params) {
    try {
        useToken(token, function (token) {
            apiClient.infograficosEditItemPost(null, params, {
                    headers: {
                        Authorization: token
                    }
                })
                .then(function (result) {
                    console.log("RESULT = " + JSON.stringify(result));
                    if (result.data.hasOwnProperty("errorMessage")) {
                        alert(result.data.errorMessage);
                        document.getElementById("loader-overlay-MOD").style.display = "none";
                        return
                        // location.reload();
                    }
                    if (result.status == 200) {
                        window.location.href = "lista-infografico.html";
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
   * @function getInfografico Obtiene la informacion de un solo infografico en base de datos
   * @param {JSON} params JSON con informacion del cliente
*/
DAT.getInfografico = function (params,callback) {
    try {
        useToken(token, function (token) {
            apiClient.infograficosGetItemPost(null, params, {
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
                        callback(result.data.Items[0]);
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
   * @function compare Utilizando el metodo sort, ordena los elementos del array por nombre
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