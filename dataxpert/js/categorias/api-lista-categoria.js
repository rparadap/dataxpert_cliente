/*
Titulo:  api-lista-categoria.js
Descripción: Realiza los llamados al API de AWS

Datos del autor : 
-Alexander Villegas Valverde
-Empresa: TECHBITE

Version 1.0
Ultima modificacion : 23/02/2021

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
        apiClient.categoriasGetAllGet(null, {}, {
                headers: {
                    Authorization: token
                }
            })
            .then(function (result) {
                if (typeof result.data !== 'undefined' && result.data.length <= 0) {
                    $("#jsgrid").jsGrid({
                        noDataContent: "No se encontraron registros"
                    });
                    $("#jsgrid").jsGrid("option", "data", []);
                    return;
                }
                var client = result.data;
                client.sort(compare);
                $("#jsgrid").jsGrid({
                    controller: {
                        loadData: function (filter) {
                            return $.grep(client, function (client) {
                                return (!filter["id"].toLowerCase() || client["id"].toLowerCase().indexOf(filter["id"].toLowerCase()) > -1) &&
                                    (!filter["nombre"].toLowerCase() || client["nombre"].toLowerCase().indexOf(filter["nombre"].toLowerCase()) > -1)
                            });
                        },
                        onItemUpdating: function (args) {
                            console.log("UPDATE!!");
                            // cancel update of the item with empty 'name' field
                        },
                        updateItem: function (item) {
                            $('#loader-overlay-MOD').attr('style', 'display: block');
                            var params = {
                                id: item.id,
                                nombre: item.nombre
                            };
                            DAT.editarCat(params);
                            // UPDATE STUFF API
                        }

                    },

                    noDataContent: "No se encontraron categorias",
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
   * @function eliminarCategoria Deshabilita una categoria de la base de datos Dynamo en AWS
   * @param {JSON} params JSON con informacion de la categoria
*/
DAT.eliminarCategoria = function (params) {
    try {
        useToken(token, function (token) {
            apiClient.categoriasDisableItemPost(null, params, {
                    headers: {
                        Authorization: token
                    }
                })
                .then(function (result) {
                    console.log("RESULT = " + JSON.stringify(result.data));
                    if (result.data.hasOwnProperty("errorMessage")) {
                        alert(result.data.errorMessage);
                        $('#loader-overlay-MOD').attr('style', 'display: none !important');
                        return;
                    }
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
   * @function agregarCategoria Agrega una categoria a la base de datos Dynamo en AWS
   * @param {JSON} params JSON con informacion del la categoraia
*/
DAT.agregarCategoria = function (params) {
    try {
        useToken(token, function (token) {
            apiClient.categoriasAddItemPost(null, params, {
                    headers: {
                        Authorization: token
                    }
                })
                .then(function (result) {
                    console.log("RESULT = " + JSON.stringify(result.data));
                    if (result.status == 200) {
                        $('#loader-overlay-MOD').attr('style', 'display: none !important');
                        DAT.loadViewProductos();
                        $('#modalAdd').modal('hide');
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
   * @function eliminarCategoria Deshabilita una categoria de la base de datos Dynamo en AWS
   * @param {JSON} params JSON con informacion de la categoria
*/
DAT.editarCat = function (params) {
    try {
        useToken(token, function (token) {
            apiClient.categoriasEditItemPost(null, params, {
                    headers: {
                        Authorization: token
                    }
                })
                .then(function (result) {
                    console.log("RESULT = " + JSON.stringify(result.data));
                    if (result.data.hasOwnProperty("errorMessage")) {
                        alert(result.data.errorMessage);
                        $('#loader-overlay-MOD').attr('style', 'display: none !important');
                        return;
                    }
                    if (result.status == 200) {
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
   * @function compare Utilizando el metodo sort, ordena los elementos del array por nombre
   * @param {JSON} a primer elemento
   * @param {JSON} b segundo elemento
   * @return {ARRAY} array ordenado por nombre.
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