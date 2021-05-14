/*
Titulo:  api-lista-data-set.js
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
 * @function loadViewProductos carga los data-set al JSgrid
 */
DAT.loadViewProductos = function () {
    useToken(token, function (token) {
        apiClient.datasetGetAllGet({}, null, {
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
                console.log("data = " + JSON.stringify(client));
                //   client.sort(compare);
                $("#jsgrid").jsGrid({
                    controller: {
                        loadData: function (filter) {
                            return $.grep(client, function (client) {
                                return (!filter["nombre"].toLowerCase() || client["nombre"].toLowerCase().indexOf(filter["nombre"].toLowerCase()) > -1) &&
                                    (!filter["fechaCreacion"].toLowerCase() || client["fechaCreacion"].toLowerCase().indexOf(filter["fechaCreacion"].toLowerCase()) > -1) &&
                                    (!filter["detalle"].toLowerCase() || client["detalle"].toLowerCase().indexOf(filter["detalle"].toLowerCase()) > -1) &&
                                    (!filter["codigoDataSet"].toLowerCase() || client["codigoDataSet"].toLowerCase().indexOf(filter["codigoDataSet"].toLowerCase()) > -1)

                            });
                        }
//(!filter["publicador"].toLowerCase() || client["publicador"].toLowerCase().indexOf(filter["publicador"].toLowerCase()) > -1) &&
                                    
                    },
                    noDataContent: "No se encontraron data-sets",
                    sorting: true,
                    paging: true,

                    filtering: true,
                    data: client
                });
                $("#jsgrid").jsGrid("loadData");
            });

    });
};



/**
 * @function deshabilitaritemDataSets Desahabilita un data-set en base de datos
 * @param params JSON con id del data-set
 */
DAT.deshabilitaritemDataSets = function (params) {
    try {
        useToken(token, function (token) {
            apiClient.datasetDisableItemPost(null, params, {
                    headers: {
                        Authorization: token
                    }
                })
                .then(function (result) {
                    console.log("RESULT = " + JSON.stringify(result.data));

                    if (result.status == 200) {
                        DAT.loadViewProductos();
                        $('#loader-overlay-MOD').attr('style', 'display: none !important');
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
 * @function getDownloadURL genera un link de descarga para un archivo en S3
 * @param {JSON} params JSON con key del archivo
 * @param {function} callback 
 */
function getDownloadURL(params, callback) {
    useToken(token, function (token) {
        apiClient.s3GetSignedDownloadUrlPost(null, params, {
                headers: {
                    Authorization: token
                }
            })
            .then(function (result) {
                if (result.status == 200) {
                    callback(result.data);
                } else {
                    callback("error");
                }
            });

    });

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