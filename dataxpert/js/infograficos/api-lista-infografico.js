/*
Titulo:  api-lista-infografico.js
Descripción: Realiza los llamados al API de AWS

Datos del autor : 
-Alexander Villegas Valverde
-Empresa: TECHBITE

Version 1.0
Ultima modificacion : 19/01/2021

Otros cambios:
Sin cambios nuevos
*/

var DAT = window.DAT || {}; 
var apiClient = apigClientFactory.newClient(); //  Instancia del API de AWS


/**
   * @function loadViewProductos Carga los datos en el JSgrid
*/
DAT.loadViewProductos = function () {
    useToken(token, function (token) {
        apiClient.infograficosGetAllGet({}, null, {
                headers: {
                    Authorization: token
                }
            })
            .then(function (result) {
                console.log("RES = " + JSON.stringify(result));
                if (typeof result.data !== 'undefined' && result.data.length <= 0) {
                    $("#jsgrid").jsGrid({
                        noDataContent: "No se encontraron registros"
                    });
                    $("#jsgrid").jsGrid("option", "data", []);
                    return;
                }
                var client = result.data;
                $("#jsgrid").jsGrid({
                    controller: {
                        loadData: function (filter) {
                            return $.grep(client, function (client) {
                                return (!filter["categoria"].toLowerCase() || client["categoria"].toLowerCase().indexOf(filter["categoria"].toLowerCase()) > -1) &&
                                    (!filter["nombre"].toLowerCase() || client["nombre"].toLowerCase().indexOf(filter["nombre"].toLowerCase()) > -1) &&
                                    (!filter["fechaCreacion"].toLowerCase() || client["fechaCreacion"].toLowerCase().indexOf(filter["fechaCreacion"].toLowerCase()) > -1) &&
                                    (!filter["fechaActualizacion"].toLowerCase() || client["fechaActualizacion"].toLowerCase().indexOf(filter["fechaActualizacion"].toLowerCase()) > -1) &&
                                    (!filter["detalle"].toLowerCase() || client["detalle"].toLowerCase().indexOf(filter["detalle"].toLowerCase()) > -1)
                                    
                            });
                        }

                    },

                    noDataContent: "No se encontraron infograficos",
                    sorting: true,
                    paging: true,

                    filtering: true,
                    data: client
                });
                $("#jsgrid").jsGrid("loadData");
            });

    });
};




//--------------------------------------------------------------------------------------------------------------------------------------------
//

/**
   * Deshabilita un cliente a la base de datos Dynamo en AWS
   * @param {JSON} params JSON con id de infografico
*/
DAT.desactivarInfografico = function (params) {
    try {
        useToken(token, function (token) {
            apiClient.infograficosDisableItemPost(null, params, {
                    headers: {
                        Authorization: token
                    }
                })
                .then(function (result) {
                    console.log("RESULT = " + JSON.stringify(result.data));
                    
                    if (result.status == 200) {
                        $('#loader-overlay-MOD').attr('style', 'display: none !important');
                        DAT.loadViewProductos();
                    } else {
                        alert("Ocurrió un error al eliminar los datos.");
                        return;
                    }
                });


        });

    } catch (e) {

        console.log("error :" + e);
        document.getElementById("loader-overlay").style.display = "none";
        alert("Ocurrió un error con la conexión.");
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
